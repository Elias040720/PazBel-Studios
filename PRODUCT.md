# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + TypeScript + Vite 6 (Node 20.18 compatible), GSAP 3 + ScrollTrigger + @gsap/react, Three.js via @react-three/fiber and @react-three/drei, React Router 7 for case-study routes, Playwright for QA. Chosen by the user's brief (PazBel 2.0). The previous static HTML/CSS/JS version is preserved in `legacy/` and under git tag `legacy-static-v1`.

## Users

- Peruvian small and medium business owners (restaurants, workshops, retail, professional services) who today depend on social networks and want a professional web presence, an online store or an internal system. They arrive mostly from mobile, often via WhatsApp or Instagram links, and decide by comparing price, trust and what the studio has built.
- Founders and teams looking for custom software or SaaS platforms (education, operations), who evaluate engineering capability through the portfolio.

## Product Purpose

PazBel Studios is a Peruvian digital studio (Elías and Abel) that designs, develops and grows websites, e-commerce, custom software and SaaS platforms, plus optional maintenance and marketing subscriptions. The landing page is the studio's own proof of capability: it must make visitors believe PazBel can build extraordinary web experiences and professional software, then convert that belief into a WhatsApp conversation with a clear, contextual message.

Success: a visitor understands what PazBel builds, sees real projects presented with care, understands prices without confusion (one-time vs monthly), and starts a WhatsApp conversation from a contextual CTA or the quote builder.

## Positioning

A small studio that unites creative direction and real engineering: the same team that designs the interface builds the system behind it and stays to help it grow. The landing itself (3D, scrollytelling, working quote builder) is the demonstration a template agency cannot copy.

## Operating Context

- Contact happens through WhatsApp (`wa.me`) with prefilled messages; the visitor confirms sending inside WhatsApp. No forms store data, no analytics are configured.
- Prices are in soles (S/), published as reference starting points; scope is agreed before contracting.
- Hosting/domain not decided yet; no production deploy authorized.

## Capabilities and Constraints

- Development plans (one-time): Landing Page Pro S/89 (launch price), Web Corporativa S/499, E-commerce S/1,200 (base), Software a medida desde S/1,890 (reference, requires custom quote).
- Subscriptions (monthly, optional): Mantenimiento & Velocidad S/89/mes, Plan Tracción S/349/mes, Full Growth Partner S/690/mes. Ad spend always billed separately.
- IGV treatment pending confirmation. Domain, hosting, licenses and extra integrations quoted separately unless expressly contracted.
- Official WhatsApp number provided by the user: +51 916 666 934 (centralized in `src/data/siteConfig.ts`).
- Official social links: not provided — do not invent.

## Brand Commitments

- Name: PazBel Studios (wordmark "PAZBEL / STUDIOS").
- Official logo: `public/brand/pazbel-original.jpeg` — 3D interlaced PB monogram with cyan, blue, violet, magenta and coral gradients on graphite. Must never be redrawn as an invented symbol; 3D derivatives must keep the PB silhouette recognizable.
- Voice: Peruvian Spanish, close and direct ("tú"), confident without hype. Taglines in use: "Diseñamos. Desarrollamos. Impulsamos." / "Diseño que impacta. Ingeniería que funciona."
- Visual concept pinned by the brief: "Chromatic Engineering" — premium editorial + digital engineering, graphite black, logo chromatic accents, monumental type, controlled cinematic motion. Not sci-fi, not gaming, not crypto, not a glassmorphism card collection.

## Evidence on Hand

- Projects: MOVA (EdTech platform for one-to-one private classes; stack verified from local code: Laravel · Vue · Inertia · MySQL; publication not verified), Chambi Motors (automotive web experience; Next.js · React; publication not verified), CARWASHALITA S.A.C. (service management system; status and features pending confirmation).
- No real screenshots exist yet (`legacy/assets/projects/` was empty). Mockups are conceptual HTML/CSS interfaces and must be labelled as such until real captures are supplied.
- No testimonials, client metrics, commercial results or awards exist. Never fabricate them.

## Product Principles

1. Show, don't claim: capability is demonstrated by the experience itself, never by invented numbers.
2. Price clarity is trust: one-time and monthly amounts are always separated; "desde" means reference.
3. Every CTA carries context: the WhatsApp message says what the visitor was looking at.
4. The brand is the PB monogram: every visual system derives from it.
5. Works everywhere: content, navigation and conversion survive without WebGL, without GSAP and with reduced motion.

## Accessibility & Inclusion

WCAG 2.2 AA target: visible focus, keyboard navigation, semantic landmarks, `prefers-reduced-motion` variant, no information available only on hover, readable contrast on graphite and paper grounds.
