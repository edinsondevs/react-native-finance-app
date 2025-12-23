// getMetodosPagoServices;

import { instance } from "@/api/apiService";

/**
 * Obtiene la lista de métodos de pago disponibles.
 *
 * Esta función no solo recupera los datos del backend, sino que también
 * enriquece cada objeto con un icono visual correspondiente para mejorar la UI.
 *
 * @returns Promesa con la lista de métodos de pago con iconos
 */
export const getMetodosPagoServices = async () => {
	try {
		const response = await instance.get("/metodos_pago");
		return response.data;
	} catch (error: any) {
		console.log("Error details:", error);
		throw new Error(
			"Error al obtener los metodos de pago",
			error.response?.data
		);
	}
};
