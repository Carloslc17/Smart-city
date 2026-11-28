import http from "./http";

export async function getTraffic(params, signal) {
  const response = await http.get("/trafico", { params, signal });
  return response.data;
}

export async function getAirQuality(params, signal) {
  const response = await http.get("/aire", { params, signal });
  return response.data;
}

export async function getAccidents(params, signal) {
  const response = await http.get("/accidentes", { params, signal });
  return response.data;
}
