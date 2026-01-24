import { instance } from "@/api/apiService";
import { GastoData } from "../interfaces";
import axios from "axios";

//* Crear Un Gasto
export const crearGastoServices = async (data: GastoData) => {
	try {
		const response = await instance.post("/gastos", data);

		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.log("Error details:", error.response?.data);
			throw new Error("Error al crear el gasto", error.response?.data);
		}
		else{
			console.log("Error details:", error);
			throw new Error("Error al crear el gasto");
		}
	}
};
