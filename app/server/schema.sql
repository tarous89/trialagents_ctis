-- TrialAgents CTIS schema. Additive only: every statement must be safe to rerun.
CREATE SCHEMA IF NOT EXISTS ctis;

CREATE TABLE IF NOT EXISTS ctis.account (
 user_id text PRIMARY KEY, email text NOT NULL, display_name text NOT NULL,
 plan text NOT NULL DEFAULT 'individual' CHECK(plan IN ('individual','team')),
 paid_until timestamptz, access_version integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ctis.project (
 id uuid PRIMARY KEY, owner_id text NOT NULL REFERENCES ctis.account(user_id),
 code text NOT NULL, name text NOT NULL, sponsor text NOT NULL DEFAULT '', eu_ct_number text NOT NULL DEFAULT '',
 phase text NOT NULL DEFAULT '', submission_type text NOT NULL DEFAULT '', countries text[] NOT NULL DEFAULT '{}',
 revision integer NOT NULL DEFAULT 0, plan_rev integer NOT NULL DEFAULT 0, duplicated_from uuid,
 is_example boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), archived_at timestamptz
);
CREATE INDEX IF NOT EXISTS ctis_project_owner ON ctis.project(owner_id) WHERE archived_at IS NULL;

-- Documents and steps are never deleted: a plan save that drops one sets removed_at, so its versions stay.
CREATE TABLE IF NOT EXISTS ctis.document (
 project_id uuid NOT NULL REFERENCES ctis.project ON DELETE CASCADE, id text NOT NULL CHECK(id ~ '^D[0-9]{2,3}$'),
 name text NOT NULL, part text NOT NULL CHECK(part IN ('I','II')), country text NOT NULL, language text NOT NULL,
 variant text NOT NULL DEFAULT '', code text NOT NULL DEFAULT '', filename text NOT NULL, position integer NOT NULL,
 catalog jsonb NOT NULL DEFAULT '{}', removed_at timestamptz,
 PRIMARY KEY(project_id,id)
);
CREATE TABLE IF NOT EXISTS ctis.step (
 project_id uuid NOT NULL REFERENCES ctis.project ON DELETE CASCADE, id text NOT NULL CHECK(id ~ '^[A-Z]{2}[0-9]{0,2}$'),
 type text NOT NULL CHECK(type IN ('draft','checklist','qc','style','team','guide','custom')),
 name text NOT NULL, instruction text NOT NULL DEFAULT '', position integer NOT NULL,
 paused boolean NOT NULL DEFAULT false, removed_at timestamptz,
 PRIMARY KEY(project_id,id)
);
CREATE TABLE IF NOT EXISTS ctis.cell_na (
 project_id uuid NOT NULL, document_id text NOT NULL, step_id text NOT NULL,
 PRIMARY KEY(project_id,document_id,step_id),
 FOREIGN KEY(project_id,document_id) REFERENCES ctis.document ON DELETE CASCADE,
 FOREIGN KEY(project_id,step_id) REFERENCES ctis.step ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS ctis.plan_revision (
 project_id uuid NOT NULL REFERENCES ctis.project ON DELETE CASCADE, rev integer NOT NULL, body jsonb NOT NULL,
 actor text NOT NULL, actor_name text NOT NULL, source text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(project_id,rev)
);

-- Versions are immutable.
CREATE TABLE IF NOT EXISTS ctis.version (
 project_id uuid NOT NULL, document_id text NOT NULL, step_id text NOT NULL, n integer NOT NULL CHECK(n>0),
 content jsonb NOT NULL, claims jsonb NOT NULL DEFAULT '[]', findings jsonb NOT NULL DEFAULT '[]', fill jsonb, file_id uuid,
 basis jsonb, resources jsonb NOT NULL DEFAULT '[]', catalog jsonb NOT NULL DEFAULT '[]', note text NOT NULL DEFAULT '',
 past_issues jsonb NOT NULL DEFAULT '[]', -- earlier steps the user chose to move past, with their open issues
 restored_from integer, actor text NOT NULL, actor_name text NOT NULL, source text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(project_id,document_id,step_id,n),
 FOREIGN KEY(project_id,document_id) REFERENCES ctis.document ON DELETE CASCADE,
 FOREIGN KEY(project_id,step_id) REFERENCES ctis.step ON DELETE CASCADE
);

-- Findings (from the assistant) and comments (from people) share one numbered list per deliverable.
CREATE TABLE IF NOT EXISTS ctis.thread (
 id uuid PRIMARY KEY, project_id uuid NOT NULL, document_id text NOT NULL, step_id text NOT NULL, number integer NOT NULL,
 kind text NOT NULL CHECK(kind IN ('finding','comment')),
 category text NOT NULL CHECK(category IN ('missing','conflict','decision','comment')),
 version_n integer NOT NULL, anchor jsonb NOT NULL DEFAULT '{}', text text NOT NULL, key text, mentions text[] NOT NULL DEFAULT '{}',
 status text NOT NULL DEFAULT 'open' CHECK(status IN ('open','resolved')),
 actor text NOT NULL, actor_name text NOT NULL, source text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
 resolved_by text, resolved_at timestamptz,
 UNIQUE(project_id,document_id,step_id,number),
 FOREIGN KEY(project_id,document_id) REFERENCES ctis.document ON DELETE CASCADE,
 FOREIGN KEY(project_id,step_id) REFERENCES ctis.step ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS ctis_thread_key ON ctis.thread(project_id,document_id,step_id,key) WHERE key IS NOT NULL;
CREATE TABLE IF NOT EXISTS ctis.thread_reply (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, thread_id uuid NOT NULL REFERENCES ctis.thread ON DELETE CASCADE,
 text text NOT NULL, mentions text[] NOT NULL DEFAULT '{}',
 actor text NOT NULL, actor_name text NOT NULL, source text NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);

-- "Ignore and continue": bound to one version number of one deliverable.
CREATE TABLE IF NOT EXISTS ctis.continued (
 project_id uuid NOT NULL, document_id text NOT NULL, step_id text NOT NULL, version_n integer NOT NULL,
 actor text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(project_id,document_id,step_id),
 FOREIGN KEY(project_id,document_id) REFERENCES ctis.document ON DELETE CASCADE,
 FOREIGN KEY(project_id,step_id) REFERENCES ctis.step ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS ctis.approval (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, project_id uuid NOT NULL, document_id text NOT NULL,
 step_id text NOT NULL, version_n integer NOT NULL, plan_rev integer NOT NULL,
 actor text NOT NULL, actor_name text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
 FOREIGN KEY(project_id,document_id,step_id,version_n) REFERENCES ctis.version ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ctis.file (
 id uuid PRIMARY KEY, owner_id text NOT NULL, name text NOT NULL, mime text NOT NULL, size integer NOT NULL,
 sha256 text NOT NULL, content bytea NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ctis.resource (
 id uuid PRIMARY KEY, owner_id text NOT NULL, category text NOT NULL CHECK(category IN ('source','template')),
 name text NOT NULL, type text NOT NULL, version text NOT NULL DEFAULT '', doc_date text NOT NULL DEFAULT '',
 scope jsonb NOT NULL DEFAULT '{}', notes text NOT NULL DEFAULT '',
 file_mode text NOT NULL DEFAULT 'name' CHECK(file_mode IN ('name','link','stored')), link text, file_id uuid REFERENCES ctis.file,
 actor text NOT NULL, actor_name text NOT NULL, source text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ctis.project_resource (
 project_id uuid NOT NULL REFERENCES ctis.project ON DELETE CASCADE, resource_id uuid NOT NULL REFERENCES ctis.resource,
 PRIMARY KEY(project_id,resource_id)
);
CREATE TABLE IF NOT EXISTS ctis.document_resource_override (
 project_id uuid NOT NULL, document_id text NOT NULL, resource_id uuid NOT NULL REFERENCES ctis.resource,
 op text NOT NULL CHECK(op IN ('add','remove')),
 PRIMARY KEY(project_id,document_id,resource_id),
 FOREIGN KEY(project_id,document_id) REFERENCES ctis.document ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ctis.share_grant (
 id uuid PRIMARY KEY, owner_id text NOT NULL REFERENCES ctis.account(user_id), grantee_email text NOT NULL, grantee_user_id text,
 project_id uuid NOT NULL REFERENCES ctis.project ON DELETE CASCADE,
 scope text NOT NULL CHECK(scope IN ('project','document','deliverable')), document_id text, step_id text,
 role text NOT NULL CHECK(role IN ('commenter','editor')),
 created_at timestamptz NOT NULL DEFAULT now(), first_opened_at timestamptz, revoked_at timestamptz,
 CHECK((scope='project' AND document_id IS NULL AND step_id IS NULL) OR (scope='document' AND document_id IS NOT NULL AND step_id IS NULL)
   OR (scope='deliverable' AND document_id IS NOT NULL AND step_id IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS ctis_grant_email ON ctis.share_grant(lower(grantee_email)) WHERE revoked_at IS NULL;

CREATE TABLE IF NOT EXISTS ctis.audit (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, owner_id text NOT NULL, project_id uuid,
 actor text NOT NULL, actor_name text NOT NULL, source text NOT NULL, action text NOT NULL, target text,
 details jsonb NOT NULL DEFAULT '{}', happened_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ctis_audit_page ON ctis.audit(owner_id,id DESC);
CREATE INDEX IF NOT EXISTS ctis_audit_project ON ctis.audit(project_id,id DESC);

-- Idempotent write receipts: a retried request returns its first result.
CREATE TABLE IF NOT EXISTS ctis.receipt (
 actor text NOT NULL, key uuid NOT NULL, digest text NOT NULL, result jsonb NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(actor,key)
);

-- Content catalog (docs/CATALOG.md). Each deploy that changes catalog/ publishes a new release; versions record what they used.
CREATE TABLE IF NOT EXISTS ctis.catalog_release (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, sha text NOT NULL DEFAULT '', digest text NOT NULL UNIQUE,
 items integer NOT NULL, published_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ctis.catalog_item (
 release_id bigint NOT NULL REFERENCES ctis.catalog_release ON DELETE CASCADE, id text NOT NULL,
 category text NOT NULL CHECK(category IN ('planning','content','styling','workflow')),
 version text NOT NULL, effective text NOT NULL, name text NOT NULL, use_when text NOT NULL,
 header jsonb NOT NULL, body text NOT NULL, parsed jsonb, tags jsonb,
 file_name text, file_sha256 text, file bytea,
 PRIMARY KEY(release_id,id)
);

-- Text of stored sources, in chunks with locators (page, section), for search and quoting.
CREATE TABLE IF NOT EXISTS ctis.resource_text (
 resource_id uuid NOT NULL REFERENCES ctis.resource ON DELETE CASCADE, chunk integer NOT NULL,
 locator jsonb NOT NULL DEFAULT '{}', text text NOT NULL,
 PRIMARY KEY(resource_id,chunk)
);
CREATE INDEX IF NOT EXISTS ctis_resource_text_search ON ctis.resource_text USING gin(to_tsvector('simple',text));
