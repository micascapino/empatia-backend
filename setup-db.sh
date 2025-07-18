#!/bin/bash

echo "🚀 Configurando base de datos para Empatía Online Sessions"
echo ""

# Verificar si PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL no está instalado. Por favor instálalo primero."
    exit 1
fi

echo "✅ PostgreSQL encontrado"
echo ""

# Solicitar credenciales
read -p "Usuario de PostgreSQL (default: postgres): " DB_USER
DB_USER=${DB_USER:-postgres}

read -s -p "Contraseña de PostgreSQL: " DB_PASSWORD
echo ""

read -p "Host de PostgreSQL (default: localhost): " DB_HOST
DB_HOST=${DB_HOST:-localhost}

read -p "Puerto de PostgreSQL (default: 5432): " DB_PORT
DB_PORT=${DB_PORT:-5432}

read -p "Nombre de la base de datos (default: empatia_sessions): " DB_NAME
DB_NAME=${DB_NAME:-empatia_sessions}

echo ""
echo "📝 Creando base de datos..."

# Crear la base de datos
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Base de datos '$DB_NAME' creada exitosamente"
else
    echo "⚠️  La base de datos '$DB_NAME' ya existe o hubo un error"
fi

echo ""
echo "📝 Creando archivo .env..."

# Crear archivo .env
cat > .env << EOF
# Configuración de la base de datos PostgreSQL
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_USERNAME=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_DATABASE=$DB_NAME

# Configuración de la aplicación
NODE_ENV=development
PORT=3001
EOF

echo "✅ Archivo .env creado"
echo ""
echo "📝 Ejecutando migraciones..."

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Ejecutar migraciones
npm run migration:run

if [ $? -eq 0 ]; then
    echo "✅ Migraciones ejecutadas exitosamente"
    echo ""
    echo "🎉 ¡Configuración completada!"
    echo ""
    echo "Para ejecutar el servidor:"
    echo "  npm run start:dev"
    echo ""
    echo "Para conectar con DBeaver:"
    echo "  Host: $DB_HOST"
    echo "  Port: $DB_PORT"
    echo "  Database: $DB_NAME"
    echo "  Username: $DB_USER"
    echo "  Password: [la contraseña que ingresaste]"
else
    echo "❌ Error al ejecutar las migraciones"
    exit 1
fi 