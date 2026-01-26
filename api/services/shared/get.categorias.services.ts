import { instance } from "@/api/apiService";
import { Category } from "../interfaces/IconType";

//* Consulta de Categorias
export const getCategoriasServices = async (): Promise<Category[]> => {
	try {
		const { data } = await instance.get("/categorias");
		return data;
	} catch (error) {
		console.log(error);
		throw new Error("Error al llamar al servicio");
	}
};
