import { instance } from "@/api/apiService";

export interface Profile {
	id: string;
	display_name: string;
}

export const getProfilesServices = async (): Promise<Profile[]> => {
	try {
		const response = await instance.get<Profile[]>("/profiles");
		return response.data;
	} catch (error) {
		console.error("Error al obtener perfiles:", error);
		return [];
	}
};
