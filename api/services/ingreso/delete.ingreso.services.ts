import { instance } from "@/api/apiService";

export const deleteIngresoServices = async (id: number) => {
	try {
		const response = await instance.delete(`/ingresos?id=eq.${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
