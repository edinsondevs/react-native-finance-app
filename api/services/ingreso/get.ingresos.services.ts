import axios from "axios";
import { instance } from "@/api/apiService";
import { IngresoInterfaces } from "../interfaces";


export const getIngresosServices = async (): Promise<IngresoInterfaces[]> => {
	try {
		const response = await instance.get("/ingresos", {
			params: {
				limit: 7,
				order: "fecha.desc",
			},
		});

		return response.data;
	} catch (error: unknown) {
		if(axios.isAxiosError(error)){
			console.log("Error details:", error.response?.data);
			throw error;
		}
		else{
			console.log("Error details:", error);
			throw error;
		}
	}
};
