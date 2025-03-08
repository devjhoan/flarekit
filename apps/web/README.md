# 🌐 Aplicación Web

## Configuración

### Constants.ts

El archivo `app/lib/constants.ts` contiene las configuraciones principales de la aplicación:

```typescript
// Elementos de la barra lateral y navegación
export const sidebarItems: Record<string, NavItem[]> = {
  General: [
    {
      title: "Resumen",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
  ],
  // Puedes agregar más secciones aquí
};

// URL de la API
export const API_URL = "http://localhost:8787"; // Ajusta según tu configuración

// Información de la marca
export const BRAND = {
  name: "TuMarca",
  summary: "Descripción de tu marca",
  logo: TuLogoIcon,
};

// Pesos de los roles para control de acceso
export const rolesWeights = {
  user: 0,
  admin: 1,
};

// Proveedores de autenticación disponibles
export const avaliableProviders = {
  google: {
    name: "Google",
    icon: GoogleIcon,
  },
  // Agrega más proveedores aquí
};
```

## Estructura de Carpetas

```
web/
├── app/                # Aplicación Next.js
│   ├── components/    # Componentes reutilizables
│   ├── lib/          # Utilidades y configuraciones
│   ├── api/          # Rutas de API
│   └── (routes)/     # Páginas y rutas
├── public/           # Archivos estáticos
└── styles/          # Estilos globales
```

## Personalización

### Temas y Estilos
- La aplicación utiliza Tailwind CSS para estilos
- Los componentes base son de shadcn/ui
- Puedes personalizar los colores y temas en `tailwind.config.js`

### Navegación
- Modifica `sidebarItems` en `constants.ts` para ajustar la navegación
- Cada item puede tener subitems y restricciones de roles

### Autenticación
- Los proveedores de autenticación se configuran en `avaliableProviders`
- Asegúrate de que coincidan con los configurados en la API

## Desarrollo

```bash
# Iniciar en modo desarrollo
bun dev

# Construir para producción
bun build
```

# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
