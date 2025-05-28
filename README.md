 Proyecto Fullstack: CRUD de Productos y Usuarios
 Estructura del Proyecto

/backend
  ├── server.js
  └── /data
      ├── productos.json
      └── usuarios.json

/frontend
  ├── Vite + React app

 Cómo ejecutar el proyecto

Backend

Ir a la carpeta del backend:
cd backend

Instalar dependencias:
npm install express cors
Crear archivos de datos (si no existen):

mkdir data
echo [] > data/productos.json
echo [] > data/usuarios.json

Ejecutar el servidor:
node server.js
El backend se ejecutará en http://localhost:3001

Frontend

Ir a la carpeta del frontend:
cd frontend

Instalar dependencias:
npm install

Ejecutar la app:
npm run dev
El frontend se ejecutará en http://localhost:5173

 Funcionalidades
CRUD de productos (nombre, precio)

CRUD de usuarios (nombre, email, edad)

Exportación a PDF

UI con Bootstrap