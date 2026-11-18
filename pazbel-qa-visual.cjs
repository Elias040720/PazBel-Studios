/**
 * QA visual reproducible para PazBel Studios.
 * Copiar al directorio raíz del repositorio, donde exista @playwright/test.
 * Ejecutar: node pazbel-qa-visual.cjs
 * No modifica datos ni envía formularios.
 */
'use strict';
const { chromium } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const OUT = path.resolve(process.cwd(), 'qa-pazbel-evidencias');
const SITES = [
  {
    id: 'github-pages',
    base: 'https://elias040720.github.io/PazBel-Studios/',
    routes: ['#/', '#/proyectos', '#/proyectos/avila-parfums', '#/servicios',
      '#/servicios/software', '#/estudio', '#/proceso', '#/precios',
      '#/cotizar', '#/contacto'],
  },
  { id: 'vercel', base: 'https://paz-bel-studios.vercel.app/', routes: [''] },
];
const VIEWPORTS = [
  { width: 320, height: 720 }, { width: 360, height: 800 },
  { width: 375, height: 812 }, { width: 390, height: 844 },
  { width: 430, height: 932 }, { width: 640, height: 900 },
  { width: 768, height: 1024 }, { width: 1024, height: 768 },
  { width: 1280, height: 800 }, { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];
const tidy = value => String(value).replace(/[^a-z0-9_-]+/gi, '_').replace(/^_|_$/g, '').slice(0, 75);
const samples = [];
const defects = [];
function addDefect(info) { defects.push(info); }

async function checkOne(browser, site, route, viewport) {
  const context = await browser.newContext({
    viewport, reducedMotion: 'no-preference', locale: 'es-PE',
    deviceScaleFactor: 1, colorScheme: 'dark',
  });
  const page = await context.newPage();
  const errors = [], failedRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => failedRequests.push({ url: request.url(), failure: request.failure()?.errorText }));
  const url = site.base + route;
  let loadError = '';
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await Promise.race([
      page.evaluate(() => document.fonts?.ready.then(() => true) || true).catch(() => false),
      new Promise(resolve => setTimeout(resolve, 1800)),
    ]);
    await page.waitForTimeout(850);
  } catch (err) { loadError = String(err.message || err).slice(0, 250); }

  const data = await page.evaluate(() => {
    const viewport = window.innerWidth;
    const visible = el => {
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'
        && !el.closest('[hidden], [inert]');
    };
    const ids = Array.from(document.querySelectorAll('[id]')).map(x => x.id);
    const duplicates = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
    const brokenAnchors = [...document.querySelectorAll('a[href^="#"]')]
      .filter(a => !a.getAttribute('href').startsWith('#/') && !document.getElementById(a.getAttribute('href').slice(1)))
      .map(a => a.getAttribute('href')).slice(0, 12);
    const activeImages = [...document.querySelectorAll('main img, .view:not([hidden]) img')].filter(visible);
    const images = activeImages.map(im => ({ src: im.currentSrc || im.src, naturalWidth: im.naturalWidth, complete: im.complete }));
    const h1 = [...document.querySelectorAll('h1')].filter(visible).map(x => x.textContent.trim().replace(/\s+/g, ' ').slice(0, 125));
    const smallTargets = [...document.querySelectorAll('button, a, input:not([type="hidden"]), select')]
      .filter(visible).map(el => {
        const r = el.getBoundingClientRect();
        return { tag: el.tagName, label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 45), width: +r.width.toFixed(1), height: +r.height.toFixed(1) };
      }).filter(x => x.height < 24 || x.width < 24).slice(0, 20);
    const textClipped = [...document.querySelectorAll('h1, h2, h3, p, button, a')]
      .filter(visible).filter(el => {
        const r = el.getBoundingClientRect();
        if (!(r.width > 0 && r.left < viewport && r.right > viewport + 4)) return false;
        for (let parent = el.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
          const style = getComputedStyle(parent);
          const scrollable = ['auto', 'scroll'].includes(style.overflowX) && parent.scrollWidth > parent.clientWidth;
          if (scrollable) {
            const bounds = parent.getBoundingClientRect();
            if (r.right > bounds.right + 1 || r.left < bounds.left - 1) return false;
          }
        }
        return true;
      }).slice(0, 15).map(el => ({ tag: el.tagName, text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 70) }));
    return {
      title: document.title, h1, viewport,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      duplicateIds: duplicates, brokenAnchors, images,
      smallTargets, textClipped,
      canonical: !!document.querySelector('link[rel="canonical"]'),
      ogImage: !!document.querySelector('meta[property="og:image"]'),
      activeView: document.querySelector('.view:not([hidden])')?.getAttribute('data-view') || null,
    };
  }).catch(error => ({ evaluationError: String(error) }));

  const slug = `${site.id}_${tidy(route || 'inicio')}_${viewport.width}`;
  const screenshot = path.join(OUT, `${slug}.png`);
  try {
    await page.screenshot({ path: screenshot, fullPage: [390, 1440].includes(viewport.width), animations: 'disabled', timeout: 16000 });
  } catch (error) { addDefect({ site: site.id, route, width: viewport.width, type: 'screenshot', message: String(error).slice(0, 180) }); }
  const record = { site: site.id, url, route, viewport, loadError, errors, failedRequests, ...data, screenshot };
  samples.push(record);
  const common = { site: site.id, route, width: viewport.width };
  if (loadError) addDefect({ ...common, type: 'carga', message: loadError });
  if (errors.length) addDefect({ ...common, type: 'javascript', message: errors.join(' | ').slice(0, 300) });
  if (data.scrollWidth > viewport.width + 3) addDefect({ ...common, type: 'overflow', message: `scrollWidth=${data.scrollWidth} vs viewport=${viewport.width}` });
  if (data.duplicateIds?.length) addDefect({ ...common, type: 'IDs duplicados', message: data.duplicateIds.join(', ') });
  if (data.brokenAnchors?.length) addDefect({ ...common, type: 'anclas', message: data.brokenAnchors.join(', ') });
  if (data.textClipped?.length) addDefect({ ...common, type: 'posible recorte', message: JSON.stringify(data.textClipped).slice(0, 280) });
  await context.close();
}

