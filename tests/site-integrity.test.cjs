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
