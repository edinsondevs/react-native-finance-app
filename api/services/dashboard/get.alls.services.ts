import { instance } from "@/api/apiService";
import dayjs from "dayjs";


export const getResumeIngresosServices = async (): Promise<any> => {    
     
    const fechaActual = dayjs().endOf('month').format('YYYY-MM-DD');
    const fechaAnterior = dayjs().endOf('month').subtract(1, 'month').format('YYYY-MM-DD');
    
    try {
        const response = await instance.get(
			`/ingresos?fecha=gt.${fechaAnterior}&fecha=lte.${fechaActual}`,
            {
                params: {
                    select: "monto"
                },
            }
		);
        const data = await response.data;
        const total = data.reduce((acc: number, item: any) => acc + item.monto, 0);
        return total;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getResumeGastosServices = async (): Promise<any> => {    
     
    const fechaActual = dayjs().endOf('month').format('YYYY-MM-DD');
    const fechaAnterior = dayjs().endOf('month').subtract(1, 'month').format('YYYY-MM-DD');
    
    try {
        const response = await instance.get(
			`/gastos?fecha=gt.${fechaAnterior}&fecha=lte.${fechaActual}`,
            {
                params: {
                    select: "monto"
                },
            }
		);
        const data = await response.data;
        const total = data.reduce((acc: number, item: any) => acc + item.monto, 0);
        return total;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getAllGastosServices = async (): Promise<any> => {    
     
    const fechaActual = dayjs().endOf('month').format('YYYY-MM-DD');
    const fechaAnterior = dayjs().endOf('month').subtract(1, 'month').format('YYYY-MM-DD');
    
    try {
        const response = await instance.get(
			`/gastos?fecha=gt.${fechaAnterior}&fecha=lte.${fechaActual}`,
		);
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}



/*
Modo: Full Stack General
Modo: Code Review
Modo: Arquitectura
Modo: Debug
Modo: Optimización
Modo: Investigación
*/