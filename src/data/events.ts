import type { IEvent } from "@/models/event.model";

// Los eventos se gestionan vía GitHub Issues + Jules Agent.
// Agrega aquí los eventos cuando estén disponibles.
export const events: IEvent[] = [
  {
    id: "e1",
    title: "¿Cómo no morir en el intento al usar Lovable?",
    description:
      "🚀 ¿Has escuchado de Lovable y quieres aprender a crear aplicaciones con IA sin perderte en el intento?\nEn esta sesión descubrirás cómo aprovechar Lovable para desarrollar proyectos de manera más rápida, evitando los errores más comunes que enfrentan quienes recién comienzan. Conocerás buenas prácticas, consejos basados en experiencia real y un flujo de trabajo que te permitirá sacar el máximo provecho a esta herramienta. 🤖✨\n✅ Aprende cómo empezar correctamente con Lovable\n✅ Evita los errores más comunes al crear tus primeros proyectos\n✅ Descubre buenas prácticas para trabajar con IA de forma eficiente\n🎤 Speaker: Jaime Fernández – Lovable Ambassador",
    date: "2026-07-08",
    time: "19:00",
    location: "https://luma.com/ps6yecwc",
    city: "Lima",
    region: "Lima",
    type: "Virtual",
    images: [
      {
        url: "https://images.lumacdn.com/uploads/9b/15d02f66-4a4b-4e12-a8ab-18cf49f12396.png",
        aspectRatio: "1:1",
        alt: "¿Cómo no morir en el intento al usar Lovable?",
      },
    ],
    registration_url: "https://luma.com/ps6yecwc",
    tags: ["ai", "lovable"],
    organizer: "DSC UTP",
    program_id: "5",
    is_external: false,
  },
  {
    id: "e2",
    title: "Primeros pasos con Replit: de la idea al prototipo",
    description:
      "🚀 ¿Te gustaría crear aplicaciones con Inteligencia Artificial sin empezar desde cero?\nDescubre cómo Replit puede ayudarte a transformar una idea en un prototipo funcional en cuestión de minutos. En esta charla conocerás el potencial del desarrollo asistido por IA, aprenderás las mejores prácticas para construir aplicaciones con prompts efectivos y verás una demostración en vivo del proceso completo. 💡🤖\nYa seas estudiante, desarrollador o simplemente tengas curiosidad por el mundo del vibe coding, esta sesión te mostrará cómo acelerar el desarrollo de software utilizando herramientas impulsadas por IA.\n✅ Conoce qué es Replit y cómo funciona\n✅ Aprende a convertir una idea en un prototipo funcional\n✅ Descubre buenas prácticas para crear aplicaciones con IA\n✅ Observa una demo en vivo desarrollando una aplicación desde cero\n🎤 Speaker: Mayckol Cruzado – Replit Ambassador",
    date: "2026-07-13",
    time: "18:00",
    location: "https://luma.com/87mg1qrq",
    city: "Lima",
    region: "Lima",
    type: "Virtual",
    images: [
      {
        url: "https://images.lumacdn.com/uploads/ce/e60020ea-291d-40d8-9fa9-8332abb2c4d0.png",
        aspectRatio: "1:1",
        alt: "Primeros pasos con Replit: de la idea al prototipo",
      },
    ],
    registration_url: "https://luma.com/87mg1qrq",
    tags: ["ai", "replit"],
    organizer: "DSC UTP",
    program_id: "5",
    is_external: false,
  },
  {
    id: "e3",
    title: "Como Cursor cambió mi workflow para acelerar el tiempo",
    description:
      "🚀 ¿Sientes que pasas más tiempo buscando soluciones que programando?\nLa IA está cambiando la forma en que desarrollamos software, y Cursor es una de las herramientas que está revolucionando la productividad de miles de desarrolladores.\nEn esta charla, Kevin Morales compartirá cómo rediseñó su workflow para desarrollar más rápido, resolver problemas en menos tiempo y aprovechar al máximo la programación asistida por IA. Además, veremos demostraciones en vivo y consejos que podrás aplicar desde el primer día.\n✨ En esta sesión aprenderás a:\n✅ Crear un workflow de desarrollo más eficiente con Cursor\n✅ Utilizar IA para generar, explicar y refactorizar código\n✅ Reducir el tiempo invertido en tareas repetitivas\n✅ Descubrir buenas prácticas para aprovechar al máximo el desarrollo asistido por IA\n🎤 Speaker Internacional: Kevin Morales 🇪🇨 – Cursor Ambassador",
    date: "2026-07-16",
    time: "18:00",
    location: "https://luma.com/v2d5ccvf",
    city: "Lima",
    region: "Lima",
    type: "Virtual",
    images: [
      {
        url: "https://images.lumacdn.com/uploads/oh/7968d477-f033-4db7-a53b-fdbe59a05b15.png",
        aspectRatio: "1:1",
        alt: "Como Cursor cambió mi workflow para acelerar el tiempo",
      },
    ],
    registration_url: "https://luma.com/v2d5ccvf",
    tags: ["ai", "cursor"],
    organizer: "DSC UTP",
    program_id: "5",
    is_external: false,
  },
  {
    id: "e4",
    title: "Kubernetes Community Days Lima 2026",
    description:
      "Kubernetes Community Days Lima reúne a entusiastas y profesionales para fortalecer la comunidad Cloud Native en Perú y LATAM. Es un espacio para compartir conocimientos, experiencias y tendencias en tecnologías de contenedores y gestión de clusters.",
    date: "2026-07-18",
    time: "08:30",
    location: "Universidad de Ingeniería y Tecnología - UTEC, Barranco",
    city: "Lima",
    region: "Lima",
    type: "Presencial",
    images: [
      {
        url: "https://pbs.twimg.com/profile_images/1517172081702588417/W-p_nI0-_400x400.jpg",
        aspectRatio: "1:1",
        alt: "Kubernetes Community Days Lima 2026",
      },
    ],
    registration_url:
      "https://www.eventbrite.com/e/kubernetes-community-days-lima-2026-tickets-1984982787953",
    tags: ["kubernetes", "cloud-native", "devops"],
    organizer: "KCD Lima Peru",
    program_id: null,
    is_external: true,
  },
];
