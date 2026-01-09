import { instance } from "@/api/apiService";

interface UpdateSettingsInterface {
	origen: "categorias" | "metodos_pago";
	id: number;
	name: string;
	icon: string;
}

export const updateSettingsServices = async ({
	origen,
	id,
	name,
	icon,
}: UpdateSettingsInterface) => {
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
