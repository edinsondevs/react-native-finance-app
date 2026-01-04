import { instance } from "../../api/apiService";


const get = async () => {
    try {        
        const { data } = await instance.get("/productos", {
			params: {
				limit: 1,
			},
		});
        return data
    } catch (error) {
        console.log(error)
        throw new Error("Error al llamar al servicio");
        
    }
}


export const ServicesProductos = {
	get,
};