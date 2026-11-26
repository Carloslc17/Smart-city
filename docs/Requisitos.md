# Requisitos

> Versión 0.1 · Última actualización: 2026-10-27 · Estado: borrador inicial

---

## 1. Introducción

### 1.1 Propósito

Este documento recoge los requisitos de **Smart City Management**: una aplicación web que permite explorar y gestionar, mediante dashboards, los datos urbanos del dataset ANTHEM.

### 1.2 Contexto

El dataset procede del reto *HPE CDS Tech Challenge – Anthem Hackathon* y describe una ciudad (Anthem) a través de sensores y registros administrativos. El *Manifiesto Anthem – The Smart City* marca los objetivos de negocio:

| Punto del manifiesto | Reflejo en la aplicación |
|----------------------|--------------------------|
| Optimizar la gestión de residuos | Dashboard de contenedores (ubicación, tipo de residuo, cantidad por distrito) |
| Favorecer la movilidad inteligente | Dashboards de tráfico, bicicletas, patinetes, peatones, aparcamientos y taxi |
| Reducir a cero la criminalidad y los accidentes | Dashboards de accidentalidad y multas |
| Análisis predictivo y gestión del mobiliario ciudadano | Mobiliario (contenedores, plazas SER, paradas); analítica predictiva fuera del alcance inicial |
| Optimizar el uso y la generación de energías renovables | Dashboard de instalaciones fotovoltaicas |
| Cuidado medioambiental | Dashboards de calidad del aire y contaminación acústica |
| Control inteligente de la población y sus necesidades | Dashboard de censo y distribución territorial |

### 1.3 Alcance

**Dentro del alcance:** importación del dataset a MongoDB, API REST de consulta y agregación, autenticación con roles, dashboards por dominio, mapas y filtros.

**Fuera del alcance (de momento):** datos en tiempo real, análisis predictivo, aplicaciones móviles, edición de los datos originales desde la interfaz.

### 1.4 Convenciones

- Identificadores: `RF-nn` (funcional), `RNF-nn` (no funcional), `RES-nn` (restricción).
- Prioridad (MoSCoW): **M**ust (imprescindible), **S**hould (importante), **C**ould (deseable), **W**on't (descartado por ahora).
- Los valores numéricos de los requisitos no funcionales son **objetivos propuestos** que deberán validarse con los datos reales.

---

## 2. Actores y roles

| Actor | Descripción | Permisos principales |
|-------|-------------|----------------------|
| **Lector** (`viewer`) | Ciudadano o empleado que consulta información | Ver dashboards y mapas |
| **Analista** (`analyst`) | Usuario que profundiza en los datos | Lector + filtros avanzados, comparativas y exportación |
| **Administrador** (`admin`) | Responsable de la plataforma | Todo lo anterior + gestión de usuarios y de importaciones |
| **Sistema de importación** | Proceso por lotes (scripts) | Carga y normaliza el dataset en MongoDB |

Rol por defecto en el registro: `viewer`.

---

## 3. Requisitos funcionales

### 3.1 Usuarios y seguridad

| ID | Requisito | Prioridad | Sprint |
|----|-----------|:---------:|:------:|
| RF-01 | El sistema permitirá registrar usuarios con nombre, email único y contraseña. | M | 2 |
| RF-02 | El sistema permitirá iniciar y cerrar sesión mediante JWT, y restaurar la sesión al recargar la página. | M | 2 |
| RF-03 | El sistema aplicará control de acceso por rol en la API (401 sin sesión, 403 sin permiso) y en las rutas del cliente. | M | 2 |
| RF-04 | Un administrador podrá listar usuarios, cambiar su rol y desactivarlos. | S | 3+ |

### 3.2 Gestión de datos

| ID | Requisito | Prioridad | Sprint |
|----|-----------|:---------:|:------:|
| RF-05 | El sistema permitirá importar por lotes los ficheros CSV del dataset a MongoDB mediante scripts de línea de comandos, sin cargar los ficheros completos en memoria. | M | 3 |
| RF-06 | El sistema permitirá importar las ubicaciones de transporte desde ficheros GPX. | S | 3-4 |
| RF-07 | Durante la importación se aplicarán las reglas de calidad del dataset (ver Anexo A): descartar o marcar datos no válidos y valores negativos de «sin dato». | M | 3 |
| RF-08 | El sistema normalizará las coordenadas (UTM ETRS-89, UTM en centímetros y WGS84) a un único formato geográfico. | S | 3 |
| RF-09 | La importación será **idempotente**: repetirla no duplicará datos. | S | 3 |
| RF-10 | El sistema registrará un historial de importaciones (fichero, fecha, filas leídas, filas importadas, filas rechazadas). | S | 3-4 |
| RF-11 | Un administrador podrá consultar el estado de las importaciones desde la interfaz. | C | 4+ |

### 3.3 API de consulta

