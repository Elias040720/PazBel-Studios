const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium, firefox, webkit } = require('@playwright/test');
const axePath = require.resolve('axe-core/axe.min.js');

const entry = `file://${path.join(__dirname, '..', 'index.html').replace(/\\/g, '/')}`;
let browser;
test.before(async () => {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {})
  });
});
test.after(async () => browser?.close());

async function open(hash = '#/') {
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, reducedMotion: 'reduce' });
  page.setDefaultTimeout(6000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${entry}${hash}`);
  return { page, errors };
}

test('all portfolio controls work and every project detail route renders', async () => {
  const { page, errors } = await open('#/proyectos');
  await page.locator('#workGrid a[href^="#/proyectos/"]').first().waitFor();
  assert.match(await page.locator('#projectSummary').innerText(), /Mostrando 12 de 23 proyectos/);

  await page.locator('#projectMore').click();
  await page.locator('#projectMore').click();
  assert.match(await page.locator('#projectSummary').innerText(), /Mostrando 23 de 23 proyectos/);
  const routes = await page.locator('#featuredWork a[href^="#/proyectos/"], #workGrid a[href^="#/proyectos/"]').evaluateAll(links => [...new Set(links.map(a => a.getAttribute('href')))]);
  assert.equal(routes.length, 23);

  await page.locator('#filters [data-filter="comercio"]').click();
  assert.match(await page.locator('#projectResults').innerText(), /proyectos encontrados/);
  const commerceCount = (await page.locator('#filters [data-filter="comercio"] .chip__count').innerText()).trim();
  assert.ok((await page.locator('#projectResults').innerText()).startsWith(`${commerceCount} `));
  await page.locator('#filters [data-filter="all"]').click();
  await page.locator('#projectSearch').fill('avila');
  await page.waitForTimeout(160);
  assert.match(await page.locator('#projectResults').innerText(), /^1 proyecto encontrado/);
  await page.locator('#projectSearch').fill('no-existe-xyz');
  await page.waitForTimeout(160);
  await page.locator('#projectEmpty').waitFor({ state: 'visible' });
  await page.locator('#projectEmptyReset').click();
  await page.locator('[data-layout="list"]').click();
  assert.ok(await page.locator('#workGrid').evaluate(el => el.classList.contains('work-grid--list')));
  await page.locator('#projectSort').selectOption('az');
  assert.equal(await page.locator('#featuredWrap').isHidden(), true);

  for (const route of routes) {
    const { page: detail } = await open(route);
    await detail.locator('#pdName').waitFor();
    assert.ok((await detail.locator('#pdName').innerText()).trim().length > 0, route);
    assert.equal(await detail.locator('#view-proyecto').isVisible(), true, route);
    await detail.close();
  }
  assert.deepEqual(errors, []);
  await page.close();
});

test('portfolio images fall back locally when external capture hosts fail', async () => {
  const { page } = await open('#/proyectos');
  await page.route('https://**/*', route => route.abort());
  await page.addInitScript(() => new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node instanceof HTMLImageElement) node.loading = 'eager';
      node.querySelectorAll?.('img').forEach(img => { img.loading = 'eager'; });
    }
  }).observe(document, { childList: true, subtree: true }));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.locator('#projectMore').click();
  await page.locator('#projectMore').click();
  await page.waitForTimeout(1600);
  const images = await page.locator('.portfolio-page img.art__screenshot').evaluateAll(els => els.map(img => ({ src: img.currentSrc, complete: img.complete, width: img.naturalWidth, slug: img.closest('[data-slug]')?.dataset.slug })));
  assert.equal(images.length, 23);
  assert.deepEqual(images.filter(img => !img.complete || img.width === 0), [], 'every project has a loaded local visual fallback');
  await page.close();
});

test('quote options produce honest base estimates and pass the selection into contact', async () => {
  const { page, errors } = await open('#/cotizar');
  const cases = [['landing', '89'], ['corporativo', '499'], ['ecommerce', '1,200'], ['plataforma', '1,890']];
  for (const [value, price] of cases) {
    await page.locator('label.qopt').filter({ has: page.locator(`input[name="qtype"][value="${value}"]`) }).click();
    assert.match(await page.locator('#qAmount').innerText(), new RegExp(price.replace(',', ',?')));
  }
  await page.locator('#qPages').fill('8');
  await page.locator('#qModules label.qopt').filter({ has: page.locator('input[value="cms"]') }).click();
  await page.locator('label.qopt').filter({ has: page.locator('input[name="qtime"][value="fast"]') }).click();
  for (const module of ['motion', 'pago', 'auto', 'multi', 'seo']) {
    await page.locator(`#qModules label.qopt`).filter({ has: page.locator(`input[value="${module}"]`) }).click();
  }
  await page.locator('#qPages').fill('24');
  assert.match(await page.locator('#qAmount').innerText(), /A cotizar/);
  assert.match(await page.locator('#qPagesOut').innerText(), /24 páginas/);
  assert.match(await page.locator('#qBreak').innerText(), /Módulos adicionales\s+6/);
  await page.locator('label.qopt').filter({ has: page.locator('input[name="qtime"][value="relax"]') }).click();
  await page.locator('label.qopt').filter({ has: page.locator('input[name="qtime"][value="normal"]') }).click();
  await page.locator('label.qopt').filter({ has: page.locator('input[name="qtime"][value="fast"]') }).click();
  await page.locator('#qCta').click();
  await page.waitForTimeout(1050);
  assert.equal(await page.locator('#view-contacto').isVisible(), true);
  const message = await page.locator('#cMsg').inputValue();
  assert.match(message, /Software a medida/);
  assert.match(message, /Vistas: 24/);
  assert.match(message, /Gestor de contenido/);
  assert.match(message, /SEO técnico y analítica/);
  assert.match(message, /Prioritario/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('service list and six service detail routes render, including rapid routing and history', async () => {
  const { page, errors } = await open('#/servicios');
  const serviceRoutes = await page.locator('#view-servicios a[href^="#/servicios/"]').evaluateAll(links => [...new Set(links.map(a => a.getAttribute('href')))]);
  assert.equal(serviceRoutes.length, 6);
  for (const route of serviceRoutes) {
    const { page: detail } = await open(route);
    assert.ok((await detail.locator('#srvTitle').innerText()).trim().length > 0, route);
    assert.equal(await detail.locator('#view-servicio').isVisible(), true, route);
    await detail.close();
  }
  await page.goto(`${entry}#/`);
  await page.locator('.nav__links a[href="#/proyectos"]').click();
  await page.waitForTimeout(80);
  await page.locator('.nav__links a[href="#/servicios"]').click();
  await page.waitForTimeout(1500);
  assert.equal(await page.locator('#view-servicios').isVisible(), true, 'rapid navigation settles at the latest route');
  await page.goBack();
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('#view-proyectos').isVisible(), true, 'back returns to previous hash route');
  await page.goForward();
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('#view-servicios').isVisible(), true, 'forward restores next hash route');
  assert.deepEqual(errors, []);
  await page.close();
});

