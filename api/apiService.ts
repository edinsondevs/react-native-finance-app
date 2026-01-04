import axios from "axios";
import Constants from "expo-constants";

// Obtener credenciales desde app config
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;

// Validación para debugging - MUY IMPORTANTE para saber si las credenciales se cargaron
if (!supabaseUrl || !supabaseAnonKey) {
	console.error("❌ Supabase credentials not found in app config!");
	console.log("📋 Available config:", Constants.expoConfig?.extra);
} else {
	console.log("✅ Supabase credentials loaded successfully");
}

// Crear instancia de axios
export const instance = axios.create({
	baseURL: `${supabaseUrl}/rest/v1`, // ⚠️ IMPORTANTE: Agregar /rest/v1
	headers: {
		apikey: supabaseAnonKey || "",
		Authorization: `Bearer ${supabaseAnonKey || ""}`,
		Prefer: "return=representation",
		"Content-Type": "application/json",
	},
	timeout: 10000, // Timeout de 10 segundos (opcional pero recomendado)
});

// Interceptor para logging de errores (opcional pero útil para debugging)
instance.interceptors.response.use(
	(response) => {
		// Log exitoso (puedes comentar esto en producción)
		// console.log(
		// 	`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`
		// );
		return response;
	},
	(error) => {
		// Log de errores
		if (error.response) {
			console.error(
				`❌ API Error: ${error.response.status}`,
				error.response.data
			);
		} else if (error.request) {
			console.error(
				"❌ Network Error: No response received",
				error.message
			);
		} else {
			console.error("❌ Request Error:", error.message);
		}
		return Promise.reject(error);
	}
);

// Helper para autenticación (si usas auth)
export const setAuthToken = (token: string) => {
	instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Helper para limpiar auth
export const clearAuthToken = () => {
	instance.defaults.headers.common["Authorization"] =
		`Bearer ${supabaseAnonKey}`;
};
