import axios from "axios";
import { instance } from "@/api/apiService";
import { IngresoInterfaces } from "../interfaces";


export const postIngresoServices = async (data: Omit<IngresoInterfaces,'id' | 'createdAt'>) => {
	const mapperData = { ...data, id: Math.floor(Math.random() * 10000) };
	try {
		const response = await instance.post("/ingresos", mapperData);
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			// Ahora TypeScript sabe que "error" es un AxiosError
			console.error("Axios error message:", error.message);
			console.error("Response data:", error.response?.data);
		} else {
			console.error("Unexpected error:", error);
		}
	}
};
