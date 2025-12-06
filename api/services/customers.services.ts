import { instance } from "../../api/apiService";


const get = async () => {
    try {
        
        const { data } = await instance.get("/customers", {
			params: {
				limit: 1,
			},
		});
        // console.log(JSON.stringify(data, null, 4))
        return data
    } catch (error) {
        console.log(error)
        throw new Error("Error al llamar al servicio");
        
    }
}


export const ServicesCustomers = {
	get,
};