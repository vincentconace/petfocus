export type Lang = "en" | "es";

export const translations = {
  // Navigation
  nav: {
    home: { en: "Home", es: "Inicio" },
    services: { en: "Services", es: "Servicios" },
    about: { en: "About", es: "Nosotros" },
    area: { en: "Service Area", es: "Cobertura" },
    contact: { en: "Contact", es: "Contacto" },
    bookVisit: { en: "Book a Visit", es: "Reservar Visita" },
  },

  // Hero
  hero: {
    badge: { en: "Mobile Veterinary Service", es: "Servicio Veterinario Móvil" },
    headlinePart1: { en: "Bringing veterinary care", es: "Llevamos el cuidado" },
    italicWord: { en: "home.", es: "veterinario." },
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
    preventive: {
      title: { en: "Preventive Care", es: "Cuidado Preventivo" },
      items: [
        { en: "Wellness Exams", es: "Chequeos de bienestar" },
        { en: "Vaccinations", es: "Vacunas" },
        { en: "Puppy & Kitten Care", es: "Cuidado para cachorros y gatitos" },
        { en: "Senior Pet Care", es: "Cuidado para mascotas mayores" },
      ],
    },
    diagnostics: {
      title: { en: "Diagnostics", es: "Diagnósticos" },
      items: [
        { en: "Bloodwork", es: "Análisis de sangre" },
        { en: "Urinalysis", es: "Análisis de orina" },
        { en: "Fecal Testing", es: "Prueba de heces" },
        { en: "Cytology", es: "Citología" },
        { en: "Skin & Ear Evaluations", es: "Evaluaciones de piel y oídos" },
        { en: "T4 Testing", es: "Prueba de T4" },
      ],
    },
    dental: {
      title: { en: "Dental Services", es: "Servicios Dentales" },
      items: [
        { en: "Dental Exams", es: "Exámenes dentales" },
        { en: "Professional Dental Cleaning", es: "Limpieza dental profesional" },
        { en: "Dental X-rays", es: "Radiografías dentales" },
        { en: "Tooth Extractions", es: "Extracciones dentales" },
        { en: "Home Dental Care Guidance", es: "Guía de cuidado dental en casa" },
      ],
    },
    surgery: {
      title: { en: "Soft Tissue Surgery", es: "Cirugía de Tejidos Blandos" },
      items: [
        { en: "Spay & Neuter", es: "Esterilización y castración" },
        { en: "Mass Removal", es: "Extracción de masas" },
        { en: "Wound Repair", es: "Reparación de heridas" },
        { en: "Laceration Repair", es: "Reparación de laceraciones" },
        { en: "Minor Surgical Procedures", es: "Procedimientos quirúrgicos menores" },
        { en: "Other Soft Tissue Procedures", es: "Otros procedimientos" },
      ],
    },
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

  // Core
  core: {
    badge: { en: "More we offer", es: "Más que ofrecemos" },
    headlinePart1: { en: "Going beyond the", es: "Más allá de lo" },
    italicWord: { en: "basics.", es: "básico." },
    cards: [
      {
        title: { en: "Comfort & Support", es: "Comodidad y Apoyo" },
        items: [
          { en: "Quality of Life Consultations", es: "Consultas de calidad de vida" },
          { en: "Euthanasia Consultations", es: "Consultas para eutanasia" },
          { en: "In-Home Veterinary Visits", es: "Visitas a domicilio" },
          { en: "Follow-Up Care", es: "Cuidado de seguimiento" },
          { en: "Post-Surgical Rechecks", es: "Revisiones postquirúrgicas" },
        ],
      },
      {
        title: { en: "Additional Services", es: "Servicios Adicionales" },
        items: [
          { en: "Nail Trims", es: "Corte de uñas" },
          { en: "Anal Gland Expression", es: "Expresión de glándulas anales" },
          { en: "Ear Cleaning", es: "Limpieza de oídos" },
          { en: "Basic Grooming Support", es: "Apoyo de aseo básico" },
          { en: "Medication Administration", es: "Administración de medicamentos" },
        ],
      },
      {
        title: { en: "Mobile Veterinary Care", es: "Cuidado Veterinario Móvil" },
        body: {
          en: "We come to you so your pet can stay comfortable at home. A fully equipped mobile clinic — without the carrier ride.",
          es: "Vamos a su hogar para que su mascota pueda sentirse cómoda y tranquila. Una clínica móvil totalmente equipada — sin transportadora.",
        },
        cta: { en: "Book a Visit", es: "Reservar Visita" },
      },
    ],
  },

  // Pricing
  pricing: {
    eyebrow: { en: "Packages", es: "Paquetes" },
    headlinePart1: { en: "Simple, transparent", es: "Paquetes" },
    italicWord: { en: "packages.", es: "transparentes." },
    sub: {
      en: "Choose the plan that fits your pet's needs.",
      es: "Elija el plan que mejor se adapte a su mascota.",
    },
    plans: [
      {
        name: { en: "Single Visit", es: "Visita Única" },
        price: "$129",
        period: { en: "/ visit", es: "/ visita" },
        features: [
          { en: "In-home wellness exam", es: "Chequeo de bienestar a domicilio" },
          { en: "Up to 1 pet", es: "Hasta 1 mascota" },
          { en: "Vaccination quote included", es: "Cotización de vacunas incluida" },
          { en: "Travel within service area", es: "Viaje dentro del área" },
          { en: "Follow-up call", es: "Llamada de seguimiento" },
        ],
        cta: { en: "Book Now", es: "Reservar" },
        featured: false,
      },
      {
        name: { en: "Wellness Plan", es: "Plan de Bienestar" },
        price: "$39",
        period: { en: "/ month", es: "/ mes" },
        features: [
          { en: "2 wellness visits per year", es: "2 visitas de bienestar al año" },
          { en: "Core vaccinations included", es: "Vacunas esenciales incluidas" },
          { en: "Annual bloodwork", es: "Análisis de sangre anual" },
          { en: "Priority scheduling", es: "Agenda prioritaria" },
          { en: "10% off all services", es: "10% de descuento en servicios" },
        ],
        cta: { en: "Get Started", es: "Empezar" },
        featured: true,
        tag: { en: "Most Popular", es: "Más Popular" },
      },
      {
        name: { en: "Family Plan", es: "Plan Familiar" },
        price: "$69",
        period: { en: "/ month", es: "/ mes" },
        features: [
          { en: "Up to 3 pets covered", es: "Hasta 3 mascotas cubiertas" },
          { en: "All Wellness Plan benefits", es: "Beneficios del Plan Bienestar" },
          { en: "Free dental check-up", es: "Chequeo dental gratis" },
          { en: "Free quarterly nail trims", es: "Corte de uñas trimestral gratis" },
          { en: "15% off all services", es: "15% de descuento en servicios" },
        ],
        cta: { en: "Get Started", es: "Empezar" },
        featured: false,
      },
    ],
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

  // Blog
  blog: {
    badge: { en: "Pet Care Tips", es: "Consejos de Cuidado" },
    headlinePart1: { en: "Discover our latest", es: "Descubra nuestros últimos" },
    italicWord: { en: "tips.", es: "consejos." },
    posts: [
      {
        tag: { en: "Senior Care", es: "Mascotas Mayores" },
        title: {
          en: "5 Signs Your Senior Dog Needs a Wellness Check",
          es: "5 Señales que Su Perro Senior Necesita un Chequeo",
        },
        excerpt: {
          en: "Subtle changes in appetite, energy, or mobility can signal big issues. Here's what to watch for.",
          es: "Cambios sutiles en apetito, energía o movilidad pueden señalar problemas mayores.",
        },
      },
      {
        tag: { en: "Wellness", es: "Bienestar" },
        title: {
          en: "Why At-Home Vet Visits Reduce Pet Anxiety",
          es: "Por Qué las Visitas a Domicilio Reducen la Ansiedad",
        },
        excerpt: {
          en: "Familiar smells, no carriers, no strangers — the science behind stress-free care.",
          es: "Olores familiares, sin transportadoras — la ciencia detrás del cuidado sin estrés.",
        },
      },
      {
        tag: { en: "Dental", es: "Dental" },
        title: {
          en: "Dental Health 101: A Complete Guide",
          es: "Salud Dental 101: Guía Completa",
        },
        excerpt: {
          en: "85% of pets have some form of dental disease by age 3. Here's how to keep your pet's smile bright.",
          es: "El 85% de las mascotas tiene enfermedad dental antes de los 3 años. Así se cuida su sonrisa.",
        },
      },
    ],
    readMore: { en: "Read more", es: "Leer más" },
  },

  // Service area
  area: {
    badge: { en: "Service Area", es: "Cobertura" },
    headline: { en: "Serving Northern Utah", es: "Servimos el Norte de Utah" },
    sub: {
      en: "Don't see your county? Call us — we may still come.",
      es: "¿No ve su condado? Llámenos — quizás aún lleguemos.",
    },
    counties: ["Davis", "Salt Lake", "Tooele", "Utah County"],
  },

  // Final CTA
  finalCta: {
    eyebrow: { en: "Join Us", es: "Únase" },
    headlinePart1: { en: "Bringing veterinary care home with", es: "Llevando el cuidado al hogar con" },
    italicWord: "PetFocus.",
    family: { en: "We treat your pet like family.", es: "Tratamos a su mascota como familia." },
    placeholder: { en: "your@email.com", es: "su@email.com" },
    subscribe: { en: "Subscribe", es: "Suscribirse" },
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
    bookVisit: { en: "Book a Visit", es: "Reservar Visita" },
  },
};

export function t(value: { en: string; es: string }, lang: Lang) {
  return value[lang];
}
