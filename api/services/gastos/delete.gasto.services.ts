import { instance } from "@/api/apiService";

export const deleteGastoServices = async (id: number) => {
	try {
		const response = await instance.delete(`/gastos?id=eq.${id}`);

		if(!response.data || response.data.length === 0){
			const error = "Usuario no autorizado";
			throw error;
		}
		return response.data;
	} catch (error) {
		throw error;
	}
};
