import { instance } from "@/api/apiService";
import { IngresoInterfaces } from "../interfaces";

//* Actualizar Un Ingreso
export const updateIngresoServices = async (
	id: number,
	data: Partial<IngresoInterfaces>
) => {
	try {
		const { id: _, ...updateData } = data;
		const response = await instance.patch(
			`/ingresos?id=eq.${id}`,
			updateData
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
