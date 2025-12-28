import axios from "axios";
import { instance } from "../../api/apiService";


const get = async (): Promise<any> => {
    try {
        
        const {data} = await instance.get('/purchases',{
            params: {
                limit: 10
            }
        })
        
        return data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log("Error details:", error.response?.data);
            throw error;
        }
        else{
            console.log("Error details:", error);
            throw error;
        }
    }
}


export const ServicesPurchases = {
	get,
};