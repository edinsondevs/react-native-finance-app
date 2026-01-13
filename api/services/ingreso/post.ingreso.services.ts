import { instance } from "@/api/apiService";
import axios from "axios";

interface IngresoData {
	origen: string;
	monto: number;
	fecha: string;
	descripcion: string;
	user_id?: string;
}

export const postIngresoServices = async (data: IngresoData) => {
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
