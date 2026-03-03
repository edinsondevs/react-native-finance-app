import { instance } from "@/api/apiService";
import axios from "axios";
import dayjs from "dayjs";
import { IngresoInterfaces } from "../interfaces";

/**
 * Obtiene la lista de ingresos filtrada por el mes seleccionado.
 * Consulta la API para obtener todos los ingresos cuyo campo fecha esté en el rango del mes.
 * Los resultados se devuelven ordenados por fecha de forma descendente.
 *
 * @param month - Objeto dayjs que representa el mes para filtrar la búsqueda.
 * @returns Promesa con un array de objetos que implementan IngresoInterfaces.
 */
export const getIngresosServices = async (
	month: dayjs.Dayjs,
): Promise<IngresoInterfaces[]> => {
	const startOfMonth = month.startOf("month").format("YYYY-MM-DD");
	const endOfMonth = month.endOf("month").format("YYYY-MM-DD");

	try {
		const response = await instance.get(
			`/ingresos?fecha=gte.${startOfMonth}&fecha=lte.${endOfMonth}&order=fecha.desc`,
		);

		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.log("Error details:", error.response?.data);
			throw error;
		} else {
			console.log("Error details:", error);
			throw error;
		}
	}
};
