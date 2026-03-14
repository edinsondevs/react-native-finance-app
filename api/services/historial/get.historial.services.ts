import { instance } from "@/api/apiService";
import { GastoData } from "../interfaces";

/**
 * Obtiene el listado de gastos de todo un año para mostrar el historial mensual.
 *
 * @param year - Año a consultar.
 * @returns Promesa con el array de GastoData del año entero.
 */
export const getHistorialGastosServices = async (
	year: number,
): Promise<GastoData[]> => {
	const startDate = `${year}-01-01`;
	const endDate = `${year}-12-31`;

	try {
		const response = await instance.get<GastoData[]>(
			`/gastos?fecha=gte.${startDate}&fecha=lte.${endDate}&order=fecha.asc`,
		);

		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
