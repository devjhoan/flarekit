# 🔧 API - Configuración

## Variables de Entorno

Crea un archivo `.env` en la carpeta `apps/api` con las siguientes variables:

```env
# General Settings
API_PORT=8787                    # Puerto donde se ejecutará la API
WEB_URL=http://localhost:5173   # URL del frontend
API_URL=http://localhost:8787   # URL de la API

# Authentication Settings
BETTER_AUTH_SECRET=             # Clave secreta para Better Auth (mínimo 32 caracteres)
BETTER_AUTH_URL=               # URL del frontend para autenticación

# Database Settings
DB_FILE_NAME=file:db.sqlite    # Ruta del archivo SQLite

# Google Settings (Opcional - para autenticación con Google)
GOOGLE_CLIENT_ID=              # Client ID de Google OAuth
GOOGLE_CLIENT_SECRET=          # Client Secret de Google OAuth

# Encryption Settings
ENCRYPTION_SECRET=             # Clave para encriptación (mínimo 32 caracteres)
```

## Autenticación

El sistema de autenticación está implementado usando Better Auth. Puedes agregar más proveedores de autenticación en `src/utils/auth.ts`.

### Proveedores Disponibles
- Email/Password (habilitado por defecto)
- Google OAuth

### Agregar Nuevos Proveedores

1. Modifica `src/utils/auth.ts`:
```typescript
export const auth = betterAuth({
  // ... configuración existente ...
  socialProviders: {
    google: {
      // ... configuración de Google ...
    },
    // Agregar nuevo proveedor aquí
    github: {
      clientId: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      redirectURI: `${config.API_URL}/api/auth/callback/github`,
    },
  },
});
```

2. Actualiza `apps/web/app/lib/constants.ts`:
```typescript
export const avaliableProviders = {
  google: {
    name: "Google",
    icon: GoogleIcon,
  },
  // Agregar nuevo proveedor aquí
  github: {
    name: "GitHub",
    icon: GitHubIcon,
  },
};
```

3. Agrega las variables de entorno necesarias en `.env`.

## Roles y Permisos

El sistema incluye dos roles por defecto:
- `user`: Usuario regular
- `admin`: Administrador con acceso completo

El primer usuario registrado automáticamente recibe el rol de `admin`.

To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000
