import { instance } from "@/api/apiService";
import dayjs from "dayjs";
import { GastoData } from "../interfaces";

interface MontoItem {
	monto: number;
}

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
			}
		);
		const data = response.data;
		const total = data.reduce(
			(acc: number, item: MontoItem) => acc + item.monto,
			0
		);
		return total;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

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
			}
		);
		const data = response.data;
		const total = data.reduce(
			(acc: number, item: MontoItem) => acc + item.monto,
			0
		);
		return total;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getAllGastosServices = async (): Promise<GastoData[]> => {
	const fechaActual = dayjs().endOf("month").format("YYYY-MM-DD");
	const fechaAnterior = dayjs()
		.endOf("month")
		.subtract(1, "month")
		.format("YYYY-MM-DD");

	try {
		const response = await instance.get<GastoData[]>(
			`/gastos?fecha=gt.${fechaAnterior}&fecha=lte.${fechaActual}`
		);
		const data = response.data;
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/*
Modo: Full Stack General
Modo: Code Review
Modo: Arquitectura
Modo: Debug
Modo: Optimización
Modo: Investigación
*/