test('contact validates locally and prepares a WhatsApp link without sending', async () => {
  const { page, errors } = await open('#/contacto');
  await page.evaluate(() => {
    window.__openedUrls = [];
    window.open = url => { window.__openedUrls.push(url); return null; };
  });
  await page.getByRole('button', { name: /continuar en whatsapp/i }).click();
  assert.match(await page.locator('#formStatus').innerText(), /Revisa los campos/);
  assert.equal(await page.locator('#cName').getAttribute('aria-invalid'), 'true');
  await page.locator('#cName').fill('Ángela Ñ');
  await page.locator('#cEmail').fill('correo-inválido');
  await page.locator('#cMsg').fill('Hola');
  await page.getByRole('button', { name: /continuar en whatsapp/i }).click();
  assert.equal(await page.locator('#cEmail').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.locator('#cMsg').getAttribute('aria-invalid'), 'true');
  await page.locator('#cEmail').fill('angela@example.com');
  await page.locator('#cCompany').fill('Estudio Norte');
  await page.locator('#cType').selectOption({ label: 'Sitio corporativo' });
  await page.locator('#cMsg').fill('Quisiera conversar sobre un sitio para mi empresa.');
  await page.getByRole('button', { name: /continuar en whatsapp/i }).click();
  const url = await page.evaluate(() => window.__openedUrls[0]);
  assert.match(url, /^https:\/\/wa\.me\/51916666934\?text=/);
  const decoded = decodeURIComponent(new URL(url).searchParams.get('text'));
  assert.match(decoded, /Ángela Ñ/);
  assert.match(decoded, /angela@example\.com/);
  assert.match(await page.locator('#formStatus').innerText(), /Mensaje preparado/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('mobile menu supports Escape, backdrop close, and restores focus', async () => {
  const { page, errors } = await open('#/');
  await page.setViewportSize({ width: 390, height: 844 });
  const burger = page.locator('#burger');
  await burger.click();
  assert.equal(await burger.getAttribute('aria-expanded'), 'true');
  assert.equal(await page.locator('#menu').getAttribute('aria-hidden'), 'false');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('href')), '#/');
  await page.keyboard.press('Escape');
  assert.equal(await burger.getAttribute('aria-expanded'), 'false');
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'burger');
  await burger.click();
  await page.locator('#menu').click({ position: { x: 8, y: 400 } });
  assert.equal(await burger.getAttribute('aria-expanded'), 'false');
  await page.close();
  assert.deepEqual(errors, []);
});

