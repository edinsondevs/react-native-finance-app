import { instance } from "@/api/apiService"

export interface Category {
	id: number;
	name: string;
	description: string;
}

export const getCategoriasServices = async (): Promise<Category[]> => {
    try {
        const { data }= await instance.get('/categorias')
        return data
    } catch (error) {
        console.log(error)
        throw new Error("Error al llamar al servicio");        
    }
}