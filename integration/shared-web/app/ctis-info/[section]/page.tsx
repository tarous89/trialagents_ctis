// Public listing, setup, support and legal pages for TrialAgents CTIS (ctis.trialagents.com/ctis-info/<section>),
// as Pipeline's pipeline-info pages. Linked from the Claude plugin manifest and the OAuth resource metadata.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PLUGIN_PUBLISHER_ADDRESS as address, PLUGIN_PUBLISHER_NAME as publisher } from '@/app/lib/plugin-publisher';
import styles from './information.module.css';

const email = 'contact@trialagents.com';
const base = 'https://ctis.trialagents.com/ctis-info/';
const pages = {
  about: {
    title: 'TrialAgents CTIS',
    description: 'Prepare CTIS clinical trial applications with Claude or ChatGPT, and review and approve them with your team in the TrialAgents app.',
    body: <>
      <p>Each submission is a project: the documents for Part I and each country’s Part II, the steps each document goes through (by default Draft, Source QC and Style), every version with the sources and templates it used, and your team’s comments and approvals.</p>
      <p>Your assistant plans the documents with the TrialAgents planning checklists for each country, drafts them from the TrialAgents content templates and your sources, checks every fact against its source passage, and fills the Word template or authority form. It stops where a person is needed. People approve final documents, share, and upload files in the app.</p>
      <p>Your own projects are free. Sharing a deliverable, a document or a whole project with reviewers is part of the Team plan, €49 per month per owner account. Comments, approvals and changes can send email to the people involved, according to their notification settings.</p>
    </>,
  },
  connectors: {
    title: 'TrialAgents CTIS connector guide',
    description: 'Connect Claude or ChatGPT to TrialAgents CTIS and check what your account can do.',
    body: <>
      <h2>Before you connect</h2>
      <p>Use the TrialAgents account that owns your projects, or the email address a project was shared with. Your assistant workspace may require an administrator to enable connectors.</p>
      <h2>Connect Claude</h2>
      <p>Open Customize → Connectors and select TrialAgents CTIS if it is available. For a custom connection, add a remote connector with <code>https://mcp.trialagents.com/ctis/claude</code> and sign in to TrialAgents when asked. In Claude Code, install the plugin with <code>/plugin install trialagents-ctis --marketplace tarous89/trialagents_ctis</code>.</p>
      <p>Claude reads with five read-only tools and saves with one, <code>save_ctis</code>. Allow it once to let Claude run a whole submission. Every save is a new version or record; nothing is overwritten or deleted.</p>
      <h2>Connect ChatGPT</h2>
      <p>The ChatGPT app is coming. Until then, use Claude or the browser.</p>
      <h2>Try it in a conversation</h2>
      <p>Ask “Prepare a CTIS initial application for our study in Germany and Spain.” The plan opens in the conversation. Ask for changes, then say “Start.” Later, in any conversation, “Continue EX-101” picks up where the work stopped.</p>
      <h2>Access and troubleshooting</h2>
      <p>If a project is missing, check the email address you signed in with. If you can comment but not run steps, ask the owner for edit access. If Claude says sign-in expired, reconnect TrialAgents CTIS in Claude’s connector settings. Files over 8 MB upload in the browser rather than inside Claude.</p>
    </>,
  },
  support: {
    title: 'TrialAgents CTIS support',
    description: 'Get help with connections, project access, documents, sharing or billing.',
    body: <>
      <p>For product support, privacy requests or a security concern, email us below. Tell us whether you were using the browser, Claude or ChatGPT, the project and deliverable code (for example D04-QC), what you were trying to do, and the error message if there was one. Keep passwords, access tokens and patient data out of your message.</p>
      <p>For setup steps or help with sign-in and permissions, see the <a href="/ctis-info/connectors">connector guide</a>.</p>
    </>,
  },
  privacy: {
    title: 'TrialAgents CTIS privacy policy',
    description: 'How TrialAgents handles your account, project and document information when you use TrialAgents CTIS in a browser, Claude or ChatGPT.',
    body: <>
      <h2>Who handles your information</h2>
      <p>{publisher}, {address}, operates TrialAgents CTIS. Use the email below for privacy requests. The owner of a project controls who it is shared with and can help with requests about that project’s content.</p>
      <h2>What we process and why</h2>
      <p>We use account names, email addresses and sign-in information to give you access. We store the projects, plans, document versions, findings, comments and approvals you and your assistant save, the names and versions of the sources and templates used, and the files you choose to upload, with their extracted text so your assistant can search and quote them. TrialAgents CTIS is for regulatory documents; do not upload patient-level data.</p>
      <p>When an owner shares an item, we store the recipient’s email address to give them access and to tell them. If you contact support, we use what you send to respond. For the Team plan, we process customer and subscription identifiers, subscription status and billing events to manage access; Stripe handles payment details during checkout.</p>
      <h2>Who receives information</h2>
      <p>People an owner shares with see what was shared with them. When you use Claude, Anthropic receives the tool results returned to that conversation; when you use ChatGPT, OpenAI receives them. TrialAgents CTIS processes what the assistant sends to its tools.</p>
      <p>Hosting and authentication providers help run the service. Resend delivers notification emails according to each person’s notification settings; they can include project, document and deliverable names and the text of comments.</p>
      <h2>Where and how long information is kept</h2>
      <p>The database, including uploaded files, is hosted by Render in Frankfurt. Versions, comments and logs are kept with the project so every document can be traced; archiving a project removes it from use without rewriting its history. Render’s rolling point-in-time recovery window is up to seven days. Contact us to delete a project, an uploaded file or your account, or to ask what remains in history or backups.</p>
      <h2>Your choices and rights</h2>
      <p>You can change notification settings, stop sharing, disconnect an assistant, or ask for access, correction, erasure, restriction, objection or a portable copy of your personal data, as applicable. You may also complain to a data protection authority.</p>
    </>,
  },
  terms: {
    title: 'TrialAgents CTIS terms of service',
    description: 'These terms cover use of TrialAgents CTIS in a browser and through its Claude and ChatGPT connectors.',
    body: <>
      <p>TrialAgents CTIS is operated by {publisher}, {address}. By using it you agree to these terms. If you act for an organization, you must have authority to do so.</p>
      <p>Use TrialAgents CTIS for lawful professional work with material you have the right to process. Protect your credentials and respect what others share with you. You retain rights to your material. TrialAgents retains rights to its software, checklists, content templates and styling.</p>
      <p>Documents, checks and findings produced with an assistant can be incomplete or wrong. Review them before relying on them; approving a final document and submitting it to the authorities remain your decisions. Country requirements change: check current national requirements before submission.</p>
      <p>Individual use is free. Sharing requires the Team plan at €49 per month per owner account, billed monthly through Stripe and cancellable in Billing; sharing continues until the end of the paid period. We aim to provide reliable access; availability and generated results vary. Your mandatory legal rights and any separate written agreement continue to apply.</p>
    </>,
  },
} as const;

