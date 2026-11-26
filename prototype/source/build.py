import re, base64, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))

SRC = os.path.join(HERE, 'plan-canvas-original.html')
PIPE = os.path.join(HERE, 'vendor', 'pipeline') + '/'
OUT = os.path.join(HERE, '..', 'TrialAgents-CTIS.html')

orig = open(SRC).read()
shell = open(PIPE + 'shell.html').read()

# ---------- CSS helpers ----------
def strip_comments(css):
    return re.sub(r'/\*.*?\*/', '', css, flags=re.S)

def blocks(css):
    """Yield (prelude, body, is_atrule_block) for top-level items."""
    i, n = 0, len(css)
    while i < n:
        while i < n and css[i] in ' \t\r\n;':
            i += 1
        if i >= n:
            break
        j = css.find('{', i)
        if j < 0:
            break
        prelude = css[i:j].strip()
        depth, k = 1, j + 1
        while k < n and depth:
            if css[k] == '{':
                depth += 1
            elif css[k] == '}':
                depth -= 1
            k += 1
        yield prelude, css[j + 1:k - 1]
        i = k

def split_top(sel, ch=','):
    out, depth, cur = [], 0, ''
    for c in sel:
        if c in '([':
            depth += 1
        elif c in ')]':
            depth -= 1
        if c == ch and depth == 0:
            out.append(cur)
            cur = ''
        else:
            cur += c
    out.append(cur)
    return [s.strip() for s in out if s.strip()]

def first_compound_end(s):
    depth = 0
    for i, c in enumerate(s):
        if c in '([':
            depth += 1
        elif c in ')]':
            depth -= 1
        elif depth == 0 and c in ' >+~':
            return i
    return len(s)

def augment(s, cls):
    """Insert .cls into the first compound selector of s."""
    end = first_compound_end(s)
    comp, rest = s[:end], s[end:]
    m = comp.find('::')
    if m >= 0:
        comp = comp[:m] + cls + comp[m:]
    else:
        comp = comp + cls
    return comp + rest

GLOBAL_START = re.compile(r'^(html|body|:root|\.layout|main)\b')

def prefix_selector(s, scope, host=None):
    if host and s.startswith(':host'):
        return [scope + s[5:]]
    if s.startswith(':root'):
        return [scope + s[5:]]
    m = re.match(r'^(html|body)([^\s>+~]*)(.*)$', s)
    if m:
        rest = m.group(3).strip()
        if not rest:
            return [scope]
        return [m.group(1) + m.group(2) + ' ' + scope + ' ' + rest.lstrip('> ')]
    return [scope + ' ' + s, augment(s, scope)]

def prefix_css(css, scope, host=False, keep_global=False, globals_out=None):
    out = []
    for prelude, body in blocks(strip_comments(css)):
        if prelude.startswith('@'):
            if prelude.startswith(('@media', '@supports', '@layer', '@container')):
                sub = []
                inner = prefix_css(body, scope, host, keep_global, sub)
                out.append(prelude + '{' + inner + '}')
                if sub and globals_out is not None:
                    globals_out.append(prelude + '{' + '\n'.join(sub) + '}')
            else:  # @font-face, @keyframes etc.
                (globals_out if globals_out is not None else out).append(prelude + '{' + body + '}')
            continue
        sels = split_top(prelude)
        if keep_global and globals_out is not None and all(GLOBAL_START.match(s) for s in sels):
            globals_out.append(prelude + '{' + body + '}')
            continue
        new = []
        for s in sels:
            if keep_global and GLOBAL_START.match(s):
                continue
            new += prefix_selector(s, scope, host)
        if new:
            out.append(','.join(new) + '{' + body + '}')
    return '\n'.join(out)

# ---------- gather CSS ----------
t0, t1 = shell.find('<template'), shell.find('</template>')
outer_css = '\n'.join(re.findall(r'<style[^>]*>(.*?)</style>', shell[:t0] + shell[t1:], re.S))
inner_css = '\n'.join(re.findall(r'<style[^>]*>(.*?)</style>', shell[t0:t1], re.S))
# Header CSS lives in a shadow root; flatten it under .plh
glob = []
pl_css = prefix_css(outer_css.replace('#app', '#page'), '.pl', keep_global=True, globals_out=glob)
plh_css = prefix_css(inner_css, '.plh', host=True, globals_out=glob)

s0 = orig.find('<style>') + 7
s1 = orig.find('</style>')
ctis_raw = orig[s0:s1]
ctis_glob = []
ctis_css = prefix_css(ctis_raw, '.ctis', globals_out=ctis_glob)

# ---------- assets ----------
mark_png = base64.b64encode(open(PIPE + 'mark-dark-56.png', 'rb').read()).decode()

extra_css = open(os.path.join(HERE, 'extra.css')).read()

# ---------- markup ----------
head_end = orig.find('<style>')
head = orig[:head_end].replace('<title>Submission plan · TrialAgents CTIS</title>', '<title>TrialAgents CTIS</title>').replace('content="#0d1110"', 'content="#0c1110"')

