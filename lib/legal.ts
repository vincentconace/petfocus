import type { Localized } from "./services";

/**
 * Privacy Policy and Terms of Service, as data.
 *
 * Same model as `lib/services.ts`: the documents are content, the renderer is
 * `components/LegalBody.tsx`, and nothing here is markup. Adding a clause is
 * one entry in a `blocks` array.
 *
 * ── Provenance ───────────────────────────────────────────────────────────
 * WRITTEN BY US, not the client, and NOT REVIEWED BY A LAWYER. It is modelled
 * on what comparable US veterinary practices publish, and on three things that
 * actually apply to this business:
 *
 *   1. Utah Code § 58-28-605 (Veterinary Practice Act) — a veterinarian may
 *      not disclose information about the care of an animal to anyone but the
 *      client, except with written consent, to protect animal or public
 *      health, under court order or subpoena, or where the client has put the
 *      care at issue in a proceeding. The Privacy Policy tracks that rule.
 *   2. A2P 10DLC / TCPA — carriers check for a published SMS consent and
 *      opt-out disclosure before approving a business number for texting, and
 *      "call or text 385-381-9161" is the site's primary call to action.
 *   3. What this site technically does, which is very little: static pages,
 *      no accounts, no forms, no analytics, no advertising cookies. The
 *      Privacy Policy says so rather than reciting boilerplate about data we
 *      do not collect.
 *
 * Spanish is our translation, like the rest of the site, and has not been
 * reviewed by the client.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Facts the documents need that nobody has confirmed yet.
 *
 * Blank means the line is not rendered — the same pattern `Footer`'s
 * SOCIAL_LINKS uses. Nothing is invented to fill a gap: a policy with a
 * made-up mailing address is worse than one with none.
 *
 * BEFORE PUBLISHING, get from the client:
 *   legalName  the registered entity. "PetFocus" is the brand; the LLC or PC
 *              behind it is what belongs in a contract.
 *   email      hello@petfocus.com is unverified (see README).
 *   address    a mailing address for records and privacy requests.
 *   And confirm `POLICY` below is the policy they actually want to enforce.
 */
export const ORG = {
  /** Shown wherever the documents need to name the contracting party. */
  legalName: "PetFocus",
  tradeName: "PetFocus Mobile Veterinary Service",
  phone: "385-381-9161",
  phoneHref: "tel:+13853819161",
  smsHref: "sms:+13853819161",
  email: "",
  address: "",
  state: { en: "Utah", es: "Utah" },
} as const;

/**
 * The service policies the Terms describe. Numbers live here rather than
 * inside a sentence so that changing one does not mean editing two languages
 * of prose and hoping they stay in agreement.
 */
export const POLICY = {
  /** Notice we ask for before a cancellation. */
  cancelNoticeHours: 24,
  /** Age of the adult who has to be present for a visit. */
  minAdultAge: 18,
  /** Cap on website-only liability claims, in whole dollars. */
  siteLiabilityCapUsd: 100,
  /** Days we commit to answering a privacy request in. */
  privacyResponseDays: 45,
} as const;

/** Last substantive revision. Shown at the top of both documents. */
export const LEGAL_UPDATED = {
  iso: "2026-09-18",
  label: {
    en: "September 18, 2026",
    es: "18 de septiembre de 2026",
  },
} as const;

export type LegalBlock =
  /** A paragraph. */
  | { kind: "p"; text: Localized }
  /** A bulleted list, optionally introduced by a lead-in paragraph. */
  | { kind: "ul"; lead?: Localized; items: Localized[] }
  /** Set apart with a rule and a tint. Used sparingly — emergencies, mostly. */
  | { kind: "callout"; text: Localized };

export type LegalSection = {
  /** Anchor and table-of-contents key. Stable: these get linked to. */
  id: string;
  heading: Localized;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  id: "privacy" | "terms";
  title: Localized;
  tagline: Localized;
  /** The plain-language summary that opens the page. */
  summary: Localized[];
  sections: LegalSection[];
};

const p = (en: string, es: string): LegalBlock => ({ kind: "p", text: { en, es } });
const callout = (en: string, es: string): LegalBlock => ({
  kind: "callout",
  text: { en, es },
});
const ul = (
  items: [string, string][],
  lead?: [string, string]
): LegalBlock => ({
  kind: "ul",
  lead: lead ? { en: lead[0], es: lead[1] } : undefined,
  items: items.map(([en, es]) => ({ en, es })),
});

/* ═══════════════════════════════════════════════════════════════════════
   PRIVACY POLICY
   ═══════════════════════════════════════════════════════════════════════ */

