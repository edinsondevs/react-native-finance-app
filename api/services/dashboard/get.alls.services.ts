import { instance } from "@/api/apiService";
import dayjs from "dayjs";
import { GastoData, MontoItem } from "../interfaces";

/**
 * Consulta el resumen total de ingresos para un mes específico.
 * Calcula el rango desde el último día del mes anterior hasta el último día del mes seleccionado.
 *
 * @param month - Objeto dayjs que representa el mes a consultar.
 * @returns Promesa con el monto total de ingresos.
 */
export const getResumeIngresosServices = async (
	month: dayjs.Dayjs,
): Promise<number> => {
	const fechaActual = month.endOf("month").format("YYYY-MM-DD");
	const fechaAnterior = month
		.subtract(1, "month")
		.endOf("month")
		.format("YYYY-MM-DD");

	try {
		const response = await instance.get<MontoItem[]>(
			`/ingresos?fecha=gt.${fechaAnterior}&fecha=lte.${fechaActual}`,
			{
				params: {
					select: "monto",
				},
			},
		);
		const data = response.data;
		const total = data.reduce(
			(acc: number, item: MontoItem) => acc + item.monto,
			0,
		);
		return total;
	} catch (error) {
		throw error;
	}
};

/**
 * Consulta el resumen total de gastos para un mes específico.
 * Calcula el rango del mes actual para obtener la sumatoria de montos.
 *
 * @param month - Objeto dayjs que representa el mes a consultar.
 * @returns Promesa con el monto total de gastos.
 */
export const getResumeGastosServices = async (
	month: dayjs.Dayjs,
): Promise<number> => {
	const fechaActual = month.endOf("month").format("YYYY-MM-DD");
	const fechaAnterior = month
		.subtract(1, "month")
		.endOf("month")
		.format("YYYY-MM-DD");

	try {
		const response = await instance.get<MontoItem[]>(
			`/gastos?fecha=gt.${fechaAnterior}&fecha=lte.${fechaActual}`,
			{
				params: {
					select: "monto",
				},
			},
		);
		const data = response.data;
		const total = data.reduce(
			(acc: number, item: MontoItem) => acc + item.monto,
			0,
		);
		return total;
	} catch (error) {
		throw error;
	}
};

/**
 * Obtiene la lista completa de gastos detallados para un mes específico.
 * Los resultados se ordenan por fecha de forma descendente.
 *
 * @param month - Objeto dayjs que representa el mes a consultar.
 * @returns Promesa con el array de datos de gastos.
 */
export const getAllGastosServices = async (
	month: dayjs.Dayjs,
): Promise<GastoData[]> => {
	const fechaActual = month.endOf("month").format("YYYY-MM-DD");
	const fechaAnterior = month
		.subtract(1, "month")
		.endOf("month")
		.format("YYYY-MM-DD");

	try {
		const response = await instance.get<GastoData[]>(
			`/gastos?fecha=gt.${fechaAnterior}&fecha=lte.${fechaActual}&order=fecha.desc`,
		);
		const data = response.data;
		return data;
	} catch (error) {
		throw error;
	}
};
