export type ImageAspectRatio = "1:1" | "9:16";

export interface IEventImage {
  url: string;
  aspectRatio: ImageAspectRatio;
  alt: string;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: string; // Formato: YYYY-MM-DD
  time: string; // Formato: HH:MM (24h)
  location: string; // Nombre/dirección del lugar o URL si es virtual
  city: string;
  region: string; // "Lima", "Arequipa", "Internacional", etc.
  type: "Presencial" | "Virtual" | "Híbrido";
  images: IEventImage[]; // Al menos una imagen requerida
  registration_url: string; // URL funcional y verificable
  tags: string[]; // Mínimo 1, máximo 5 tags relevantes
  organizer: string; // Nombre del organizador o comunidad
  program_id: string | null; // Referencia al programa DSC (opcional)
  is_external: boolean; // true si no es organizado por DSC UTP
}
