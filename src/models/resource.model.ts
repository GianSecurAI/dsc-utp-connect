export type ResourceCategory =
  | "Documentación"
  | "Herramienta"
  | "Curso"
  | "Libro"
  | "Podcast"
  | "Newsletter"
  | "Blog"
  | "Video"
  | "Repositorio";

export interface IResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  language: "Español" | "Inglés" | "Ambos";
  is_free: boolean;
  tags: string[];
  author?: string;
  image_url?: string;
}
