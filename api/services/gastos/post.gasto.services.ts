import { instance } from "@/api/apiService";
import { GastoData } from "../interfaces";


export const crearGastoServices = async (data: GastoData) => {

	try {
		const response = await instance.post("/gastos", data);

		return response.data;
	} catch (error: any) {
		console.log("Error details:", error);
		throw new Error("Error al crear el gasto", error.response?.data);
	}
};

