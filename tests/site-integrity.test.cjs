const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parse } = require('parse5');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

function projectRecords() {
  const start = app.indexOf('const PROJECTS = [') + 'const PROJECTS = '.length;
  const end = app.indexOf('\n];', start) + 2;
  assert.ok(start > 0 && end > start, 'PROJECTS data array is present');
  return JSON.parse(app.slice(start, end));
}

function walk(node, fn) {
  fn(node);
  for (const child of node.childNodes || []) walk(child, fn);
  if (node.content) walk(node.content, fn);
}

test('portfolio keeps 23 unique, complete project records and local image files', () => {
  const projects = projectRecords();
  assert.equal(projects.length, 23);
  assert.equal(new Set(projects.map(p => p.slug)).size, 23, 'slugs are unique');
  for (const project of projects) {
    assert.ok(project.slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug), `valid slug: ${project.slug}`);
    assert.ok(project.name && project.tagline && project.context && project.features?.length, `required project content: ${project.slug}`);
    if (project.image && !/^https?:/i.test(project.image) && fs.existsSync(path.join(root, project.image))) continue;
    assert.ok(project.fallbackImage && fs.existsSync(path.join(root, project.fallbackImage)), `local image or fallback exists for ${project.slug}`);
    if (project.href) assert.match(project.href, /^https:\/\//, `external project URL uses HTTPS: ${project.slug}`);
  }
});

test('every confirmed public project has a reviewed local capture and private or mismatched URLs stay unlinked', () => {
  const projects = projectRecords();
  const publicProjects = projects.filter(project => project.href);
  assert.equal(publicProjects.length, 11, 'only the 11 reviewed public sites have external links');
  for (const project of publicProjects) {
    assert.ok(fs.existsSync(path.join(root, 'assets/portfolio/actuales', `${project.slug}.jpg`)), `current screenshot exists for ${project.slug}`);
  }
  for (const slug of ['dpp-control', 'murex']) {
    const project = projects.find(item => item.slug === slug);
    assert.equal(project.href, null, `${slug} does not link to a login or unconfirmed identity`);
    assert.equal(project.imageKind, 'concept', `${slug} is labeled as a concept`);
  }
});

test('Home pairs every confirmed project page with its public website', () => {
  const projects = projectRecords().filter(project => project.href);
  assert.equal((html.match(/class="home-project-directory__name"/g) || []).length, projects.length);
  assert.equal((html.match(/class="home-project-directory__site"/g) || []).length, projects.length);
  for (const project of projects) {
    assert.match(html, new RegExp(`href="#/proyectos/${project.slug}"`), `Home has a detail link for ${project.slug}`);
    assert.ok(html.includes(project.href.replace(/\/$/, '')), `Home has the reviewed external URL for ${project.slug}`);
  }
});

test('Home disciplines point to matching service details', () => {
  const links = [...html.matchAll(/<a href="(#\/servicios\/[^"]+)" class="disc__row"/g)].map(match => match[1]);
  assert.deepEqual(links, [
    '#/servicios/diseno-web', '#/servicios/desarrollo-web', '#/servicios/software',
    '#/servicios/automatizacion', '#/servicios/motion', '#/servicios/motion'
  ]);
});

test('scroll reveal content is visible even when IntersectionObserver never fires', () => {
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  assert.match(app, /typeof window\.IntersectionObserver === 'function'/);
  assert.match(css, /\[data-reveal\],\[data-reveal="clip"\],\[data-reveal="scale"\]\{opacity:1;transform:none;clip-path:none\}/);
  assert.match(css, /\.mask>span,\.w>span\{transform:none\}/);
  assert.match(css, /\.no-motion \.hero__sub/);
  assert.doesNotMatch(css, /\.no-motion \.no-motion \.hero__sub/);
});

test('keyboard skip link has a programmatically focusable main landmark', () => {
  assert.match(html, /<main\b[^>]*id="main"[^>]*tabindex="-1"/i);
  assert.match(app, /target\.focus\(\{preventScroll:true\}\)/);
});

test('HTML has unique IDs, working local anchors, and all core app assets', () => {
  const document = parse(html);
  const ids = new Map();
  const anchors = [];
  walk(document, node => {
    if (!node.attrs) return;
    const attrs = Object.fromEntries(node.attrs.map(a => [a.name, a.value]));
    if (attrs.id) ids.set(attrs.id, (ids.get(attrs.id) || 0) + 1);
    if (node.tagName === 'a' && attrs.href) anchors.push(attrs.href);
  });
  assert.deepEqual([...ids].filter(([, count]) => count > 1), [], 'IDs are unique');
  for (const href of anchors) {
    if (!href.startsWith('#') || href.startsWith('#/')) continue;
    const id = decodeURIComponent(href.slice(1));
    assert.ok(ids.has(id), `internal anchor target exists: ${href}`);
  }
  assert.match(html, /<main\b[^>]*id="main"/i);
  assert.match(html, /id="view-(home|proyectos|proyecto|servicios|servicio|estudio|proceso|precios|cotizar|contacto)"/);
  assert.match(html, /styles\.css/);
  assert.match(html, /app\.js/);
});

test('approved hero exclusions remain absent and sensitive values are not embedded', () => {
  const hero = html.match(/<section class="view" data-view="home"[\s\S]*?<\/section>/)?.[0] || '';
  assert.doesNotMatch(hero, /ESTUDIO CREATIVO\s*&amp;\s*INGENIER[IÍ]A DIGITAL\s*[—-]\s*LIMA,?\s*PER[ÚU]/i);
  assert.doesNotMatch(hero, /DESLIZA/i);
  assert.doesNotMatch(hero, /01\s*[—-]\s*MANIFIESTO/i);
  assert.doesNotMatch(hero, /14\s*\/?\s*02\s*\/?\s*03/);
  assert.doesNotMatch(html, /progress-bar|scroll-progress/i);
  assert.match(app, /https:\/\/wa\.me\/51916666934\?text=/);
  assert.doesNotMatch(`${html}\n${app}`, /(?:gh[pousr]_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16}|-----BEGIN (?:RSA |EC )?PRIVATE KEY-----)/);
  assert.doesNotMatch(`${html}\n${app}`, /(?:C:\\Users\\|\/Users\/[^/]+\/)/i, 'no workstation paths are published');
});

test('reduced motion styles are present', () => {
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  assert.match(css, /prefers-reduced-motion\s*:\s*reduce/i);
});
