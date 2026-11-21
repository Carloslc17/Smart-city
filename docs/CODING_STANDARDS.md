# Normas de nombres y estilo de codigo

Estas normas son obligatorias para codigo nuevo y para archivos modificados en la
refactorizacion. La consistencia tiene prioridad sobre conservar un estilo legado.

## Principios generales

- Escribir codigo autoexplicativo; los comentarios solo aclaran decisiones no obvias.
- Una responsabilidad por funcion, componente, modulo y archivo.
- Evitar abreviaturas ambiguas (`u`, `temp`, `data2`, `arr`).
- Reutilizar nombres existentes dentro de un mismo dominio.
- Cambios de nombre deben incluir referencias, imports, rutas y pruebas relacionadas.
- No mezclar el estilo antiguo y el nuevo durante el desarrollo:
  - si se modifica un modulo existente, migrarlo a la norma indicada;
  - no realizar renombres aislados sin actualizar sus referencias.

## Idioma

- Nombre tecnico: ingles (`createUser`, `validateCredentials`, `pagination`).
- Nombre de dominio alineado con los datasets o la UI: espanol cuando el campo ya
  forma parte de la API (`distrito`, `tipo_accidente`, `desde`, `hasta`).
- Mensajes orientados al usuario: espanol.
- Commits: espanol
- Nombres de ramas: ingles.
- No traducir los campos publicos del API salvo que se migre el contrato completo.

## Convenciones de nombres

### Archivos y directorios

| Elemento | Convencion | Ejemplo |
|---|---|---|
| Directorios generales | kebab-case | `src/api-routes`, `src/data-loaders` |
| Directorios de componente React | PascalCase | `components/Button` |
| Componente React | PascalCase.jsx | `Button.jsx`, `AuthProvider.jsx` |
| CSS Module asociado | mismo nombre que el componente | `Button.module.css` |
| Pagina React | PascalCase.jsx | `Dashboard.jsx` |
| Hook | camelCase y prefijo `use` | `useAuth.js` |
| Contexto React | nombre de dominio + `Context` | `AuthContext.js` |
| Modulo JavaScript del backend | kebab-case.js | `auth.routes.js`, `auth.service.js` |
| Modelo Mongoose | PascalCase.js | `Accidente.js`, `User.js` |
| Utilidad o servicio sin framework | kebab-case.js | `app-error.js`, `date-utils.js` |
| Variables de entorno | UPPER_SNAKE_CASE | `MONGO_URI`, `CLIENT_URL` |

No usar snake_case, guiones ni espacios en nombres nuevos de archivos JavaScript.
Las excepciones de archivos anteriores al refactor deben documentarse o renombrarse
junto con sus imports.

### Identificadores JavaScript

- Variables y parametros: camelCase.
- Funciones y metodos: camelCase y verbo principal:
  `getUser`, `createAccident`, `validateCredentials`.
- Clases y esquemas: PascalCase: `AppError`, `AccidenteSchema`.
- Componentes React: PascalCase.
- Constantes locales: camelCase.
- Constantes compartidas y de configuracion: UPPER_SNAKE_CASE.
- Booleanos: prefijo `is`, `has`, `can`, `should` o `was`.
- Handlers de eventos: verbo y objeto: `handleSubmit`, `handleLogout`.
- Promesas o funciones asincronas: el nombre debe expresar el resultado,
  no `promiseData`.
- Evitar nombres genericos como `data`, `item`, `obj`, `res` en funciones
  donde exista un nombre de dominio mas claro.

### Backend

- Rutas: carpetas `api/routes`, archivos `*.routes.js`, exportaciones por defecto
  como router.
- Controladores: carpeta `api/controllers`, archivos `*.controller.js`.
- Servicios: carpeta `service`, archivos `*.service.js`.
- Middlewares: carpeta `api/middlewares`, nombres descriptivos en kebab-case.
- Modelos: carpeta `models`, un modelo por archivo y nombre de entidad singular.
- Utilidades: carpeta `utils`, sin logica de dominio.
- Request y response: usar `req` y `res` solo en funciones HTTP cortas.
- Errores: lanzar `AppError` para errores de negocio esperados.
- Respuesta exitosa de una coleccion paginada:
  `{ data, pagination: { page, limit, hasMore } }`.

Nombres objetivo durante el refactor:

```text
auth-controller.js -> auth.controller.js
auth_service.js    -> auth.service.js
auth_routes.js     -> auth.routes.js
errorHandler.js    -> error-handler.js
gestorAire.js      -> aire.service.js
```

El nombre actual debe mantenerse temporalmente solo si modificarlo implicaria
romper una ruta publica sin una migracion coordinada.

### Frontend

