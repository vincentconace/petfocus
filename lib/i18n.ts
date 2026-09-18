export type Lang = "en" | "es";

export const translations = {
  // Navigation
  nav: {
    home: { en: "Home", es: "Inicio" },
    services: { en: "Services", es: "Servicios" },
    about: { en: "About", es: "Nosotros" },
    area: { en: "Service Area", es: "Cobertura" },
    contact: { en: "Contact", es: "Contacto" },
    // No online booking: every CTA dials the clinic. When EasyVet goes live
    // this becomes a link to their portal — the label changes, not the flow.
    callUs: { en: "Call or Text", es: "Llamar o Escribir" },
    menu: { en: "Menu", es: "Menú" },
    openMenu: { en: "Open menu", es: "Abrir menú" },
    closeMenu: { en: "Close menu", es: "Cerrar menú" },
    submenu: { en: "submenu", es: "submenú" },
  },

  theme: {
    toDark: { en: "Switch to dark mode", es: "Cambiar a modo oscuro" },
    toLight: { en: "Switch to light mode", es: "Cambiar a modo claro" },
  },

  // Hero
  hero: {
    imageAlt: {
      en: "A golden retriever and a tabby cat gently touching noses in a sunlit living room",
      es: "Un golden retriever y un gato atigrado se saludan acercando sus hocicos en una sala iluminada por el sol",
    },
    sceneCaption: { en: "Right where they feel at home.", es: "Donde se sienten en casa." },
    pauseMotion: { en: "Pause motion", es: "Pausar movimiento" },
    resumeMotion: { en: "Resume motion", es: "Reanudar movimiento" },
    badge: { en: "Mobile Veterinary Service", es: "Servicio Veterinario Móvil" },
    headlinePart1: { en: "Bringing veterinary care", es: "Llevamos el cuidado" },
    italicWord: { en: "home.", es: "veterinario" },
    headlinePart2: { en: "", es: "a su hogar." },
    sub: {
      en: "Compassionate, convenient, full-service veterinary care delivered right to your doorstep across Davis, Salt Lake, Tooele, and Utah County.",
      es: "Cuidado veterinario integral, compasivo y conveniente directamente en la puerta de su hogar en Davis, Salt Lake, Tooele y Utah County.",
    },
    callText: { en: "Call or Text", es: "Llamar o Enviar" },
    cardAppt: { en: "Home Visit Today", es: "Visita a Domicilio Hoy" },
    cardApptTime: { en: "2:30 PM · Buddy", es: "2:30 PM · Buddy" },
    cardComeTo: { en: "We come to you", es: "Vamos a su hogar" },
    cardComeSub: { en: "Stress-free care", es: "Cuidado sin estrés" },
    cardPet: { en: "Wellness Exam", es: "Chequeo de bienestar" },
    cardPetSub: { en: "Buddy · Golden Retriever", es: "Buddy · Golden Retriever" },
  },

  // Brand pillars
  pillars: {
    eyebrow: { en: "Why PetFocus", es: "Por qué PetFocus" },
    headline: {
      en: "Care. Compassion. Convenience.",
      es: "Cuidado. Compasión. Conveniencia.",
    },
    care: {
      title: { en: "Care", es: "Cuidado" },
      desc: {
        en: "Full-service veterinary medicine performed at your home.",
        es: "Medicina veterinaria integral realizada en su hogar.",
      },
    },
    compassion: {
      title: { en: "Compassion", es: "Compasión" },
      desc: {
        en: "We treat your pet like family — every visit, every time.",
        es: "Tratamos a su mascota como familia — en cada visita.",
      },
    },
    convenience: {
      title: { en: "Convenience", es: "Conveniencia" },
      desc: {
        en: "No carriers, no waiting rooms, no stress for your pet.",
        es: "Sin transportadoras, sin salas de espera, sin estrés.",
      },
    },
  },

  // Services
  services: {
    badge: { en: "Our Services", es: "Nuestros Servicios" },
    headlinePart1: { en: "Comprehensive care,", es: "Cuidado integral," },
    italicWord: { en: "from nose to tail.", es: "de la nariz a la cola." },
    sub: {
      en: "Everything your pet needs — performed safely and gently in the comfort of your home.",
      es: "Todo lo que su mascota necesita — realizado de forma segura y gentil en la comodidad de su hogar.",
    },
    seeAll: { en: "See all services", es: "Ver todos los servicios" },
    includes: { en: "What's included", es: "Qué incluye" },
    related: { en: "Other services", es: "Otros servicios" },
    backToAll: { en: "All services", es: "Todos los servicios" },
    // Opening copy for /services — the client's own, verbatim in English.
    indexTitle: {
      en: "Veterinary Care That Comes to You",
      es: "Cuidado Veterinario que Llega a Usted",
    },
    indexIntro: {
      en: "At PetFocus Mobile Veterinary Service, we bring professional veterinary care closer to home. Our fully equipped mobile veterinary unit allows our veterinary team to provide a wide range of preventive, diagnostic, dental, surgical, and supportive services in a convenient and personalized setting.",
      es: "En PetFocus Servicio Veterinario Móvil acercamos la atención veterinaria profesional a su hogar. Nuestra unidad móvil totalmente equipada permite a nuestro equipo brindar una amplia gama de servicios preventivos, diagnósticos, dentales, quirúrgicos y de soporte, en un entorno conveniente y personalizado.",
    },
  },

  /**
   * About page. The mission statement is the client's own, verbatim in
   * English; the Spanish is our translation and still needs their review.
   */
  about: {
    title: { en: "About PetFocus", es: "Sobre PetFocus" },
    tagline: {
      en: "We bring the clinic to your door",
      es: "Llevamos la clínica a su puerta",
    },
    missionLabel: { en: "Our mission", es: "Nuestra misión" },
    mission: {
      en: "Our mission is to strengthen the human-animal bond through compassionate care, meaningful connection, and open communication. At PetFocus, we deliver personalized, exceptional veterinary care where our pets feel most comfortable — their home — creating a more convenient, comfortable and less stressful experience for every pet and family we serve.",
      es: "Nuestra misión es fortalecer el vínculo entre las personas y los animales a través de un cuidado compasivo, una conexión genuina y una comunicación abierta. En PetFocus brindamos atención veterinaria personalizada y excepcional donde nuestras mascotas se sienten más cómodas — su hogar — creando una experiencia más conveniente, cómoda y menos estresante para cada mascota y cada familia que atendemos.",
    },
    teamLabel: { en: "Our team", es: "Nuestro equipo" },
    teamTitle: { en: "Meet our team", es: "Conozca a nuestro equipo" },
    teamIntro: {
      en: "The people who will be at your door. Licensed veterinarians who treat your pet the way they would treat their own.",
      es: "Las personas que van a estar en su puerta. Veterinarios licenciados que tratan a su mascota como tratarían a la suya.",
    },
  },

  team: {
    readMore: { en: "Read more", es: "Leer más" },
    readLess: { en: "Read less", es: "Leer menos" },
    bioPending: { en: "Biography pending", es: "Biografía pendiente" },
  },

  // Features
  features: {
    badge: { en: "The PetFocus Experience", es: "La Experiencia PetFocus" },
    headlinePart1: { en: "Veterinary care that", es: "Cuidado veterinario que" },
    italicWord: { en: "comes to you.", es: "llega a usted." },
    sub: {
      en: "Modern, mobile, multilingual — built around the way pets and people actually live.",
      es: "Moderno, móvil, multilingüe — diseñado para cómo viven las personas y mascotas.",
    },
    items: [
      {
        tag: { en: "AT HOME", es: "EN CASA" },
        title: { en: "Stress-free environment", es: "Ambiente sin estrés" },
        desc: {
          en: "Your pet stays calm in familiar surroundings.",
          es: "Su mascota se mantiene tranquila en su entorno familiar.",
        },
      },
      {
        tag: { en: "BILINGUAL", es: "BILINGÜE" },
        title: { en: "Servicio en Español", es: "Service in English" },
        desc: {
          en: "Atención completa en inglés y español.",
          es: "Full service in English and Spanish.",
        },
      },
      {
        tag: { en: "FLEXIBLE", es: "FLEXIBLE" },
        title: { en: "On your schedule", es: "En su horario" },
        desc: {
          en: "Evening and weekend appointments available.",
          es: "Citas disponibles en tardes y fines de semana.",
        },
      },
      {
        tag: { en: "TRUSTED", es: "DE CONFIANZA" },
        title: { en: "Licensed veterinary team", es: "Equipo licenciado" },
        desc: {
          en: "Experienced DVMs and certified technicians.",
          es: "Veterinarios y técnicos certificados.",
        },
      },
    ],
  },

  /**
   * "How the visit works" — the block the client asked for ("cómo se realiza
   * el procedimiento"). Their copy did not include it, so this is DRAFTED BY US
   * and still needs their sign-off. It is deliberately generic: the shape of an
   * at-home visit is nearly identical across services, so one shared block does
   * the work of eight, and per-service specifics can be layered on later via
   * `Service.steps`.
   */
  visit: {
    badge: { en: "How it works", es: "Cómo funciona" },
    headline: {
      en: "What a home visit looks like",
      es: "Cómo es una visita a domicilio",
    },
    steps: [
      {
        title: { en: "You call or text", es: "Usted llama o escribe" },
        desc: {
          en: "We talk through what your pet needs and agree on a day and an arrival window that works for you.",
          es: "Conversamos sobre lo que su mascota necesita y acordamos un día y una franja de llegada que le funcione.",
        },
      },
      {
        title: { en: "We come to you", es: "Vamos a su hogar" },
        desc: {
          en: "Our fully equipped mobile unit arrives at your door. We set up wherever your pet is most relaxed — the living room floor is fine.",
          es: "Nuestra unidad móvil totalmente equipada llega a su puerta. Nos instalamos donde su mascota esté más tranquila — el piso del living está perfecto.",
        },
      },
      {
        title: { en: "Unhurried care", es: "Atención sin apuro" },
        desc: {
          en: "No waiting room, no carrier, no other animals. Your pet stays in familiar surroundings and you stay beside them the whole time.",
          es: "Sin sala de espera, sin transportadora, sin otros animales. Su mascota permanece en su entorno y usted se queda a su lado todo el tiempo.",
        },
      },
      {
        title: { en: "Afterwards", es: "Después" },
        desc: {
          en: "You get a clear summary of what we found, a plan in writing, and a number you can text with questions.",
          es: "Recibe un resumen claro de lo que encontramos, un plan por escrito y un número al que puede escribir con sus dudas.",
        },
      },
    ],
  },

  // End of life care — deliberately its own section, above the rest.
  // The client asked for this to be separated from "Comfort & Support":
  // it is a different emotional register and should not sit next to nail trims.
  endOfLife: {
    badge: { en: "End of Life Care", es: "Cuidados al Final de la Vida" },
    headlinePart1: { en: "When the time comes,", es: "Cuando llega el momento," },
    italicWord: { en: "we're with you.", es: "estamos con usted." },
    body: {
      en: "Quality-of-life consultations and end-of-life support, offered gently and without hurry, in the place your pet feels safest. We walk you through every step and give you the time you need.",
      es: "Consultas de calidad de vida y acompañamiento al final de la vida, con delicadeza y sin apuro, en el lugar donde su mascota se siente segura. Le acompañamos en cada paso y le damos el tiempo que necesite.",
    },
    items: [
      { en: "Quality-of-life consultations", es: "Consultas de calidad de vida" },
      // The client's copy hedges deliberately: "when appropriate and
      // available". Keep the hedge — it is not a flat promise.
      {
        en: "In-home euthanasia, when appropriate and available",
        es: "Eutanasia a domicilio, cuando es apropiado y está disponible",
      },
    ],
    cta: { en: "Talk to us", es: "Hablemos" },
    more: { en: "Read more about this care", es: "Conozca más sobre este cuidado" },
  },

  // Testimonials
  testimonials: {
    badge: { en: "Testimonials", es: "Testimonios" },
    headlinePart1: { en: "What our", es: "Lo que dicen nuestras" },
    italicWord: { en: "families", es: "familias" },
    headlinePart2: { en: "are saying.", es: "" },
    sub: {
      en: "Real stories from pet parents across Northern Utah.",
      es: "Historias reales de familias en el norte de Utah.",
    },
    items: [
      {
        quote: {
          en: "PetFocus made our senior lab's last months so peaceful. They came home to us with so much compassion.",
          es: "PetFocus hizo los últimos meses de nuestra labrador senior tan tranquilos. Vinieron a casa con mucha compasión.",
        },
        name: "Sarah M.",
        role: { en: "Layton, UT", es: "Layton, UT" },
      },
      {
        quote: {
          en: "Servicio en español impecable. Mi gato odia el carro y ahora recibe sus chequeos sin estrés. ¡Gracias PetFocus!",
          es: "Servicio en español impecable. Mi gato odia el carro y ahora recibe sus chequeos sin estrés. ¡Gracias PetFocus!",
        },
        name: "Carlos R.",
        role: { en: "Salt Lake City, UT", es: "Salt Lake City, UT" },
      },
      {
        quote: {
          en: "From puppy shots to spay surgery, the team has been amazing. My dog actually wags her tail when they arrive.",
          es: "Desde las primeras vacunas hasta la esterilización, el equipo ha sido increíble. Mi perra mueve la cola cuando llegan.",
        },
        name: "Jennifer T.",
        role: { en: "Bountiful, UT", es: "Bountiful, UT" },
      },
      {
        quote: {
          en: "Bilingual, kind, and incredibly skilled. The wellness plan paid for itself in the first three months.",
          es: "Bilingüe, amable y muy capacitado. El plan de bienestar se pagó solo en los primeros tres meses.",
        },
        name: "Miguel A.",
        role: { en: "West Jordan, UT", es: "West Jordan, UT" },
      },
      {
        quote: {
          en: "Living far from a clinic used to mean my cats skipped checkups. Not anymore. PetFocus is a game changer.",
          es: "Vivir lejos de una clínica solía significar que mis gatos no recibían chequeos. Ya no. PetFocus lo cambió todo.",
        },
        name: "Emily K.",
        role: { en: "Tooele, UT", es: "Tooele, UT" },
      },
    ],
  },

  // Service area
  area: {
    badge: { en: "Service Area", es: "Cobertura" },
    headline: { en: "Serving Northern Utah", es: "Servimos el Norte de Utah" },
    sub: {
      en: "At-home veterinary care across Davis, Salt Lake, Tooele, and Utah counties.",
      es: "Atención veterinaria a domicilio en los condados de Davis, Salt Lake, Tooele y Utah.",
    },
    mapTitle: { en: "Our four service counties in Utah", es: "Nuestros cuatro condados de cobertura en Utah" },
    mapDescription: {
      en: "Davis, Salt Lake, Tooele, and Utah counties are highlighted together. Select a county to open that area in Google Maps.",
      es: "Los condados de Davis, Salt Lake, Tooele y Utah aparecen resaltados juntos. Seleccione un condado para abrir esa zona en Google Maps.",
    },
    fourCounties: { en: "4 counties · Utah", es: "4 condados · Utah" },
    chooseCounty: { en: "Find your county", es: "Encuentre su condado" },
    instructions: {
      en: "Select a shaded area or a county below to explore it in Google Maps.",
      es: "Toque una zona coloreada o un condado de la lista para verlo en Google Maps.",
    },
    openMap: { en: "Open in Google Maps", es: "Abrir en Google Maps" },
    newTab: { en: "opens in a new tab", es: "se abre en una pestaña nueva" },
    boundaries: { en: "County boundaries: State of Utah · SGID", es: "Límites de condados: Estado de Utah · SGID" },
    outside: {
      en: "Outside these counties? Call or text us to ask about your address.",
      es: "¿Está fuera de estos condados? Llame o envíenos un mensaje para consultar su dirección.",
    },
  },

  contact: {
    call: { en: "Call us", es: "Llamar" },
    message: { en: "Send a text", es: "Enviar mensaje" },
  },

  // Final CTA
  finalCta: {
    eyebrow: { en: "Get in Touch", es: "Contáctenos" },
    headlinePart1: { en: "Bringing veterinary care home with", es: "Llevando el cuidado al hogar con" },
    italicWord: "PetFocus.",
    family: { en: "We treat your pet like family.", es: "Tratamos a su mascota como familia." },
  },

  // Footer
  footer: {
    tagline: {
      en: "Bringing veterinary care home.",
      es: "Llevamos el cuidado veterinario a su hogar.",
    },
    cols: {
      services: { en: "Services", es: "Servicios" },
      company: { en: "Company", es: "Empresa" },
      contact: { en: "Contact", es: "Contacto" },
      follow: { en: "Follow", es: "Síganos" },
    },
    rights: {
      en: "© 2026 PetFocus. All rights reserved.",
      es: "© 2026 PetFocus. Todos los derechos reservados.",
    },
  },

  common: {
    learnMore: { en: "Learn More", es: "Saber Más" },
  },
};

export function t(value: { en: string; es: string }, lang: Lang) {
  return value[lang];
}
