import { instance } from "@/api/apiService";
import { GastoData } from "../interfaces";
import axios from "axios";

export const crearGastoServices = async (data: GastoData) => {
	try {
		const response = await instance.post("/gastos", data);

		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error("Error al crear el gasto", error.response?.data);
		}
		else{
			throw new Error("Error al crear el gasto");
		}
	}
};
