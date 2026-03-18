# UTN Llaves

Un sistema de gestión diseñado específicamente para el control, préstamo y devolución de llaves en la Universidad Tecnológica Nacional (UTN).

## 🚀 Características Principales

- **Gestión de Préstamos:** Registro rápido de llaves especificando la etiqueta de la llave (auto-convertido a mayúsculas, ej: 'F1') y el solicitante.
- **Control de Duplicados Riguroso:** El sistema impide prestar una llave que ya se encuentra en estado "ACTIVO" o "EDITADO".
- **Devoluciones Inteligentes:** Registro de devoluciones con opción rápida para indicar si la llave fue devuelta por el mismo solicitante o por una persona distinta.
- **Historial Completo (Timeline):** Vista detallada agrupada por fecha de todos los movimientos históricos.
- **Ordenamiento Natural:** Las llaves en el sistema se ordenan lógicamente (F1, F2, F3... F10) en lugar de un ordenamiento alfabético estricto.
- **UI Institucional:** Diseño a medida siguiendo los colores institucionales de la UTN (Navy, Blue, Light) y tipografía IBM Plex.
- **Totalmente Offline (Local):** Los datos persisten en la memoria del navegador (`localStorage`), asegurando privacidad y velocidad sin requerir backend.

## 🛠️ Stack Tecnológico

El proyecto está construido bajo una arquitectura moderna de Frontend:

- **Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Routing:** [Wouter](https://github.com/molefrog/wouter) (Enrutamiento ligero y basado en Hooks)
- **Estilos:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Componentes UI:** [Radix UI](https://www.radix-ui.com/) (Primitivas Accesibles: Dialog, Switch)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Utilidades:** `date-fns` (fechas), `uuid` (identificadores únicos), `clsx` y `tailwind-merge` (clases condicionales).

## 💾 Estructura de Datos (LocalStorage)

El sistema gasta una única clave en el `localStorage` del navegador llamada `utn_llaves_jornadas`. La estructura almacena un arreglo de jornadas, agrupando los turnos por día:

```typescript
// Estructura de Jornada
interface JornadaTurno {
  fecha: string; // Formato YYYY-MM-DD
  turnos: KeyEntry[];
}

// Estructura de cada Préstamo
interface KeyEntry {
  id: string; // UUID
  llave: string; // Ej: F1, A4
  solicitante: string;
  quienDevuelve: string | null;
  fechaPrestamo: string; // ISO String
  fechaDevolucion: string | null; // ISO String
  estado: 'ACTIVO' | 'DEVUELTO' | 'EDITADO';
}
```

## ⚙️ Instalación y Uso Local

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu entorno.

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/atarico/utn-llaves.git
   cd utn-llaves
   ```

2. **Instalar dependencias:**
   Puedes usar `npm`, `yarn` o `pnpm` (recomendado).
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   pnpm run dev
   # o
   npm run dev
   ```

4. **Abrir en el navegador:**
   El proyecto estará corriendo típicamente en `http://localhost:5173`.

## 📦 Construcción para Producción

Para generar el bundle optimizado listo para despliegue:

```bash
npm run build
```

Esto generará una carpeta `dist/` que puede ser servida en cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc).
