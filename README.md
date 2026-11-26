# 🏙️ Smart City Management

Aplicación web full stack (MERN) que transforma datos de ciudades en **dashboards interactivos** para visualizar, analizar y gestionar información urbana: movilidad, medio ambiente, energía, residuos, población y más.


---

## 📌 Índice

- [Objetivo](#-objetivo)
- [Características previstas](#-características-previstas)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🎯 Objetivo

Ofrecer una plataforma centralizada donde ayuntamientos, analistas y ciudadanos puedan consultar y gestionar datos de una ciudad mediante paneles visuales claros, filtrables y actualizables.

## ✨ Características previstas

- 📊 Dashboards con gráficos y KPIs por área (tráfico, calidad del aire, energía, residuos…).
- 📥 Importación y gestión de datasets de ciudades (CSV/JSON).
- 🔍 Filtros por fecha, zona, categoría y métrica.
- 🔐 Autenticación y roles de usuario (administrador, analista, lector).
- 🗺️ Visualización geográfica de datos (mapas).
- 🔌 API REST para consultar y administrar los datos.

## 🧰 Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Base de datos | MongoDB + Mongoose |
| Backend | Node.js + Express |
| Frontend | React |
| Autenticación | JWT |
| Visualización |  |

## 📁 Estructura del proyecto

```
smart-city-management/
├── client/            # Aplicación React (Vite)
├── server/            # API REST con Express y Mongoose
├── .env.example       # Plantilla de variables de entorno
├── .gitignore
└── README.md
```

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior
- [MongoDB](https://www.mongodb.com/) local o cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Git](https://git-scm.com/)

## 🚀 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Carloslc17/Smart-city.git
   cd Smart-city
   ```

## API de datos masivos

Las consultas de accidentalidad, calidad del aire y tráfico están paginadas para
evitar devolver colecciones completas. Todas aceptan `page` (por defecto `1`)
y `limit` (por defecto `50`, máximo `100`), y responden con `data` y
`pagination` (`page`, `limit` y `hasMore`).

- `GET /api/accidentes`: filtros opcionales `desde`, `hasta` (fechas ISO,
  inclusivas), `distrito`, `distrito_cod`, `tipo_accidente` y `gravedad_max`.
- `GET /api/aire`: filtros opcionales `desde`, `hasta`, `estacion_id`,
  `magnitud` y `magnitud_cod`.
- `GET /api/trafico`: filtros opcionales `desde`, `hasta`, `idelem` y
  `tipo_elem`.

Ejemplo: `GET /api/trafico?desde=2051-01-01&hasta=2051-01-31&idelem=1001&limit=25`.


## 🤝 Contribuir

Antes de crear codigo nuevo o refactorizar nombres, consulta
[Normas de nombres y estilo de codigo](CODING_STANDARDS.md).

1. Haz un fork del proyecto.
2. Crea una rama para tu cambio: `git checkout -b feature/nombre-de-la-mejora`
3. Haz commit de tus cambios: `git commit -m "feat: descripción del cambio"`
4. Sube la rama: `git push origin feature/nombre-de-la-mejora`
5. Abre un Pull Request.

Se recomienda seguir [Conventional Commits](https://www.conventionalcommits.org/es/) (`feat:`, `fix:`, `docs:`, `chore:`…).

## 📄 Licencia

Distribuido bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.

---
