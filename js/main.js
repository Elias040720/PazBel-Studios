(() => {
  'use strict';
  const C = window.PAZBEL;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const money = n => `S/ ${new Intl.NumberFormat('es-PE').format(n)}`;
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let selectedIndustry = 'restaurante';
  let lastContact = null;
  const dialog = $('#contact-dialog');
  function whatsappUrl(message) {
    const number = C.whatsapp.replace(/[\s+()-]/g, '');
    return /^[1-9]\d{7,14}$/.test(number) ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
  }
  function contact(message) {
    const full = `Hola, equipo de ${C.brand}. ${message}`;
    const url = whatsappUrl(full);
    if (url) { window.open(url, '_blank', 'noopener,noreferrer'); return; }
    lastContact = document.activeElement;
    $('#contact-message').value = full;
    $('#copy-status').textContent = '';
    dialog.showModal();
  }
  document.addEventListener('click', e => {
    const target = e.target.closest('[data-contact]');
    if (target) contact(target.dataset.contact);
  });
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => lastContact?.focus());
  $('#copy-message').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText($('#contact-message').value); $('#copy-status').textContent = 'Mensaje copiado.'; }
    catch { $('#contact-message').select(); $('#copy-status').textContent = 'Selecciona y copia el mensaje con el menú de tu dispositivo.'; }
  });

  $('#plan-list').innerHTML = C.plans.map((p,i) => `<article class="plan ${i === 1 ? 'featured' : ''}"><span class="plan-tag">${escape(p.tag)}</span><h3>${escape(p.name)}</h3><div class="amount">${p.from ? '<small>Desde </small>' : ''}${money(p.price)}</div><span class="price-label">${escape(p.label)}</span><ul>${p.features.map(x=>`<li>${escape(x)}</li>`).join('')}</ul><p class="caption">${escape(p.note)}</p><button class="button" data-plan="${p.id}">Elegir ${escape(p.name)} <span>↗</span></button></article>`).join('');
  $$('[data-plan]').forEach(b => b.addEventListener('click', () => { const p=C.plans.find(p=>p.id===b.dataset.plan); contact(`Me interesa ${p.name} (${p.from?'desde ':''}${money(p.price)}). Quisiera conocer el alcance y empezar mi proyecto.`); }));
  $('#price-note').textContent = `${C.commercial.exclusions} ${C.commercial.tax}`;
  $('#subscription-list').innerHTML = C.subscriptions.slice(1).map(p => `<article class="subscription"><h3>${escape(p.name)}</h3><div class="amount">${money(p.price)} <small>/ mes</small></div><ul>${p.features.map(x=>`<li>${escape(x)}</li>`).join('')}</ul><button class="text-button" data-subscription="${p.id}">Consultar ${escape(p.name)} ↗</button></article>`).join('');
  $$('[data-subscription]').forEach(b=>b.addEventListener('click',()=>{const p=C.subscriptions.find(p=>p.id===b.dataset.subscription);contact(`Quiero consultar por ${p.name} de ${money(p.price)} mensuales y conocer el alcance del acompañamiento.`);}));

  const car = `<svg class="car-art" viewBox="0 0 400 120" fill="none" aria-hidden="true"><path d="M20 82L38 58L108 48L157 17H269L319 48L371 61L382 90H18Z" fill="#4e4e50" stroke="#a6a7aa" stroke-width="2"/><path d="M120 46L164 24H259L299 46Z" fill="#161c23" stroke="#c7cad0"/><path d="M210 24V47M35 67H90M320 61H365" stroke="#e4d9d3" stroke-width="4"/><circle cx="93" cy="88" r="25" fill="#151515" stroke="#808080" stroke-width="5"/><circle cx="310" cy="88" r="25" fill="#151515" stroke="#808080" stroke-width="5"/><circle cx="93" cy="88" r="10" stroke="#bebebe" stroke-width="3"/><circle cx="310" cy="88" r="10" stroke="#bebebe" stroke-width="3"/></svg>`;
  const previews = {
    mova: `<div class="mock mova-mock"><div class="mock-nav">mova<span>APRENDE &nbsp; ENSEÑA &nbsp; CONECTA</span></div><div class="mova-content"><div><span class="micro" style="color:#647c58">APRENDER NOS ACERCA</span><h4>Un mundo de<br>posibilidades,<br>a una clase.</h4><span class="mock-chip">Encuentra tu próxima clase ↗</span></div><div class="lesson"><div class="abstract-person"></div><span>Tu espacio para aprender</span><span class="mock-chip">Familias + docentes</span></div></div><div class="mock-cards"><span>Explorar docentes</span><span>Organizar clases</span><span>Seguir aprendiendo</span></div></div>`,
    chambi: `<div class="mock chambi-mock"><div class="mock-nav">CHAMBI MOTORS<span>SERVICIOS &nbsp; CONTACTO</span></div><h4>Tu próximo<br>camino.<br><em>Empieza aquí.</em></h4><span class="mock-chip">Conoce nuestros servicios ↗</span>${car}</div>`,
    carwash: `<div class="mock carwash-mock"><div class="mock-nav">CARWASHALITA<span>VISTA DE OPERACIONES</span></div><h4 style="font:500 23px var(--display);margin:15px 0">Todo en su lugar.</h4><div class="mock-statuses"><span><b>01</b>Recibir</span><span><b>02</b>Atender</span><span><b>03</b>Completar</span></div><table class="mock-table"><caption class="caption">Flujo ilustrativo de atención</caption><tbody><tr><td>Servicio A</td><td>Lavado exterior</td><td>En atención</td></tr><tr><td>Servicio B</td><td>Limpieza interior</td><td>Pendiente</td></tr><tr><td>Servicio C</td><td>Lavado completo</td><td>Completado</td></tr></tbody></table></div>`
  };
  $('#project-list').innerHTML = C.projects.map((p,i)=>`<article class="project ${p.id}" aria-labelledby="project-${p.id}"><div class="project-preview">${previews[p.id] || ''}</div><div class="project-info"><span class="micro">0${i+1} / ${escape(p.type)}</span><h3 id="project-${p.id}">${escape(p.name)}</h3><h4>${escape(p.title)}</h4><p>${escape(p.description)}</p><span class="project-stack">${escape(p.stack)}</span><span class="project-status">${escape(p.status)}</span><button class="text-button" data-project="${p.id}">${escape(p.cta)} ↗</button></div></article>`).join('');
  $$('[data-project]').forEach(b=>b.addEventListener('click',()=>{const p=C.projects.find(p=>p.id===b.dataset.project);contact(`Vi el proyecto ${p.name} en su portafolio. ${p.cta}. Quisiera conocer opciones y alcance.`);}));

  const industries = {
    restaurante:{label:'Restaurante',brand:'mesa & origen',nav:'LA CARTA · NUESTRA COCINA',title:'El gusto de<br>volver a la mesa.',text:'Ingredientes con historia. Momentos para compartir.',cta:'Descubre nuestra carta',shape:'◒',foot:'COCINA DE TEMPORADA / HECHA CON CALMA'},
    taller:{label:'Taller automotriz',brand:'MOTOR / STUDIO',nav:'SERVICIOS · EL TALLER',title:'Tu camino.<br>En buenas manos.',text:'Cuidado automotriz con atención al detalle.',cta:'Conoce los servicios',shape:'✳',foot:'PRECISIÓN EN CADA DETALLE / TU TALLER'},
    moda:{label:'Tienda de ropa',brand:'FORMA',nav:'COLECCIÓN · NUEVO',title:'Viste lo<br>que eres.',text:'Piezas con personalidad para tu día a día.',cta:'Explora la colección',shape:'f',foot:'TU ESTILO / TU PROPIA FORMA'},
    profesional:{label:'Servicios profesionales',brand:'NEXO / consultores',nav:'EXPERIENCIA · CONTACTO',title:'Claridad para<br>dar el siguiente paso.',text:'Soluciones pensadas alrededor de tu negocio.',cta:'Conoce nuestra propuesta',shape:'↗',foot:'ESTRATEGIA / CONVERSACIONES QUE IMPORTAN'}
  };
  function showIndustry(id){
    selectedIndustry=id; const d=industries[id]; const preview=$('#industry-preview');preview.dataset.theme=id;
    preview.innerHTML=`<div class="industry-nav">${d.brand}<span>${d.nav}</span></div><div class="industry-content"><div><h3>${d.title}</h3><p>${d.text}</p><span class="industry-cta">${d.cta} ↗</span></div><div class="industry-shape" aria-hidden="true">${d.shape}</div></div><div class="industry-caption">${d.foot}</div>`;
    $$('[data-industry]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.industry===id)));
  }
  $$('[data-industry]').forEach(b=>b.addEventListener('click',()=>showIndustry(b.dataset.industry)));
  showIndustry(selectedIndustry);
  $('#demo-contact').addEventListener('click',()=>contact(`Probé su demo para el rubro ${industries[selectedIndustry].label}. Quiero una web personalizada para mi negocio.`));

  function radio(p,name,checked){return `<label class="radio-option"><input type="radio" name="${name}" value="${p.id}" ${checked?'checked':''}><span><strong>${escape(p.name)}</strong><small>${p.from?'Desde ':''}${money(p.price)}${name==='subscription'&&p.price?' / mes':''}</small></span></label>`;}
  $('#project-options').innerHTML=C.plans.map((p,i)=>radio(p,'project',i===0)).join('');
  $('#subscription-options').innerHTML=C.subscriptions.map((p,i)=>radio(p,'subscription',i===0)).join('');
  function selection(){return {plan:C.plans.find(p=>p.id===$('input[name="project"]:checked').value),subscription:C.subscriptions.find(p=>p.id===$('input[name="subscription"]:checked').value)};}
  function updateQuote(){const {plan:p,subscription:s}=selection();$('#quote-output').innerHTML=`<h3>${escape(p.name)}</h3><p class="caption">${escape(s.name)}</p><div class="quote-amount"><span>Desarrollo inicial${p.from?' · desde':''}</span><strong>${money(p.price)}</strong></div><div class="quote-amount"><span>Mensualidad opcional</span><strong>${money(s.price)}<small style="font-size:12px"> / mes</small></strong></div><p class="caption quote-exclusions">${escape(p.note)} ${escape(C.commercial.exclusions)} ${escape(C.commercial.tax)}</p>`;}
  $('#quote-form').addEventListener('change',updateQuote);$('#quote-form').addEventListener('submit',e=>e.preventDefault());updateQuote();
  $('#quote-contact').addEventListener('click',()=>{const {plan:p,subscription:s}=selection();contact(`Estoy interesado en ${p.name} (${p.from?'desde ':''}${money(p.price)} de desarrollo inicial) ${s.price?`y ${s.name} (${money(s.price)} al mes)`:'sin suscripción mensual'}. ${p.from?'Entiendo que el importe es referencial y requiere cotización personalizada. ':''}Me gustaría conocer los siguientes pasos y solicitar una cotización. El alcance, IGV y servicios adicionales están sujetos a confirmación.`);});

  const faq=[
    ['¿Cuánto cuesta una página web profesional?',`Nuestra Landing Page Pro tiene un precio de lanzamiento de ${money(C.plans[0].price)}. La Web Corporativa cuesta ${money(C.plans[1].price)} y el E-commerce base ${money(C.plans[2].price)}. El alcance final se acuerda antes de contratar. ${C.commercial.tax}`],
    ['¿Puedo empezar con una landing y ampliar después?','Sí. Podemos planificar una primera etapa y cotizar nuevas secciones o funcionalidades cuando las necesites. La ampliación tiene su propio alcance.'],
    ['¿La página funcionará en mi celular?','Sí. Diseñamos y comprobamos la adaptación a celulares, tablets y escritorio, incluyendo navegación, textos y botones.'],
    ['¿El desarrollo incluye dominio y hosting?','No se consideran incluidos en el desarrollo base salvo acuerdo expreso. El plan de Mantenimiento & Velocidad contempla hosting según las condiciones contratadas. Dominio y renovaciones deben confirmarse.'],
    ['¿Puedo administrar el contenido?','Depende del plan y del alcance. Definimos contigo qué contenido necesitas modificar y si hace falta un panel de administración. No todos los proyectos incluyen uno.'],
    ['¿Qué diferencia hay entre desarrollo y mantenimiento?','El desarrollo construye la solución inicial. El mantenimiento es un servicio mensual opcional para respaldos, soporte y actualizaciones dentro de los límites contratados.'],
    ['¿El marketing incluye el presupuesto publicitario?','No. La gestión de campañas y las piezas incluidas corresponden al servicio. El dinero invertido en Meta Ads o Google Ads se paga por separado.'],
    ['¿Puedo solicitar un sistema personalizado?',`Sí. Desarrollamos soluciones para reservas, administración, inventarios o plataformas. El punto de partida es desde ${money(C.plans[3].price)}; el precio final requiere evaluar el proyecto.`]
  ];
  $('#faq-list').innerHTML=faq.map(([q,a])=>`<details><summary>${escape(q)}</summary><p>${escape(a)}</p></details>`).join('');
  $('#year').textContent=new Date().getFullYear();
  $('#social-links').innerHTML=C.socials.length?C.socials.filter(s=>/^https:\/\//.test(s.url)).map(s=>`<a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.name)} ↗</a>`).join(''):'<p class="caption">Redes oficiales por confirmar.</p>';
  const menu=$('.menu-toggle'),nav=$('#navigation');
  function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
  $$('a',nav).forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
  document.addEventListener('click',e=>{if(!$('.header').contains(e.target))closeMenu();});
  matchMedia('(min-width:801px)').addEventListener('change',closeMenu);
  window.addEventListener('scroll',()=>$('.header').classList.toggle('scrolled',window.scrollY>40),{passive:true});
  const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){$$('a',nav).forEach(a=>{const active=a.hash===`#${e.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px',threshold:0});
  $$('main section[id]').filter(s=>$$('a',nav).some(a=>a.hash===`#${s.id}`)).forEach(s=>sectionObserver.observe(s));
  const labels=['01 — DISEÑO CON INTENCIÓN','02 — FUNCIONES CONECTADAS','03 — CRECIMIENTO CONTINUO'];
  function stage(i){$('.story-visual').dataset.stage=String(i);$('#chapter-label').textContent=labels[i];}
  const chapterObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting && !(window.gsap && window.ScrollTrigger && matchMedia('(min-width:801px)').matches && !reduced.matches))stage(Number(e.target.dataset.stage));});},{rootMargin:'-20% 0px -40% 0px'});
  $$('.chapter').forEach(el=>chapterObserver.observe(el));
  if(window.gsap&&window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    const mm=gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      gsap.from('.hero h1',{y:28,opacity:0,duration:.9,ease:'power3.out',clearProps:'all'});
      gsap.from('.hero-window',{y:45,opacity:0,duration:1.2,delay:.15,ease:'power3.out',clearProps:'opacity'});
      gsap.from('.floating-label',{y:18,opacity:0,duration:.7,delay:.4,clearProps:'opacity'});
    });
    mm.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)',()=>{
      gsap.to('.ribbon',{rotation:-5,y:50,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
      gsap.to('.story-blocks span',{y:(i)=>i*10,rotation:(i)=>i*3,stagger:.1,scrollTrigger:{trigger:'.chapters',start:'top 50%',end:'bottom 70%',scrub:1}});
      $$('.chapter').forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 55%',end:'bottom 55%',onEnter:()=>stage(i),onEnterBack:()=>stage(i),onUpdate:self=>{if(self.isActive)stage(i)}}));
      $$('.project').slice(0,-1).forEach(el=>gsap.to(el.querySelector('.mock'),{rotationY:-4,scale:.94,scrollTrigger:{trigger:el,start:'top 40%',end:'bottom top',scrub:true}}));
    });
  }
  document.fonts.ready.then(()=>window.ScrollTrigger?.refresh());
  const art=$('.hero-art');
  art.addEventListener('pointermove',e=>{if(reduced.matches||!matchMedia('(hover:hover) and (min-width:801px)').matches)return;const r=art.getBoundingClientRect();gsapSafeTilt((e.clientX-r.left)/r.width-.5,(e.clientY-r.top)/r.height-.5);});
  function gsapSafeTilt(x,y){art.style.setProperty('--tilt-x',`${x}`);$('.hero-window').style.transform=`rotateY(${-10+x*5}deg) rotateX(${6-y*4}deg) rotateZ(-7deg)`;}
  art.addEventListener('pointerleave',()=>{$('.hero-window').style.transform='';});
  // Small public diagnostic surface, also useful when integrating the static page.
  window.PazbelApp={whatsappUrl,selection,money};
})();

