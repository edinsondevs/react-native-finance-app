import { instance } from "@/api/apiService"
import axios from "axios";

export interface DataSettingsInterface {
    origen: "categorias" | "origen" | "metodos_pago";
    data: string;
    icon?: string;
}

export const postAppSettingsServices = async (data: DataSettingsInterface) => {
    
    const { origen, data: name, icon } = data
    
    try {
        const response = await instance.post(`/${origen}`, { 
            name,
            icon 
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            throw error.response?.data
        }
    }   
}