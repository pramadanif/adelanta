export type Locale = "es" | "en";

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_COOKIE = "adelanta_locale";
export const LOCALE_STORAGE_KEY = "adelanta_locale";

export const translations = {
  es: {
    // Global
    "lang.label": "Idioma",
    "lang.es": "Español",
    "lang.en": "English",

    // Header
    "nav.problem": "Problema",
    "nav.solution": "Solución",
    "nav.forWho": "Para Quién",
    "nav.impact": "Impacto",
    "nav.demo": "Demo",
    "nav.contact": "Contacto",
    "nav.home": "Home",
    "nav.sme": "Dashboard SME",
    "nav.investor": "Dashboard Investor",
    "cta.start": "Comienza Ahora",

    // SME
    "sme.title": "Dashboard SME",
    "sme.subtitle": "Sube una factura → recibe USDC al instante → repago invisible al liquidarse.",
    "sme.upload": "Subir Factura",
    "sme.cashAvailable": "Cash Available",
    "sme.activeInvoices": "Facturas Activas",
    "sme.reputation": "Reputation Passport",
    "sme.yourInvoices": "Tus Facturas",
    "sme.goInvestor": "Ir al Dashboard Investor →",
    "common.view": "Ver",
    "label.invoice": "Factura",
    "sme.card.cashNote": "De la Factura #101 (adelanto 90%)",
    "sme.card.activeNote": "Creada / Financiada",
    "sme.card.reputationNote": "Historial de repago on-chain",

    // New Invoice
    "invoiceNew.title": "Subir Factura",
    "invoiceNew.subtitle": "UI demo: crea un token de factura + contrato escrow (simulado).",
    "invoiceNew.pdf": "PDF de la factura",
    "invoiceNew.amount": "Monto (USD)",
    "invoiceNew.country": "País",
    "invoiceNew.payer": "Pagador corporativo",
    "invoiceNew.cashInstant": "Liquidez instantánea (90%):",
    "invoiceNew.cashNote": "El repago es forzado por el split de Soroban al liquidarse.",
    "invoiceNew.create": "Crear Factura",

    // Invoice Detail
    "invoiceDetail.backSme": "← Volver al Dashboard SME",
    "invoiceDetail.stage": "Etapa",
    "invoiceDetail.bankAccount": "Cuenta bancaria \"invisible\"",
    "invoiceDetail.anchorNote": "Provista por un Anchor (simulado)",
    "invoiceDetail.advance": "Adelanto (90%)",
    "invoiceDetail.fromLiquidity": "De liquidity provider",
    "invoiceDetail.demoFlow": "Flujo Demo",
    "invoiceDetail.demoFlowDesc": "1) Crear factura → 2) Financiar con USDC → 3) Simular pago del Anchor → Soroban divide automáticamente.",
    "invoiceDetail.simFunding": "Simular Funding",
    "invoiceDetail.simSettle": "Simular Pago del Anchor (Liquidar)",
    "invoiceDetail.viewInvestor": "Ver como Investor →",
    "invoiceDetail.settlementTitle": "Settlement recibido on-chain. El contrato ejecutó el split:",
    "invoiceDetail.lender": "Lender",
    "invoiceDetail.sme": "SME",
    "invoiceDetail.lenderNote": "90% principal + fees (simulado)",
    "invoiceDetail.smeNote": "Saldo restante",

    // Investor
    "investor.title": "Dashboard Investor",
    "investor.subtitle": "Explora facturas y financia con USDC en un clic (demo).",
    "investor.backSme": "← Ir al Dashboard SME",
    "investor.marketplace": "Liquidity Pool Marketplace",
    "investor.marketplaceDesc": "Facturas verificadas (simulado). Financia adelantos al instante.",
    "investor.opportunity": "Oportunidad",
    "investor.amount": "Monto",
    "investor.advance": "Adelanto",
    "investor.fund": "Financiar",

    // Investor invoice
    "investorInvoice.back": "← Volver al Dashboard Investor",
    "investorInvoice.fundTitle": "Financia en un clic",
    "investorInvoice.fundDesc": "Demo: el funding setea stage=funded.",
    "investorInvoice.fundWith": "Financiar con USDC",
    "investorInvoice.funded": "Financiado",
    "investorInvoice.viewSme": "Ver liquidación como SME →",

    // Hero
    "hero.badge": "Powered by Stellar Soroban",
    "hero.title1": "Adelanta: Liquidez",
    "hero.titleAccent": "Instantánea",
    "hero.title2": "para tu Negocio",
    "hero.subtitle": "El primer protocolo de factoring programable en LATAM. Convierte tus facturas en efectivo inmediato usando contratos inteligentes, sin burocracia.",
    "hero.demo": "Ver Demo",
    "hero.more": "Leer Más",
    "hero.ui.invoice": "Factura #1024",
    "hero.ui.status": "Estado: Tokenizada",
    "hero.ui.funded": "Financiado: 100%",
    "hero.ui.powered": "Powered by Stellar",
    "hero.ui.withdraw": "Retirar Fondos",

    // Maria Story (Introduction)
    "story.title": "María, Diseñadora en Bogotá",
    "story.subtitle": "Acaba de entregar un proyecto de $10k. Pero no cobrará hasta marzo. Necesita pagar a su equipo hoy.",
    "story.problemHook": "Este es el problema número 1 de las PYMEs en LATAM.",

    // Problem & Solution
    "problem.title": "El Problema: $900B en Capital Atrapado",
    "problem.subtitle": "SMEs de LATAM esperan 60-90 días por pagos... y eso mata sus negocios.",
    "problem.wait": "Espera Prolongada",
    "problem.waitDesc": "Esperar 60-90 días para cobrar es normal en la industria, pero inaceptable para tu flujo de caja diario.",
    "problem.factoring": "Factoring Antiguo",
    "problem.factoringDesc": "El factoring tradicional requiere papeleo físico complejo que tus clientes corporativos simplemente rechazan.",
    "problem.trust": "Brecha de Confianza",
    "problem.trustDesc": "Los prestamistas no confían en si la PYME pagará cuando finalmente reciba el dinero. Requieren garantías offline complejas.",
    "problem.badge": "Déficit de financiamiento en LATAM: $900 Billones",

    "solution.badge": "Innovación",
    "solution.title": "La Solución: Factoring Programable",
    "solution.desc1": "Adelanta usa Smart Contracts en Stellar Soroban para crear \"Self-Settling Invoices\".",
    "solution.desc2": "Trust is Code. No paperwork. No middle man.",

    "steps.tokenize": "Tokenize",
    "steps.tokenizeDesc": "Sube tu invoice. Adelanta lo mintea como asset digital.",
    "steps.liquidity": "Instant Liquidity",
    "steps.liquidityDesc": "Provider financia 90% en USDC al instante.",
    "steps.settlement": "Smart Settlement",
    "steps.settlementDesc": "Cliente paga, Anchor convierte a USDC y activa contrato.",
    "steps.autosplit": "Auto-Split",
    "steps.autosplitDesc": "Contract repaga al lender + fee. Tú recibes el resto.",

    "stellar.title": "¿Por qué Stellar?",
    "stellar.subtitle": "La única blockchain lista para el mundo real en LATAM",
    "stellar.anchorTitle": "Anchor Interoperability (La Característica Clave)",
    "stellar.anchorDesc": "Solo en Stellar: una red de Anchors regulados (MoneyGram, Bitso, Anclap) que aceptan fiat local (MXN, COP, BRL) e emiten USDC. El cliente corporativo paga a una cuenta bancaria normal—nunca toca crypto. Nosotros manejamos la conversión y settlement on-chain. Otras cadenas no pueden hacer esto.",
    "stellar.sorobanTitle": "Soroban Smart Contracts (El Secreto Sauce)",
    "stellar.sorobanDesc": "Revenue split enforced by code. El dinero nunca toca tu wallet primero—el contrato automáticamente divide: 90% → lender (+ fee), resto → tú. Sin confianza requerida. El riesgo del lender es solo la solvencia del corporativo, no la tuya.",
    "stellar.fastTitle": "Low-Cost & Fast",
    "stellar.fastDesc": "Emitir tokens de factura cuesta fracciones de centavo. Finalidad en ~5 segundos vs horas en otras cadenas.",

    // Features & Target
    "features.title": "Características de Adelanta",
    "target.title": "¿Para quién es Adelanta?",
    "target.primaryTitle": "PYMEs & Freelancers (Como María)",
    "target.primaryDesc": "Agencias de diseño, desarrolladores, proveedores B2B que trabajan con corporativos grandes. Deja de esperar 60–90 días. Recibe tu dinero en horas, mantén el 100% de tu factura menos 2% de fee del protocolo.",
    "target.primaryCta": "Registrarse como SME",
    "target.secondaryTitle": "Liquidity Providers",
    "target.secondaryDesc": "Instituciones y buscadores de DeFi Yield. Gana 8–12% APY financiando facturas corporativas verificadas. Tu riesgo: solvencia del corporativo. No la honestidad de la PYME. Splits enforced by code = cero riesgo de contraparte.",
    "target.secondaryCta": "Convertirse en LP",

    // Impact
    "impact.title": "Scalability & Impact:",
    "impact.subtitle": "Unlock $900B Economy",
    "impact.modelTitle": "Modelo Agnóstico",
    "impact.modelDesc": "Escalable a cualquier país con un Stellar Anchor: México, Brasil, Argentina, Colombia, Perú.",
    "impact.realTitle": "Impacto Real",
    "impact.realDesc": "Resuelve la causa #1 de quiebra de PYMEs. Inyecta millones de regreso a la economía real, creando empleos y estabilidad.",
    "impact.gapLabel": "Financing Gap en LATAM",
    "impact.countries": "5 Países",
    "impact.countriesNote": "Objetivo Inicial",
    "impact.smes": "1M+",
    "impact.smesNote": "SMEs Potenciales",

    // Proof
    "proof.demoTitle": "Mira cómo funciona",
    "proof.demoCta": "Ver Demo Completo",
    "proof.compareTitle": "Adelanta vs. Factoring Tradicional",
    "proof.table.feature": "Característica",
    "proof.table.traditional": "Factoring Tradicional",
    "proof.table.adelanta": "Adelanta",
    "proof.roadmap": "Roadmap de Desarrollo",
    "proof.testimonials": "Lo que dicen los usuarios",
    "proof.mariaTesto": "Antes esperaba 90 días. Con Adelanta, tengo liquidez el mismo día. Salvó mi agencia.",
    "proof.mariaAuthor": "María G.",
    "proof.mariaRole": "Agencia de Diseño, Bogotá",
    "proof.carlosTesto": "La transparencia de los smart contracts nos da seguridad. El código no miente—el dinero se divide exactamente como se prometió.",
    "proof.carlosAuthor": "Carlos R.",
    "proof.carlosRole": "Inversor DeFi, México",
    "proof.earlyTracking": "Pilotos en 3 países | 50+ PYMEs | $2.5M en facturas tokenizadas",

    // Roadmap
    "roadmap.badge": "Roadmap de Desarrollo",
    "roadmap.subtitle": "Nuestro camino hacia revolucionar el factoring en LATAM con tecnología blockchain.",
    "roadmap.currentProgress": "MVP Completado - Contrato desplegado en Stellar Testnet",
    "roadmap.complete": "✓ Completado",
    "roadmap.upcoming": "Próximamente",
    
    // Phase 1
    "roadmap.phase1": "Fase 1",
    "roadmap.phase1Title": "MVP",
    "roadmap.phase1Item1": "Desarrollo de smart contract en Rust/Soroban",
    "roadmap.phase1Item2": "Despliegue del contrato en Stellar Testnet",
    "roadmap.phase1Item3": "Servidor API backend con Express",
    "roadmap.phase1Item4": "Dashboard frontend con Next.js",
    "roadmap.phase1Item5": "Flujo demo completo (crear → financiar → liquidar)",
    "roadmap.phase1Item6": "Soporte i18n (Español/Inglés)",
    
    // Phase 2
    "roadmap.phase2": "Fase 2",
    "roadmap.phase2Title": "Lanzamiento Beta",
    "roadmap.phase2Item1": "Integración de wallet Freighter",
    "roadmap.phase2Item2": "Integración real con Anchors (Anclap, Bitso)",
    "roadmap.phase2Item3": "Integración KYC/KYB vía partners",
    "roadmap.phase2Item4": "Primeras 100 PYMEs en México",
    
    // Phase 3
    "roadmap.phase3": "Fase 3",
    "roadmap.phase3Title": "Expansión de Mercado",
    "roadmap.phase3Item1": "Lanzamiento en Colombia y Brasil",
    "roadmap.phase3Item2": "Onboarding de LPs institucionales",
    "roadmap.phase3Item3": "Modelo de scoring de riesgo con IA",
    "roadmap.phase3Item4": "App móvil (React Native)",
    
    // Phase 4
    "roadmap.phase4": "Fase 4",
    "roadmap.phase4Title": "Escala",
    "roadmap.phase4Item1": "Despliegue en Stellar Mainnet",
    "roadmap.phase4Item2": "Expansión a Perú y Chile",
    "roadmap.phase4Item3": "Integraciones DeFi (lending pools)",
    "roadmap.phase4Item4": "Mercado secundario para tokens de facturas",

    // Conversion (Pricing/FAQ/CTA)
    "pricing.title": "Precios Transparentes",
    "pricing.subtitle": "Sin costos ocultos. Solo pagas cuando recibes liquidez.",
    "pricing.perInvoice": "/ factura",
    "pricing.recommended": "RECOMENDADO",
    "faq.title": "Preguntas Frecuentes",
    "cta.title": "¿Listo para desbloquear liquidez instantánea?",
    "cta.subtitle": "Únete a miles de SMEs en LATAM que ya usan Adelanta para crecer sin límites.",
    "cta.primary": "Empezar — Registrarse SME",
    "cta.secondary": "Convertirse en Liquidity Provider",

    // Footer
    "footer.tagline": "Trust is Code. Liquidity is Instant.\nRevolucionando el factoring en LATAM con Stellar Soroban.",
    "footer.product": "Producto",
    "footer.company": "Empresa",
    "footer.stay": "Mantente informado",
    "footer.newsletterDesc": "Recibe las últimas noticias del protocolo.",
    "footer.email": "tu@email.com",
    "footer.subscribe": "Suscribirse",
    "footer.rights": "Todos los derechos reservados.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Demo Links
    "demo.title": "Prueba los Dashboards en Vivo",
    "demo.subtitle": "Explora el flujo completo: crea facturas, financia como inversor, y ve el auto-split en acción.",
    "demo.smeTitle": "Dashboard SME",
    "demo.smeDesc": "Sube facturas, recibe adelantos USDC instantáneos, y ve tu Reputation Passport on-chain.",
    "demo.investorTitle": "Dashboard Investor",
    "demo.investorDesc": "Explora el marketplace de facturas verificadas y financia con un clic.",
    "demo.contractTitle": "Smart Contract",
    "demo.contractDesc": "Ve el contrato Soroban en Stellar Testnet. Verifica el auto-split y la lógica de settlement.",
    "demo.tryIt": "Probar Ahora",
    "demo.viewExplorer": "Ver en Explorer",
    "demo.createInvoice": "Crear Factura Demo",
    "demo.viewContract": "Ver Contrato en Stellar Expert",

    // Stages
    "stage.created": "Creada",
    "stage.funded": "Financiada",
    "stage.settled": "Liquidada",
  },
  en: {
    // Global
    "lang.label": "Language",
    "lang.es": "Español",
    "lang.en": "English",

    // Header
    "nav.problem": "Problem",
    "nav.solution": "Solution",
    "nav.forWho": "For Who",
    "nav.impact": "Impact",
    "nav.demo": "Demo",
    "nav.contact": "Contact",
    "nav.home": "Home",
    "nav.sme": "SME Dashboard",
    "nav.investor": "Investor Dashboard",
    "cta.start": "Get Started",

    // SME
    "sme.title": "SME Dashboard",
    "sme.subtitle": "Upload an invoice → get instant USDC → invisible repayment on settlement.",
    "sme.upload": "Upload Invoice",
    "sme.cashAvailable": "Cash Available",
    "sme.activeInvoices": "Active Invoices",
    "sme.reputation": "Reputation Passport",
    "sme.yourInvoices": "Your Invoices",
    "sme.goInvestor": "Go to Investor Dashboard →",
    "common.view": "View",
    "label.invoice": "Invoice",
    "sme.card.cashNote": "From Invoice #101 (90% advance)",
    "sme.card.activeNote": "Created / Funded",
    "sme.card.reputationNote": "On-chain repayment history",

    // New Invoice
    "invoiceNew.title": "Upload Invoice",
    "invoiceNew.subtitle": "Demo UI: creates an invoice token + escrow contract (simulated).",
    "invoiceNew.pdf": "Invoice PDF",
    "invoiceNew.amount": "Amount (USD)",
    "invoiceNew.country": "Country",
    "invoiceNew.payer": "Corporate Payer",
    "invoiceNew.cashInstant": "Instant liquidity (90%):",
    "invoiceNew.cashNote": "Repayment is enforced by Soroban split at settlement.",
    "invoiceNew.create": "Create Invoice",

    // Invoice Detail
    "invoiceDetail.backSme": "← Back to SME Dashboard",
    "invoiceDetail.stage": "Stage",
    "invoiceDetail.bankAccount": "\"Invisible\" bank account",
    "invoiceDetail.anchorNote": "Provided by an Anchor (simulated)",
    "invoiceDetail.advance": "Advance (90%)",
    "invoiceDetail.fromLiquidity": "From liquidity provider",
    "invoiceDetail.demoFlow": "Demo Flow",
    "invoiceDetail.demoFlowDesc": "1) Create invoice → 2) Fund with USDC → 3) Simulate Anchor payment → Soroban splits automatically.",
    "invoiceDetail.simFunding": "Simulate Funding",
    "invoiceDetail.simSettle": "Simulate Anchor Payment (Settle)",
    "invoiceDetail.viewInvestor": "View as Investor →",
    "invoiceDetail.settlementTitle": "Settlement received on-chain. Contract executed revenue split:",
    "invoiceDetail.lender": "Lender",
    "invoiceDetail.sme": "SME",
    "invoiceDetail.lenderNote": "90% principal + fees (simulated)",
    "invoiceDetail.smeNote": "Remaining balance",

    // Investor
    "investor.title": "Investor Dashboard",
    "investor.subtitle": "Browse invoices and fund with USDC in one click (demo).",
    "investor.backSme": "← Go to SME Dashboard",
    "investor.marketplace": "Liquidity Pool Marketplace",
    "investor.marketplaceDesc": "Verified invoices (simulated). Fund advances instantly.",
    "investor.opportunity": "Opportunity",
    "investor.amount": "Amount",
    "investor.advance": "Advance",
    "investor.fund": "Fund",

    // Investor invoice
    "investorInvoice.back": "← Back to Investor Dashboard",
    "investorInvoice.fundTitle": "Fund in One Click",
    "investorInvoice.fundDesc": "Demo: funding sets stage=funded.",
    "investorInvoice.fundWith": "Fund with USDC",
    "investorInvoice.funded": "Funded",
    "investorInvoice.viewSme": "View settlement as SME →",

    // Hero
    "hero.badge": "Powered by Stellar Soroban",
    "hero.title1": "Adelanta:",
    "hero.titleAccent": "Instant",
    "hero.title2": "Liquidity for Your Business",
    "hero.subtitle": "The first programmable factoring protocol in LATAM. Turn invoices into instant cash using smart contracts, without bureaucracy.",
    "hero.demo": "Watch Demo",
    "hero.more": "Learn More",
    "hero.ui.invoice": "Invoice #1024",
    "hero.ui.status": "Status: Tokenized",
    "hero.ui.funded": "Funded: 100%",
    "hero.ui.powered": "Powered by Stellar",
    "hero.ui.withdraw": "Withdraw Funds",

    // Maria Story (Introduction)
    "story.title": "Meet María, a Designer in Bogotá",
    "story.subtitle": "She just finished a $10k project. But she won't get paid until March. She needs to pay her team today.",
    "story.problemHook": "This is the #1 problem for SMEs across LATAM.",

    // Problem & Solution
    "problem.title": "The Problem: $900B in Trapped Capital",
    "problem.subtitle": "LATAM SMEs wait 60–90 days to get paid... and that kills cash flow.",
    "problem.wait": "Long Wait Times",
    "problem.waitDesc": "Waiting 60–90 days is common, but unacceptable for day-to-day cash flow.",
    "problem.factoring": "Legacy Factoring",
    "problem.factoringDesc": "Traditional factoring requires complex paperwork that corporate clients refuse to sign.",
    "problem.trust": "Trust Gap",
    "problem.trustDesc": "Lenders don't trust the SME to repay once the invoice is paid. They demand complex offline guarantees.",
    "problem.badge": "LATAM Financing Gap: $900B",

    "solution.badge": "Innovation",
    "solution.title": "The Solution: Programmable Factoring",
    "solution.desc1": "Adelanta uses Stellar Soroban smart contracts to create \"Self-Settling Invoices\".",
    "solution.desc2": "Trust is Code. No paperwork. No middleman.",

    "steps.tokenize": "Tokenize",
    "steps.tokenizeDesc": "Upload your invoice. Adelanta mints it as a digital asset.",
    "steps.liquidity": "Instant Liquidity",
    "steps.liquidityDesc": "A provider funds 90% in USDC instantly.",
    "steps.settlement": "Smart Settlement",
    "steps.settlementDesc": "Client pays, an Anchor converts to USDC and triggers the contract.",
    "steps.autosplit": "Auto-Split",
    "steps.autosplitDesc": "Contract repays the lender + fee. You receive the remainder.",

    "stellar.title": "Why Stellar?",
    "stellar.subtitle": "The only blockchain ready for the real world in LATAM",
    "stellar.anchorTitle": "Anchor Interoperability (The Killer Feature)",
    "stellar.anchorDesc": "Only on Stellar: a live network of regulated Anchors (MoneyGram, Bitso, Anclap) accepts local fiat (MXN, COP, BRL) and issues USDC. Corporate clients pay to a normal bank account—they never touch crypto. We handle the conversion and settlement on-chain. Other chains cannot do this.",
    "stellar.sorobanTitle": "Soroban Smart Contracts (The Secret Sauce)",
    "stellar.sorobanDesc": "Revenue split enforced by code. Funds never hit your wallet first—the contract automatically splits: 90% → lender (+ fee), remainder → you. No trust needed. Lender's risk is only on the corporate payer's solvency, not on you.",
    "stellar.fastTitle": "Low-Cost & Fast",
    "stellar.fastDesc": "Issuing invoice tokens costs fractions of a cent. Finality in ~5 seconds vs hours on other chains.",

    // Features & Target
    "features.title": "Adelanta Features",
    "target.title": "Who is Adelanta for?",
    "target.primaryTitle": "SMEs & Freelancers (Like María)",
    "target.primaryDesc": "Design agencies, developers, and B2B suppliers working with large corporates. Stop waiting 60–90 days. Get paid in hours, keep 100% of your invoice value minus 2% protocol fee.",
    "target.primaryCta": "Sign up as SME",
    "target.secondaryTitle": "Liquidity Providers",
    "target.secondaryDesc": "Institutions and DeFi yield seekers. Earn 8–12% APY by funding verified corporate invoices. Your risk: the corporate payer's solvency. Not the SME's honesty. Code-enforced splits = zero counterparty risk.",
    "target.secondaryCta": "Become an LP",

    // Impact
    "impact.title": "Scalability & Impact:",
    "impact.subtitle": "Unlock $900B Economy",
    "impact.modelTitle": "Country-Agnostic Model",
    "impact.modelDesc": "Scales to any country with a Stellar Anchor: Mexico, Brazil, Argentina, Colombia, Peru.",
    "impact.realTitle": "Real Impact",
    "impact.realDesc": "Solves the #1 cause of SME bankruptcy (cash flow). Injects capital back into the real economy, creating jobs and stability.",
    "impact.gapLabel": "LATAM Financing Gap",
    "impact.countries": "5 Countries",
    "impact.countriesNote": "Initial Target",
    "impact.smes": "1M+",
    "impact.smesNote": "Potential SMEs",

    // Proof
    "proof.demoTitle": "See how it works",
    "proof.demoCta": "Watch Full Demo",
    "proof.compareTitle": "Adelanta vs. Traditional Factoring",
    "proof.table.feature": "Feature",
    "proof.table.traditional": "Traditional Factoring",
    "proof.table.adelanta": "Adelanta",
    "proof.roadmap": "Development Roadmap",
    "proof.testimonials": "What users say",
    "proof.mariaTesto": "I used to wait 90 days. With Adelanta, I have liquidity the same day. It saved my agency.",
    "proof.mariaAuthor": "María G.",
    "proof.mariaRole": "Design Agency, Bogotá",
    "proof.carlosTesto": "Smart contract transparency gives us confidence. Code doesn't lie—the money splits exactly as promised.",
    "proof.carlosAuthor": "Carlos R.",
    "proof.carlosRole": "DeFi Investor, Mexico",
    "proof.earlyTracking": "3-country pilots | 50+ SMEs | $2.5M invoices tokenized",

    // Roadmap
    "roadmap.badge": "Development Roadmap",
    "roadmap.subtitle": "Our path to revolutionizing factoring in LATAM with blockchain technology.",
    "roadmap.currentProgress": "MVP Complete - Contract deployed on Stellar Testnet",
    "roadmap.complete": "✓ Complete",
    "roadmap.upcoming": "Upcoming",
    
    // Phase 1
    "roadmap.phase1": "Phase 1",
    "roadmap.phase1Title": "MVP",
    "roadmap.phase1Item1": "Smart contract development in Rust/Soroban",
    "roadmap.phase1Item2": "Contract deployment to Stellar Testnet",
    "roadmap.phase1Item3": "Backend API server with Express",
    "roadmap.phase1Item4": "Frontend dashboard with Next.js",
    "roadmap.phase1Item5": "Complete demo flow (create → fund → settle)",
    "roadmap.phase1Item6": "i18n support (Spanish/English)",
    
    // Phase 2
    "roadmap.phase2": "Phase 2",
    "roadmap.phase2Title": "Beta Launch",
    "roadmap.phase2Item1": "Freighter wallet integration",
    "roadmap.phase2Item2": "Real Anchor integration (Anclap, Bitso)",
    "roadmap.phase2Item3": "KYC/KYB integration via partners",
    "roadmap.phase2Item4": "First 100 SMEs onboarding (Mexico)",
    
    // Phase 3
    "roadmap.phase3": "Phase 3",
    "roadmap.phase3Title": "Market Expansion",
    "roadmap.phase3Item1": "Colombia & Brazil market launch",
    "roadmap.phase3Item2": "Institutional LP onboarding",
    "roadmap.phase3Item3": "AI-powered risk scoring model",
    "roadmap.phase3Item4": "Mobile app (React Native)",
    
    // Phase 4
    "roadmap.phase4": "Phase 4",
    "roadmap.phase4Title": "Scale",
    "roadmap.phase4Item1": "Stellar Mainnet deployment",
    "roadmap.phase4Item2": "Peru and Chile expansion",
    "roadmap.phase4Item3": "DeFi integrations (lending pools)",
    "roadmap.phase4Item4": "Secondary market for invoice tokens",

    // Conversion (Pricing/FAQ/CTA)
    "pricing.title": "Transparent Pricing",
    "pricing.subtitle": "No hidden costs. You only pay when you receive liquidity.",
    "pricing.perInvoice": "/ invoice",
    "pricing.recommended": "RECOMMENDED",
    "faq.title": "Frequently Asked Questions",
    "cta.title": "Ready to unlock instant liquidity?",
    "cta.subtitle": "Join thousands of SMEs across LATAM using Adelanta to grow without limits.",
    "cta.primary": "Get Started — SME Sign Up",
    "cta.secondary": "Become a Liquidity Provider",

    // Footer
    "footer.tagline": "Trust is Code. Liquidity is Instant.\nRevolutionizing factoring in LATAM with Stellar Soroban.",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.stay": "Stay in the loop",
    "footer.newsletterDesc": "Get the latest protocol updates.",
    "footer.email": "you@email.com",
    "footer.subscribe": "Subscribe",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Demo Links
    "demo.title": "Try the Live Dashboards",
    "demo.subtitle": "Explore the full flow: create invoices, fund as investor, and see auto-split in action.",
    "demo.smeTitle": "SME Dashboard",
    "demo.smeDesc": "Upload invoices, receive instant USDC advances, and view your on-chain Reputation Passport.",
    "demo.investorTitle": "Investor Dashboard",
    "demo.investorDesc": "Browse the verified invoice marketplace and fund with one click.",
    "demo.contractTitle": "Smart Contract",
    "demo.contractDesc": "View the Soroban contract on Stellar Testnet. Verify the auto-split and settlement logic.",
    "demo.tryIt": "Try Now",
    "demo.viewExplorer": "View on Explorer",
    "demo.createInvoice": "Create Demo Invoice",
    "demo.viewContract": "View Contract on Stellar Expert",

    // Stages
    "stage.created": "Created",
    "stage.funded": "Funded",
    "stage.settled": "Settled",
  },
} satisfies Record<Locale, Record<string, string>>;

export function translate(locale: Locale, key: string): string {
  const dict = translations[locale] as Record<string, string> | undefined;
  const fallback = translations[DEFAULT_LOCALE] as Record<string, string> | undefined;
  return dict?.[key] ?? fallback?.[key] ?? key;
}