test('responsive layouts fit target widths and primary views have no axe findings', async () => {
  const { page, errors } = await open('#/');
  for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(dimensions.scroll <= dimensions.client, `${width}px horizontal overflow ${dimensions.scroll - dimensions.client}px`);
  }
  await page.setViewportSize({ width: 1440, height: 960 });
  for (const route of ['#/', '#/proyectos', '#/proyectos/avila-parfums', '#/servicios', '#/servicios/diseno-web', '#/estudio', '#/proceso', '#/precios', '#/cotizar', '#/contacto']) {
    await page.goto(`${entry}${route}`);
    const view = await page.locator('.view:not([hidden])').first();
    await view.waitFor();
    await page.waitForTimeout(900);
    if (route === '#/servicios') {
      const toggle = page.locator('#servicesAcc .acc__btn').first();
      const panel = page.locator('#servicesAcc .acc__panel').first();
      await toggle.click();
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
      assert.equal(await panel.evaluate(el => el.inert), false);
      await toggle.click();
      assert.equal(await panel.evaluate(el => el.inert), true);
    }
    await page.addScriptTag({ path: axePath });
    const results = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
    assert.deepEqual(results.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })), [], `${route} axe violations`);
  }
  assert.deepEqual(errors, []);
  await page.close();
});

test('all views fit responsive widths in Chromium, Firefox, and WebKit', async () => {
  const engines = [['Chromium', chromium], ['Firefox', firefox], ['WebKit', webkit]];
  const routes = ['#/', '#/proyectos', '#/proyectos/avila-parfums', '#/servicios', '#/servicios/diseno-web', '#/estudio', '#/proceso', '#/precios', '#/cotizar', '#/contacto'];
  // A 640 CSS-pixel viewport models the layout width of a 1280px desktop at 200% zoom.
  const widths = [320, 360, 375, 390, 430, 640, 768, 1024, 1280, 1440, 1920];
  for (const [name, engine] of engines) {
    const b = await engine.launch({
      headless: true,
      ...(name === 'Chromium' && process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {})
    });
    try {
      for (const route of routes) {
        const page = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
        page.setDefaultTimeout(6000);
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`${entry}${route}`, { waitUntil: 'domcontentloaded' });
        for (const width of widths) {
          await page.setViewportSize({ width, height: 900 });
          const dimensions = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
          assert.ok(dimensions.scroll <= dimensions.client, `${name} ${route} ${width}px: overflow ${dimensions.scroll - dimensions.client}px`);
        }
        assert.deepEqual(errors, [], `${name} ${route} JavaScript errors`);
        await page.close();
      }
    } finally {
      await b.close();
    }
  }
});
