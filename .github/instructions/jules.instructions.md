---
description: Instrucciones para el agente Jules al procesar issues de contenido
applyTo: '**'
---

# Instrucciones para el Agente Jules

## Tu rol

Eres un agente que procesa issues con la label `jules`. Tu tarea es:
1. Leer el issue y extraer la URL principal
2. Visitar esa URL y extraer toda la información disponible
3. Mapear los datos al modelo TypeScript correspondiente (ver carpeta `src/models/`)
4. Editar el archivo `src/data/*.ts` correspondiente agregando el nuevo objeto
5. Crear un Pull Request con el cambio

## Stack del proyecto

- TanStack Start + React + Vite + Cloudflare Workers
- TypeScript estricto
- Los datos son arrays estáticos en `src/data/`
- Los modelos/contratos están en `src/models/`

## Archivos de datos y sus modelos

| Archivo de datos | Modelo | Tipo de issue |
|---|---|---|
| `src/data/events.ts` | `src/models/event.model.ts` (IEvent) | [Evento] |
| `src/data/jobs.ts` | `src/models/job.model.ts` (IJob) | [Empleo] |
| `src/data/projects.ts` | `src/models/project.model.ts` (IProject) | [Proyecto] |
| `src/data/communities.ts` | `src/models/community.model.ts` (ICommunity) | [Comunidad] |

## Reglas de extracción de imágenes (eventos)

- Busca imágenes del evento en la página visitada
- Si encuentras una imagen cuadrada o adaptable: agrégala como `aspectRatio: '1:1'`
- Si encuentras una imagen vertical (poster/stories): agrégala como `aspectRatio: '9:16'`
- Si solo hay una imagen, agrégala con el aspecto que mejor corresponda a sus dimensiones
- `alt` debe describir brevemente la imagen en español

## Validación de duplicados

Antes de agregar, verifica que no exista en el archivo de datos un registro con:
- **Eventos:** mismo `title` Y misma `date`
- **Empleos:** misma `apply_url`
- **Proyectos:** mismo `repo_url`
- **Comunidades:** mismo `name`

Si hay duplicado: cierra el issue con un comentario explicando el duplicado encontrado.

## Formato de fechas

- Siempre usar `YYYY-MM-DD` para fechas
- Siempre usar `HH:MM` en formato 24h para horas
- Si no encuentras la hora, usar `"00:00"` y mencionarlo en el PR

## Formato de tags

- Siempre en minúsculas
- Sin acentos ni caracteres especiales
- Máximo 5 tags por registro

## Generación de IDs

- Usar un UUID v4 como `id` para cada nuevo registro
- Formato: `"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"`

## Reglas de validación

| Campo | Regla |
|---|---|
| `date` (eventos) | Mayor o igual a hoy. Formato `YYYY-MM-DD` |
| `time` (eventos) | Formato `HH:MM` en 24h |
| `registration_url` (eventos) | URL válida con protocolo `https://` |
| `images` (eventos) | Mínimo 1 imagen. Si hay 2, deben tener aspectos diferentes |
| `region` | Obligatorio. Valor de lista conocida o "Internacional" |
| `tags` | Minúsculas, sin acentos, entre 1 y 5 |
| `organizer` (eventos) | Obligatorio |
| `apply_url` (empleos) | URL funcional |
| `posted_date` (empleos) | No puede ser una fecha futura |
| `expires_date` (empleos) | Si existe, posterior a `posted_date` |
| `repo_url` (proyectos) | URL de GitHub válida con protocolo `https://` |
| `year` (proyectos) | Número de 4 dígitos, no puede ser futuro |
| `members` (proyectos) | Al menos 1 integrante. Formato: `{ name, role }` |

## Procesamiento especial para issues de tipo [Proyecto]

A diferencia de otros tipos, los proyectos **no requieren visitar una URL externa** para extraer datos — toda la información viene directamente de los campos del issue. Sin embargo, puedes visitar el `repo_url` de GitHub para obtener datos adicionales opcionales (descripción del repo, lenguaje principal, topics).

### Mapeo de campos del issue al modelo `IProject`

| Campo del issue | Campo en IProject | Notas |
|---|---|---|
| `project_name` | `name` | Usar exactamente como se escribió |
| `repo_url` | `repo_url` | Verificar que empiece con `https://github.com/` |
| `demo_url` | `demo_url` | Opcional; omitir la clave si está vacío |
| `summary` | `summary` | Truncar a 150 caracteres si excede |
| `description` | `description` | Usar tal cual |
| `members` | `members[]` | Parsear línea a línea con formato `Nombre | Rol` → `{ name, role }` |
| `tags` | `tags[]` | Dividir por coma, normalizar a minúsculas sin acentos, máximo 5 |
| `program_id` | `program_id` | Extraer solo el número del inicio: "1 — DSC Web" → `"1"`. Si es "Sin programa específico" → omitir la clave |
| `status` | `status` | Usar el valor exacto: `"activo"`, `"completado"` o `"pausado"` |
| `year` | `year` | Convertir a número entero |

### Generación del objeto final

```typescript
{
  id: "uuid-v4-generado",
  name: "Nombre del proyecto",
  summary: "Resumen corto...",
  description: "Descripción completa...",
  repo_url: "https://github.com/...",
  // demo_url solo si fue proporcionado
  tags: ["tag1", "tag2"],
  // program_id solo si fue seleccionado un programa
  status: "activo",
  members: [
    { name: "Nombre Integrante", role: "Rol" },
  ],
  year: 2025,
}
```

## Al crear el Pull Request

- Título: `feat: agregar [tipo] - [nombre]`
- Mencionar el issue relacionado con `Closes #[número]`
- Si faltó algún dato, mencionarlo en la descripción del PR
- Asegurarse de que el archivo modificado mantenga el formato correcto (sin trailing commas innecesarias, imports correctos)
