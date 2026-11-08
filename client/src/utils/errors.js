export function getErrorMessage(error) {
  const data = error.response?.data;
  if (data?.error?.message) return data.error.message;
  if (data?.message) return data.message;
  if (data?.errors) {
    const first = Object.values(data.errors).flat()[0];
    if (first) return first;
  }
  if (!error.response) return "No se pudo conectar con el servidor";
  return "Ha ocurrido un error inesperado";
}