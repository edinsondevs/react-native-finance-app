import { instance } from "@/api/apiService";
import dayjs from "dayjs";
import { GastoData } from "../interfaces";

//* Consulta de Gastos por Dia
export const getGastosPorDiaServices = async (): Promise<GastoData[]> => {
	// Rango: Últimos 7 días o mes actual. Vamos por mes actual para "estadísticas del mes"
	const startOfMonth = dayjs().startOf("month").format("YYYY-MM-DD");
	const endOfMonth = dayjs().endOf("month").format("YYYY-MM-DD");

	try {
		const response = await instance.get<GastoData[]>(
			`/gastos?fecha=gte.${startOfMonth}&fecha=lte.${endOfMonth}`
		);

		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