| ID | Requisito | Prioridad | Sprint |
|----|-----------|:---------:|:------:|
| RF-12 | La API ofrecerá consulta de registros por dominio con filtros (rango de fechas, distrito, barrio, estación, tipo) y paginación. | M | 3 |
| RF-13 | La API ofrecerá agregaciones (suma, media, máximo, mínimo, conteo) y series temporales con granularidad hora, día, mes. | M | 3 |
| RF-14 | La API ofrecerá un resumen de KPIs por dominio. | M | 3 |
| RF-15 | La API devolverá puntos geolocalizados para su representación en mapas. | S | 4 |

### 3.4 Dashboards y visualización

| ID | Requisito | Prioridad | Sprint |
|----|-----------|:---------:|:------:|
| RF-16 | Página principal con KPIs resumen de todas las áreas. | M | 3 |
| RF-17 | Dashboard de **Movilidad**: tráfico (intensidad, ocupación, carga, velocidad), peatones y bicicletas, bicicletas eléctricas, patinetes, aparcamientos y taxi. | M | 3-4 |
| RF-18 | Dashboard de **Medio ambiente**: calidad del aire por estación y magnitud, y contaminación acústica por periodo (D, E, N, T). | M | 3-4 |
| RF-19 | Dashboard de **Seguridad vial**: accidentalidad (tipo, lesividad, distrito, hora, meteorología) y multas. | M | 4 |
| RF-20 | Dashboard de **Energía**: instalaciones fotovoltaicas (potencia, uso del edificio, distrito). | S | 4 |
| RF-21 | Dashboard de **Residuos**: contenedores por tipo de residuo y distrito. | S | 4 |
| RF-22 | Dashboard de **Población**: censo por distrito, barrio, edad, sexo y nacionalidad. | S | 4 |
| RF-23 | Filtros globales (periodo, distrito) que se conservan en la URL para poder compartir una vista. | S | 3-4 |
| RF-24 | Mapa interactivo con capas por dominio (contenedores, estaciones, paradas, instalaciones…). | S | 4 |
| RF-25 | Exportar a CSV los datos mostrados en un dashboard. | C | 4+ |
| RF-26 | Comparar dos periodos o dos distritos. | C | 4+ |
| RF-27 | Guardar vistas personalizadas de dashboard por usuario. | W | — |
| RF-28 | Análisis predictivo (previsión de tráfico, calidad del aire…). | W | — |

---

## 4. Requisitos no funcionales

| ID | Categoría | Requisito | Objetivo propuesto |
|----|-----------|-----------|--------------------|
| RNF-01 | Rendimiento | Las consultas de los dashboards responderán con rapidez sobre el dataset completo, apoyándose en índices y agregaciones. | p95 < 2 s |
| RNF-02 | Escalabilidad de datos | La importación procesará ficheros en *streaming* y por lotes, sin agotar memoria. | Consumo de memoria estable con ficheros de varios GB |
| RNF-03 | Seguridad | Contraseñas con `bcrypt`, JWT con caducidad, `helmet`, CORS restringido al cliente, límite de intentos en login y secretos fuera del repositorio. | — |
| RNF-04 | Seguridad | Toda la API, salvo `/api/health` y `/api/auth/*`, requerirá autenticación. | 100 % de endpoints de datos protegidos |
| RNF-05 | Usabilidad | Interfaz en español, responsive (escritorio y tablet), con contraste y etiquetas accesibles. | WCAG 2.1 nivel AA como referencia |
| RNF-06 | Mantenibilidad | Arquitectura en capas (vista, dominio, persistencia), ESLint y Prettier, convención de commits. | `npm run lint` sin errores |
| RNF-07 | Testabilidad | Pruebas automáticas de la API (Supertest) y de los servicios de dominio. | ≥ 70 % de cobertura en servicios (a revisar) |
| RNF-08 | Portabilidad | La base de datos se ejecutará en Docker con volumen persistente; el entorno se levantará con pocos comandos. | Arranque desde cero siguiendo solo la documentación |
| RNF-09 | Fiabilidad | Los errores de la API devolverán un formato JSON uniforme y no filtrarán información interna en producción. | — |
| RNF-10 | Compatibilidad | Navegadores modernos de escritorio. | Últimas 2 versiones de Chrome, Firefox, Edge y Safari |
| RNF-11 | Documentación | README, wiki y referencia de la API actualizados con cada hito. | Revisión en cada release |

---

## 5. Restricciones

| ID | Restricción |
|----|-------------|
| RES-01 | Stack MERN: MongoDB, Express, React y Node.js. |
| RES-02 | MongoDB se ejecuta en un contenedor Docker con volumen de datos. |
| RES-03 | El código se organiza en `client/` y `server/`. |
| RES-04 | El dataset (≈ 8 GB) no se versiona en Git. |
| RES-05 | Node.js ≥ 20.6 (el script `dev` usa `--env-file`). |
| RES-06 | El servidor sigue la separación en capas definida en Arquitectura del Sistema. |

---

## Anexo A. Descripción del dataset ANTHEM

Fuente: documento *explicacion_dataset_ANTHEM.pdf*. Los ficheros marcados con `XXX` representan varios ficheros del mismo dominio.

