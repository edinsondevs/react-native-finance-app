import { instance } from "@/api/apiService";

export interface IngresoInterfaces {
	id: number;
	createdAt: Date;
	origen: string;
	monto: number;
	fecha: Date;
	descripcion: string;
}


export const getIngresosServices = async (): Promise<IngresoInterfaces[]> => {
	try {
		const response = await instance.get("/ingresos", {
			params: {
				limit: 7,
				order: "fecha.desc",
			},
		});

		return response.data;
	} catch (error: any) {
		console.log("Error details:", error.response?.data);
		throw error;
	}
};