import { instance } from "@/api/apiService";

//* Eliminar Un Gasto
export const deleteGastoServices = async (id: number) => {
	try {
		const response = await instance.delete(`/gastos?id=eq.${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