- Componentes: sin logica HTTP ni acceso directo a `sessionStorage`.
- API: funciones de `src/api` terminan en `Request`:
  `loginRequest`, `registerRequest`, `meRequest`.
- Hooks: encapsulan logica reutilizable y comienzan por `use`.
- Contextos: exponen estado y acciones relacionadas; no almacenar datos derivados.
- Estado: nombres del recurso o accion, por ejemplo `user`, `isLoading`,
  `initializationError`.
- Evitar componentes con mas de una responsabilidad principal.
- Mantener CSS relacionado junto al componente mediante CSS Modules.

## Estructura de directorios React

```text
src/
├── api/
├── components/
│   └── Button/
│       ├── Button.jsx
│       └── Button.module.css
├── context/
├── hooks/
├── pages/
├── routes/
├── styles/
└── utils/
```

Un directorio de componente debe contener su implementacion y estilos propios.
Codigo compartido por varias areas va en `utils`, `hooks` o `components`.

## Formato

- Indentacion: 2 espacios.
- Final de linea: LF.
- Codificacion: UTF-8.
- Punto y coma: obligatorio.
- Comillas: simples en JavaScript y dobles solo si son necesarias.
- Ancho recomendado: 100 columnas.
- Coma final: en objetos y arrays multilinea.
- Espacios alrededor de operadores y despues de comas.
- JSX: atributos en varias lineas cuando el elemento exceda el ancho recomendado.
- Sin espacios al final de linea ni archivos sin salto de linea final.
- No introducir comentarios superfluos ni codigo comentado.

Ejemplo:

```js
export async function login(credentials = {}) {
  const normalizedUsername = typeof credentials.username === 'string'
    ? credentials.username.trim()
    : '';

  return normalizedUsername;
}
```

## Imports

- Usar imports ES modules.
- Orden recomendado:
  1. modulos externos;
  2. modulos internos absolutos o relativos cercanos;
  3. estilos.
- Agrupar imports sin ordenarlos por nombre salvo que se use una herramienta automatica.
- Importar por ruta relativa el codigo local.
- Evitar rutas circulares.
- Evitar imports de carpetas enteras; preferir el modulo concreto.

Ejemplo React:

```jsx
import { useAuth } from '../../hooks/useAuth';
import styles from './Dashboard.module.css';
```

## Estilo de codigo backend

- Usar `async`/`await`; no mezclar callbacks y promesas sin necesidad.
- Validar entrada antes de consultar MongoDB.
- Normalizar texto recibido (`trim`, `toLowerCase`) en el limite de entrada.
- No exponer documentos Mongoose ni campos sensibles en respuestas.
- Usar los codigos HTTP adecuados: `400`, `401`, `403`, `404`, `409` y `500`.
- Centralizar el manejo de errores y respuestas en middleware.
- Los controladores coordinan HTTP y servicio; no implementan consultas Mongoose.
- Los servicios contienen reglas de negocio y llaman a modelos o repositorios.
- Los nombres de coleccion Mongoose deben ser en plural solo si el modelo existente
  ya lo exige; no cambiarla durante un renombre de archivo.

## Estilo de codigo React

- Preferir funciones declaradas o exportadas por defecto segun el rol del modulo.
- Extraer subcomponentes antes de superar aproximadamente 150-200 lineas.
- En JSX, atributos booleanos sin valor: `required`, `disabled`.
- Manejar loading, error y estado vacio de forma visible.
- No usar identificadores aleatorios como keys.
- Los efectos deben tener todas las dependencias declaradas.
- No mutar props, estado ni datos recibidos.

## Git

### Ramas

Usar el formato:

```text
<tipo>/<descripcion-kebab-case>
```

Tipos recomendados: `feature`, `fix`, `refactor`, `docs`, `test`, `chore`.

Ejemplos:

```text
feature/auth-provider
refactor/naming-conventions
fix/pagination-limit
```

### Commits

Usar Conventional Commits:

```text
tipo(scope opcional): descripcion breve en presente
```

Tipos permitidos:

- `feat`: nueva funcionalidad.
- `fix`: correccion.
- `refactor`: cambio interno sin cambiar comportamiento.
- `docs`: documentacion.
- `style`: formato sin impacto funcional.
- `test`: pruebas.
- `chore`: mantenimiento o configuracion.

Ejemplos:

```text
refactor(server): rename auth modules
feat(client): add dashboard loading state
fix(api): limit traffic pagination
```

## Definicion de terminado

Antes de abrir un Pull Request:

- Ejecutar `npm run lint --prefix client`.
- Ejecutar `npm run build --prefix client`.
- Ejecutar las pruebas disponibles para el backend y frontend.
- Confirmar que todos los imports siguen existiendo.
- Revisar nombres contra estas normas en los archivos modificados.
- Documentar cualquier excepcion justificable en el mismo cambio.
