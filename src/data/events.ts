import type { IEvent } from "@/models/event.model";

// Los eventos se gestionan vía GitHub Issues + Jules Agent.
// Agrega aquí los eventos cuando estén disponibles.
export const events: IEvent[] = [
  {
    id: "primeros-pasos-replit-2026",
    title: "Primeros pasos con Replit: de la idea al prototipo",
    description:
      "🚀 ¿Te gustaría crear aplicaciones con Inteligencia Artificial sin empezar desde cero? Descubre cómo Replit puede ayudarte a transformar una idea en un prototipo funcional en cuestión de minutos. En esta charla conocerás el potencial del desarrollo asistido por IA, aprenderás las mejores prácticas para construir aplicaciones con prompts efectivos y verás una demostración en vivo del proceso completo. 💡🤖 Ya seas estudiante, desarrollador o simplemente tengas curiosidad por el mundo del vibe coding, esta sesión te mostrará cómo acelerar el desarrollo de software utilizando herramientas impulsadas por IA.",
    date: "2026-07-13",
    time: "18:00",
    location: "https://luma.com/87mg1qrq",
    city: "Lima",
    region: "Lima",
    type: "Virtual",
    images: [
      {
        url: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/uploads/ce/e60020ea-291d-40d8-9fa9-8332abb2c4d0.png",
        aspectRatio: "1:1",
        alt: "Primeros pasos con Replit: de la idea al prototipo",
      },
    ],
    registration_url: "https://luma.com/87mg1qrq",
    tags: ["replit", "ai", "prototipado", "vibe coding"],
    organizer: "Developer Student Clubs UTP",
    program_id: "5",
    is_external: false,
  },
];
