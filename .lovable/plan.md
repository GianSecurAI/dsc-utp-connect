## DSC UTP — Landing + páginas de programas

Landing inspirada en notion.com/es/product/dev: fondo azul profundo, tipografía sans grande con acentos monoespaciados, navegación con etiquetas tipo `[S] Syncs`, layout limpio y muy estructurado. Datos reales editables desde un panel admin (Lovable Cloud).

### Sistema de diseño

- Paleta (oklch en `src/styles.css`): fondo azul Notion `#1F36F8`-ish, texto blanco, surface azul más oscuro para cards, acentos en blanco/azul claro, monoespaciado para etiquetas/códigos.
- Tipografía: Inter / Geist Sans para UI, JetBrains Mono para etiquetas tipo `[P] Programas`.
- Componentes: cards con borde sutil, hover con outline blanco, badges monoespaciados, separadores punteados al estilo del referente.
- Logo DSC UTP simple en mono blanco arriba a la izquierda.

### Estructura de rutas (TanStack Start, file-based)

```
src/routes/
  __root.tsx            # nav + footer compartidos
  index.tsx             # landing
  programas.$slug.tsx   # detalle de un programa
  eventos.tsx           # listado completo con filtros
  admin.tsx             # panel CRUD (protegido)
  login.tsx             # login admin
```

### Landing (`/`)

1. **Hero**: a la izquierda título grande "Developer Student Clubs UTP" + subtítulo + chip mono `[DSC] UTP`; a la derecha imagen/ilustración (placeholder generada).
2. **¿Quiénes somos?**: bloque de texto editorial con un par de stats (miembros, programas, eventos).
3. **Nuestros Programas**: grid de 6 cards (Google Nexus, Microsoft Nexus, AWS Cloud Clubs, DevGirls, Talent Hub, ML Laboratory). Cada card lleva a `/programas/$slug`.
4. **Junta Directiva**: cards de presidente, vicepresidente y directores de área (avatar, nombre, rol, links sociales).
5. **Aliados**: grid de logos en escala de grises con hover a color.
6. **Eventos**: vista resumida con los 3-6 próximos + botón "Ver todos los eventos" → `/eventos`.
7. **Footer**: redes, contacto, créditos.

### Página de programa (`/programas/$slug`)

- Header con nombre del programa, descripción, color/icono.
- Sección **Integrantes** del programa (cards con foto, nombre, rol).
- Sección **Eventos organizados** por ese programa (cards con fecha, título, tipo, link).
- Botón volver al inicio.

### Página de eventos (`/eventos`)

- Filtros: por programa (chips multi-select) + toggle "Solo eventos externos".
- Búsqueda por texto.
- Lista/grid responsive de eventos con badge de programa y badge `EXTERNO` cuando aplica.

### Backend (Lovable Cloud)

Tablas:

- `programs` (id, slug, name, description, color, icon, order)
- `members` (id, name, role, photo_url, bio, socials jsonb, board_position, program_id nullable, order) — `board_position` ∈ {president, vice_president, director, member}
- `partners` (id, name, logo_url, website, order)
- `events` (id, title, description, date, location, cover_url, link, program_id nullable, is_external bool)
- `user_roles` (id, user_id, role) con enum `app_role` y función `has_role()` SECURITY DEFINER (patrón estándar)

RLS:

- SELECT público en `programs`, `members`, `partners`, `events`.
- INSERT/UPDATE/DELETE solo para `has_role(auth.uid(), 'admin')`.

Server functions (`createServerFn`):

- Lecturas públicas via `supabaseAdmin` con proyección segura (para SSR de páginas públicas).
- Mutaciones del panel admin protegidas con `requireSupabaseAuth` + check `has_role`.

### Panel admin (`/admin`)

- Login email/password.
- Tabs: Programas, Miembros, Aliados, Eventos.
- CRUD con formularios + subida de imágenes a Storage.

### Datos de muestra

Seed con datos realistas placeholder: 6 programas con descripciones, ~10 miembros (1 presi, 1 vice, 4 directores, 4 de programas), 4 aliados, ~8 eventos mezclando internos/externos. Imágenes generadas o avatares iniciales.

### Detalles técnicos

- SEO: `head()` por ruta con título/descripción propios; `og:image` en hero de landing y en cada programa.
- Imágenes hero/programas generadas con `imagegen` y guardadas en `src/assets/`.
- Loaders solo en rutas públicas usan server fns públicos (admin client + WHERE explícito), nunca `requireSupabaseAuth` en loader público.
- `attachSupabaseAuth` registrado en `src/start.ts` para que el panel admin funcione.

### Entregable de este loop

Implementaré: enable Lovable Cloud → migración con tablas + RLS + roles → seed de datos de muestra → estilos/tokens → landing + página de programa + página de eventos. Panel admin lo dejo como segundo paso si lo confirmas tras ver la landing, para no sobrecargar este turno.
