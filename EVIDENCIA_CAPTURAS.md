# Evidencia de imágenes del portafolio — PazBel

## Qué hay en la entrega

- 23 proyectos conservados (14 originales + 9 referencias añadidas), cada uno con portada, ficha y enlace cuando existe un destino identificable.
- 2 capturas de proyecto empaquetadas localmente (Ávila y Dual).
- 8 capturas archivadas disponibles desde el repositorio GitHub del portafolio personal; cuando el navegador tenga conexión se muestran automáticamente. Para incorporarlas al ZIP como archivos locales, usa `PREPARAR_FOTOS.cmd` desde Windows.
- 4 vistas conceptuales identificadas como tales (Chambi, CarWash Alita, DPP Control y Paco Fragance). DPP tiene una URL pública de acceso pero no una captura autenticada de su interfaz.
- 12 imágenes ilustrativas de respaldo local, todas marcadas como material conceptual. Nunca se presentan como una captura actual.
- `CAPTURAR_SITIOS_ACTUALES.cmd` permite intentar generar capturas nuevas de las páginas públicas en tu navegador local, sin instalar dependencias. No accede a vistas privadas ni inicia sesión.

## Limitaciones de verificación

Las capturas archivadas se han localizado e inspeccionado en la fuente GitHub del usuario. No hay acceso HTTP desde el contenedor de empaquetado para descargar esas ocho imágenes al ZIP ni para capturar todos los sitios web en vivo. Se evitaron afirmaciones falsas de QA en directo. Algunos enlaces públicos pueden estar caídos o exigir autenticación. No se deben usar imágenes de otro proyecto como si fueran del proyecto solicitado.

## Proyectos

| Proyecto | Imagen presentada | Enlace |
|---|---|---|
| Ávila Parfums | Captura local de proyecto | https://www.avilaparfums.com/ |
| Dual Ingeniería | Captura local de proyecto | https://www.dualingenieria.pe/ |
| MOVA | Captura archivada en GitHub (online / descargable mediante script) | https://movaeduca.me/ |
| Chambi Motors | Visual conceptual, no captura verificada | No hay URL pública verificada |
| Cruzial Parfums | Captura archivada en GitHub (online / descargable mediante script) | https://cruzial.pe/ |
| TalentLens · SmartRH AI | Captura archivada en GitHub (online / descargable mediante script) | https://talentlens-nu.vercel.app/ |
| CarWashAlita | Visual conceptual, no captura verificada | No hay URL pública verificada |
| Gimnasio Murex | Captura archivada en GitHub (online / descargable mediante script) | https://gimnasio-murex.vercel.app/ |
| JNA Fragance | Captura archivada en GitHub (online / descargable mediante script) | https://jnafragance.com/ |
| Elixia Parfum | Captura archivada en GitHub (online / descargable mediante script) | https://elixiaparfum.com/ |
| DPP Control | Visual conceptual, no captura verificada | https://dpp-pink.vercel.app/login |
| Paco Fragance | Visual conceptual, no captura verificada | No hay URL pública verificada |
| Fragance Obsession | Captura archivada en GitHub (online / descargable mediante script) | https://www.fraganceobession.com/ |
| Goccta | Captura archivada en GitHub (online / descargable mediante script) | https://www.gocctaperu.com/ |

## Incidencia de atribución

El dominio `gimnasio-murex.vercel.app` está asociado en el portafolio original a una captura y título **Gimnasio Lima**. La lista de PazBel utiliza **Gimnasio Murex**. Se mantiene el nombre de la lista proporcionada por el usuario, y la ficha indica esa discrepancia hasta confirmación.

## Procedencia

- Repositorio público enlazado por usuario: `https://github.com/Abel-Castill0/Portafolio` (archivos `public/previews/*`).
- Archivo local previo de PazBel: `assets/portfolio/avilaparfums.webp` y `assets/portfolio/dual-ingenieria.webp`.
- URLs públicas procedentes del catálogo `src/data/projects.ts` del mismo portafolio.

## Ejecución recomendada

1. Extraer el ZIP completo.
2. Ejecutar `PREPARAR_FOTOS.cmd` en Windows con conexión a Internet para incorporar físicamente las ocho capturas archivadas.
3. Opcionalmente, ejecutar `CAPTURAR_SITIOS_ACTUALES.cmd` para actualizar las capturas de las páginas públicas en un navegador Chrome, Brave o Edge instalado (puede guardar páginas de error o inicios de sesión, por lo que requiere inspección humana posterior).
4. Abrir `index.html` y revisar la vista `#/proyectos` y cada ficha.
5. No publicar afirmaciones de autoría corporativa sin confirmación.

## Actualización 15/11/2026
El portafolio incorpora también HopperCode, Dra. Blue, Librería Yarin, GOCCTA Studio, Intranet Zephyra, Lotus, Pastelería, LEE-ACH y Veterinaria. Estas nueve portadas son composiciones conceptuales, NO capturas auténticas. Si ejecutas `CAPTURAR_SITIOS_ACTUALES.cmd`, se intentarán nuevas capturas de HopperCode y Dra. Blue, además de los sitios documentados; verifica manualmente que no hayan fotografiado páginas de error antes de publicarlas.
