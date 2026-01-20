import {instance} from "@/api/apiService";
import { DataSettingsInterface } from "../interfaces";



export const getSettingsServices = async ({origen}: Omit<DataSettingsInterface,'data' | 'icon'>) => {
    try {
        const response = await instance.get(`/${origen}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}