header = ('<div class="plh"><div class="intel-app intel-workspace-restored root combined-workspace combined-public-shell">'
 '<header class="workspace-header header"><div class="workspace-title">'
 '<button type="button" class="sidebar-toggle" aria-label="Hide sidebar" title="Hide or show the sidebar" aria-expanded="true" aria-controls="rail"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg></button>'
 '<img class="ctis-mark" src="data:image/png;base64,' + mark_png + '" alt="" width="28" height="28">'
 '<h1 class="workspaceTitle">TrialAgents <span class="brand-dot" aria-hidden="true">•</span> CTIS</h1></div>'
 '<div class="combined-project-header-actions"><nav class="assistant-actions" aria-label="Open TrialAgents CTIS in an assistant">'
 '<button type="button" class="assistant-link" data-assistant="Claude" title="Open this workspace in Claude">%%CLAUDE_MARK%%<span>Open in Claude</span></button>'
 '<button type="button" class="assistant-link" data-assistant="ChatGPT" title="Open this workspace in ChatGPT">%%CHATGPT_MARK%%<span>Open in ChatGPT</span></button>'
 '</nav></div>'
 '</header></div></div>')

# Plan page: the original sheet, with a Pipeline-style title block
b0 = orig.find('<section class="sheet">')
b1 = orig.find('</section>', orig.find('<footer class="sheetfoot">')) + len('</section>')
sheet = orig[b0:b1]
sheet = sheet.replace('Download files</button>','Download all</button>').replace('data-a="steps">', 'data-a="steps" title="Choose which steps run for every document">').replace('data-a="export">', 'data-a="export" title="Download every approved final document as one ZIP file">')
plan_head = ('<div class="pl planhead"><div class="title"><div class="titleblock"><span class="eyebrow" id="pcode"></span>'
 '<h1 id="ptitle"></h1><div class="facts"><span id="facts"></span><b>·</b><span id="planrefs"></span></div></div>'
 '<div class="planbuttons"><button type="button" data-edit-project-current>Project details</button></div></div>'
 '<span hidden><span id="project"></span><span id="plabel"></span><select id="plans"></select></span></div>')
pagefoot = '<div class="pagefoot"><span>Interactive mockup · Fictional study and example checks</span><button class="textbtn" data-a="reset">Reset example</button></div>'

body = ('<body>' + header +
 '<div class="layout"><aside id="rail" class="pl"></aside><main id="app">'
 '<div id="page" class="pl"></div>'
 '<div id="planpage" class="ctis" hidden>' + plan_head + sheet + '</div>'
 '</main></div>'
 '<div class="ctis"><dialog id="overlay" aria-labelledby="overlaytitle"><div id="dialog-content"></div></dialog><div class="toast" id="toast" role="status" hidden></div></div>'
 '<div class="pl"><dialog class="drawer" id="drawer" aria-label="Details"></dialog></div>')

# ---------- scripts ----------
scripts = re.findall(r'<script>(.*?)</script>', orig, re.S)
jszip, app = scripts[0], scripts[1]
new_js = open(os.path.join(HERE, 'shell_new.js')).read()

def must_replace(s, a, b, count=1):
    assert s.count(a) >= 1, a[:80]
    return s.replace(a, b) if count == 0 else s.replace(a, b, count)

app = must_replace(app, 'function render(){', 'function renderPlan(){')
app = must_replace(app, "const DB='trialagents-ctis-single-plan-2'", "const DB='trialagents-ctis-workspace-1'")
app = must_replace(app, "else if(a==='sources')sourcesDlg();", "else if(a==='sources')go('sources');")
app = must_replace(app, "else if(a==='settings')settingsDlg();", "else if(a==='settings'){settingTab='Project';go('settings')}")
app = must_replace(app, "data=seed();actor=owner;", "data=upgrade(seed());data.ui.project='EX-101';route='plan';actor=owner;")

exec(open(os.path.join(HERE, 'patches.py')).read())
# section titles in reset modal etc. remain. Insert the shell before the boot line.
boot = "window.addEventListener('resize',()=>render());"
idx = app.find(boot)
assert idx > 0
app = app[:idx] + new_js + '\n' + app[idx:]

layout_css = '\n'.join(glob_rule for glob_rule in glob)

html = (head + '<style>' + '\n'.join(ctis_glob) + '\n' + layout_css + '\n' + plh_css + '\n' + pl_css + '\n' + ctis_css + '\n' + extra_css + '</style></head>' + body +
        '<script>' + jszip + '</script><script>' + app + '</script></body></html>')
def mark(n):
    s=open(PIPE+'marks/'+n+'.svg').read().strip()
    s=re.sub(r'<title>.*?</title>','',s)
    return s.replace('<svg role="img"','<svg class="assistant-mark" aria-hidden="true" fill="currentColor" width="18" height="18"')
html=html.replace('%%CLAUDE_MARK%%',mark('claude')).replace('%%CHATGPT_MARK%%',mark('chatgpt'))
import os
open(OUT, 'w').write(html)
print('written', len(html))
