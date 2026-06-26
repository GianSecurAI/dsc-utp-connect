# Contexto del Proyecto: Página Web de Comunidad Tecnológica

## Propósito

Página web para una comunidad tecnológica con secciones de **Eventos**, **Empleos**, **Recursos** y **Comunidades**. La gestión del contenido es **100% automatizada vía GitHub**: los usuarios crean Issues, el agente Jules extrae los datos y genera un Pull Request, el propietario lo aprueba o rechaza.

**Stack:** Next.js (App Router) + TypeScript + TailwindCSS v4 — idéntico al de [peruanos.dev](https://github.com/lperezp/peruanos.dev).

---

## Arquitectura de Contenido

```text
tu-repo/
├── app/
│   ├── models/          ← Contratos TypeScript (el agente los usa como guía)
│   │   ├── event.model.ts
│   │   ├── job.model.ts
│   │   ├── resource.model.ts
│   │   └── community.model.ts
│   ├── data/            ← Archivos estáticos editados por el agente en el PR
│   │   ├── events.ts
│   │   ├── jobs.ts
│   │   ├── resources.ts
│   │   └── communities.ts
│   ├── api/             ← Endpoints con ISR (revalidación cada 3600s)
│   │   ├── events/route.ts
│   │   ├── jobs/route.ts
│   │   ├── resources/route.ts
│   │   └── communities/route.ts
│   └── components/      ← UI con filtros por tipo, región, tags
├── .github/
│   ├── ISSUE_TEMPLATE/  ← Formularios públicos + asignan label automáticamente
│   ├── PULL_REQUEST_TEMPLATE/
│   └── instructions/    ← Contexto que Jules lee al procesar un issue
```

---

## Flujo de Automatización (Jules Agent)

```text
1. Usuario crea un Issue usando el formulario correspondiente
         ↓
2. GitHub aplica automáticamente la label "jules"  ← TRIGGER del agente
         ↓
3. Jules lee el Issue + los archivos de instrucciones de .github/instructions/
         ↓
4. Visita la URL proporcionada → extrae los datos
         ↓
5. Mapea los datos al modelo TypeScript correspondiente
         ↓
6. Edita el archivo app/data/*.ts agregando el nuevo objeto
         ↓
7. Abre un Pull Request con el cambio
         ↓
8. El propietario revisa → acepta (merge) o rechaza (close)
         ↓
9. Al merge: Vercel redeploya → contenido visible en la web
```

> **Clave del funcionamiento:** La tipificación fuerte en TypeScript actúa como contrato explícito.
> Jules lee el modelo y sabe exactamente qué campos debe extraer, en qué formato y con qué restricciones.

---

## Modelos de Datos

### Evento (`app/models/event.model.ts`)

```typescript
export type ImageAspectRatio = '1:1' | '9:16';

export interface IEventImage {
  url: string;
  aspectRatio: ImageAspectRatio;  // '1:1' = cuadrada | '9:16' = vertical/stories
  alt: string;
}

export interface IEvent {
  title: string;
  description: string;
  date: string;                              // Formato: YYYY-MM-DD
  time: string;                              // Formato: HH:MM (24h)
  location: string;                          // Nombre/dirección del lugar o URL si es virtual
  city: string;                              // Ciudad del evento
  region: string;                            // Región o país (ej: "Lima", "Arequipa", "Internacional")
  type: 'Presencial' | 'Virtual' | 'Híbrido';
  images: IEventImage[];                     // Al menos una imagen requerida (puede tener ambos aspectos)
  registration_url: string;                  // URL funcional y verificable
  tags: string[];                            // Mínimo 1, máximo 5 tags relevantes
  organizer: string;                         // Nombre del organizador o comunidad (obligatorio)
}
```

**Reglas de validación para eventos:**

- `date` debe ser mayor o igual a la fecha actual
- `registration_url` debe ser una URL válida y accesible
- `images` debe contener al menos una entrada; si se proveen dos, deben tener aspectos `1:1` y `9:16`
- No se permiten duplicados: mismo `title` + `date` + `registration_url`
- `region` es obligatorio y debe ser un valor conocido o "Internacional"
- `tags` deben estar en minúsculas y sin acentos

---

### Empleo / Oferta Laboral (`app/models/job.model.ts`)

```typescript
export interface IJob {
  title: string;                             // Título del puesto
  company: string;                           // Nombre de la empresa
  description: string;                       // Descripción del rol (max 500 chars)
  location: string;                          // Ciudad o "Remoto"
  region: string;                            // Región (ej: "Lima", "Internacional")
  type: 'Full-time' | 'Part-time' | 'Freelance' | 'Prácticas';
  modality: 'Presencial' | 'Remoto' | 'Híbrido';
  salary_range?: string;                     // Opcional: ej. "S/. 3000 - 5000"
  apply_url: string;                         // URL para postular
  tags: string[];                            // Tecnologías requeridas (ej: ["react", "nodejs"])
  posted_date: string;                       // Formato: YYYY-MM-DD
  expires_date?: string;                     // Opcional: YYYY-MM-DD
}
```

**Reglas de validación para empleos:**

- `apply_url` debe ser funcional
- `posted_date` no puede ser una fecha futura
- `expires_date` si existe, debe ser posterior a `posted_date`
- No se permiten duplicados: mismo `title` + `company` + `apply_url`

---

### Recurso / Herramienta (`app/models/resource.model.ts`)

```typescript
export type ResourceCategory =
  | 'Documentación'
  | 'Herramienta'
  | 'Curso'
  | 'Libro'
  | 'Podcast'
  | 'Newsletter'
  | 'Blog'
  | 'Video'
  | 'Repositorio';

export interface IResource {
  title: string;
  description: string;
  url: string;                               // URL del recurso
  category: ResourceCategory;
  language: 'Español' | 'Inglés' | 'Ambos';
  is_free: boolean;
  tags: string[];
  author?: string;                           // Opcional
  image_url?: string;                        // Opcional: thumbnail del recurso
}
```

---

### Comunidad (`app/models/community.model.ts`)

```typescript
export interface ICommunity {
  name: string;
  description: string;
  logo_url: string;                          // URL de imagen (preferible cuadrada 1:1)
  city: string;
  region: string;
  topics: string[];
  contact: {
    email?: string;
    website?: string;
    socialMedia: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      discord?: string;
      facebook?: string;
      youtube?: string;
      instagram?: string;
    };
  };
}
```

---

## Issue Templates (`.github/ISSUE_TEMPLATE/`)

Cada template debe tener `labels: ["jules"]` para activar al agente.

### `event.yml`

```yaml
name: Agregar evento
description: Proponer un nuevo evento para la comunidad
title: "[Evento] "
labels: ["jules"]
body:
  - type: input
    id: event_url
    attributes:
      label: Link del evento o registro
      placeholder: 'https://eventbrite.com/...'
    validations:
      required: true

  - type: input
    id: organizer
    attributes:
      label: Organizador
      placeholder: 'ej. AWS User Group Lima'
    validations:
      required: true

  - type: dropdown
    id: region
    attributes:
      label: Región
      options: ["Lima", "Arequipa", "Cusco", "Trujillo", "Piura", "Internacional", "Otra"]
    validations:
      required: true

  - type: checkboxes
    id: confirmations
    attributes:
      label: Confirmaciones
      options:
        - label: He verificado que el evento no está duplicado
          required: true
        - label: La información es correcta y está actualizada
          required: true
        - label: El evento tiene al menos una imagen disponible
          required: true
```

### `job.yml`

```yaml
name: Agregar oferta laboral
description: Publicar una oferta de empleo tech
title: "[Empleo] "
labels: ["jules"]
body:
  - type: input
    id: job_url
    attributes:
      label: Link de la oferta
    validations:
      required: true

  - type: input
    id: company
    attributes:
      label: Empresa
    validations:
      required: true

  - type: checkboxes
    id: confirmations
    attributes:
      label: Confirmaciones
      options:
        - label: La oferta está activa y vigente
          required: true
        - label: La oferta es para el sector tecnológico
          required: true
```

### `resource.yml`

```yaml
name: Agregar recurso
description: Sugerir un recurso, herramienta o material educativo
title: "[Recurso] "
labels: ["jules"]
body:
  - type: input
    id: resource_url
    attributes:
      label: URL del recurso
    validations:
      required: true

  - type: dropdown
    id: category
    attributes:
      label: Categoría
      options: ["Documentación", "Herramienta", "Curso", "Libro", "Podcast", "Newsletter", "Blog", "Video", "Repositorio"]
    validations:
      required: true
```

### `community.yml`

```yaml
name: Agregar comunidad
description: Registrar una comunidad tecnológica
title: "[Comunidad] "
labels: ["jules"]
body:
  - type: input
    id: community_website
    attributes:
      label: Website o link principal
    validations:
      required: true

  - type: input
    id: community_name
    attributes:
      label: Nombre de la comunidad
    validations:
      required: true
```

---

## Instrucciones para Jules (`.github/instructions/jules.instructions.md`)

Este archivo es el más crítico: Jules lo lee para entender su tarea.

```markdown
---
description: Instrucciones para el agente Jules al procesar issues de contenido
applyTo: '**'
---

# Instrucciones para el Agente Jules

## Tu rol
Eres un agente que procesa issues con la label `jules`. Tu tarea es:
1. Leer el issue y extraer la URL principal
2. Visitar esa URL y extraer toda la información disponible
3. Mapear los datos al modelo TypeScript correspondiente (ver carpeta `app/models/`)
4. Editar el archivo `app/data/*.ts` correspondiente agregando el nuevo objeto
5. Crear un Pull Request con el cambio

## Reglas de extracción de imágenes (CRÍTICO)
- Busca imágenes del evento en la página visitada
- Si encuentras una imagen cuadrada o adaptable: agrégala como `aspectRatio: '1:1'`
- Si encuentras una imagen vertical (poster/stories): agrégala como `aspectRatio: '9:16'`
- Si solo hay una imagen, agrégala con el aspecto que mejor corresponda a sus dimensiones
- `alt` debe describir brevemente la imagen en español

## Validación de duplicados
- Antes de agregar, verifica que no exista en el archivo de datos un registro con:
  - Mismo `title` Y misma `date` (para eventos)
  - Misma `apply_url` (para empleos)
  - Mismo `url` (para recursos)
  - Mismo `name` (para comunidades)
- Si hay duplicado: cierra el issue con un comentario explicando el duplicado encontrado

## Formato de fechas
- Siempre usar `YYYY-MM-DD` para fechas
- Siempre usar `HH:MM` en formato 24h para horas
- Si no encuentras la hora, usar `"00:00"` y mencionarlo en el PR

## Formato de tags
- Siempre en minúsculas
- Sin acentos ni caracteres especiales
- Máximo 5 tags por evento

## Al crear el Pull Request
- Título: `feat: agregar [tipo] - [nombre]`
- Mencionar el issue relacionado con `Closes #[número]`
- Si faltó algún dato, mencionarlo en la descripción del PR
```

---

## Reglas de Validación Completas

| Campo | Regla |
| --- | --- |
| `date` | Mayor o igual a hoy. Formato `YYYY-MM-DD` |
| `time` | Formato `HH:MM` en 24h |
| `registration_url` | URL válida, accesible, con protocolo `https://` |
| `images` | Mínimo 1 imagen. Si hay 2, deben tener aspectos `1:1` y `9:16` |
| `region` | Obligatorio. Valor de lista conocida o "Internacional" |
| `tags` | Minúsculas, sin acentos, entre 1 y 5 tags |
| `organizer` | Obligatorio (a diferencia de peruanos.dev donde era opcional) |
| Duplicados | Verificar antes de agregar (title+date o URL única) |
| `expires_date` (jobs) | Si existe, posterior a `posted_date` |

---

## Diferencias respecto a peruanos.dev

| Aspecto | peruanos.dev | Este proyecto |
| --- | --- | --- |
| `image_url` | Una sola URL opcional | `images[]` con `aspectRatio` y `alt` obligatorio |
| `region` | No existe | Obligatorio en eventos y comunidades |
| `organizer` | Opcional | Obligatorio en eventos |
| Contenido | Eventos, comunidades, proyectos OS | Eventos, empleos, recursos, comunidades |
| Proyectos OS | Sí (via GitHub API) | No (reemplazado por Recursos) |
| Validación duplicados | Manual en checklist | Jules la verifica automáticamente |

---

## Referencia

Este proyecto replica la arquitectura de automatización de [peruanos.dev](https://github.com/lperezp/peruanos.dev).
Revisar ese repositorio como referencia de implementación para componentes, hooks de filtros y estructura de API routes.
