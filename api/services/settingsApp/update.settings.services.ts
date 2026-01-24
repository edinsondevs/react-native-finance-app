import { instance } from "@/api/apiService";
import { DataSettingsInterface } from "../interfaces";

//* Actualizar Un Ajuste App
export const updateSettingsServices = async ({
	origen,
	id,
	name,
	icon,
}: DataSettingsInterface) => {
	try {
		const response = await instance.patch(`/${origen}?id=eq.${id}`, {
			name,
			icon,
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
