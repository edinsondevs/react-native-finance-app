import { instance } from "@/api/apiService";

export const deleteGastoServices = async (id: number) => {
	try {
		const response = await instance.delete(`/gastos?id=eq.${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
