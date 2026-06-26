export interface IJob {
  id: string;
  title: string; // Título del puesto
  company: string; // Nombre de la empresa
  description: string; // Descripción del rol (max 500 chars)
  location: string; // Ciudad o "Remoto"
  region: string; // "Lima", "Internacional", etc.
  type: "Full-time" | "Part-time" | "Freelance" | "Prácticas";
  modality: "Presencial" | "Remoto" | "Híbrido";
  salary_range?: string; // Opcional: ej. "S/. 3000 - 5000"
  apply_url: string; // URL para postular
  tags: string[]; // Tecnologías requeridas (ej: ["react", "nodejs"])
  posted_date: string; // Formato: YYYY-MM-DD
  expires_date?: string; // Opcional: YYYY-MM-DD
}
