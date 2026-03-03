import { instance } from "@/api/apiService";
import dayjs from "dayjs";
import { GastoData } from "../interfaces";

/**
 * Obtiene el listado de gastos diarios para el mes seleccionado.
 * Útil para alimentar gráficas de tendencia y resúmenes diarios.
 *
 * @param month - Objeto dayjs que representa el mes para filtrar el rango.
 * @returns Promesa con el array de GastoData del mes.
 */
export const getGastosPorDiaServices = async (
	month: dayjs.Dayjs,
): Promise<GastoData[]> => {
	// Rango: Mes seleccionado
	const startOfMonth = month.startOf("month").format("YYYY-MM-DD");
	const endOfMonth = month.endOf("month").format("YYYY-MM-DD");

	try {
		const response = await instance.get<GastoData[]>(
			`/gastos?fecha=gte.${startOfMonth}&fecha=lte.${endOfMonth}`,
		);

		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
