import { instance } from "@/api/apiService";
import { Profile } from "../interfaces";

//* Consulta de Perfiles
export const getProfilesServices = async (): Promise<Profile[]> => {
	try {
		const response = await instance.get<Profile[]>("/profiles");
		return response.data;
	} catch (error) {
		console.error("Error al obtener perfiles:", error);
		return [];
	}
};
