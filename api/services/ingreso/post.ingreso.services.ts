import { instance } from "@/api/apiService";

interface IngresoData {
	origen: string;
	monto: number;
	fecha: string;
	descripcion: string;
	id: number;
	// user_id: string; // Linking to the user is typically required
}

export const postIngresoServices = async (data: IngresoData) => {
	try {
		const response = await instance.post("/ingresos", data);

		return response.data;
	} catch (error: any) {
		console.log("Error details:", error.response?.data);
		throw error;
	}
};

