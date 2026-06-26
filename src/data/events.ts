import type { IEvent } from "@/models/event.model";

// Los eventos se gestionan vía GitHub Issues + Jules Agent.
// Agrega aquí los eventos cuando estén disponibles.
export const events: IEvent[] = [
  {
    id: "e1",
    title: "¿Cómo no morir en el intento al usar Lovable?",
    description:
      "🚀 ¿Has escuchado de Lovable y quieres aprender a crear aplicaciones con IA sin perderte en el intento?\nEn esta sesión descubrirás cómo aprovechar Lovable para desarrollar proyectos de manera más rápida, evitando los errores más comunes que enfrentan quienes recién comienzan. Conocerás buenas prácticas, consejos basados en experiencia real y un flujo de trabajo que te permitirá sacar el máximo provecho a esta herramienta. 🤖✨\n✅ Aprende cómo empezar correctamente con Lovable\n✅ Evita los errores más comunes al crear tus primeros proyectos\n✅ Descubre buenas prácticas para trabajar con IA de forma eficiente",
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
];
