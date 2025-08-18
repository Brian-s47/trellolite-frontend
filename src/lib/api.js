// Decalaracion de URL base de trabajo con el backend
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5500/api";

// Funcion para hacer solicitudes a AI con fetch
async function request(path, options = {}) {

  // Repuesta de API  fetch 
  const res = await fetch(`${BASE_URL}${path}`, { // Unimos la base de url definida con el path lo que vamos a hacer
    headers: { "Content-Type": "application/json" }, // Por defecto, envía Content-Type: application/json
    ...options, // en caso de que agreguemos opciones como metodo o body por ejemplo
  });

  // Manejo de respuesta
  const contentType = res.headers.get("content-type") || ""; // Si tiene content-type si no lo deja vacio
  const body = contentType.includes("application/json") ? await res.json() : await res.text(); // Detecta si la respuesta esta es JSON y la comvierte en archivo plano para manejarlo mejor

  // Si no obtenmos respuesta manejamos el error
  if (!res.ok) {
    const message = body?.message || res.statusText || "Error HTTP"; // detectamos el tipo de erro enviado emparejado con el manejo de errorResponse de la API
    const code = body?.error || "HTTP_ERROR";
    throw Object.assign(new Error(message), { status: res.status, code, payload: body });
  }

  return body; // Si todo sale bien retornamos la respeusta en plano
}
// Declaramos los atajos que usa internamente request
export const api = {
  get: (p) => request(p), // Para get solo requiere parametro "id"
  post: (p, data) => request(p, { method: "POST", body: JSON.stringify(data) }), // Para post requiere parametro "id" y el dato parqa el body convertido a JSON
  patch: (p, data) => request(p, { method: "PATCH", body: JSON.stringify(data) }), // Para patch requiere parametro "id" y el dato parqa el body convertido a JSON
  put: (p, data) => request(p, { method: "PUT", body: JSON.stringify(data) }), // Para put requiere parametro "id" y el dato parqa el body convertido a JSON
  del: (p) => request(p, { method: "DELETE" }), // Para delete requiere parametro "id"
};
