import { instance } from "@/api/apiService";
import dayjs from "dayjs";
import { GastoData } from "../interfaces";

export interface GastoPorDia {
	date: string;
	total: number;
}

export const getGastosPorDiaServices = async (): Promise<GastoPorDia[]> => {
	// Rango: Últimos 7 días o mes actual. Vamos por mes actual para "estadísticas del mes"
	const startOfMonth = dayjs().startOf("month").format("YYYY-MM-DD");
	const endOfMonth = dayjs().endOf("month").format("YYYY-MM-DD");

	try {
		const response = await instance.get<GastoData[]>(
			`/gastos?fecha=gte.${startOfMonth}&fecha=lte.${endOfMonth}`
		);

		const gastos = response.data;

		// Agrupar por día
		const gastosPorDia: Record<string, number> = {};

		// Inicializar días del mes (opcional, pero mejor para la gráfica)
		// Para simplificar, solo mostramos días con gastos o rellenamos en el frontend.
		// Vamos a retornar datos crudos agrupados.

		gastos.forEach((gasto) => {
			const fecha = dayjs(gasto.fecha).format("DD/MM"); // Solo día/mes para la etiqueta
			gastosPorDia[fecha] = (gastosPorDia[fecha] || 0) + gasto.monto;
		});

		// Convertir a array para la gráfica
		const chartData = Object.keys(gastosPorDia).map((key) => ({
			date: key,
			total: gastosPorDia[key],
		}));

		// Ordenar por fecha (aunque el map de object keys no garantiza orden, mejor ordenar explícitamente si usáramos full date)
		// Pero aquí, simplificaremos en el frontend.
		// Mejor retornamos los datos tal cual y dejamos que el componente los formatee para `gifted-charts`.

		return chartData;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