export const PRIVACY: LegalDoc = {
  id: "privacy",
  title: { en: "Privacy Policy", es: "Política de Privacidad" },
  tagline: {
    en: "What we do with your information and your pet's records.",
    es: "Qué hacemos con su información y con el historial de su mascota.",
  },
  summary: [
    {
      en: "We collect what we need to bring a veterinary visit to your door, and not much else.",
      es: "Recopilamos lo que necesitamos para llevar una visita veterinaria a su puerta, y poco más.",
    },
    {
      en: "This website has no accounts, no forms, and no advertising or analytics trackers.",
      es: "Este sitio no tiene cuentas, ni formularios, ni rastreadores de publicidad o analítica.",
    },
    {
      en: "Your pet's medical record is confidential under Utah law. It goes to another clinic when you tell us in writing to send it, or when the law requires it — not otherwise.",
      es: "El historial médico de su mascota es confidencial según la ley de Utah. Se envía a otra clínica cuando usted nos lo pide por escrito, o cuando la ley lo exige — no en otros casos.",
    },
    {
      en: "We do not sell your information, and we never share your phone number or your consent to be texted with anyone for their own marketing.",
      es: "No vendemos su información, y nunca compartimos su número de teléfono ni su consentimiento para recibir mensajes con nadie para su propia publicidad.",
    },
    {
      en: "Reply STOP to any text from us and the texts stop.",
      es: "Responda STOP a cualquier mensaje nuestro y los mensajes se detienen.",
    },
  ],
  sections: [
    {
      id: "scope",
      heading: { en: "Who this covers", es: "A quién cubre" },
      blocks: [
        p(
          "PetFocus is a mobile veterinary service. We treat pets at home across Davis, Salt Lake, Tooele and Utah counties. This policy explains what we do with the information you give us through this website, over the phone, by text, and as our client.",
          "PetFocus es un servicio veterinario móvil. Atendemos mascotas a domicilio en los condados de Davis, Salt Lake, Tooele y Utah. Esta política explica qué hacemos con la información que usted nos da a través de este sitio, por teléfono, por mensaje de texto y como cliente nuestro."
        ),
        p(
          "It does not cover other companies. The laboratories, pharmacies, referral hospitals, payment processors and websites we link to each have their own notices, and those are theirs to keep.",
          "No cubre a otras empresas. Los laboratorios, farmacias, hospitales de referencia, procesadores de pago y sitios web a los que enlazamos tienen sus propias políticas, y esas les corresponden a ellos."
        ),
      ],
    },
    {
      id: "collect",
      heading: { en: "What we collect", es: "Qué recopilamos" },
      blocks: [
        ul(
          [
            [
              "Contact and visit details you give us when you call or text: your name, your phone number, your email if you send one, the address we are driving to, and any access notes — the gate code, where to park, which door.",
              "Datos de contacto y de la visita que usted nos da cuando llama o escribe: su nombre, su teléfono, su correo si nos lo envía, la dirección a la que vamos a conducir y las indicaciones de acceso — el código del portón, dónde estacionar, qué puerta.",
            ],
            [
              "Your pet's record: species, breed, age, sex, weight, history, what we find on examination, laboratory and imaging results, diagnoses, treatments, medications dispensed, vaccinations, and our notes from the visit.",
              "El historial de su mascota: especie, raza, edad, sexo, peso, antecedentes, lo que encontramos en el examen, resultados de laboratorio e imágenes, diagnósticos, tratamientos, medicamentos dispensados, vacunas y nuestras notas de la visita.",
            ],
            [
              "What we need to take payment at the visit. Card payments are handled by our payment processor; we do not keep full card numbers.",
              "Lo necesario para cobrar en la visita. Los pagos con tarjeta los procesa nuestro procesador de pagos; nosotros no guardamos los números completos de tarjeta.",
            ],
            [
              "The standard server logs our website host keeps — IP address, browser, pages requested, timestamps — which every website generates automatically when a page is served.",
              "Los registros de servidor habituales que guarda el proveedor que aloja el sitio — dirección IP, navegador, páginas solicitadas, fecha y hora — que todo sitio web genera automáticamente al servir una página.",
            ],
          ],
          [
            "The information we hold falls into four groups.",
            "La información que tenemos se divide en cuatro grupos.",
          ]
        ),
      ],
    },
    {
      id: "website",
      heading: {
        en: "What this website does, and does not, do",
        es: "Qué hace, y qué no hace, este sitio",
      },
      blocks: [
        p(
          "This is a static informational site. There is no client account, no online booking and no contact form. Every call to action here dials or texts our phone number, which means nothing you type gets submitted to us through this site at all.",
          "Este es un sitio informativo estático. No hay cuentas de cliente, ni reservas en línea, ni formulario de contacto. Cada botón de acción llama o envía un mensaje a nuestro número, así que nada de lo que usted escriba se nos envía a través de este sitio."
        ),
        p(
          "We do not run analytics, advertising trackers or remarketing pixels here. There is no cookie banner because there are no cookies to consent to. If that ever changes, this section changes with it and the date at the top of this page moves.",
          "No usamos analítica, rastreadores publicitarios ni píxeles de remarketing. No hay aviso de cookies porque no hay cookies que consentir. Si eso cambia algún día, esta sección cambia con ello y la fecha al principio de esta página se actualiza."
        ),
        p(
          "The only thing we store in your browser is whether you prefer light or dark mode, saved under the key petfocus_theme in your browser's own local storage. It never leaves your device and we cannot read it from our servers. Your choice of language is in the address of the page — /en/ or /es/ — not in a cookie.",
          "Lo único que guardamos en su navegador es si prefiere el modo claro u oscuro, bajo la clave petfocus_theme en el almacenamiento local de su propio navegador. Nunca sale de su dispositivo y no podemos leerlo desde nuestros servidores. Su idioma está en la dirección de la página — /en/ o /es/ — no en una cookie."
        ),
      ],
    },
    {
      id: "sms",
      heading: { en: "Text messages", es: "Mensajes de texto" },
      blocks: [
        p(
          "Our number takes both calls and texts, and texting is how most of our clients reach us. Here is exactly how we treat that.",
          "Nuestro número recibe llamadas y mensajes de texto, y escribir es la forma en que la mayoría de nuestros clientes nos contacta. Así es exactamente como lo manejamos."
        ),
        ul([
          [
            "You opt in by texting us first, or by telling us during a visit that we may text you. We do not buy phone numbers and we do not text people who have not asked us to.",
            "Usted acepta al escribirnos primero, o al decirnos durante una visita que podemos enviarle mensajes. No compramos números de teléfono ni escribimos a quien no nos lo ha pedido.",
          ],
          [
            "What we send is about your pet: appointment confirmations, arrival windows, reminders, results, follow-up questions and billing. How often depends on what your pet needs; there is no fixed schedule.",
            "Lo que enviamos es sobre su mascota: confirmaciones de cita, franjas de llegada, recordatorios, resultados, seguimiento y facturación. La frecuencia depende de lo que su mascota necesite; no hay un calendario fijo.",
          ],
          [
            "Reply STOP to any message to stop receiving them, or HELP for help — or simply call us and ask. Message and data rates may apply, depending on your plan.",
            "Responda STOP a cualquier mensaje para dejar de recibirlos, o HELP para obtener ayuda — o simplemente llámenos y pídalo. Pueden aplicarse tarifas de mensajes y datos, según su plan.",
          ],
          [
            "Your mobile number, your consent to be texted, and our record of that consent are never sold, rented or shared with third parties or affiliates for their own marketing. They go no further than the people and the systems that carry the message.",
            "Su número móvil, su consentimiento para recibir mensajes y nuestro registro de ese consentimiento nunca se venden, alquilan ni comparten con terceros ni con afiliados para su propia publicidad. No van más allá de las personas y los sistemas que entregan el mensaje.",
          ],
          [
            "Text is not an emergency channel. Nobody watches it around the clock.",
            "El mensaje de texto no es un canal de emergencia. Nadie lo vigila las 24 horas.",
          ],
        ]),
      ],
    },
    {
      id: "use",
      heading: { en: "How we use it", es: "Cómo la usamos" },
      blocks: [
        ul([
          [
            "To schedule, route and carry out home visits.",
            "Para agendar, planificar rutas y realizar las visitas a domicilio.",
          ],
          [
            "To examine, diagnose and treat your pet, and to decide with you what happens next.",
            "Para examinar, diagnosticar y tratar a su mascota, y para decidir con usted qué sigue.",
          ],
          [
            "To keep the medical records a licensed veterinary practice is required to keep.",
            "Para mantener los registros médicos que una práctica veterinaria licenciada está obligada a conservar.",
          ],
          [
            "To reach you about your pet — confirmations, reminders, results, follow-up.",
            "Para comunicarnos con usted sobre su mascota — confirmaciones, recordatorios, resultados, seguimiento.",
          ],
          [
            "To send estimates, take payment and keep accounts.",
            "Para enviar presupuestos, cobrar y llevar la contabilidad.",
          ],
          [
            "To meet legal obligations, including reporting rabies vaccinations and animal bites to public health authorities where that is required.",
            "Para cumplir obligaciones legales, incluido reportar vacunas antirrábicas y mordeduras a las autoridades de salud pública cuando corresponde.",
          ],
        ]),
        p(
          "We do not use your information to build advertising profiles, and we do not sell it.",
          "No usamos su información para construir perfiles publicitarios, y no la vendemos."
        ),
      ],
    },
    {
      id: "share",
      heading: { en: "When we share it", es: "Cuándo la compartimos" },
      blocks: [
        ul(
          [
            [
              "People involved in your pet's care: outside laboratories, specialists we consult, pharmacies filling a prescription we wrote, the referral or emergency hospital taking over a case, and microchip registries.",
              "Quienes participan en la atención de su mascota: laboratorios externos, especialistas a quienes consultamos, farmacias que preparan una receta nuestra, el hospital de referencia o de emergencia que toma el caso, y los registros de microchip.",
            ],
            [
              "Service providers who run part of our operation — records and scheduling software, our payment processor, our website host — under contracts that limit them to doing that work for us.",
              "Proveedores que operan parte de nuestro servicio — el software de historiales y agenda, el procesador de pagos, el proveedor que aloja el sitio — bajo contratos que los limitan a hacer ese trabajo para nosotros.",
            ],
            [
              "Public health, animal health and agricultural officials, where disclosure is required or is necessary to protect an animal or the public.",
              "Autoridades de salud pública, sanidad animal y agricultura, cuando la divulgación es obligatoria o necesaria para proteger a un animal o al público.",
            ],
            [
              "In response to a court order or a subpoena.",
              "En respuesta a una orden judicial o a una citación.",
            ],
            [
              "If the practice is ever sold or merged, to the buyer — still subject to this policy.",
              "Si la práctica llegara a venderse o fusionarse, al comprador — sujeto igualmente a esta política.",
            ],
          ],
          [
            "We share only what a given recipient needs, and only in these situations:",
            "Compartimos solo lo que cada destinatario necesita, y solo en estas situaciones:",
          ]
        ),
        p(
          "Utah law is specific about this. Under the Utah Veterinary Practice Act (Utah Code § 58-28-605), a veterinarian may not disclose information about the care of an animal to anyone other than the client, except with the client's written consent, where disclosure is required or is needed to protect animal or public health, under court order or subpoena, or where the client has put that care at issue in a civil or criminal proceeding. That is the rule we work to.",
          "La ley de Utah es específica en esto. Según la Ley de Práctica Veterinaria de Utah (Utah Code § 58-28-605), un veterinario no puede divulgar información sobre la atención de un animal a nadie más que al cliente, salvo con el consentimiento escrito del cliente, cuando la divulgación es obligatoria o necesaria para proteger la salud animal o pública, por orden judicial o citación, o cuando el cliente ha puesto esa atención en discusión en un proceso civil o penal. Esa es la regla con la que trabajamos."
        ),
      ],
    },
    {
      id: "records",
      heading: { en: "Your pet's records", es: "El historial de su mascota" },
      blocks: [
        p(
          "The record belongs to the practice; the information in it is yours to have. Call or text and we will send you a copy, or send it straight to another clinic once you have given us written permission. We do not charge for a records transfer.",
          "El historial pertenece a la práctica; la información que contiene es suya. Llame o escriba y le enviamos una copia, o la enviamos directamente a otra clínica en cuanto usted nos dé permiso por escrito. No cobramos por transferir un historial."
        ),
        p(
          "If something in it is wrong — a misspelled name, the wrong date of birth, a pet that is not yours — tell us and we will correct it. Clinical findings and professional notes stay as they were written; that is what makes a medical record a record. We can add your account of events alongside them.",
          "Si algo está mal — un nombre mal escrito, una fecha de nacimiento equivocada, una mascota que no es suya — díganoslo y lo corregimos. Los hallazgos clínicos y las notas profesionales quedan tal como se escribieron; eso es lo que hace que un historial médico sea un historial. Podemos agregar su versión de los hechos junto a ellos."
        ),
      ],
    },
    {
      id: "hipaa",
      heading: {
        en: "HIPAA does not apply here — this does",
        es: "HIPAA no aplica aquí — esto sí",
      },
      blocks: [
        p(
          "HIPAA covers human health information. Your pet's medical record is not protected health information, and no veterinary practice is a HIPAA covered entity for it. What governs us instead is the confidentiality rule in the Utah Veterinary Practice Act, the record-keeping rules of the Utah Division of Professional Licensing, and this policy.",
          "HIPAA cubre información de salud humana. El historial médico de su mascota no es información de salud protegida, y ninguna práctica veterinaria es una entidad cubierta por HIPAA respecto de él. Lo que nos rige es la regla de confidencialidad de la Ley de Práctica Veterinaria de Utah, las normas de conservación de registros de la División de Licencias Profesionales de Utah (DOPL) y esta política."
        ),
      ],
    },
    {
      id: "choices",
      heading: { en: "Your choices", es: "Sus opciones" },
      blocks: [
        ul([
          [
            "Texts: reply STOP and they end. Calls and email about your pet's care continue unless you ask us to stop those too.",
            "Mensajes de texto: responda STOP y se detienen. Las llamadas y los correos sobre la atención de su mascota continúan, a menos que también nos pida detenerlos.",
          ],
          [
            "Marketing: we send very little of it. Ask, and you are off that list while staying a client.",
            "Publicidad: enviamos muy poca. Pídalo y lo sacamos de esa lista sin dejar de ser cliente.",
          ],
          [
            "A copy of what we hold about you and your pet: ask, and we will give it to you.",
            "Una copia de lo que tenemos sobre usted y su mascota: pídala y se la damos.",
          ],
          [
            "Deletion: we cannot delete a medical record on request — a licensed practice has to keep it for as long as the law requires. Information we are not required to keep, we will delete.",
            "Eliminación: no podemos borrar un historial médico a pedido — una práctica licenciada debe conservarlo mientras la ley lo exija. La información que no estamos obligados a conservar sí la eliminamos.",
          ],
        ]),
        p(
          `Utah's Consumer Privacy Act gives Utah residents rights over their personal data, and applies to companies above a revenue threshold a practice this size does not meet. We would rather honour a reasonable request than argue about whether we have to, so ask. We will answer within ${POLICY.privacyResponseDays} days.`,
          `La Ley de Privacidad del Consumidor de Utah otorga derechos a los residentes de Utah sobre sus datos personales, y se aplica a empresas por encima de un umbral de ingresos que una práctica de este tamaño no alcanza. Preferimos atender una solicitud razonable antes que discutir si estamos obligados, así que pídalo. Responderemos en un plazo de ${POLICY.privacyResponseDays} días.`
        ),
      ],
    },
    {
      id: "security",
      heading: { en: "How we protect it", es: "Cómo la protegemos" },
      blocks: [
        p(
          "Records live in access-controlled software. The devices and paperwork that travel in the mobile unit are locked or encrypted. Access is limited to the team members who need it to do their work.",
          "Los historiales están en software con control de acceso. Los dispositivos y papeles que viajan en la unidad móvil van bajo llave o cifrados. El acceso se limita a los miembros del equipo que lo necesitan para trabajar."
        ),
        p(
          "No system is perfect, and anyone who tells you otherwise is selling something. If a breach ever affects your information, we will tell you — promptly, and in plain language.",
          "Ningún sistema es perfecto, y quien le diga lo contrario le está vendiendo algo. Si alguna vez una filtración afecta su información, se lo diremos — pronto y en lenguaje claro."
        ),
      ],
    },
    {
      id: "retention",
      heading: { en: "How long we keep it", es: "Cuánto tiempo la conservamos" },
      blocks: [
        p(
          "Medical records are kept for at least as long as the Utah rules for a licensed veterinary practice require, and usually longer, because an old record is often what explains a new problem. Billing records follow the periods tax and accounting law set. Everything else we keep while it is useful, and then delete.",
          "Los historiales médicos se conservan al menos el tiempo que exigen las normas de Utah para una práctica veterinaria licenciada, y por lo general más, porque un historial antiguo suele ser lo que explica un problema nuevo. Los registros de facturación siguen los plazos que fijan las leyes fiscales y contables. Todo lo demás lo conservamos mientras sea útil, y después lo eliminamos."
        ),
      ],
    },
    {
      id: "children",
      heading: { en: "Children", es: "Menores de edad" },
      blocks: [
        p(
          "This site and our service are meant for adults arranging care for their animals. Nothing here is directed at children, and we do not knowingly collect information from anyone under 13. If you believe a child has given us information, call us and we will remove it.",
          "Este sitio y nuestro servicio están dirigidos a adultos que gestionan la atención de sus animales. Nada aquí está dirigido a menores, y no recopilamos a sabiendas información de menores de 13 años. Si cree que un menor nos ha dado información, llámenos y la eliminaremos."
        ),
      ],
    },
    {
      id: "links",
      heading: { en: "Other sites we link to", es: "Otros sitios a los que enlazamos" },
      blocks: [
        p(
          "Where we link out — a map, a microchip registry, a financing provider — you are on their site, under their rules. We do not control what they collect.",
          "Cuando enlazamos hacia afuera — un mapa, un registro de microchip, un proveedor de financiamiento — usted está en su sitio y bajo sus reglas. No controlamos lo que ellos recopilan."
        ),
      ],
    },
    {
      id: "changes",
      heading: { en: "Changes to this policy", es: "Cambios a esta política" },
      blocks: [
        p(
          "When this policy changes, the date at the top changes with it and the new version is posted here. If a change materially affects how we handle information about existing clients, we will tell them directly rather than relying on anyone to re-read a web page.",
          "Cuando esta política cambia, la fecha al principio cambia con ella y la nueva versión se publica aquí. Si un cambio afecta de forma sustancial cómo manejamos la información de clientes actuales, se lo diremos directamente en lugar de confiar en que alguien vuelva a leer una página web."
        ),
      ],
    },
    {
      id: "contact",
      heading: { en: "How to reach us", es: "Cómo contactarnos" },
      blocks: [
        p(
          "Questions about this policy, a records request, or any privacy request — call or text us. A person answers.",
          "Preguntas sobre esta política, una solicitud de historial o cualquier solicitud de privacidad — llámenos o escríbanos. Le responde una persona."
        ),
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   TERMS OF SERVICE
   ═══════════════════════════════════════════════════════════════════════ */

export const TERMS: LegalDoc = {
  id: "terms",
  title: { en: "Terms of Service", es: "Términos del Servicio" },
  tagline: {
    en: "The terms for using this website, and for the care we provide.",
    es: "Los términos para usar este sitio y para la atención que brindamos.",
  },
  summary: [
    {
      en: "This website is information, not veterinary advice. Reading it does not make us your pet's veterinarian.",
      es: "Este sitio es información, no consejo veterinario. Leerlo no nos convierte en el veterinario de su mascota.",
    },
    {
      en: "We are not an emergency service. In an emergency, go to the nearest 24-hour veterinary hospital.",
      es: "No somos un servicio de emergencias. En una emergencia, acuda al hospital veterinario de 24 horas más cercano.",
    },
    {
      en: "An appointment exists when we have confirmed it, not when you have requested it.",
      es: "Una cita existe cuando nosotros la confirmamos, no cuando usted la solicita.",
    },
    {
      en: "Estimates are estimates. Payment is due at the time of service.",
      es: "Los presupuestos son estimaciones. El pago se realiza al momento del servicio.",
    },
    {
      en: "Give us reasonable notice if you need to cancel. We are driving to you.",
      es: "Avísenos con tiempo razonable si necesita cancelar. Vamos en camino hacia usted.",
    },
  ],
  sections: [
    {
      id: "acceptance",
      heading: { en: "Agreeing to these terms", es: "Aceptación de estos términos" },
      blocks: [
        p(
          "Using this website means you accept these terms. If you do not accept them, please do not use the site. We revise them from time to time; the date at the top tells you when we last did.",
          "Usar este sitio significa que usted acepta estos términos. Si no los acepta, por favor no use el sitio. Los revisamos de vez en cuando; la fecha al principio indica cuándo fue la última vez."
        ),
        p(
          "These terms cover this website and the general shape of our service. The care of a specific animal is governed by what we agree with you at the time, by the estimate and consent forms you sign, and by the standards Utah law sets for a licensed veterinary practice. Where those and this page differ, those win.",
          "Estos términos cubren este sitio y la forma general de nuestro servicio. La atención de un animal en particular se rige por lo que acordemos con usted en ese momento, por los presupuestos y consentimientos que usted firme, y por los estándares que la ley de Utah fija para una práctica veterinaria licenciada. Donde aquello y esta página difieran, prevalece aquello."
        ),
      ],
    },
    {
      id: "not-advice",
      heading: {
        en: "The site is information, not advice",
        es: "El sitio es información, no consejo médico",
      },
      blocks: [
        p(
          "Everything here — the service descriptions, what a visit looks like, general guidance — is written to help you decide whether to call us. It is not a diagnosis, not a treatment plan, and not a substitute for a veterinarian examining your animal. Please do not delay care because of something you read on a website, this one included.",
          "Todo lo que hay aquí — las descripciones de servicios, cómo es una visita, las orientaciones generales — está escrito para ayudarle a decidir si llamarnos. No es un diagnóstico, no es un plan de tratamiento y no sustituye a un veterinario examinando a su animal. Por favor, no retrase la atención por algo que leyó en un sitio web, incluido este."
        ),
      ],
    },
    {
      id: "vcpr",
      heading: {
        en: "This site does not create a veterinarian-client-patient relationship",
        es: "Este sitio no crea una relación veterinario-cliente-paciente",
      },
      blocks: [
        p(
          "The veterinarian-client-patient relationship is the legal precondition for diagnosing, treating and prescribing. It is formed when one of our veterinarians has examined your pet, has taken responsibility for its care, and you have agreed to that.",
          "La relación veterinario-cliente-paciente es el requisito legal previo para diagnosticar, tratar y recetar. Se forma cuando uno de nuestros veterinarios ha examinado a su mascota, ha asumido la responsabilidad de su atención y usted ha aceptado."
        ),
        p(
          "Browsing this site does not create it. Calling or texting to ask a question does not create it. Without it we cannot legally prescribe, and we will not guess about an animal we have not seen.",
          "Navegar por este sitio no la crea. Llamar o escribir para hacer una pregunta no la crea. Sin ella no podemos recetar legalmente, y no vamos a adivinar sobre un animal que no hemos visto."
        ),
      ],
    },
    {
      id: "emergency",
      heading: { en: "Emergencies", es: "Emergencias" },
      blocks: [
        callout(
          "If your pet is having an emergency, stop reading and go. Call the nearest 24-hour emergency veterinary hospital, or your closest open clinic. Our line is answered during business hours only, and a mobile practice is minutes to hours away by design. An emergency hospital is already staffed and waiting.",
          "Si su mascota está teniendo una emergencia, deje de leer y vaya. Llame al hospital veterinario de emergencias de 24 horas más cercano, o a la clínica abierta más próxima. Nuestra línea se atiende solo en horario laboral, y una práctica móvil está por diseño a minutos u horas de distancia. Un hospital de emergencias ya está con personal y esperando."
        ),
      ],
    },
    {
      id: "area",
      heading: { en: "Where we go", es: "Hasta dónde vamos" },
      blocks: [
        p(
          "We serve Davis, Salt Lake, Tooele and Utah counties. Addresses at the edge of that area, or outside it, we take case by case — call and ask, and we will tell you plainly whether we can come and what the travel charge would be.",
          "Atendemos los condados de Davis, Salt Lake, Tooele y Utah. Las direcciones en el borde de esa zona, o fuera de ella, las evaluamos caso por caso — llame y pregunte, y le diremos con claridad si podemos ir y cuál sería el cargo por traslado."
        ),
        p(
          "We may decline a visit where we cannot work safely: no safe parking or access, no lighting after dark, conditions that put the team or the animal at risk, or an animal we are not equipped to handle at home.",
          "Podemos no aceptar una visita donde no podamos trabajar con seguridad: sin estacionamiento o acceso seguro, sin iluminación después del anochecer, condiciones que pongan en riesgo al equipo o al animal, o un animal que no estemos equipados para atender en casa."
        ),
      ],
    },
    {
      id: "appointments",
      heading: {
        en: "Requesting and confirming an appointment",
        es: "Solicitar y confirmar una cita",
      },
      blocks: [
        p(
          "Calling or texting starts a request. It becomes an appointment when we confirm the day and the arrival window back to you. Until then, nothing is held.",
          "Llamar o escribir inicia una solicitud. Se convierte en cita cuando le confirmamos el día y la franja de llegada. Hasta entonces, no hay nada reservado."
        ),
        p(
          "We give arrival windows, not exact times, and we keep to them as tightly as traffic, weather and the animal in front of us allow. If we are running late, we will tell you. If the visit before yours turns into an emergency we may have to move you — and we will call, not text and hope.",
          "Damos franjas de llegada, no horas exactas, y las cumplimos tan estrictamente como el tráfico, el clima y el animal que tengamos delante lo permitan. Si vamos con retraso, se lo diremos. Si la visita anterior a la suya se convierte en una emergencia, quizá tengamos que moverla — y llamaremos, no enviaremos un mensaje esperando que lo lea."
        ),
      ],
    },
    {
      id: "your-part",
      heading: { en: "What we need from you", es: "Lo que necesitamos de usted" },
      blocks: [
        ul([
          [
            `An adult ${POLICY.minAdultAge} or older, with authority to make decisions for the animal, present for the whole visit.`,
            `Un adulto de ${POLICY.minAdultAge} años o más, con autoridad para tomar decisiones sobre el animal, presente durante toda la visita.`,
          ],
          [
            "Somewhere safe to park close to the door, and a clear path in.",
            "Un lugar seguro para estacionar cerca de la puerta, y un camino despejado hacia adentro.",
          ],
          [
            "Your pet contained and calm when we arrive — a closed room, a leash, or a carrier. Loose animals are how visits go wrong.",
            "Su mascota contenida y tranquila cuando lleguemos — una habitación cerrada, una correa o una transportadora. Los animales sueltos son la razón por la que una visita sale mal.",
          ],
          [
            "Other pets secured elsewhere in the home.",
            "Las demás mascotas aseguradas en otra parte de la casa.",
          ],
          [
            "An honest history, including any past biting, fear-aggression or handling problems. We would far rather know in advance and arrive prepared than be surprised at your kitchen table.",
            "Un historial honesto, incluidas mordeduras previas, agresión por miedo o problemas de manejo. Preferimos mucho más saberlo de antemano y llegar preparados que llevarnos una sorpresa en la mesa de su cocina.",
          ],
          [
            "Your pet's rabies vaccination status, or an honest “I do not know”. Utah requires bites to be reported and quarantine rules to be followed. That is not something we are able to be discreet about.",
            "El estado de vacunación antirrábica de su mascota, o un honesto “no lo sé”. Utah exige reportar las mordeduras y cumplir las reglas de cuarentena. Eso no es algo sobre lo que podamos ser discretos.",
          ],
        ]),
        p(
          "If the conditions at the address make a safe visit impossible, we may have to stop and reschedule. A trip charge can still apply, because the truck still drove.",
          "Si las condiciones en la dirección hacen imposible una visita segura, puede que tengamos que detenernos y reprogramar. El cargo por traslado puede aplicarse igualmente, porque la unidad ya condujo hasta allí."
        ),
      ],
    },
    {
      id: "consent",
      heading: {
        en: "Consent, decisions and outcomes",
        es: "Consentimiento, decisiones y resultados",
      },
      blocks: [
        p(
          "You authorise the care described on the estimate and consent form you sign. We will explain what we recommend, what it costs, and what the alternatives are — including doing nothing. The decision is yours.",
          "Usted autoriza la atención descrita en el presupuesto y el consentimiento que firma. Le explicaremos qué recomendamos, cuánto cuesta y cuáles son las alternativas — incluida la de no hacer nada. La decisión es suya."
        ),
        p(
          "Veterinary medicine is practised to a standard of care, not to a guaranteed result. We do not promise a particular outcome, a diagnosis on the first visit, or that a course of treatment will work. Sedation, anaesthesia and surgery carry real risk, at home as in a hospital, and we will say so before you sign anything.",
          "La medicina veterinaria se ejerce conforme a un estándar de atención, no a un resultado garantizado. No prometemos un desenlace determinado, ni un diagnóstico en la primera visita, ni que un tratamiento vaya a funcionar. La sedación, la anestesia y la cirugía conllevan riesgos reales, en casa igual que en un hospital, y se lo diremos antes de que firme nada."
        ),
        p(
          "If your pet needs more than a mobile unit can do — emergency surgery, oxygen, intensive care, hospitalisation, advanced imaging — we will say so immediately and help you get there.",
          "Si su mascota necesita más de lo que una unidad móvil puede ofrecer — cirugía de urgencia, oxígeno, cuidados intensivos, hospitalización, imágenes avanzadas — se lo diremos de inmediato y le ayudaremos a llegar allí."
        ),
      ],
    },
    {
      id: "prescriptions",
      heading: { en: "Prescriptions and medications", es: "Recetas y medicamentos" },
      blocks: [
        p(
          "We prescribe only for animals we have examined, and only where a current veterinarian-client-patient relationship exists. A refill may require a recheck or current laboratory work; that is a clinical judgement, not a policy we can waive. If you would rather fill a prescription elsewhere, we will write it.",
          "Recetamos únicamente para animales que hemos examinado, y solo cuando existe una relación veterinario-cliente-paciente vigente. Una renovación puede requerir un control o análisis de laboratorio actualizados; eso es un criterio clínico, no una política que podamos pasar por alto. Si prefiere surtir la receta en otro lugar, se la escribimos."
        ),
        p(
          "Dispensed medications cannot be returned once they have left our hands. Controlled substances are handled under federal and Utah rules that leave us no discretion.",
          "Los medicamentos dispensados no se pueden devolver una vez que han salido de nuestras manos. Las sustancias controladas se manejan bajo normas federales y de Utah que no nos dejan margen de discreción."
        ),
      ],
    },
    {
      id: "end-of-life",
      heading: { en: "End-of-life care", es: "Cuidados al final de la vida" },
      blocks: [
        p(
          "Before a euthanasia appointment we ask for identification and confirmation that you are the owner, or are authorised by the owner, and for a signed consent. The attending veterinarian makes the final clinical judgement about whether euthanasia is appropriate, and may decline where it is not.",
          "Antes de una cita de eutanasia pedimos identificación y confirmación de que usted es el propietario, o está autorizado por el propietario, además de un consentimiento firmado. El veterinario tratante toma la decisión clínica final sobre si la eutanasia es apropiada, y puede no realizarla cuando no lo sea."
        ),
        p(
          "We will go through aftercare options — private cremation, communal cremation, home burial where local rules allow it — before the appointment, so that nobody has to make those decisions in the moment.",
          "Repasaremos las opciones posteriores — cremación privada, cremación comunitaria, entierro en casa donde las normas locales lo permitan — antes de la cita, para que nadie tenga que tomar esas decisiones en el momento."
        ),
      ],
    },
    {
      id: "fees",
      heading: { en: "Estimates, fees and payment", es: "Presupuestos, tarifas y pago" },
      blocks: [
        ul([
          [
            "Prices are quoted before the work, in writing where the amount is significant.",
            "Los precios se cotizan antes del trabajo, por escrito cuando el monto es significativo.",
          ],
          [
            "An estimate is a range based on what we know before examining the animal. Findings change estimates. We will not go past what you approved without asking you first.",
            "Un presupuesto es un rango basado en lo que sabemos antes de examinar al animal. Los hallazgos cambian los presupuestos. No pasaremos de lo que usted aprobó sin consultarle primero.",
          ],
          [
            "Payment is due at the time of service unless we have agreed otherwise in writing.",
            "El pago se realiza al momento del servicio, salvo que hayamos acordado otra cosa por escrito.",
          ],
          [
            "A travel charge may apply, depending on the distance. We will tell you the amount before we schedule, not after we arrive.",
            "Puede aplicarse un cargo por traslado según la distancia. Le diremos el monto antes de agendar, no después de llegar.",
          ],
          [
            "Declined cards and returned payments may carry the fee our processor charges us, and unpaid balances may be referred for collection.",
            "Las tarjetas rechazadas y los pagos devueltos pueden conllevar el cargo que nos cobra nuestro procesador, y los saldos impagos pueden enviarse a cobranza.",
          ],
        ]),
      ],
    },
    {
      id: "cancellation",
      heading: {
        en: "Cancellations, changes and no-shows",
        es: "Cancelaciones, cambios y ausencias",
      },
      blocks: [
        p(
          `We block out travel time and drive to you, so a cancelled visit is not the same thing as an empty slot in a waiting room. Give us as much notice as you reasonably can — at least ${POLICY.cancelNoticeHours} hours — and there is no problem at all.`,
          `Reservamos tiempo de traslado y conducimos hasta usted, así que una visita cancelada no es lo mismo que un hueco vacío en una sala de espera. Avísenos con toda la anticipación que razonablemente pueda — al menos ${POLICY.cancelNoticeHours} horas — y no hay ningún problema.`
        ),
        p(
          "A visit cancelled with less notice than that, or nobody home when we arrive, may carry a cancellation or trip fee, which we will have told you about when you booked. Repeated no-shows may mean we ask for prepayment, or stop scheduling. Life happens — call us and talk to us, and we will work it out.",
          "Una visita cancelada con menos aviso que ese, o que nadie esté en casa cuando llegamos, puede conllevar un cargo por cancelación o traslado, del cual le habremos informado al agendar. Las ausencias repetidas pueden llevar a que pidamos pago por adelantado, o a que dejemos de agendar. La vida pasa — llámenos y hablemos, y lo resolvemos."
        ),
      ],
    },
    {
      id: "messaging",
      heading: { en: "Calls and texts", es: "Llamadas y mensajes de texto" },
      blocks: [
        p(
          "By giving us your number you agree that we may call and text you about your pet's care. Reply STOP to end texts, or HELP for help. Message and data rates may apply. Our line is answered during business hours; it is not monitored overnight and it is not for emergencies. What we do with your number is set out in the Privacy Policy.",
          "Al darnos su número, usted acepta que podamos llamarle y enviarle mensajes de texto sobre la atención de su mascota. Responda STOP para detener los mensajes, o HELP para obtener ayuda. Pueden aplicarse tarifas de mensajes y datos. Nuestra línea se atiende en horario laboral; no se vigila de noche y no es para emergencias. Lo que hacemos con su número está explicado en la Política de Privacidad."
        ),
      ],
    },
    {
      id: "site-use",
      heading: { en: "Using this website", es: "Uso de este sitio" },
      blocks: [
        p(
          "The text, photographs, illustrations, logo and layout of this site belong to PetFocus or to the people we licensed them from. You are welcome to read, print and share pages for your own use in caring for your animals. Please do not republish them, sell them, scrape them in bulk, or feed them to a service that does.",
          "El texto, las fotografías, las ilustraciones, el logotipo y el diseño de este sitio pertenecen a PetFocus o a quienes nos los licenciaron. Puede leer, imprimir y compartir páginas para su propio uso en el cuidado de sus animales. Por favor, no las republique, no las venda, no las extraiga de forma masiva ni las entregue a un servicio que lo haga."
        ),
        p(
          "Do not attempt to break, overload or probe the site, impersonate us, or use it for anything unlawful.",
          "No intente dañar, sobrecargar o sondear el sitio, hacerse pasar por nosotros, ni usarlo para nada ilícito."
        ),
      ],
    },
    {
      id: "third-party",
      heading: { en: "Links to other sites", es: "Enlaces a otros sitios" },
      blocks: [
        p(
          "We link to maps, registries and other practices where it is useful. Those sites are not ours, and we are not responsible for what they say, sell or collect.",
          "Enlazamos a mapas, registros y otras prácticas cuando resulta útil. Esos sitios no son nuestros, y no somos responsables de lo que digan, vendan o recopilen."
        ),
      ],
    },
    {
      id: "warranty",
      heading: {
        en: "The site is provided as it is",
        es: "El sitio se ofrece tal como está",
      },
      blocks: [
        p(
          "We work to keep the site accurate and current, but we do not warrant that it is free of errors, always available, or correct at every moment. Services, hours, coverage and prices change. Nothing here is a binding offer — confirm anything that matters by calling us.",
          "Procuramos mantener el sitio exacto y actualizado, pero no garantizamos que esté libre de errores, siempre disponible, ni correcto en todo momento. Los servicios, los horarios, la cobertura y los precios cambian. Nada de lo que hay aquí es una oferta vinculante — confirme por teléfono cualquier cosa que sea importante."
        ),
      ],
    },
    {
      id: "liability",
      heading: { en: "Limitation of liability", es: "Limitación de responsabilidad" },
      blocks: [
        p(
          `To the fullest extent Utah law allows, ${ORG.legalName} is not liable for indirect, incidental or consequential damages arising from your use of this website or from anything you read on it, and our total liability for any claim arising out of the website itself is limited to ${POLICY.siteLiabilityCapUsd} US dollars.`,
          `En la máxima medida que permite la ley de Utah, ${ORG.legalName} no es responsable de daños indirectos, incidentales o consecuentes derivados del uso de este sitio o de algo que usted haya leído en él, y nuestra responsabilidad total por cualquier reclamación derivada del sitio en sí se limita a ${POLICY.siteLiabilityCapUsd} dólares estadounidenses.`
        ),
        p(
          "That limit is about the website. It does not limit, waive or affect any right you have regarding the veterinary care we actually provide, and we would not want it to.",
          "Ese límite se refiere al sitio web. No limita, renuncia ni afecta ningún derecho que usted tenga respecto de la atención veterinaria que efectivamente brindamos, y tampoco querríamos que lo hiciera."
        ),
      ],
    },
    {
      id: "indemnity",
      heading: { en: "Indemnity", es: "Indemnización" },
      blocks: [
        p(
          "If your misuse of this site causes a claim against us, you agree to cover the reasonable cost of defending it.",
          "Si el uso indebido que usted haga de este sitio da lugar a una reclamación contra nosotros, usted acepta cubrir el costo razonable de defenderla."
        ),
      ],
    },
    {
      id: "law",
      heading: { en: "Governing law", es: "Ley aplicable" },
      blocks: [
        p(
          "Utah law governs these terms, without regard to its conflict-of-law rules. Any dispute about this website or these terms belongs in the state or federal courts sitting in Utah, and both of us agree to that.",
          "La ley de Utah rige estos términos, sin considerar sus reglas de conflicto de leyes. Cualquier disputa sobre este sitio o estos términos corresponde a los tribunales estatales o federales con sede en Utah, y ambas partes lo aceptamos."
        ),
      ],
    },
    {
      id: "languages",
      heading: { en: "English and Spanish", es: "Inglés y español" },
      blocks: [
        p(
          "We publish this site in both languages because we practise in both. The translation is made carefully and in good faith. If the two versions ever conflict on a point of law, the English version controls.",
          "Publicamos este sitio en ambos idiomas porque ejercemos en ambos. La traducción se hace con cuidado y de buena fe. Si alguna vez las dos versiones entran en conflicto sobre un punto legal, prevalece la versión en inglés."
        ),
      ],
    },
    {
      id: "severability",
      heading: { en: "If part of this fails", es: "Si alguna parte no es válida" },
      blocks: [
        p(
          "If a court finds one provision unenforceable, that provision is narrowed to what is enforceable, or removed, and the rest stands.",
          "Si un tribunal determina que una cláusula no es exigible, esa cláusula se reduce a lo que sí lo sea, o se elimina, y el resto sigue vigente."
        ),
      ],
    },
    {
      id: "changes",
      heading: { en: "Changes to these terms", es: "Cambios a estos términos" },
      blocks: [
        p(
          "We may revise these terms. The current version is always the one on this page, with its date at the top. Continuing to use the site after a change means you accept it.",
          "Podemos revisar estos términos. La versión vigente es siempre la de esta página, con su fecha al principio. Seguir usando el sitio después de un cambio significa que usted lo acepta."
        ),
      ],
    },
    {
      id: "contact",
      heading: { en: "Contact", es: "Contacto" },
      blocks: [
        p(
          "Questions about these terms, or about a visit — call or text us. A person answers.",
          "Preguntas sobre estos términos, o sobre una visita — llámenos o escríbanos. Le responde una persona."
        ),
      ],
    },
  ],
};

export const LEGAL_DOCS = { privacy: PRIVACY, terms: TERMS } as const;
