import { instance } from "@/api/apiService";
import { GastoData } from "../interfaces";

export const updateGastoServices = async (
	id: number,
	data: Partial<GastoData>,
) => {
	console.log("updateGastoServices", id, data);
	try {
		// Remove id from data if present to avoid updating it or causing errors if it's not allowed in body
		const { id: _, ...updateData } = data;
		const response = await instance.patch(
			`/gastos?id=eq.${id}`,
			updateData,
		);

		if (!response.data || response.data.length === 0) {
			const error = "Usuario no autorizado";
			throw error;
		}
		return response.data;
	} catch (error) {
		throw error;
	}
};
