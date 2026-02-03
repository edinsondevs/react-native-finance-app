import { instance } from "@/api/apiService";
import dayjs from "dayjs";
import { GastoData, MontoItem } from "../interfaces";

//* Consulta de Ingresos
export const getResumeIngresosServices = async (): Promise<number> => {
	const fechaActual = dayjs().endOf("month").format("YYYY-MM-DD");
	const fechaAnterior = dayjs()
		.endOf("month")
		.subtract(1, "month")
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

//* Consulta de Gastos
export const getResumeGastosServices = async (): Promise<number> => {
	const fechaActual = dayjs().endOf("month").format("YYYY-MM-DD");
	const fechaAnterior = dayjs()
		.endOf("month")
		.subtract(1, "month")
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

//* Consulta de Gastos Completos

export const getAllGastosServices = async (): Promise<GastoData[]> => {
	const fechaActual = dayjs().endOf("month").format("YYYY-MM-DD");
	const fechaAnterior = dayjs()
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
