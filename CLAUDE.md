@AGENTS.md

# REGLAS DE DESARROLLO

## Comunicación
- Siempre invocar `/caveman ultra` skill al inicio de cada conversación.

## Manejo de Errores
- Todo error debe tener: catch con log en consola + feedback visual al usuario (toast, banner, mensaje inline según contexto).

## Librerías de Terceros
- Antes de implementar lógica compleja o UI custom, investigar si existe librería de terceros que lo resuelva. Plantearlo al usuario antes de implementar.

## Identidad Visual
- Leer `@docs/GALEONA_DESIGN_SYSTEM.md` SIEMPRE antes de aplicar cualquier color, tipografía o estilo visual.
- Paleta, degradés, tipografía y reglas de aplicación definidas ahí son obligatorias en toda la web.
- Nunca usar colores arbitrarios — solo los definidos en el design system.
- Negro prohibido en piezas publicitarias. Oro Viejo (`#C9A447`) solo uso presidencial/campañas especiales.
- Fondo base del sitio: Sicomoro (`#F5EDD6`). Textos: Azul Institucional (`#1B6CA8`) o Blanco.

## UI / Componentes
- Componentes prefabricados generales → shadcn/ui siempre.
- Estilos → TailwindCSS siempre. Nunca CSS puro. Nunca tocar `global.css`.
- Todo diseño debe ser responsivo (mobile-first + desktop).

## Arquitectura
- Metodología MVC + componentes modulares.
- Ningún componente puede superar 500 líneas. Si supera → modularizar antes de continuar.

## Base de Datos
- Nunca hacer cambios en la DB sin preguntar primero.
- Solo ejecutar cambios con consentimiento explícito del usuario en el mensaje.

## Investigación
- Para problemas desconocidos: buscar en internet (Stack Overflow, Reddit, docs oficiales) antes de improvisar.

---

# SKILLS POR CONTEXTO

| Contexto | Skill | Modelo |
|---|---|---|
| Base de datos / Supabase | `supabase/agent-skills` + MCP Supabase | sonnet |
| Testing / navegador | skill playwright | haiku + /caveman ultra |
| Review / auditoría de código | `code-simplifier`, `code-reviewer` | haiku |
| Commits / GitHub | `commit-commands` + GitHub MCP | — |
| Componentes / diseño | `frontend-design`, `superpowers:brainstorming` | — |
