// getMetodosPagoServices;

import { instance } from "@/api/apiService";
import axios from "axios";

/**
 * Obtiene la lista de métodos de pago disponibles.
 *
 * Esta función no solo recupera los datos del backend, sino que también
 * enriquece cada objeto con un icono visual correspondiente para mejorar la UI.
 *
 * @returns Promesa con la lista de métodos de pago con iconos
 */

//* Consulta de Metodos de Pago
export const getMetodosPagoServices = async () => {
	try {
		const response = await instance.get("/metodos_pago");
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			// Ahora TypeScript sabe que "error" es un AxiosError
			console.error("Axios error message:", error.message);
			console.error("Response data:", error.response?.data);
			throw new Error(
				"Error al obtener los metodos de pago",
				error.response?.data,
			);
		} else {
			console.error("Unexpected error:", error);
		}
	}
};
