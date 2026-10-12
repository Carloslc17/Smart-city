const d = db.getSiblingDB("anthem");

// Time series
d.createCollection("aire_horario",   { timeseries: { timeField: "ts", metaField: "meta", granularity: "hours" } });
d.createCollection("trafico_15min",  { timeseries: { timeField: "ts", metaField: "meta", granularity: "minutes" } });
d.createCollection("aforos_15min",   { timeseries: { timeField: "ts", metaField: "meta", granularity: "minutes" } });

// Colecciones normales
["distritos","callejero","estaciones","puntos_transporte","contenedores",
 "ser_tramos","taxi_paradas","fotovoltaicas","aparcamientos",
 "aparcamientos_ocupacion","ruido_diario","bicis_disponibilidad_diaria",
 "accidentes","multas","taxi_objetos_perdidos","censo",
 "patinetes_asignacion","etl_ficheros"
].forEach(n => d.createCollection(n));

// Índices
d.estaciones.createIndex({ location: "2dsphere" });
d.accidentes.createIndex({ location: "2dsphere" });
d.contenedores.createIndex({ location: "2dsphere" });
d.multas.createIndex({ location: "2dsphere" });
d.accidentes.createIndex({ distrito_cod: 1, fecha: -1 });
d.multas.createIndex({ fecha_denuncia: 1, calificacion: 1 });
d.ruido_diario.createIndex({ nmt: 1, fecha: -1 });
d.censo.createIndex({ distrito_cod: 1, barrio_cod: 1 });
d.estaciones.createIndex({ tipo: 1, distrito_cod: 1 });