async function testInteractions(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const base = SITES[0].base;
  const check = async (name, fn) => {
    try { await fn(); samples.push({ test: name, status: 'PASS' }); }
    catch (e) { const message = String(e.message || e).slice(0, 300); samples.push({ test: name, status: 'FAIL', message }); addDefect({ type: 'interacción', test: name, message }); }
  };
  await page.goto(base + '#/', { waitUntil: 'domcontentloaded' });
  await check('Menú móvil abre, Escape cierra y devuelve foco', async () => {
    await page.locator('#burger').click();
    if (await page.locator('#burger').getAttribute('aria-expanded') !== 'true') throw Error('No abrió');
    await page.keyboard.press('Escape');
    if (await page.locator('#burger').getAttribute('aria-expanded') !== 'false') throw Error('Escape no cerró');
    if (!(await page.locator('#burger').evaluate(el => document.activeElement === el))) throw Error('No restituyó foco');
  });
  await check('Desde Inicio servicio Diseño web abre su ficha', async () => {
    await page.locator('.disc__row').first().click();
    await page.waitForTimeout(1100);
    if (!page.url().includes('#/servicios/diseno-web')) throw Error(`Destino inesperado: ${page.url()}`);
    if (!(await page.locator('#view-servicio').isVisible())) throw Error('Ficha de servicio oculta');
  });
  await check('Archivo muestra 23 proyectos después de Mostrar más', async () => {
    await page.goto(base + '#/proyectos', { waitUntil: 'domcontentloaded' });
    await page.locator('#projectMore').click(); await page.locator('#projectMore').click();
    if (!(await page.locator('#projectSummary').innerText()).includes('23 de 23')) throw Error('La paginación no llegó a 23');
  });
  await check('Búsqueda vacía presenta estado y restablecimiento', async () => {
    await page.locator('#projectSearch').fill('zz_pazbel_ninguno_123');
    await page.waitForTimeout(250);
    if (!(await page.locator('#projectEmpty').isVisible())) throw Error('No se mostró estado vacío');
    await page.locator('#projectEmptyReset').click();
    if ((await page.locator('#projectSearch').inputValue()) !== '') throw Error('No se limpió');
  });
  await check('Formulario válido no envía automáticamente ni abandona la página', async () => {
    await page.goto(base + '#/contacto', { waitUntil: 'domcontentloaded' });
    await page.locator('#cName').fill('Prueba PazBel');
    await page.locator('#cEmail').fill('qa@example.com');
    await page.locator('#cMsg').fill('Solicitud sintética para revisión de la experiencia.');
    await page.evaluate(() => { window.open = () => ({ focus() {} }); });
    await page.locator('#contactForm button[type="submit"]').click();
    if (!(await page.locator('#formStatus').innerText()).includes('WhatsApp')) throw Error('Confirmación no visible');
  });
  if (errors.length) addDefect({ type: 'javascript-interacciones', message: errors.join(' | ').slice(0, 400) });
  await page.close();
  const noObserver = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const failErrors = [];
  noObserver.on('pageerror', e => failErrors.push(e.message));
  await noObserver.addInitScript(() => { window.IntersectionObserver = undefined; });
  await check('Navegación funcional sin IntersectionObserver', async () => {
    await noObserver.goto(base + '#/', { waitUntil: 'domcontentloaded' });
    await noObserver.locator('.hero__cta a[href="#/proyectos"]').click();
    await noObserver.waitForTimeout(1100);
    if (!(await noObserver.locator('#view-proyectos').isVisible())) throw Error('Router no funciona');
    if (failErrors.length) throw Error(failErrors.join(' | '));
  });
  await noObserver.close();
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {}),
  });
  try {
    for (const site of SITES) for (const route of site.routes) for (const viewport of VIEWPORTS) {
      console.log(`${site.id} ${route || '/'} ${viewport.width}x${viewport.height}`);
      await checkOne(browser, site, route, viewport);
    }
    await testInteractions(browser);
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(OUT, 'resultados.json'), JSON.stringify({ date: new Date().toISOString(), samples, defects }, null, 2));
  const table = defects.map(d => `| ${d.site || 'Prueba'} | ${d.route || d.test || '-'} | ${d.width || '-'} | ${d.type} | ${String(d.message || '').replace(/\|/g, '/').replace(/\n/g,' ').slice(0, 150)} |`).join('\n');
  const md = `# Auditoría visual reproducible — PazBel Studios\n\nFecha: ${new Date().toISOString()}\n\nCapturas: ${samples.filter(x => x.screenshot).length}. Hallazgos: ${defects.length}.\n\n| Sitio | Ruta / prueba | Ancho | Tipo | Observación |\n|---|---|---|---|---|\n${table || '| — | — | — | — | No se registraron fallos automatizados |'}\n\nEste informe detecta incidencias automatizadas. Debe completarse con inspección visual humana de las capturas, animaciones, teclado, contrastes, contenido y dispositivos reales.\n`;
  fs.writeFileSync(path.join(OUT, 'informe.md'), md);
  console.log(`\nResultados y capturas en ${OUT}\n${defects.length} hallazgos; revisa informe.md y resultados.json`);
  if (defects.some(d => ['carga', 'javascript', 'overflow', 'interacción', 'javascript-interacciones'].includes(d.type))) process.exitCode = 1;
}
main().catch(err => { console.error(err); process.exitCode = 1; });
