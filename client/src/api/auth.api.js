import http from "./http";

export const registerRequest = (data) => http.post("/auth/register", data).then((r) => r.data);
export const loginRequest = (data) => http.post("/auth/login", data).then((r) => r.data);
export const logoutRequest = () => http.post("/auth/logout");
export const meRequest = () => http.get("/auth/me").then((r) => r.data.user);