type PageProps = { params: Promise<{ section: string }> };

function getPage(section: string) {
  if (!Object.hasOwn(pages, section)) notFound();
  return pages[section as keyof typeof pages];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params;
  const { title, description } = getPage(section);
  const url = base + section;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'TrialAgents CTIS', type: 'website' },
    twitter: { card: 'summary', title, description },
  };
}

export default async function CtisInformation({ params }: PageProps) {
  const { section } = await params;
  const page = getPage(section);
  return (
    <main className={styles.page}>
      <article className={styles.article} aria-labelledby="information-title">
        <header>
          <p className={styles.publisher}>TrialAgents CTIS · {publisher}</p>
          <h1 id="information-title">{page.title}</h1>
        </header>
        <div className={styles.copy}>
          <p>{page.description}</p>
          {(section === 'privacy' || section === 'terms') && <p><small>Updated <time dateTime="2026-11-26">26 November 2026</time></small></p>}
          {page.body}
          <p><a href={'mailto:' + email}>{email}</a></p>
        </div>
        <nav className={styles.links} aria-label="TrialAgents CTIS information">
          {Object.entries(pages).filter(([id]) => id !== section).map(([id, info]) => (
            <a key={id} href={'/ctis-info/' + id}>{info.title}</a>
          ))}
          <a href="/">Open TrialAgents app</a>
        </nav>
      </article>
    </main>
  );
}
