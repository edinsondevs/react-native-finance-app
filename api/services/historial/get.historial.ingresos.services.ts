import { instance } from "@/api/apiService";
import { IngresoInterfaces } from "../interfaces";

/**
 * Obtiene el listado de ingresos de todo un año para mostrar el historial mensual.
 *
 * @param year - Año a consultar.
 * @returns Promesa con el array de IngresoInterfaces del año entero.
 */
export const getHistorialIngresosServices = async (
	year: number,
): Promise<IngresoInterfaces[]> => {
	const startDate = `${year}-01-01`;
	const endDate = `${year}-12-31`;

	try {
		const response = await instance.get<IngresoInterfaces[]>(
			`/ingresos?fecha=gte.${startDate}&fecha=lte.${endDate}&order=fecha.asc`,
		);

		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
