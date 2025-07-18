# Backend API - Empatía Online Sessions

API REST para gestionar psicólogos y sus horarios disponibles, construida con NestJS y PostgreSQL.

## Características

- ✅ Gestión de psicólogos con información completa
- ✅ Horarios disponibles por psicólogo
- ✅ API REST con documentación Swagger
- ✅ Integración con PostgreSQL usando TypeORM
- ✅ Sistema de migraciones
- ✅ Validación de datos con DTOs
- ✅ Manejo de errores centralizado

## Tecnologías

- **NestJS**: Framework de Node.js
- **TypeScript**: Lenguaje de programación
- **PostgreSQL**: Base de datos
- **TypeORM**: ORM para PostgreSQL
- **Swagger**: Documentación de API
- **Jest**: Testing framework

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar PostgreSQL

Asegúrate de tener PostgreSQL instalado y ejecutándose en tu sistema.

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus credenciales de PostgreSQL:

```bash
cp env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=empatia_sessions
PORT=3001
NODE_ENV=development
FRONTEND_URL=url
```

### 4. Configuración automática (Recomendado)

Ejecuta el script de configuración que te guiará paso a paso:

```bash
./setup-db.sh
```

### 4. Configuración manual

Si prefieres configurar manualmente:

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE empatia_sessions;

# Salir de psql
\q

# Ejecutar migraciones
npm run migration:run
```

## Ejecución

### Desarrollo

```bash
npm run start:dev
```

### Producción

```bash
npm run build
npm run start:prod
```

## Endpoints

### Psicólogos

- `GET /psychologists` - Obtener todos los psicólogos
- `GET /psychologists/:id` - Obtener psicólogo por ID con horarios disponibles
- `GET /psychologists/:id/time-slots` - Obtener horarios disponibles de un psicólogo

### Documentación

La documentación de la API está disponible en: `http://localhost:3001/api`

## Estructura del Proyecto

```
src/
├── entities/          # Entidades de TypeORM
│   ├── psychologist.entity.ts
│   └── time-slot.entity.ts
├── migrations/        # Migraciones de base de datos
├── common/
│   ├── dto/           # Data Transfer Objects
│   └── interfaces/    # Interfaces TypeScript
├── psychologists/     # Módulo de psicólogos
│   ├── psychologists.controller.ts
│   ├── psychologists.service.ts
│   └── psychologists.module.ts
├── app.module.ts      # Módulo principal
└── main.ts           # Punto de entrada
```

## Comandos de Migración

```bash
# Generar una nueva migración
npm run migration:generate -- src/migrations/NombreMigracion

# Ejecutar migraciones pendientes
npm run migration:run

# Revertir la última migración
npm run migration:revert

# Sincronizar esquema (solo desarrollo)
npm run schema:sync

```

## Testing

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests e2e
npm run test:e2e
```

## Conexión con DBeaver

Para conectar DBeaver a la base de datos:

1. Abre DBeaver
2. Crea una nueva conexión PostgreSQL
3. Configura los parámetros:
   - Host: localhost
   - Port: 5432
   - Database: empatia_sessions
   - Username: postgres
   - Password: tu_password
4. Testea la conexión y conéctate 