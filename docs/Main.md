# 🏙️ Smart City Management

> Wiki del proyecto · Última actualización: 2026-10-27

Aplicación web full stack (MERN) que transforma los datos urbanos del dataset **ANTHEM** (≈ 8 GB entre ficheros CSV y GPX) en **dashboards interactivos** para visualizar, analizar y gestionar información de la ciudad: movilidad, medio ambiente, seguridad vial, energía, residuos y población.

> 🚧 **Estado del proyecto:** en desarrollo inicial (Sprint 1 · `v0.1.0` – Setup y base del proyecto).

---

## 📌 Índice

- [Objetivo](#-objetivo)
- [Alcance: dominios de datos](#-alcance-dominios-de-datos)
- [Características previstas](#-características-previstas)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del repositorio](#-estructura-del-repositorio)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [Hoja de ruta](#-hoja-de-ruta)
- [Estructura de la wiki](#-estructura-de-la-wiki)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🎯 Objetivo

Ofrecer una plataforma centralizada donde ayuntamientos, analistas y ciudadanos puedan consultar y gestionar los datos de una ciudad mediante paneles visuales claros, filtrables y actualizables, alineados con el *Manifiesto Anthem – The Smart City*: gestión sostenible de residuos, movilidad inteligente, reducción de la criminalidad y los accidentes, eficiencia energética, cuidado medioambiental y control inteligente de la población y sus necesidades.

## 🗂️ Alcance: dominios de datos

| Área | Datasets |
|------|----------|
| 🚗 Movilidad | Tráfico, aforo de peatones y bicicletas, bicicletas eléctricas, patinetes, estacionamiento regulado, aparcamientos rotacionales, taxi, ubicaciones de transporte público |
| 🌿 Medio ambiente | Calidad del aire, contaminación acústica |
| 🚨 Seguridad vial | Accidentalidad, multas |
| ⚡ Energía | Instalaciones fotovoltaicas |
| ♻️ Residuos y mobiliario | Contenedores |
| 👥 Población y territorio | Censo, callejero |

El detalle de cada dataset está en [Requisitos](Requisitos) (Anexo A).

## ✨ Características previstas

- 📊 Dashboards con gráficos y KPIs por área.
- 📥 Importación por lotes del dataset ANTHEM a MongoDB, con reglas de calidad de datos.
- 🔍 Filtros por fecha, distrito/barrio, estación y métrica.
- 🔐 Autenticación y roles de usuario (administrador, analista, lector).
- 🗺️ Visualización geográfica de datos (mapas).
- 🔌 API REST para consultar los datos y administrar la aplicación.

## 🧰 Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Base de datos | MongoDB (en contenedor Docker con volumen de datos) + Mongoose |
| Backend | Node.js (≥ 20.6) + Express, módulos ESM |
| Frontend | React (Vite) |
| Autenticación | JWT + bcrypt |
| Visualización | *Por definir (propuesta: Recharts + Leaflet)* |

## 📁 Estructura del repositorio

```
smart-city-management/
├── client/            # Aplicación React (Vite)
├── server/            # API REST (Express + Mongoose)
│   └── src/
│       ├── api/           # Vista: rutas, controladores, middlewares
│       ├── domain/        # Dominio: servicios y reglas de negocio
│       ├── persistence/   # Persistencia: modelos y repositorios
│       └── config/
├── .gitignore
└── README.md
```

La explicación de las capas está en [Arquitectura del Sistema](Arquitectura-del-Sistema).

## ✅ Requisitos previos

- [[Node.js](https://nodejs.org/)](https://nodejs.org/) v20.6 o superior
- [[npm](https://www.npmjs.com/)](https://www.npmjs.com/)
- [[Docker](https://www.docker.com/)](https://www.docker.com/) (para MongoDB)
- [[Git](https://git-scm.com/)](https://git-scm.com/)
- Espacio en disco suficiente para el dataset (≈ 8 GB) y para la base de datos

## 🚀 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/<tu-usuario>/smart-city-management.git
   cd smart-city-management
   ```

2. **Levantar MongoDB en Docker** 

3. **Instalar dependencias del servidor y configurar el entorno**

   ```bash
   cd server
   cp .env.example .env
   npm install
   ```

4. **Instalar dependencias del cliente**

   ```bash
   cd ../client
   npm install
   ```

5. **Arrancar en desarrollo** (en dos terminales)

   ```bash
   # Terminal 1 – API
   cd server
   npm run dev

   # Terminal 2 – Cliente
   cd client
   npm run dev
   ```

   - Cliente: http://localhost:5173
   - API: http://localhost:5000 (comprobación: `GET /api/health`)

> El dataset **no** se incluye en el repositorio. 

## 🔑 Variables de entorno

Archivo `server/.env` (plantilla en `server/.env.example`):

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27018/anthem
CLIENT_URL=http://localhost:5173

# A partir del Sprint 2
JWT_SECRET=cambia_esta_clave_secreta
JWT_EXPIRES_IN=7d
```

Archivo `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ **Nunca subas archivos `.env` al repositorio.**

## 📜 Scripts disponibles

**Servidor (`/server`)**

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | API con recarga automática (`node --watch --env-file=.env`) |
| `npm start` | API en modo producción |

**Cliente (`/client`)**

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo de Vite |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualiza el build |

## 🗺️ Hoja de ruta

Seguimiento detallado en los Issues y Milestones del repositorio.

## 📚 Estructura de la wiki

| Página | Contenido |
|--------|-----------|
| [Home](Home) | Esta página: presentación del proyecto, instalación y mapa de la wiki |
| [Requisitos](Requisitos) | Actores, requisitos funcionales y no funcionales, restricciones, descripción del dataset y trazabilidad con los sprints |
| [Arquitectura del Sistema](Arquitectura-del-Sistema) | Visión general, arquitectura en capas, modelo de datos, importación del dataset, API, despliegue y decisiones de diseño |
| [Plan de Gestión de Configuración](Plan-de-Gestion-de-Configuracion) | Elementos de configuración, ramas, versionado, control de cambios, entornos, gestión del dataset y auditorías |


> Páginas previstas más adelante: Guía de desarrollo, Modelo de datos detallado, API (referencia de endpoints), Plan de pruebas y Despliegue.

## 🤝 Contribuir

1. Crea una rama desde `main`: `git checkout -b feature/<n-issue>-descripcion-corta`
2. Haz commits con [[Conventional Commits](https://www.conventionalcommits.org/es/)](https://www.conventionalcommits.org/es/): `feat:`, `fix:`, `docs:`, `chore:`…
3. Sube la rama y abre un Pull Request que referencie el issue (`Closes #n`).

El flujo completo está en el [Plan de Gestión de Configuración](Plan-de-Gestion-de-Configuracion).

## 📄 Licencia

Distribuido bajo la licencia MIT. Consulta el archivo `LICENSE` del repositorio.