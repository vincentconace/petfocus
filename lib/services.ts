import type { Lang } from "./i18n";

export type Localized = { en: string; es: string };

export type Service = {
  /** Stable internal id — never appears in a URL, safe to reference in code. */
  id: string;
  /** URL segment, localized. `/en/services/dental` vs `/es/servicios/odontologia`. */
  slug: Localized;
  title: Localized;
  /** One-line subheading under the title, Riverton-style. */
  tagline: Localized;
  /** 80–120 word opener. English copy is the client's own, verbatim. */
  intro: Localized;
  /** "What's included" bullets — the client's list, verbatim in English. */
  includes: Localized[];
  /** Generated editorial photograph, shared by the detail page and cards. */
  image: string;
  imageAlt: Localized;
  /**
   * End-of-life care is pulled out of the normal grid and shown on its own,
   * per the client's request that it not sit beside nail trims.
   */
  setApart?: boolean;
};

/**
 * The eight services, in the order and grouping the client sent.
 *
 * ── Provenance ───────────────────────────────────────────────────────────
 * English `title`, `intro` and `includes` are the client's approved copy,
 * copied verbatim. Do not "improve" them without asking.
 *
 * `tagline` is written by us (the client's text has no subheadings) and
 * still needs their sign-off.
 *
 * Spanish is our translation and has NOT been reviewed by the client yet.
 * The site is bilingual, and the copy arrived English-only.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const SERVICES: Service[] = [
  {
    id: "wellness",
    image: "/images/services/wellness.webp",
    imageAlt: {
      en: "A calm beagle receiving a gentle veterinary examination at home",
      es: "Un beagle tranquilo recibe un examen veterinario en casa",
    },
    slug: { en: "wellness", es: "bienestar" },
    title: {
      en: "Wellness & Preventive Care",
      es: "Bienestar y Cuidado Preventivo",
    },
    tagline: {
      en: "Help your pet live a longer, healthier life",
      es: "Ayude a su mascota a vivir más y mejor",
    },
    intro: {
      en: "Preventive care is one of the best ways to help your pet live a longer, healthier life. Wellness examinations allow our veterinarians to identify potential problems and diseases that may otherwise go unnoticed, including heart murmurs, tumors, enlarged organs, cataracts, ear infections, ear mites, dental disease, skin conditions, and allergies.",
      es: "El cuidado preventivo es una de las mejores maneras de ayudar a su mascota a vivir una vida más larga y saludable. Los exámenes de bienestar permiten a nuestros veterinarios identificar problemas y enfermedades que de otro modo pasarían desapercibidos, incluyendo soplos cardíacos, tumores, órganos agrandados, cataratas, infecciones de oído, ácaros, enfermedad dental, afecciones de la piel y alergias.",
    },
    includes: [
      { en: "Comprehensive wellness exams", es: "Exámenes de bienestar completos" },
      { en: "Puppy and kitten wellness visits", es: "Visitas de bienestar para cachorros y gatitos" },
      { en: "Adult and senior pet care", es: "Cuidado de mascotas adultas y mayores" },
      { en: "Routine vaccinations", es: "Vacunación de rutina" },
      { en: "Preventive health consultations", es: "Consultas de salud preventiva" },
      { en: "Nutrition and weight-management guidance", es: "Orientación sobre nutrición y control de peso" },
      { en: "Parasite prevention recommendations", es: "Recomendaciones para la prevención de parásitos" },
    ],
  },
  {
    id: "laboratory",
    image: "/images/services/laboratory.webp",
    imageAlt: {
      en: "A veterinary professional organizing capped sample tubes beside a microscope",
      es: "Un profesional veterinario organiza tubos de muestras junto a un microscopio",
    },
    slug: { en: "laboratory", es: "laboratorio" },
    title: { en: "Laboratory Services", es: "Servicios de Laboratorio" },
    tagline: {
      en: "Answers from a simple blood or urine sample",
      es: "Respuestas a partir de una muestra de sangre u orina",
    },
    intro: {
      en: "Our veterinary team offers laboratory testing to help evaluate your pet's overall health, investigate symptoms, and support accurate diagnosis and treatment planning.",
      es: "Nuestro equipo veterinario ofrece pruebas de laboratorio para evaluar la salud general de su mascota, investigar síntomas y respaldar un diagnóstico preciso y un plan de tratamiento adecuado.",
    },
    includes: [
      { en: "Bloodwork and laboratory testing", es: "Análisis de sangre y pruebas de laboratorio" },
      { en: "Complete Blood Count (CBC)", es: "Hemograma completo (CBC)" },
      { en: "Chemistry panels", es: "Perfiles bioquímicos" },
      { en: "Thyroid (T4) testing", es: "Prueba de tiroides (T4)" },
      { en: "Urinalysis", es: "Análisis de orina" },
      { en: "Cytology", es: "Citología" },
      { en: "Blood and urine sample collection", es: "Toma de muestras de sangre y orina" },
      {
        en: "Additional diagnostic testing based on your pet's individual needs",
        es: "Pruebas diagnósticas adicionales según las necesidades de su mascota",
      },
    ],
  },
  {
    id: "diagnostics",
    image: "/images/services/diagnostics.webp",
    imageAlt: {
      en: "A relaxed dog receiving a portable abdominal ultrasound during a home visit",
      es: "Un perro tranquilo recibe una ecografía abdominal portátil durante una visita a domicilio",
    },
    slug: { en: "diagnostics", es: "diagnostico-por-imagenes" },
    title: { en: "Diagnostic Services", es: "Diagnóstico por Imágenes" },
    tagline: {
      en: "Advanced imaging, performed in your home",
      es: "Imágenes avanzadas, realizadas en su hogar",
    },
    intro: {
      en: "Ultrasound and echocardiography are performed by an internal medicine specialist to provide advanced diagnostic evaluation when needed.",
      es: "La ecografía y la ecocardiografía son realizadas por un especialista en medicina interna para brindar una evaluación diagnóstica avanzada cuando es necesario.",
    },
    includes: [
      { en: "Abdominal ultrasound", es: "Ecografía abdominal" },
      { en: "Diagnostic ultrasound", es: "Ecografía diagnóstica" },
      { en: "Echocardiography (cardiac ultrasound)", es: "Ecocardiografía (ecografía cardíaca)" },
      {
        en: "Imaging to assist in the evaluation of internal organs and certain medical conditions",
        es: "Imágenes para ayudar en la evaluación de órganos internos y ciertas afecciones médicas",
      },
      {
        en: "Full-body radiography when medically indicated",
        es: "Radiografía de cuerpo completo cuando está médicamente indicada",
      },
    ],
  },
  {
    id: "dental",
    image: "/images/services/dental.webp",
    imageAlt: {
      en: "A veterinarian gently lifting a dog's lip to examine its teeth",
      es: "Un profesional veterinario levanta suavemente el labio de un perro para revisar sus dientes",
    },
    slug: { en: "dental", es: "odontologia" },
    title: { en: "Dental Care", es: "Odontología" },
    tagline: {
      en: "Prevent dental disease and tooth loss",
      es: "Prevenga la enfermedad dental y la pérdida de dientes",
    },
    intro: {
      en: "Regular dental care is an important part of your pet's overall health. Our dental services help identify and address oral disease while supporting better long-term comfort and wellness.",
      es: "El cuidado dental regular es una parte importante de la salud general de su mascota. Nuestros servicios dentales ayudan a identificar y tratar la enfermedad oral, favoreciendo mayor comodidad y bienestar a largo plazo.",
    },
    includes: [
      { en: "Comprehensive oral examinations", es: "Exámenes orales completos" },
      { en: "Professional dental cleanings", es: "Limpiezas dentales profesionales" },
      { en: "Full-mouth dental X-rays", es: "Radiografías dentales de boca completa" },
      {
        en: "Dental extractions when medically indicated",
        es: "Extracciones dentales cuando están médicamente indicadas",
      },
      { en: "Anesthesia and patient monitoring", es: "Anestesia y monitoreo del paciente" },
      { en: "At-home dental care recommendations", es: "Recomendaciones de cuidado dental en casa" },
    ],
  },
  {
    id: "surgery",
    image: "/images/services/surgery.webp",
    imageAlt: {
      en: "A small dog with a recovery collar resting beside a veterinary professional",
      es: "Un perro pequeño con collar de recuperación descansa junto a un profesional veterinario",
    },
    slug: { en: "surgery", es: "cirugia" },
    title: { en: "Surgery & Procedures", es: "Cirugía y Procedimientos" },
    tagline: {
      en: "Select procedures, with full anesthetic monitoring",
      es: "Procedimientos seleccionados, con monitoreo anestésico completo",
    },
    intro: {
      en: "PetFocus provides select surgical and procedural services based on your pet's medical needs, overall health, and veterinarian assessment.",
      es: "PetFocus ofrece servicios quirúrgicos y procedimientos seleccionados según las necesidades médicas de su mascota, su estado de salud general y la evaluación del veterinario.",
    },
    includes: [
      { en: "Dog and cat spay procedures", es: "Esterilización de perras y gatas" },
      { en: "Dog and cat neuter procedures", es: "Castración de perros y gatos" },
      { en: "Select soft-tissue surgeries", es: "Cirugías seleccionadas de tejidos blandos" },
      { en: "Minor wound care", es: "Curación de heridas menores" },
      { en: "Select mass removals", es: "Extracción de masas seleccionadas" },
      {
        en: "Sedation and general anesthesia when medically appropriate",
        es: "Sedación y anestesia general cuando es médicamente apropiado",
      },
      {
        en: "Anesthetic monitoring throughout procedures",
        es: "Monitoreo anestésico durante todo el procedimiento",
      },
    ],
  },
  {
    id: "medical",
    image: "/images/services/medical.webp",
    imageAlt: {
      en: "A cat receiving a gentle ear examination in its familiar home surroundings",
      es: "Un gato recibe una revisión de oído en la tranquilidad de su hogar",
    },
    slug: { en: "medical", es: "consulta-medica" },
    title: { en: "Medical & Sick Pet Care", es: "Consulta Médica y Mascotas Enfermas" },
    tagline: {
      en: "Care for pets who aren't themselves",
      es: "Atención para mascotas que no se sienten bien",
    },
    intro: {
      en: "We provide medical evaluations and individualized care for pets experiencing illness, changes in behavior, or ongoing health concerns.",
      es: "Brindamos evaluaciones médicas y atención personalizada para mascotas con enfermedades, cambios de comportamiento o problemas de salud persistentes.",
    },
    includes: [
      { en: "Medical examinations", es: "Exámenes médicos" },
      { en: "Diagnostic testing", es: "Pruebas diagnósticas" },
      { en: "Individualized treatment plans", es: "Planes de tratamiento personalizados" },
      { en: "Medication management", es: "Manejo de medicamentos" },
      { en: "Supportive care", es: "Cuidado de soporte" },
      { en: "Follow-up visits", es: "Visitas de seguimiento" },
      { en: "Chronic condition monitoring", es: "Monitoreo de condiciones crónicas" },
    ],
  },
  {
    id: "technician",
    image: "/images/services/technician.webp",
    imageAlt: {
      en: "A veterinary technician carefully trimming a relaxed terrier's nails at home",
      es: "Un técnico veterinario corta con cuidado las uñas de un terrier tranquilo en casa",
    },
    slug: { en: "technician", es: "servicios-tecnicos" },
    title: { en: "Veterinary Technician Services", es: "Servicios de Técnico Veterinario" },
    tagline: {
      en: "Routine care without the car ride",
      es: "Cuidado de rutina sin el viaje en auto",
    },
    intro: {
      en: "Our veterinary technician services help support your pet's routine care and ongoing treatment under veterinary direction.",
      es: "Nuestros servicios de técnico veterinario apoyan el cuidado de rutina y el tratamiento continuo de su mascota, bajo dirección veterinaria.",
    },
    includes: [
      { en: "Nail trims", es: "Corte de uñas" },
      { en: "Ear cleaning", es: "Limpieza de oídos" },
      { en: "Basic grooming support", es: "Apoyo de aseo básico" },
      { en: "Blood and urine sample collection", es: "Toma de muestras de sangre y orina" },
      { en: "Medication administration", es: "Administración de medicamentos" },
      {
        en: "Additional technician services under veterinary direction",
        es: "Servicios técnicos adicionales bajo dirección veterinaria",
      },
    ],
  },
  {
    id: "end-of-life",
    image: "/images/services/end-of-life.webp",
    imageAlt: {
      en: "An elderly Labrador resting on a soft blanket while its owner gently strokes its head",
      es: "Un labrador mayor descansa sobre una manta suave mientras su familia le acaricia la cabeza",
    },
    slug: { en: "end-of-life", es: "final-de-la-vida" },
    title: { en: "Comfort & End-of-Life Care", es: "Acompañamiento y Final de la Vida" },
    tagline: {
      en: "Dignity and peace, at home",
      es: "Dignidad y paz, en su hogar",
    },
    intro: {
      en: "PetFocus offers compassionate comfort and end-of-life support to help families make informed decisions and provide their pets with dignity and peace.",
      es: "PetFocus ofrece acompañamiento y apoyo al final de la vida para ayudar a las familias a tomar decisiones informadas y brindar a sus mascotas dignidad y paz.",
    },
    includes: [
      { en: "Quality-of-life consultations", es: "Consultas de calidad de vida" },
      { en: "Comfort and supportive care", es: "Cuidados de confort y soporte" },
      { en: "End-of-life guidance", es: "Orientación para el final de la vida" },
      {
        // The "when appropriate and available" hedge is the client's own and
        // is deliberate — do not shorten this to a flat promise.
        en: "Compassionate in-home euthanasia when appropriate and available",
        es: "Eutanasia a domicilio, con compasión, cuando es apropiado y está disponible",
      },
    ],
    setApart: true,
  },
];

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getServiceBySlug(slug: string, lang: Lang): Service | undefined {
  return SERVICES.find((s) => s.slug[lang] === slug);
}

/** Everything that belongs in the normal services grid. */
export const GRID_SERVICES = SERVICES.filter((s) => !s.setApart);

/** Shown on its own, above or beside the grid. */
export const SET_APART_SERVICES = SERVICES.filter((s) => s.setApart);
