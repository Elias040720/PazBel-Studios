
/* ============================================================
   PAZBEL STUDIOS — app.js
   Vanilla JS. Sin dependencias externas.
   ============================================================ */
(function(){
  'use strict';

  const $  = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.prototype.slice.call(c.querySelectorAll(s));
  const clamp = (v,a,b) => Math.min(b, Math.max(a,v));
  const lerp = (a,b,t) => a + (b-a)*t;

  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = reduceMQ.matches;
  let motionOn = !reduced;

  const body = document.body;
  const navEl = $('#nav');
  const veil = $('#veil');

  /* ============================================================
     DATA
     ============================================================ */
  const PROJECTS = [
    {
        "slug": "avila-parfums",
        "name": "Ávila Parfums",
        "tag": "Perfumería · Catálogo",
        "cat": "belleza",
        "art": "avila",
        "tagline": "Una presencia de marca para descubrir perfumes y decants.",
        "image": "assets/portfolio/avilaparfums.webp",
        "href": "https://www.avilaparfums.com",
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Identidad de marca y catálogo de fragancias con una presentación cuidada.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Identidad de marca y catálogo de fragancias con una presentación cuidada.",
        "solution2": "Descripción de referencia para explorar la propuesta; las características y los resultados finales se deben verificar con la documentación del proyecto.",
        "features": [
            "Perfumería · Catálogo",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "imageKind": "local",
        "imageLabel": "Captura de proyecto",
        "fallbackImage": "assets/portfolio/avilaparfums.webp"
    },
    {
        "slug": "dual-ingenieria",
        "name": "Dual Ingeniería",
        "tag": "Web corporativa · Ingeniería",
        "cat": "corporativo",
        "art": "dual",
        "tagline": "Una identidad clara para soluciones de ingeniería.",
        "image": "assets/portfolio/dual-ingenieria.webp",
        "href": "https://www.dualingenieria.pe/",
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Presentación digital corporativa para explicar servicios y facilitar solicitudes de cotización.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Presentación digital corporativa para explicar servicios y facilitar solicitudes de cotización.",
        "solution2": "Descripción de referencia para explorar la propuesta; las características y los resultados finales se deben verificar con la documentación del proyecto.",
        "features": [
            "Servicios · Cotización",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "imageKind": "local",
        "imageLabel": "Captura de proyecto",
        "fallbackImage": "assets/portfolio/dual-ingenieria.webp"
    },
    {
        "slug": "mova",
        "name": "MOVA",
        "tag": "Educación · Plataforma",
        "cat": "software",
        "art": "mova",
        "tagline": "Conectando docentes y familias.",
        "image": "assets/portfolio/capturas/mova.png",
        "href": "https://movaeduca.me/",
        "origin": "Caso del sitio PazBel",
        "year": "Portafolio",
        "role": "Caso del sitio PazBel",
        "context": "Plataforma educativa orientada a clases, agendamiento y seguimiento entre familias y docentes.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Plataforma educativa orientada a clases, agendamiento y seguimiento entre familias y docentes.",
        "solution2": "Descripción de referencia para explorar la propuesta; las características y los resultados finales se deben verificar con la documentación del proyecto.",
        "features": [
            "Educación · Gestión",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "previewRemote": "https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/mova.png",
        "fallbackImage": "assets/portfolio/conceptos/mova.webp",
        "imageKind": "archive",
        "imageLabel": "Captura archivada · Portafolio"
    },
    {
        "slug": "chambi-motors",
        "name": "Chambi Motors",
        "tag": "Automotriz · Gestión",
        "cat": "automotriz",
        "art": "chambi",
        "tagline": "El taller conectado con cada cliente.",
        "image": "assets/portfolio/conceptos/chambi-motors.webp",
        "href": null,
        "origin": "Caso del sitio PazBel",
        "year": "Portafolio",
        "role": "Caso del sitio PazBel",
        "context": "Experiencia digital para consultar avances, fotografías y estados del vehículo en el taller.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Experiencia digital para consultar avances, fotografías y estados del vehículo en el taller.",
        "solution2": "Visual de presentación conceptual; no se dispone aquí de una captura pública verificada del producto.",
        "features": [
            "Automotriz · Seguimiento",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "imageKind": "concept",
        "imageLabel": "Visual conceptual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/chambi-motors.webp"
    },
    {
        "slug": "cruzial-parfums",
        "name": "Cruzial Parfums",
        "tag": "E-commerce · Perfumes",
        "cat": "belleza",
        "art": "cruzial",
        "tagline": "El catálogo de fragancias, a tu ritmo.",
        "image": "assets/portfolio/capturas/cruzial-parfums.png",
        "href": "https://cruzial.pe",
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Comercio electrónico especializado en perfumes, decants, imágenes y gestión de catálogo.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Comercio electrónico especializado en perfumes, decants, imágenes y gestión de catálogo.",
        "solution2": "Descripción de referencia para explorar la propuesta; las características y los resultados finales se deben verificar con la documentación del proyecto.",
        "features": [
            "Catálogo · E-commerce",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "previewRemote": "https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/cruzial.png",
        "fallbackImage": "assets/portfolio/conceptos/cruzial-parfums.webp",
        "imageKind": "archive",
        "imageLabel": "Captura archivada · Portafolio"
    },
    {
        "slug": "talentlens",
        "name": "TalentLens · SmartRH AI",
        "tag": "RR. HH. · IA",
        "cat": "software",
        "art": "talent",
        "tagline": "Talento y decisiones en una misma pantalla.",
        "image": "assets/portfolio/capturas/talentlens.png",
        "href": "https://talentlens-nu.vercel.app",
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Herramientas de reclutamiento con análisis de CV y gestión visual del pipeline.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Herramientas de reclutamiento con análisis de CV y gestión visual del pipeline.",
        "solution2": "Descripción de referencia para explorar la propuesta; las características y los resultados finales se deben verificar con la documentación del proyecto.",
        "features": [
            "Reclutamiento · IA",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "previewRemote": "https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/talentlens.png",
        "fallbackImage": "assets/portfolio/conceptos/talentlens.webp",
        "imageKind": "archive",
        "imageLabel": "Captura archivada · Portafolio"
    },
    {
        "slug": "carwash-alita",
        "name": "CarWashAlita",
        "tag": "Automotriz · Operaciones",
        "cat": "automotriz",
        "art": "alita",
        "tagline": "Operaciones más claras, servicio más fluido.",
        "image": "assets/portfolio/conceptos/carwash-alita.webp",
        "href": null,
        "origin": "Caso del sitio PazBel",
        "year": "Portafolio",
        "role": "Caso del sitio PazBel",
        "context": "Concepto de operación y control digital para servicios de lavado automotriz.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Concepto de operación y control digital para servicios de lavado automotriz.",
        "solution2": "Visual de presentación conceptual; no se dispone aquí de una captura pública verificada del producto.",
        "features": [
            "Automotriz · Operaciones",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "imageKind": "concept",
        "imageLabel": "Visual conceptual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/carwash-alita.webp"
    },
    {
        "slug": "murex",
        "name": "Gimnasio Murex",
        "tag": "Fitness · Gestión",
        "cat": "software",
        "art": "murex",
        "tagline": "Una experiencia pensada para el movimiento.",
        "image": "assets/portfolio/capturas/murex.png",
        "href": "https://gimnasio-murex.vercel.app",
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Web pública presentada en el portafolio como Gimnasio Lima; figura en el listado de PazBel como Gimnasio Murex. Confirmar denominación comercial antes de publicar.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Sistema de gestión de membresías, reservas y asistencia.",
        "solution2": "Se utiliza el material archivado del portafolio personal. La imagen del sitio lleva el nombre Gimnasio Lima, no Murex.",
        "features": [
            "Fitness · Membresías",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "previewRemote": "https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/gym.png",
        "fallbackImage": "assets/portfolio/conceptos/murex.webp",
        "imageKind": "archive",
        "imageLabel": "Captura archivada · Gimnasio Lima (denominación por confirmar)"
    },
    {
        "slug": "jna-fragance",
        "name": "JNA Fragance",
        "tag": "Perfumería · Comercio",
        "cat": "belleza",
        "art": "jna",
        "tagline": "Explorar y elegir una fragancia, sin fricción.",
        "image": "assets/portfolio/capturas/jna-fragance.png",
        "href": "https://jnafragance.com/",
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Catálogo de fragancias y decants con carrito y pedidos por WhatsApp.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Catálogo de fragancias y decants con carrito y pedidos por WhatsApp.",
        "solution2": "Descripción de referencia para explorar la propuesta; las características y los resultados finales se deben verificar con la documentación del proyecto.",
        "features": [
            "Catálogo · WhatsApp",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "previewRemote": "https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/jna.png",
        "fallbackImage": "assets/portfolio/conceptos/jna-fragance.webp",
        "imageKind": "archive",
        "imageLabel": "Captura archivada · Portafolio"
    },
    {
        "slug": "elixia-parfum",
        "name": "Elixia Parfum",
        "tag": "Perfumería · Comercio",
        "cat": "belleza",
        "art": "elixia",
        "tagline": "Fragancias presentadas con carácter.",
        "image": "assets/portfolio/capturas/elixia-parfum.png",
        "href": "https://elixiaparfum.com",
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Tienda de decants de autor con carrito y un flujo de consulta por WhatsApp.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Tienda de decants de autor con carrito y un flujo de consulta por WhatsApp.",
        "solution2": "Descripción de referencia para explorar la propuesta; las características y los resultados finales se deben verificar con la documentación del proyecto.",
        "features": [
            "Decants · Comercio",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "previewRemote": "https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/elixia.png",
        "fallbackImage": "assets/portfolio/conceptos/elixia-parfum.webp",
        "imageKind": "archive",
        "imageLabel": "Captura archivada · Portafolio"
    },
    {
        "slug": "dpp-control",
        "name": "DPP Control",
        "tag": "Gestión · Dashboard",
        "cat": "software",
        "art": "dpp",
        "tagline": "Una visión más clara de cada operación.",
        "image": "assets/portfolio/capturas/dpp-control.png",
        "href": "https://dpp-pink.vercel.app/login",
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Panel operativo para indicadores, caja, órdenes y reportes.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Panel operativo para indicadores, caja, órdenes y reportes.",
        "solution2": "El enlace público conduce al acceso del sistema. La imagen local es conceptual hasta obtener una captura auténtica autorizada de una vista pública.",
        "features": [
            "Operaciones · Indicadores",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "imageKind": "optional-live",
        "imageLabel": "Vista pública del acceso",
        "fallbackImage": "assets/portfolio/conceptos/dpp-control.webp"
    },
    {
        "slug": "paco-fragance",
        "name": "Paco Fragance",
        "tag": "Perfumería · Catálogo",
        "cat": "belleza",
        "art": "paco",
        "tagline": "Una forma distinta de descubrir perfumes.",
        "image": "assets/portfolio/conceptos/paco-fragance.webp",
        "href": null,
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Exploración de decants y guía interactiva de recomendaciones.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Exploración de decants y guía interactiva de recomendaciones.",
        "solution2": "Visual de presentación conceptual; no se dispone aquí de una captura pública verificada del producto.",
        "features": [
            "Catálogo · Recomendador",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "imageKind": "concept",
        "imageLabel": "Visual conceptual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/paco-fragance.webp"
    },
    {
        "slug": "fragance-obsession",
        "name": "Fragance Obsession",
        "tag": "Perfumería · Catálogo",
        "cat": "belleza",
        "art": "obsession",
        "tagline": "Una colección para descubrir sin prisa.",
        "image": "assets/portfolio/capturas/fragance-obsession.svg",
        "href": "https://www.fraganceobession.com/",
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Catálogo especializado en perfumes completos y decants.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Catálogo especializado en perfumes completos y decants.",
        "solution2": "Descripción de referencia para explorar la propuesta; las características y los resultados finales se deben verificar con la documentación del proyecto.",
        "features": [
            "Catálogo · Decants",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "previewRemote": "https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/fragance.svg",
        "fallbackImage": "assets/portfolio/conceptos/fragance-obsession.webp",
        "imageKind": "archive",
        "imageLabel": "Captura archivada · Portafolio"
    },
    {
        "slug": "goccta",
        "name": "Goccta",
        "tag": "Marca · Web",
        "cat": "corporativo",
        "art": "goccta",
        "tagline": "Identidad digital con propósito.",
        "image": "assets/portfolio/capturas/goccta.png",
        "href": "https://www.gocctaperu.com/",
        "origin": "Proyecto de integrante / referencia",
        "year": "Portafolio",
        "role": "Proyecto de integrante / referencia",
        "context": "Identidad y presencia digital para una propuesta de marca.",
        "challenge": "Comprender la necesidad del usuario y definir un flujo digital claro, acorde al alcance de este proyecto.",
        "solution": "Identidad y presencia digital para una propuesta de marca.",
        "solution2": "Descripción de referencia para explorar la propuesta; las características y los resultados finales se deben verificar con la documentación del proyecto.",
        "features": [
            "Identidad · Web",
            "Diseño orientado a la experiencia",
            "Alcance detallado sujeto a verificación"
        ],
        "stack": [
            "Información técnica por verificar"
        ],
        "previewRemote": "https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/goccta.png",
        "fallbackImage": "assets/portfolio/conceptos/goccta.webp",
        "imageKind": "archive",
        "imageLabel": "Captura archivada · Portafolio"
    },
    {
        "slug": "hoppercode",
        "name": "HopperCode",
        "tag": "Estudio de software",
        "cat": "corporativo",
        "art": "hopper",
        "tagline": "Una web para presentar servicios y soluciones de desarrollo.",
        "image": "assets/portfolio/capturas/hoppercode.png",
        "href": "https://hoppercode.vercel.app/",
        "origin": "Referencia del archivo de trabajos",
        "year": "Archivo",
        "role": "Referencia de proyecto · autoría comercial por confirmar",
        "context": "Sitio comercial del estudio de software, listado en el archivo del portafolio.",
        "challenge": "Se documenta como referencia del archivo de proyectos; el reto y el alcance originales están pendientes de confirmar.",
        "solution": "Sitio y propuesta comercial de un estudio de software.",
        "solution2": "Visual editorial conceptual: no es una captura del sistema ni demuestra que esté publicado.",
        "features": [
            "Estudio de software",
            "Experiencia o flujo por documentar",
            "Resultados y atribución sujetos a verificación"
        ],
        "stack": [
            "Tecnologías por documentar"
        ],
        "imageKind": "optional-live",
        "imageLabel": "Concepto visual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/hoppercode.webp"
    },
    {
        "slug": "dra-blue",
        "name": "Dra. Blue",
        "tag": "Odontología · Experiencia web",
        "cat": "salud",
        "art": "blue",
        "tagline": "Una experiencia digital centrada en la consulta odontológica.",
        "image": "assets/portfolio/capturas/dra-blue.png",
        "href": "https://dentista-three-mu.vercel.app/",
        "origin": "Referencia del archivo de trabajos",
        "year": "Archivo",
        "role": "Referencia de proyecto · autoría comercial por confirmar",
        "context": "Sitio de odontología estética registrado en el portafolio.",
        "challenge": "Se documenta como referencia del archivo de proyectos; el reto y el alcance originales están pendientes de confirmar.",
        "solution": "Presentación web orientada a pacientes y servicios odontológicos.",
        "solution2": "Visual editorial conceptual: no es una captura del sistema ni demuestra que esté publicado.",
        "features": [
            "Odontología · Experiencia web",
            "Experiencia o flujo por documentar",
            "Resultados y atribución sujetos a verificación"
        ],
        "stack": [
            "Tecnologías por documentar"
        ],
        "imageKind": "optional-live",
        "imageLabel": "Concepto visual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/dra-blue.webp"
    },
    {
        "slug": "libreria-yarin",
        "name": "Librería Yarin",
        "tag": "Comercio · Operaciones",
        "cat": "software",
        "art": "yarin",
        "tagline": "Una referencia de gestión comercial para librería.",
        "image": "assets/portfolio/conceptos/libreria-yarin.webp",
        "href": null,
        "origin": "Referencia del archivo de trabajos",
        "year": "Archivo",
        "role": "Referencia de proyecto · autoría comercial por confirmar",
        "context": "Proyecto de operación de librería incluido en el archivo del portafolio.",
        "challenge": "Se documenta como referencia del archivo de proyectos; el reto y el alcance originales están pendientes de confirmar.",
        "solution": "Flujos comerciales; información funcional y estado por documentar.",
        "solution2": "Visual editorial conceptual: no es una captura del sistema ni demuestra que esté publicado.",
        "features": [
            "Comercio · Operaciones",
            "Experiencia o flujo por documentar",
            "Resultados y atribución sujetos a verificación"
        ],
        "stack": [
            "Tecnologías por documentar"
        ],
        "imageKind": "concept",
        "imageLabel": "Concepto visual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/libreria-yarin.webp"
    },
    {
        "slug": "goccta-studio",
        "name": "GOCCTA Studio",
        "tag": "Herramienta interna · Contenidos",
        "cat": "software",
        "art": "gocctastudio",
        "tagline": "Gestión de contenido detrás de una marca.",
        "image": "assets/portfolio/conceptos/goccta-studio.webp",
        "href": null,
        "origin": "Referencia del archivo de trabajos",
        "year": "Archivo",
        "role": "Referencia de proyecto · autoría comercial por confirmar",
        "context": "Herramienta editorial interna asociada al proyecto GOCCTA.",
        "challenge": "Se documenta como referencia del archivo de proyectos; el reto y el alcance originales están pendientes de confirmar.",
        "solution": "Herramienta interna de contenidos; sin demo pública autorizada.",
        "solution2": "Visual editorial conceptual: no es una captura del sistema ni demuestra que esté publicado.",
        "features": [
            "Herramienta interna · Contenidos",
            "Experiencia o flujo por documentar",
            "Resultados y atribución sujetos a verificación"
        ],
        "stack": [
            "Tecnologías por documentar"
        ],
        "imageKind": "concept",
        "imageLabel": "Concepto visual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/goccta-studio.webp"
    },
    {
        "slug": "intranet-zephyra",
        "name": "Intranet Zephyra",
        "tag": "Intranet · Empresas",
        "cat": "software",
        "art": "zephyra",
        "tagline": "Comunicación y acceso a herramientas de trabajo.",
        "image": "assets/portfolio/conceptos/intranet-zephyra.webp",
        "href": null,
        "origin": "Referencia del archivo de trabajos",
        "year": "Archivo",
        "role": "Referencia de proyecto · autoría comercial por confirmar",
        "context": "Proyecto de intranet empresarial del archivo del portafolio.",
        "challenge": "Se documenta como referencia del archivo de proyectos; el reto y el alcance originales están pendientes de confirmar.",
        "solution": "Proyecto interno vinculado a tecnología Java; acceso restringido.",
        "solution2": "Visual editorial conceptual: no es una captura del sistema ni demuestra que esté publicado.",
        "features": [
            "Intranet · Empresas",
            "Experiencia o flujo por documentar",
            "Resultados y atribución sujetos a verificación"
        ],
        "stack": [
            "Tecnologías por documentar"
        ],
        "imageKind": "concept",
        "imageLabel": "Concepto visual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/intranet-zephyra.webp"
    },
    {
        "slug": "lotus",
        "name": "Lotus",
        "tag": "Experiencia web · Experimental",
        "cat": "experiencias",
        "art": "lotus",
        "tagline": "Exploración visual y desarrollo de una experiencia web.",
        "image": "assets/portfolio/conceptos/lotus.webp",
        "href": null,
        "origin": "Referencia del archivo de trabajos",
        "year": "Archivo",
        "role": "Referencia de proyecto · autoría comercial por confirmar",
        "context": "Proyecto web experimental identificado en los trabajos del portafolio.",
        "challenge": "Se documenta como referencia del archivo de proyectos; el reto y el alcance originales están pendientes de confirmar.",
        "solution": "Exploración de experiencia web; falta un enlace público verificable.",
        "solution2": "Visual editorial conceptual: no es una captura del sistema ni demuestra que esté publicado.",
        "features": [
            "Experiencia web · Experimental",
            "Experiencia o flujo por documentar",
            "Resultados y atribución sujetos a verificación"
        ],
        "stack": [
            "Tecnologías por documentar"
        ],
        "imageKind": "concept",
        "imageLabel": "Concepto visual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/lotus.webp"
    },
    {
        "slug": "pasteleria",
        "name": "Pastelería",
        "tag": "Comercio local · Concepto",
        "cat": "comercio",
        "art": "pasteleria",
        "tagline": "Una presencia digital pensada para el comercio local.",
        "image": "assets/portfolio/conceptos/pasteleria.webp",
        "href": null,
        "origin": "Referencia del archivo de trabajos",
        "year": "Archivo",
        "role": "Referencia de proyecto · autoría comercial por confirmar",
        "context": "Propuesta de web para productos de pastelería que figura en el archivo.",
        "challenge": "Se documenta como referencia del archivo de proyectos; el reto y el alcance originales están pendientes de confirmar.",
        "solution": "Propuesta conceptual; sin evidencia de una versión pública vigente.",
        "solution2": "Visual editorial conceptual: no es una captura del sistema ni demuestra que esté publicado.",
        "features": [
            "Comercio local · Concepto",
            "Experiencia o flujo por documentar",
            "Resultados y atribución sujetos a verificación"
        ],
        "stack": [
            "Tecnologías por documentar"
        ],
        "imageKind": "concept",
        "imageLabel": "Concepto visual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/pasteleria.webp"
    },
    {
        "slug": "lee-ach",
        "name": "LEE-ACH",
        "tag": "Perfumería · Tienda digital",
        "cat": "belleza",
        "art": "leeach",
        "tagline": "Perfumes árabes, diseñador, nicho y decants.",
        "image": "assets/portfolio/conceptos/lee-ach.webp",
        "href": null,
        "origin": "Proyecto documentado / por verificar",
        "year": "Archivo",
        "role": "Referencia de proyecto · autoría comercial por confirmar",
        "context": "Concepto de tienda digital para perfumes masculinos, femeninos y unisex, y decants de 3, 5, 10 y 30 ml.",
        "challenge": "Se documenta como referencia del archivo de proyectos; el reto y el alcance originales están pendientes de confirmar.",
        "solution": "Propuesta comercial de tienda; publicación y estado final no verificados.",
        "solution2": "Visual editorial conceptual: no es una captura del sistema ni demuestra que esté publicado.",
        "features": [
            "Perfumería · Tienda digital",
            "Experiencia o flujo por documentar",
            "Resultados y atribución sujetos a verificación"
        ],
        "stack": [
            "Tecnologías por documentar"
        ],
        "imageKind": "concept",
        "imageLabel": "Concepto visual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/lee-ach.webp"
    },
    {
        "slug": "veterinaria",
        "name": "Veterinaria",
        "tag": "Servicios · Sistema",
        "cat": "salud",
        "art": "veterinaria",
        "tagline": "Una propuesta de herramientas digitales para atención veterinaria.",
        "image": "assets/portfolio/conceptos/veterinaria.webp",
        "href": null,
        "origin": "Proyecto documentado / por verificar",
        "year": "Archivo",
        "role": "Referencia de proyecto · autoría comercial por confirmar",
        "context": "Proyecto local llamado Veterinaria identificado entre los trabajos organizados.",
        "challenge": "Se documenta como referencia del archivo de proyectos; el reto y el alcance originales están pendientes de confirmar.",
        "solution": "Alcance, funcionalidades y publicación pública pendientes de verificar.",
        "solution2": "Visual editorial conceptual: no es una captura del sistema ni demuestra que esté publicado.",
        "features": [
            "Servicios · Sistema",
            "Experiencia o flujo por documentar",
            "Resultados y atribución sujetos a verificación"
        ],
        "stack": [
            "Tecnologías por documentar"
        ],
        "imageKind": "concept",
        "imageLabel": "Concepto visual · Sin captura pública",
        "fallbackImage": "assets/portfolio/conceptos/veterinaria.webp"
    }
];;

  const SERVICES = [
    {
        "slug": "diseno-web",
        "title": "Dirección de arte y diseño UX/UI",
        "lead": "Una experiencia bien diseñada empieza con estrategia, no con efectos.",
        "statement": "Identidad antes que interfaz.",
        "body": "Definimos arquitectura, contenido, dirección visual y estados de interacción para que tu marca se reconozca y las personas encuentren lo que buscan.",
        "bullets": [
            "Descubrimiento y propuesta de valor",
            "Arquitectura de información y recorridos",
            "Sistema visual y prototipo navegable",
            "Responsive, accesibilidad y revisión de interacción"
        ]
    },
    {
        "slug": "desarrollo-web",
        "title": "Sitios web profesionales",
        "lead": "Webs corporativas con personalidad, estructura y velocidad.",
        "statement": "Una web que no se queda en la primera impresión.",
        "body": "Implementamos experiencias adaptables, semánticas y fáciles de mantener. Elegimos la solución técnica según tus necesidades, no según las modas.",
        "bullets": [
            "Web corporativa o landing",
            "Navegación multipágina y responsive",
            "Optimización de recursos y SEO técnico",
            "Integraciones según alcance acordado"
        ]
    },
    {
        "slug": "tiendas",
        "title": "Tiendas virtuales y comercio digital",
        "lead": "Del descubrimiento del producto a una compra sencilla.",
        "statement": "Diseño que acompaña la decisión de compra.",
        "body": "Organizamos catálogo, filtros, fichas, carrito y administración comercial para que cada paso sea claro y verificable.",
        "bullets": [
            "Catálogo y fichas de producto",
            "Carrito y flujo de compra",
            "Pagos y stock según integración contratada",
            "Panel de gestión y notificaciones"
        ]
    },
    {
        "slug": "software",
        "title": "Software y plataformas a medida",
        "lead": "Digitalizamos procesos que no caben en una plantilla.",
        "statement": "Ingeniería que ordena lo complejo.",
        "body": "Analizamos roles, reglas de negocio, seguridad y datos antes de construir aplicaciones adaptadas a la operación real.",
        "bullets": [
            "Descubrimiento funcional y modelado",
            "Roles, permisos y flujos de usuario",
            "API, base de datos e integraciones",
            "Pruebas, puesta en marcha y documentación"
        ]
    },
    {
        "slug": "automatizacion",
        "title": "Automatización e integraciones",
        "lead": "Menos tareas repetidas. Más tiempo para decisiones importantes.",
        "statement": "Lo que se repite, puede diseñarse mejor.",
        "body": "Mapeamos procesos y conectamos sistemas para reducir trabajo manual, manteniendo trazabilidad y controles de seguridad.",
        "bullets": [
            "Mapeo y priorización de tareas",
            "Integraciones entre sistemas",
            "Alertas y reportes automatizados",
            "Monitoreo y mejora continua"
        ]
    },
    {
        "slug": "motion",
        "title": "Experiencias digitales y crecimiento",
        "lead": "Movimiento con intención, medición y evolución.",
        "statement": "Una experiencia que se recuerda y se utiliza.",
        "body": "Combinamos motion design, contenido, interacción y analítica para enriquecer productos digitales sin convertir el scroll en un obstáculo.",
        "bullets": [
            "Motion y scrollytelling con propósito",
            "Microinteracciones y accesibilidad",
            "SEO y medición según alcance",
            "Optimización de conversión y continuidad"
        ]
    }
];

  const CAT_LABEL = {
    comercio:'Comercio', automotriz:'Automotriz', belleza:'Belleza',
    software:'Software', corporativo:'Corporativo', salud:'Salud', experiencias:'Experiencias'
  };

  /* ============================================================
     UTILIDADES
     ============================================================ */

  /* ============================================================
     CURSOR PERSONALIZADO
     ============================================================ */
  (function cursor(){
    if (window.matchMedia('(hover: none)').matches) return;
    const c = $('.cursor');
    const dot = $('.cursor__dot');
    const ring = $('.cursor__ring');
    if (!c) return;

    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let rx = mx, ry = my;
    let dx = mx, dy = my;
    let raf = null;

    function loop(){
      rx = lerp(rx, mx, 0.16);
      ry = lerp(ry, my, 0.16);
      dx = lerp(dx, mx, 0.42);
      dy = lerp(dy, my, 0.42);
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      dot.style.transform  = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', e => {
      if (!body.classList.contains('has-cursor')) {
        body.classList.add('has-cursor');
        loop();
      }
      mx = e.clientX; my = e.clientY;
    }, {passive:true});

    document.addEventListener('mouseover', e => {
      const t = e.target.closest('a, button, .chip, input, textarea, select, label, [data-cursor]');
      c.classList.toggle('is-hover', !!t);
    });
  })();

  /* ============================================================
     BOTONES MAGNÉTICOS
     ============================================================ */
  function initMagnetic(){
    if (window.matchMedia('(hover: none)').matches) return;
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        el.style.transform = `translate(${x*0.28}px, ${y*0.34}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ============================================================
     SPLIT DE TEXTO
     ============================================================ */
  function splitWords(el){
    if (el.dataset.splitDone === '1') return;
    const text = el.textContent.trim().replace(/\s+/g,' ');
    const words = text.split(' ');
    el.textContent = '';
    words.forEach((w, i) => {
      const outer = document.createElement('span');
      outer.className = 'w';
      const inner = document.createElement('span');
      inner.textContent = w;
      inner.style.setProperty('--wd', (i * 0.035) + 's');
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.dataset.splitDone = '1';
  }

  function splitLetters(el){
    const text = el.textContent.trim();
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const wrap = document.createElement('span');
      wrap.className = 'ch';
      const inner = document.createElement('i');
      inner.textContent = ch;
      inner.style.setProperty('--ci', i);
      wrap.appendChild(inner);
      el.appendChild(wrap);
    });
  }

  /* ============================================================
     OBSERVER DE REVELADOS
     ============================================================ */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('is-in');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  function observeReveals(root){
    $$('[data-reveal], .mask, [data-split]', root || document).forEach(el => {
      if (!el.classList.contains('is-in')) revealIO.observe(el);
    });
  }

  function prepareSplits(root){
    $$('[data-split]', root || document).forEach(el => {
      if (el.dataset.splitDone === '1') return;
      splitWords(el);
      el.classList.add('mask-split');
    });
  }

  /* ============================================================
     PARALLAX
     ============================================================ */
  const parallaxEls = [];
  function initParallax(){
    $$('[data-parallax]').forEach(el => parallaxEls.push({
      el, speed: parseFloat(el.dataset.parallax) || 0.12
    }));
  }
  function updateParallax(){
    if (!motionOn || reduced) return;
    const vh = window.innerHeight;
    for (let i = 0; i < parallaxEls.length; i++){
      const {el, speed} = parallaxEls[i];
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const center = r.top + r.height/2 - vh/2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(2)}px, 0)`;
    }
  }

  /* ============================================================
     CAMPOS DE LUZ (CANVAS)
     ============================================================ */
  const fields = [];

  function createField(canvas){
    const ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return {start(){},stop(){},size(){}};
    const density = parseFloat(canvas.dataset.density) || 1;
    let w = 0, h = 0, dpr = 1;
    let particles = [];
    let raf = null;
    let visible = false;
    let t = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    const PALETTE = ['95,227,214','91,140,255','162,119,255','255,95,162','255,122,92'];

    function size(){
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#07070A';
      ctx.fillRect(0, 0, w, h);
      build();
    }

    function build(){
      const base = w < 640 ? 46 : w < 1100 ? 84 : 138;
      const n = Math.round(base * density);
      particles = [];
      for (let i = 0; i < n; i++){
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          px: 0, py: 0,
          speed: 0.35 + Math.random() * 0.85,
          col: PALETTE[(Math.random() * PALETTE.length) | 0],
          alpha: 0.28 + Math.random() * 0.5,
          life: Math.random() * 400
        });
        particles[i].px = particles[i].x;
        particles[i].py = particles[i].y;
      }
    }

    function angleAt(x, y, time){
      const a = Math.sin(x * 0.0017 + time * 0.00021) + Math.cos(y * 0.0019 - time * 0.00016);
      const b = Math.cos(x * 0.0012 - time * 0.00013) + Math.sin(y * 0.0015 + time * 0.00019);
      return Math.atan2(a, b) * 1.7;
    }

    function frame(now){
      t = now;
      // estela
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(7,7,10,0.085)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';

      for (let i = 0; i < particles.length; i++){
        const p = particles[i];
        p.px = p.x; p.py = p.y;

        let ang = angleAt(p.x, p.y, t);

        if (mouse.active){
          const ddx = p.x - mouse.x;
          const ddy = p.y - mouse.y;
          const d2 = ddx*ddx + ddy*ddy;
          const R = 230;
          if (d2 < R*R){
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R);
            ang += Math.atan2(ddy, ddx) * 0.9 * f;
            p.x += (ddx / d) * f * 1.6;
            p.y += (ddy / d) * f * 1.6;
          }
        }

        p.x += Math.cos(ang) * p.speed;
        p.y += Math.sin(ang) * p.speed;

        if (p.x < -30 || p.x > w + 30 || p.y < -30 || p.y > h + 30){
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.px = p.x; p.py = p.y;
          continue;
        }

        ctx.strokeStyle = 'rgba(' + p.col + ',' + p.alpha + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(frame);
    }

    function start(){
      if (raf || reduced || !motionOn) return;
      raf = requestAnimationFrame(frame);
    }
    function stop(){
      if (raf){ cancelAnimationFrame(raf); raf = null; }
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        visible = e.isIntersecting;
        if (visible) start(); else stop();
      });
    }, { threshold: 0 });
    io.observe(canvas);

    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    }, {passive:true});
    canvas.addEventListener('mouseleave', () => { mouse.active = false; });

    let rTimer;
    window.addEventListener('resize', () => {
      clearTimeout(rTimer);
      rTimer = setTimeout(() => { size(); }, 180);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (visible) start();
    });

    size();
    if (!reduced && motionOn) start();

    return { start, stop, size };
  }

  function initFields(){
    $$('canvas[data-field]').forEach(cv => fields.push(createField(cv)));
  }

  /* ============================================================
     HERO
     ============================================================ */
  function initHero(){
    const hero = $('#hero');
    if (!hero) return;
    const word = $('.hero__word', hero);
    if (word && !word.dataset.lettersDone){
      splitLetters(word);
      word.dataset.lettersDone = '1';
    }
    requestAnimationFrame(() => {
      setTimeout(() => hero.classList.add('ready'), 120);
    });

    const glow = $('#heroGlow');
    if (glow && !window.matchMedia('(hover: none)').matches){
      hero.addEventListener('mousemove', e => {
        glow.style.setProperty('--gx', e.clientX + 'px');
        glow.style.setProperty('--gy', e.clientY + 'px');
      }, {passive:true});
    }
  }

  /* ============================================================
     TICKER (duplicado para loop continuo)
     ============================================================ */
  function initTicker(){
    const track = $('#tickerTrack');
    if (!track) return;
    track.innerHTML += track.innerHTML;
  }

  /* ============================================================
     NAV / MENÚ
     ============================================================ */
  function initNav(){
    const burger = $('#burger');
    const menu = $('#menu');
    const menuLinks = $$('.menu__list a', menu);

    function setMenuLinksEnabled(enabled){
      menuLinks.forEach(link => {
        if (enabled) link.removeAttribute('tabindex');
        else link.setAttribute('tabindex','-1');
      });
    }

    function closeMenu(){
      if (!menu.classList.contains('open')) return;
      menu.removeEventListener('click', onMenuBackdropClick);
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden','true');
      setMenuLinksEnabled(false);
      burger.setAttribute('aria-expanded','false');
      burger.setAttribute('aria-label','Abrir menú');
      menu.inert=true;
      body.classList.remove('is-locked');
      burger.focus();
    }
    function openMenu(){
      menu.classList.add('open');
      menu.setAttribute('aria-hidden','false');
      setMenuLinksEnabled(true);
      burger.setAttribute('aria-expanded','true');
      burger.setAttribute('aria-label','Cerrar menú');
      menu.inert=false;
      body.classList.add('is-locked');
      menu.addEventListener('click', onMenuBackdropClick);
      const first=menu.querySelector('a');if(first)first.focus();
    }
    function onMenuBackdropClick(event){
      if(event.target===menu) closeMenu();
    }

    menu.inert=true;
    setMenuLinksEnabled(false);
    burger.addEventListener('click', () => {
      if (menu.classList.contains('open')) closeMenu(); else openMenu();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });

    window.__closeMenu = closeMenu;
  }

  let lastScrollY = 0;
  function onScroll(){
    const y = window.scrollY || window.pageYOffset;
    navEl.classList.toggle('is-scrolled', y > 24);

    updateParallax();
    lastScrollY = y;
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  const VIEWS = {
    'home':      '#view-home',
    'proyectos': '#view-proyectos',
    'proyecto':  '#view-proyecto',
    'servicios': '#view-servicios',
    'servicio':  '#view-servicio',
    'estudio':   '#view-estudio',
    'proceso':   '#view-proceso',
    'precios':   '#view-precios',
    'cotizar':   '#view-cotizar',
    'contacto':  '#view-contacto'
  };

  let currentView = 'home';
  let transitioning = false;
  let pendingPath = null;

  function resolveRoute(hash){
    let path = (hash || '').replace(/^#\/?/, '').replace(/\/$/, '');
    path = path.split('?')[0];
    if (path === '' || path === 'inicio') return { view:'home', param:null };

    const parts = path.split('/');
    if (parts[0] === 'proyectos'){
      if (parts[1]) return { view:'proyecto', param: parts[1] };
      return { view:'proyectos', param:null };
    }
    if (parts[0] === 'servicios'){
      if (parts[1]) return {view:'servicio',param:parts[1]};
      return { view:'servicios', param:null };
    }
    if (VIEWS[parts[0]]) return { view: parts[0], param:null };
    return { view:'home', param:null };
  }

  function showView(name){
    Object.keys(VIEWS).forEach(k => {
      const el = $(VIEWS[k]);
      if (!el) return;
      if (k === name) { el.hidden = false; }
      else { el.hidden = true; }
    });
    currentView = name;
  }

  function updateNavState(route){
    $$('.nav__links a').forEach(a => {
      const h = a.getAttribute('href').replace('#/','');
      const active = (route.view === 'home' && h === '') ||
                     (h !== '' && route.view.indexOf(h) === 0 && h !== '#');
      if (active) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    });
  }

  function renderRoute(route){
    if (route.view === 'proyecto') renderProjectDetail(route.param);
    if (route.view === 'servicio') renderServiceDetail(route.param);

    showView(route.view);
    window.scrollTo(0, 0);
    navEl.classList.toggle('is-scrolled', false);

    // Preparar animaciones de la nueva vista
    const viewEl = $(VIEWS[route.view]);
    if (viewEl){
      prepareSplits(viewEl);
      // re-observar (por si el observer no reevaluó)
      setTimeout(() => {
        $$('[data-reveal], .mask, [data-split]', viewEl).forEach(el => {
          if (!el.classList.contains('is-in')) revealIO.observe(el);
        });
      }, 60);
    }

    // Foco accesible
    const h1 = viewEl ? viewEl.querySelector('h1') : null;
    if (h1){
      h1.setAttribute('tabindex','-1');
      setTimeout(() => { try { h1.focus({preventScroll:true}); } catch(e){} }, 700);
    }

    updateNavState(route);
    document.title = titleFor(route);
  }

  function titleFor(route){
    const map = {
      home:'PazBel Studios — Estudio creativo & ingeniería digital',
      proyectos:'Proyectos — PazBel Studios',
      proyecto:(PROJECTS.find(x => x.slug === route.param)?.name || 'Proyecto')+' — PazBel Studios',
      servicios:'Servicios — PazBel Studios',
      servicio:(SERVICES.find(x=>x.slug===route.param)?.title||'Servicio')+' — PazBel Studios',
      estudio:'Estudio — PazBel Studios',
      proceso:'Metodología — PazBel Studios',
      precios:'Inversión — PazBel Studios',
      cotizar:'Cotizador — PazBel Studios',
      contacto:'Contacto — PazBel Studios'
    };
    return map[route.view] || map.home;
  }

  function navigate(hash){
    if (transitioning){ pendingPath = hash; return; }

    const route = resolveRoute(hash);
    transitioning = true;

    veil.classList.remove('out');
    veil.classList.add('on');

    setTimeout(() => {
      renderRoute(route);
      veil.classList.remove('on');
      veil.classList.add('out');

      setTimeout(() => {
        veil.classList.remove('out');
        transitioning = false;
        if (pendingPath !== null && pendingPath !== location.hash){
          const p = pendingPath;
          pendingPath = null;
          navigate(p);
        } else {
          pendingPath = null;
        }
      }, 480);
    }, 430);
  }

  function initRouter(){
    let initial = true;

    function handle(){
      const hash = location.hash || '#/';
      const route = resolveRoute(hash);
      if (initial){
        initial = false;
        showView(route.view);
        if (route.view === 'proyecto') renderProjectDetail(route.param);
    if (route.view === 'servicio') renderServiceDetail(route.param);
        updateNavState(route);
        document.title = titleFor(route);
        return;
      }
      navigate(hash);
    }

    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      if (href.charAt(1) !== '/'){
        // ancla interna dentro de la vista
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target){
          e.preventDefault();
          target.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'start'});
        }
        return;
      }
      e.preventDefault();
      if (window.__closeMenu) window.__closeMenu();
      if (location.hash === href){
        window.scrollTo({top:0, behavior: reduced ? 'auto' : 'smooth'});
        return;
      }
      location.hash = href;
    });

    window.addEventListener('hashchange', handle);
    handle();
  }

  /* ============================================================
     PROYECTOS: GRID + FILTROS
     ============================================================ */
  function artHTML(p, extraStyle){
    // Las imágenes locales son prioritarias. Si aún no se descargaron, se intenta
    // la captura pública archivada y, como último recurso, un arte conceptual marcado.
    const stage = (p.imageKind === 'archive' || p.imageKind === 'optional-live') ? '0' : '2';
    const verifiedClass = p.imageKind !== 'concept' ? ' art__tag--verified' : '';
    const alt = p.imageKind === 'concept'
      ? `Representación gráfica conceptual de ${p.name}, no es captura del sitio`
      : `Vista del sitio ${p.name} documentada en el portafolio`;
    return `<div class="art art--photo" style="background-image:url('${p.fallbackImage || p.image}');background-size:cover;background-position:center;${extraStyle || ''}">
      <img class="art__screenshot" src="${p.image}" alt="${alt}" loading="lazy"
           width="1080" height="550" data-stage="${stage}"
           data-remote="${p.previewRemote || ''}" data-fallback="${p.fallbackImage || ''}">
      <span class="art__tag${verifiedClass}">${p.imageLabel}</span></div>`;
  }

  // Capturas provenientes del repositorio Portafolio; no dependen de backend.
  // En local se intenta primero la copia incluida mediante PREPARAR_FOTOS.ps1.
  document.addEventListener('error', ev=>{
    const img=ev.target;
    if (!(img instanceof HTMLImageElement) || !img.classList.contains('art__screenshot')) return;
    const stage=Number(img.dataset.stage || 0);
    if(stage===0 && img.dataset.remote){
      img.dataset.stage='1'; img.src=img.dataset.remote; return;
    }
    if(stage<2 && img.dataset.fallback){
      img.dataset.stage='2'; img.src=img.dataset.fallback;
      const badge=img.parentElement?.querySelector('.art__tag');
      if(badge){badge.classList.remove('art__tag--verified');badge.textContent='Visual conceptual · Captura no disponible';}
      img.alt='Representación conceptual de proyecto, no es una captura actual';
    }
  },true);
  document.addEventListener('load', ev=>{
    const img=ev.target;
    if(!(img instanceof HTMLImageElement)||!img.classList.contains('art__screenshot')) return;
    const badge=img.parentElement?.querySelector('.art__tag');
    if(!badge)return;
    const stage=Number(img.dataset.stage||0);
    if(stage===1){badge.textContent='Captura archivada · Portafolio';badge.classList.add('art__tag--verified');}
    else if(stage===0){badge.textContent=img.dataset.remote ? 'Captura del sitio · Local' : 'Imagen del proyecto · Local';badge.classList.add('art__tag--verified');}
  },true);

  /* ============================================================
     ARCHIVO EDITORIAL — búsqueda, curaduría, filtros y vistas
     ============================================================ */
  function escapeHTML(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function projectGroup(p){
    if(p.cat==='belleza'||p.cat==='comercio')return 'comercio';
    if(p.cat==='software')return 'plataformas';
    if(p.cat==='automotriz')return 'automotriz';
    if(p.cat==='salud')return 'salud';
    if(p.cat==='corporativo')return 'corporativo';
    return 'exploracion';
  }
  const GROUPS = [
    ['all','Todos'],['comercio','Comercio digital'],['plataformas','Software y sistemas'],
    ['corporativo','Corporativas'],['automotriz','Automotriz'],
    ['salud','Salud'],['exploracion','Exploración']
  ];
  function projectCard(p, idx, feature){
    const index=String(PROJECTS.indexOf(p)+1).padStart(2,'0');
    const isConcept=p.imageKind==='concept';
    const website=p.href && /^https:\/\//.test(p.href)
      ? `<a class="portfolio-card__live" href="${escapeHTML(p.href)}" target="_blank" rel="noopener noreferrer" aria-label="Visitar web de ${escapeHTML(p.name)}">Visitar sitio <span aria-hidden="true">↗</span></a>`
      : `<span class="portfolio-card__unavailable">Sin demo pública</span>`;
    return `<article class="portfolio-card${feature?' portfolio-card--featured':''}" data-slug="${escapeHTML(p.slug)}" data-group="${projectGroup(p)}" data-reveal="scale" style="--d:${Math.min(idx%5,4)*.065}s">
      <a class="portfolio-card__visual" href="#/proyectos/${escapeHTML(p.slug)}" aria-label="Explorar caso de ${escapeHTML(p.name)}">
        ${artHTML(p)}
        <span class="portfolio-card__overlay"><span>${feature?'CASO DESTACADO':'EXPLORAR PROYECTO'}</span><b aria-hidden="true">↗</b></span>
      </a>
      <div class="portfolio-card__under">
        <span class="portfolio-card__number">${index} / ${String(PROJECTS.length).padStart(2,'0')}</span>
        <span class="portfolio-card__type">${escapeHTML(p.tag)}</span>
      </div>
      <div class="portfolio-card__content">
        <div class="portfolio-card__title-wrap"><h3><a href="#/proyectos/${escapeHTML(p.slug)}">${escapeHTML(p.name)}</a></h3>
        <p>${escapeHTML(p.tagline)}</p></div>
        <div class="portfolio-card__actions">${website}<a href="#/proyectos/${escapeHTML(p.slug)}" class="portfolio-card__case" aria-label="Ver ficha de ${escapeHTML(p.name)}">Ver caso <span aria-hidden="true">↗</span></a></div>
      </div>
      ${isConcept ? '<span class="portfolio-card__kind">VISUAL CONCEPTUAL</span>' : ''}
    </article>`;
  }

  function initProjectsGrid(){
    const grid=$('#workGrid');
    if(!grid)return;
    const filters=$('#filters'),search=$('#projectSearch'), sort=$('#projectSort');
    const result=$('#projectResults'), summary=$('#projectSummary');
    const more=$('#projectMore'), empty=$('#projectEmpty');
    const featured=$('#featuredWork'), featuredWrap=$('#featuredWrap');
    const reset=$('#projectReset');
    const layoutButtons=$$('[data-layout]', $('#projectLayouts'));
    const state={group:'all',query:'',sort:'curated',layout:'grid',shown:9};
    const featuredSlugs=['avila-parfums','dual-ingenieria','mova'];
    let debounce;
    const matches=(p)=>{
      if(state.group!=='all' && projectGroup(p)!==state.group)return false;
      const haystack=[p.name,p.tag,p.tagline,p.context,CAT_LABEL[p.cat]||''].join(' ').toLocaleLowerCase('es');
      return !state.query || haystack.normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(state.query);
    };
    const isDefault=()=>state.group==='all'&&!state.query&&state.sort==='curated'&&state.layout==='grid';
    function render(){
      const all=PROJECTS.filter(matches);
      if(state.sort==='az')all.sort((a,b)=>a.name.localeCompare(b.name,'es'));
      const useFeatured=isDefault();
      featuredWrap.hidden=!useFeatured;
      const picks=useFeatured ? featuredSlugs.map(slug=>PROJECTS.find(p=>p.slug===slug)).filter(Boolean) : [];
      if(useFeatured)featured.innerHTML=picks.map((p,i)=>projectCard(p,i,true)).join('');
      else featured.innerHTML='';
      const candidate=useFeatured ? all.filter(p=>!featuredSlugs.includes(p.slug)) : all;
      const visible=candidate.slice(0,state.shown);
      grid.classList.toggle('work-grid--list',state.layout==='list');
      grid.innerHTML=visible.map((p,i)=>projectCard(p,i,false)).join('');
      const displayCount=Math.min(candidate.length,state.shown)+picks.length;
      const total=all.length;
      result.textContent=`${total} ${total===1?'proyecto encontrado':'proyectos encontrados'} · ${displayCount} visibles`;
      summary.textContent=total ? `Mostrando ${displayCount} de ${total} proyectos` : 'No encontramos proyectos que coincidan con tu búsqueda';
      more.hidden=visible.length>=candidate.length;
      if(!more.hidden)more.textContent=`Mostrar ${Math.min(9,candidate.length-state.shown)} proyectos más  ↓`;
      empty.hidden=total!==0;
      reset.hidden=isDefault();
      $('#portfolioCount').textContent=String(PROJECTS.length).padStart(2,'0');
      $$('[data-filter]',filters).forEach(b=>{
        const active=b.dataset.filter===state.group;
        b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));
      });
      layoutButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.layout===state.layout)));
      observeReveals(grid);if(useFeatured)observeReveals(featured);
    }
    filters.innerHTML=GROUPS.map(([key,label])=>{
      const count=PROJECTS.filter(p=>key==='all'||projectGroup(p)===key).length;
      return `<button type="button" class="chip${key==='all'?' active':''}" data-filter="${key}" aria-pressed="${key==='all'}">${label}<span class="chip__count">${count}</span></button>`;
    }).join('');
    filters.addEventListener('click',e=>{
      const b=e.target.closest('[data-filter]');if(!b)return;
      state.group=b.dataset.filter;state.shown=9;render();
    });
    search.addEventListener('input',()=>{
      clearTimeout(debounce);debounce=setTimeout(()=>{
        state.query=search.value.toLocaleLowerCase('es').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
        state.shown=9;render();
      },120);
    });
    search.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&search.value){search.value='';state.query='';clearTimeout(debounce);render();}
    });
    sort.addEventListener('change',()=>{state.sort=sort.value;state.shown=9;render();});
    $('#projectLayouts').addEventListener('click',e=>{
      const b=e.target.closest('[data-layout]');if(!b)return;
      state.layout=b.dataset.layout;state.shown=9;render();
    });
    more.addEventListener('click',()=>{state.shown+=9;render();});
    function clear(){state.group='all';state.query='';search.value='';state.sort='curated';sort.value='curated';state.layout='grid';state.shown=9;render();}
    reset.addEventListener('click',clear);
    $('#projectEmptyReset').addEventListener('click',clear);
    render();
  }

  /* ============================================================
     DETALLE DE PROYECTO
     ============================================================ */
  function renderProjectDetail(slug){
    const p = PROJECTS.find(x => x.slug === slug) || PROJECTS[0];
    const idx = PROJECTS.indexOf(p);
    const next = PROJECTS[(idx + 1) % PROJECTS.length];

    $('#pdCat').textContent = CAT_LABEL[p.cat] || p.cat;
    $('#pdName').textContent = p.name;
    $('#pdTag').textContent = p.tagline;
    $('#pdYear').textContent = p.year;
    $('#pdRole').textContent = p.role;
    $('#pdYear2').textContent = p.year;
    $('#pdCat2').textContent = CAT_LABEL[p.cat] || p.cat;
    $('#pdStackTop').textContent = p.stack.slice(0,3).join(' · ');

    const cover = $('#pdCover');
    cover.className = 'art art--photo';
    cover.innerHTML = artHTML(p).replace(/^<div[^>]*>/,'').replace(/<\/div>$/,'');
    const pdLink = $('#pdLink');
    pdLink.hidden = !p.href;
    if(p.href) pdLink.href = p.href;

    $('#pdContext').textContent = p.context;
    $('#pdChallenge').textContent = p.challenge;
    $('#pdSolution').textContent = p.solution;
    $('#pdSolution2').textContent = p.solution2;

    $('#pdFeatures').innerHTML = p.features.map((f, i) =>
      `<div class="pd-feature"><span>0${i+1}</span><p>${f}</p></div>`
    ).join('');

    $('#pdStack').innerHTML = p.stack.map(s => `<li>${s}</li>`).join('');
    $('#pdStack2').innerHTML = p.features.map(s => `<li>${s}</li>`).join('');

    const art2 = $('#pdArt2');
    art2.className = 'art art--photo';
    art2.innerHTML = artHTML(p).replace(/^<div[^>]*>/,'').replace(/<\/div>$/,'');
    art2.style.aspectRatio = p.image ? '16/9' : '21/9';
    $('#pdCap2').textContent = (p.imageKind === 'concept' || p.imageKind === 'optional-live') ? 'Vista conceptual de ' + p.name + ' hasta obtener una captura real del producto; si hay una fotografía local actualizada, se mostrará automáticamente.' : 'Imagen archivada de ' + p.name + '. Puede no representar su versión actual en producción.';

    $('#pdNext').setAttribute('href', '#/proyectos/' + next.slug);
    $('#pdNextName').textContent = next.name;

    document.title = p.name + ' — PazBel Studios';
  }

  /* ============================================================
     ACORDEONES
     ============================================================ */
  function initAccordions(){
    $$('.acc').forEach((acc,ai) => {
      $$('.acc__item',acc).forEach((item,i)=>{const btn=$('.acc__btn',item),panel=$('.acc__panel',item);if(!btn||!panel)return;const id='panel-'+ai+'-'+i;panel.id=id;const open=item.classList.contains('open');panel.inert=!open;panel.setAttribute('aria-hidden',String(!open));btn.setAttribute('aria-controls',id);btn.id='toggle-'+ai+'-'+i;panel.setAttribute('role','region');panel.setAttribute('aria-labelledby',btn.id)});
      acc.addEventListener('click', e => {
        const btn = e.target.closest('.acc__btn');
        if (!btn) return;
        const item = btn.closest('.acc__item');
        const isOpen = item.classList.contains('open');

        $$('.acc__item', acc).forEach(it => {
          it.classList.remove('open');
          const panel=$('.acc__panel',it);if(panel){panel.inert=true;panel.setAttribute('aria-hidden','true');}
          const b = $('.acc__btn', it);
          if (b) b.setAttribute('aria-expanded','false');
        });

        if (!isOpen){
          item.classList.add('open');
          const panel=$('.acc__panel',item);if(panel){panel.inert=false;panel.setAttribute('aria-hidden','false');}
          btn.setAttribute('aria-expanded','true');
        }
      });
    });
  }

  function renderServiceDetail(slug){
    const s = SERVICES.find(x=>x.slug===slug) || SERVICES[0];
    const ix = SERVICES.indexOf(s);
    $('#srvIndex').textContent = String(ix+1).padStart(2,'0')+' — Capacidad';
    $('#srvTitle').textContent = s.title;
    $('#srvLead').textContent = s.lead;
    $('#srvStatement').textContent = s.statement;
    $('#srvBody').textContent = s.body;
    $('#srvSymbol').textContent = 'PB/'+String(ix+1).padStart(2,'0');
    $('#srvBullets').innerHTML = s.bullets.map((b,i)=>'<li><span>'+String(i+1).padStart(2,'0')+'</span>'+b+'</li>').join('');
    document.title = s.title+' — PazBel Studios';
  }

  /* ============================================================
     PROCESO — SCROLLYTELLING
     ============================================================ */
  function initProcess(){
    const steps = $$('#steps .step');
    if (!steps.length) return;
    const numEl = $('#procNum');
    const labelEl = $('#procLabel');
    const ring = $('#procRing');
    const labels = ['Diseño','Desarrollo','Impulso','Evolución'];
    const colors = ['#5FE3D6','#5B8CFF','#A277FF','#FF5FA2'];

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const phase = parseInt(e.target.dataset.phase, 10) || 0;
        steps.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
        if (numEl) numEl.textContent = '0' + (phase + 1);
        if (labelEl) labelEl.textContent = labels[phase] || '';
        if (ring){
          ring.style.borderColor = colors[phase] + '66';
          ring.style.transform = 'scale(' + (1 + phase * 0.06) + ')';
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    steps.forEach(s => io.observe(s));
  }

  /* ============================================================
     COTIZADOR
     ============================================================ */
  function initEstimator(){
    const form = $('#quoteForm');if(!form)return;
    const baseMap={landing:{label:'Landing Page Pro',price:89,pages:1},corporativo:{label:'Web Corporativa',price:499,pages:5},ecommerce:{label:'E-commerce',price:1200,pages:1},plataforma:{label:'Software a medida',price:1890,pages:1}};
    const labels={cms:'Gestor de contenido',motion:'Motion avanzado',pago:'Pasarela de pagos',auto:'Automatizaciones',multi:'Multi-idioma',seo:'SEO técnico y analítica'};
    const timeLabels={relax:'Flexible',normal:'Equilibrado',fast:'Prioritario (sujeto a disponibilidad)'};
    const money=n=>'S/ '+new Intl.NumberFormat('es-PE').format(n);
    let summary='';
    const update=()=>{
      const k=form.querySelector('input[name="qtype"]:checked')?.value||'landing';
      const p=baseMap[k];const pages=Number($('#qPages').value)||1;
      $('#qPagesOut').textContent=pages+(pages===1?' página':' páginas');
      const mods=$$('#qModules input:checked').map(x=>labels[x.value]);
      const time=form.querySelector('input[name="qtime"]:checked')?.value||'relax';
      const custom=mods.length>0||pages>p.pages||time==='fast';
      $('#qAmount').textContent=custom?'A cotizar · base '+money(p.price):'Desde '+money(p.price);
      $('#qBreak').innerHTML='<div class="qsum__row"><span>Base · '+p.label+'</span><span>'+money(p.price)+'</span></div>'+
        '<div class="qsum__row"><span>Vistas solicitadas</span><span>'+pages+'</span></div>'+
        '<div class="qsum__row"><span>Módulos adicionales</span><span>'+mods.length+'</span></div>'+
        '<div class="qsum__row"><span>Plazo</span><span>'+timeLabels[time]+'</span></div>'+
        '<div class="qsum__row qsum__row--total"><span>Precio final</span><span>Según alcance</span></div>';
      summary='Hola, PazBel Studios. Me gustaría solicitar una propuesta.\n'+
        '• Proyecto: '+p.label+'\n• Vistas: '+pages+'\n• Módulos: '+(mods.join(', ')||'Sin módulos extra')+'\n• Plazo: '+timeLabels[time]+'\n• Referencia de partida: '+money(p.price)+' (no es presupuesto cerrado).';
    };
    form.addEventListener('change',update);form.addEventListener('input',update);
    $('#qCta').addEventListener('click',()=>{const el=$('#cMsg');if(el){el.value=summary;el.dispatchEvent(new Event('input',{bubbles:true}));}});
    update();
  }

  /* ============================================================
     FORMULARIO DE CONTACTO
     ============================================================ */
  function initContactForm(){
    const form = $('#contactForm');
    if (!form) return;
    const status = $('#formStatus');

    const validators = {
      cName: v => v.trim().length >= 2 ? '' : 'Escribe tu nombre (mínimo 2 caracteres).',
      cEmail: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Ingresa un correo válido.',
      cMsg: v => v.trim().length >= 12 ? '' : 'Cuéntanos un poco más (mínimo 12 caracteres).'
    };

    function validateField(id){
      const input = document.getElementById(id);
      const errEl = document.getElementById('err-' + id);
      if (!input || !validators[id]) return true;
      const msg = validators[id](input.value);
      const field = input.closest('.field');
      if (msg){
        field.classList.add('field--err');
        input.setAttribute('aria-invalid','true');
        if (errEl) errEl.textContent = msg;
        return false;
      } else {
        field.classList.remove('field--err');
        input.removeAttribute('aria-invalid');
        if (errEl) errEl.textContent = '';
        return true;
      }
    }

    Object.keys(validators).forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('blur', () => validateField(id));
      input.addEventListener('input', () => {
        if (input.closest('.field').classList.contains('field--err')) validateField(id);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      Object.keys(validators).forEach(id => { if (!validateField(id)) ok = false; });

      status.className = 'form-status show ' + (ok ? 'ok' : 'bad');
      if (!ok){
        status.innerHTML = '<strong>Revisa los campos marcados.</strong> Comprueba los datos antes de continuar.';
        const firstErr = form.querySelector('.field--err input, .field--err textarea');
        if (firstErr) firstErr.focus();
        return;
      }
      const msg=[
        'Hola, PazBel Studios. Quisiera consultarles sobre un proyecto.',
        'Nombre: '+$('#cName').value.trim(),
        'Correo: '+$('#cEmail').value.trim(),
        'Marca: '+($('#cCompany').value.trim()||'No indicada'),
        'Tipo: '+($('#cType').value||'Por definir'),
        'Mensaje: '+$('#cMsg').value.trim()
      ].join('\n');
      const url='https://wa.me/51916666934?text='+encodeURIComponent(msg);
      window.open(url,'_blank','noopener,noreferrer');
      status.innerHTML='<strong>Mensaje preparado para WhatsApp.</strong> Revísalo y presiona enviar en la aplicación.'+
        '<br><a href="'+url+'" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">Abrir WhatsApp directamente ↗</a>';
      status.scrollIntoView({behavior: reduced ? 'auto' : 'smooth',block:'center'});
    });
  }

  function initStudioFilm(){
    const v=$('#filmVideo'),b=$('#filmToggle');if(!v||!b)return;
    const paint=()=>{const playing=!v.paused&&!v.ended;b.setAttribute('aria-pressed',String(playing));b.innerHTML=playing?'Pausar pieza <span aria-hidden="true">Ⅱ</span>':'Reproducir pieza <span aria-hidden="true">↗</span>';};
    b.addEventListener('click',()=>{if(v.paused){v.play().catch(()=>{b.textContent='Vídeo no disponible';});}else v.pause();});
    v.addEventListener('play',paint);v.addEventListener('pause',paint);v.addEventListener('ended',paint);
    document.addEventListener('visibilitychange',()=>{if(document.hidden&&!v.paused)v.pause();});
    reduceMQ.addEventListener('change',e=>{if(e.matches&&!v.paused)v.pause();});
  }

  /* ============================================================
     PANEL DE DEMOSTRACIÓN
     ============================================================ */
  function initDemo(){
    const demo = $('#demo');
    const toggle = $('#demoToggle');

    toggle.addEventListener('click', () => {
      const open = demo.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    $('#dRestart').addEventListener('click', () => {
      const hero = $('#hero');
      if (!hero) return;
      if (location.hash !== '#/' && location.hash !== '') {
        location.hash = '#/';
        setTimeout(() => replayHero(), 1100);
      } else {
        replayHero();
      }
    });

    function replayHero(){
      const hero = $('#hero');
      if (!hero) return;
      hero.classList.remove('ready');
      const word = $('.hero__word', hero);
      if (word){
        $$('.ch i', word).forEach(i => { i.style.transition = 'none'; i.style.transform = 'translateY(112%)'; });
        void word.offsetWidth;
        $$('.ch i', word).forEach(i => { i.style.transition = ''; i.style.transform = ''; });
      }
      setTimeout(() => hero.classList.add('ready'), 120);
    }

    const motionBtn = $('#dMotion');
    motionBtn.addEventListener('click', () => {
      motionOn = !motionOn;
      document.documentElement.classList.toggle('no-motion', !motionOn);
      motionBtn.textContent = 'Animaciones: ' + (motionOn ? 'ON' : 'OFF');
      motionBtn.classList.toggle('on', motionOn);

      if (motionOn){
        fields.forEach(f => f.start());
      } else {
        fields.forEach(f => f.stop());
      }
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init(){
    prepareSplits(document);
    initHero();
    initTicker();
    initNav();
    initRouter();
    initProjectsGrid();
    initAccordions();
    initProcess();
    initEstimator();
    initContactForm();
    initDemo();
    if(new URLSearchParams(location.search).has('demo')) document.body.classList.add('demo-mode');
    initStudioFilm();
    initFields();
    initParallax();
    initMagnetic();

    observeReveals(document);

    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', () => { updateParallax(); }, {passive:true});
    onScroll();

    // Pausar canvas si se reduce el movimiento del sistema
    reduceMQ.addEventListener('change', e => {
      reduced = e.matches;
      if (reduced){ fields.forEach(f => f.stop()); }
      else if (motionOn){ fields.forEach(f => f.start()); }
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
