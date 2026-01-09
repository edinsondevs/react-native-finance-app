import {instance} from "@/api/apiService";

interface DataSettingsInterface {
    origen: "categorias" | "metodos_pago";
}

export const getSettingsServices = async ({origen}: DataSettingsInterface) => {
    try {
        const response = await instance.get(`/${origen}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}