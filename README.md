# 🎮 Video Games Platform

Una plataforma web para explorar videojuegos, ver su detalle, gestionar favoritos y navegar por un catálogo paginado.

El proyecto está construido con una arquitectura **full-stack moderna**:

* **Frontend:** React + Vite + TypeScript + TailwindCSS
* **Backend:** Node.js + Express
* **Base de datos:** PostgreSQL
* **Contenedores:** Docker + Docker Compose

---

# 📦 Arquitectura del proyecto

```
video-games-platform
│
├── backend
│   ├── src
│   ├── routes
│   ├── config
│   ├── seed.js
│   ├── package.json
│   └── Dockerfile
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

# 🚀 Requisitos

Antes de ejecutar el proyecto necesitas instalar:

* Node.js (v18 o superior)
* Docker
* Docker Compose
* PostgreSQL (si usas base de datos local)

---

# ⚙️ Variables de entorno

El backend utiliza variables de entorno.

Archivo:

```
backend/.env
```

Ejemplo:

```
PORT=3000

DB_HOST=host.docker.internal
DB_PORT=5432
DB_NAME=videogames
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=super_secret_jwt_key_123
BCRYPT_SALT_ROUNDS=10
```

---

# 🐳 Ejecutar el proyecto con Docker

Desde la raíz del proyecto:

```
docker compose up --build
```

Esto levantará:

* frontend → http://localhost:5173
* backend → http://localhost:3000

---

# 🗄️ Crear la base de datos

Debes tener una base de datos PostgreSQL llamada:

```
videogames
```

Ejemplo SQL:

```sql
CREATE DATABASE videogames;
```

---

# 🌱 Ejecutar el Seed (datos de videojuegos)

El proyecto incluye un script que inserta **más de 100 videojuegos** en la base de datos para poder probar:

* paginación
* catálogo
* vista detalle

Ejecutar el seed desde el contenedor backend:

```
docker exec -it games-api node seed.js
```

Si ejecutas el backend sin Docker:

```
node backend/seed.js
```

---

# 📚 Endpoints API

### Obtener juegos paginados

```
GET /api/games?page=1&limit=12
```

Respuesta:

```
{
  data: [...],
  total: 120,
  page: 1,
  totalPages: 10
}
```

---

### Obtener detalle de un juego

```
GET /api/games/:id
```

---

# 🖥️ Frontend

El frontend permite:

* explorar catálogo de videojuegos
* paginación
* ver detalle del juego
* login / signup
* interfaz responsive

Ejecutar frontend manualmente:

```
cd frontend
npm install
npm run dev
```

---

# 🔧 Backend

El backend está construido con Express.

Ejecutar manualmente:

```
cd backend
npm install
npm run dev
```

---

# 📱 Responsive Design

La aplicación está diseñada para funcionar en:

* móvil
* tablet
* laptop
* pantallas ultra-anchas

Utilizando **TailwindCSS Grid responsive**.

---

# 🧠 Tecnologías utilizadas

Frontend

* React
* Vite
* TailwindCSS
* Axios
* React Router

Backend

* Node.js
* Express
* PostgreSQL
* JWT
* Bcrypt

Infraestructura

* Docker
* Docker Compose

---

# ⭐ Funcionalidades

✔ Catálogo de videojuegos
✔ Paginación
✔ Vista detalle de juego
✔ Login / Signup
✔ API REST
✔ Seed automático de juegos
✔ Interfaz responsive

---

# 🚀 Posibles mejoras futuras

* Sistema de favoritos persistente
* Buscador de videojuegos
* Filtros por género
* Recomendaciones
* Banner de juegos destacados
* Autenticación OAuth

---

# 👨‍💻 Autor

Proyecto desarrollado como parte de un **TFM / proyecto full-stack** para explorar arquitecturas modernas con React, Node y Docker.
