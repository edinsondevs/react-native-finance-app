import { instance } from "@/api/apiService";

interface GastoData {
	origen: string;
	monto: number;
	fecha: string;
	descripcion: string;
}

export const postGastosServices = async (data: GastoData) => {

	const mapperData = { ...data, id: Math.floor(Math.random() * 10000) };
	
	try {
		const response = await instance.post("/gastos", mapperData);

		return response.data;
	} catch (error: any) {
		console.log("Error details:", error.response?.data);
		throw error;
	}
};