| Dominio | Ficheros | Granularidad y campos clave | Reglas de calidad y observaciones |
|---------|----------|-----------------------------|-----------------------------------|
| Calidad del aire | `Anthem_CTC_Aire_XXX.csv` | Diaria por punto de muestreo (estación + magnitud + técnica). Columnas `H01…H24` (valor) y `V01…V24` (validación) | **Solo son válidos los datos cuya validación es `V`.** Formato ancho (24 horas por fila) |
| Contaminación acústica | `Anthem_CTC_ContaminacionAcustica.csv`, `Anthem_CTC_EstacionesMedidaControlAcustico.csv` | Diaria por estación (`NMT`) y tipo de periodo: D (07-19 h), E (19-23 h), N (23-07 h), T (24 h). Valor `LAEQ` en dB(A) | Las estaciones se describen en el fichero de estaciones |
| Tráfico | `Anthem_CTC_Traffic_XXX.csv`, `Anthem_CTC_PuntoMedidaTrafico.csv` | Cada 15 min por punto de medida (`idelem`): `intensidad`, `ocupacion`, `carga` (0-100), `vmed` (solo M30), `error` (N, E, S) | **Un valor negativo indica ausencia de datos.** `vmed` solo en puntos interurbanos M30. Tipos: Urbano / M30 |
| Censo | `Anthem_CTC_Censo_XXX.csv` | Por distrito, barrio, sección y edad simple: españoles y extranjeros, hombres y mujeres | Edad calculada a la fecha de extracción |
| Multas | `Anthem_CTC_Multas_XXX.csv` | Registros agrupados: calificación, lugar, fecha (`mm/yyyy`), hora (`hh.mm`), importe, descuento, puntos, velocidad límite y medida (radar), coordenadas, nº de boletines | Registros **agrupados** (`Num-boletines`, `Importe`) |
| Accidentalidad | `Anthem_CTC_Accidentalidad.csv` | Un registro por persona afectada. Nº de expediente `aaaasnnnnnn`, fecha, franja horaria, calle, distrito, tipo de accidente, meteorología, vehículo, persona, edad, sexo, lesividad | **El mismo nº de parte identifica un único accidente con varios afectados.** Lesividad con códigos (01-07, 14, 77) agrupables en LEVE, GRAVE, FALLECIDO |
| Patinetes | `Anthem_CTC_AsignaciónPatinetes.csv` | Patinetes disponibles por distrito, barrio y proveedor | — |
| Bicicletas eléctricas | `Anthem_CTC_Bicicletas_Disponibilidad.csv` | Diaria: horas de uso, horas de disponibilidad, media de bicicletas disponibles, usos por tipo de abono, total de usos | — |
| Estacionamiento regulado | `Anthem_CTC_CallesEstacionamientoRegulado.csv` | Por vía: distrito, barrio, color (verde, azul, naranja, rojo), batería/línea, nº de plazas, coordenadas | Coordenadas UTM ETRS-89 |
| Instalaciones fotovoltaicas | `Anthem_CTC_InstalacionesFotovoltaicas.csv` | Por instalación: centro, dirección, superficie, uso del edificio, distrito, potencia (kWp), empresa, fecha de puesta en servicio | Incluye latitud y longitud |
| Aparcamientos rotacionales | `Anthem_CTC_OcupacionAparcamientosRotacionales.csv` | Mensual por aparcamiento: plazas, vehículos/día (media), ocupación (%) y ocupación 9-21 h (%) | — |
| Peatones y bicicletas | `Anthem_CTC_PeatonesAforo.csv`, `Anthem_CTC_BicicletasAforo.csv` | Cada 15 min por estación de aforo; distrito, vial, código postal, latitud y longitud | — |
| Taxi | `Anthem_CTC_Taxi_ObjetosPerdidos.csv`, `Anthem_CTC_Taxi_ReservaParadas.csv` | Incidencias de objetos perdidos (iniciativa, tipo de objeto, fechas, resolución) y reservas de paradas (distrito, barrio, plazas, coordenadas) | Fechas con formato `dd/mm/yyyy hh24:mi` |
| Contenedores | `Anthem_CTC_Contenedores_Ubicacion.csv` | Por situado: tipo de residuo (orgánica, resto, envases, vidrio, papel-cartón), modelo, cantidad, lote, distrito, barrio, vía | Coordenadas UTM **en centímetros** |
| Callejero | `Anthem_CTC_Callejero.csv` | Por número de vía: códigos de vía, distrito, barrio, sección censal, código postal, zona SER, categoría fiscal | Coordenadas UTM en centímetros y WGS84. Referencia territorial común |
| Ubicaciones de transporte | `Anthem_CTC_Cercanias.gpx`, `_Autobus.gpx`, `_Interurbano.gpx`, `_Metro.gpx`, `_MetroLigero.gpx`, `_Taxi.gpx` | Puntos de interés en formato GPX | Formato distinto del resto (XML) |