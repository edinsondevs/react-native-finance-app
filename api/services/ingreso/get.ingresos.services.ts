import { instance } from "@/api/apiService";


export const getIngresosServices = async (): Promise<any> => {
    try {
        const response = await instance.get("/ingresos");
        
        return response.data;
    } catch (error: any) {
        console.log("Error details:", error.response?.data);
        throw error;
    }
}