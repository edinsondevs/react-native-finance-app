import { instance } from "@/api/apiService";

interface IngresoData {
	origen: string;
	monto: number;
	fecha: string;
	descripcion: string;
}

export const postIngresoServices = async (data: IngresoData) => {

	const mapperData = { ...data, id: Math.floor(Math.random() * 10000) };
	
	try {
		const response = await instance.post("/ingresos", mapperData);

		return response.data;
	} catch (error: any) {
		console.log("Error details:", error.response?.data);
		throw error;
	}
};

