import { instance } from '@/api/apiService';
import { DataSettingsInterface } from '../interfaces';

//* Eliminar Un Ajuste App
export const deleteSettingsServices = async ({
	origen,
	id,
}: Pick<DataSettingsInterface, 'origen' | 'id'>) => {
	try {
		console.log(`Eliminando: ${origen} con id: ${id}`);
		const url = `/${origen}?id=eq.${id}`;
		console.log(`URL: ${url}`);

		const response = await instance.delete(url, {
			headers: {
				Prefer: 'return=minimal',
			},
		});

		console.log('Status de respuesta:', response.status);
		console.log('Datos de respuesta:', response.data);

		// Supabase devuelve 204 (No Content) si usa return=minimal
		// o 200 con array vacío si usa return=representation
		// En ambos casos, si no hay error, la eliminación fue exitosa
		if (response.status === 200 || response.status === 204) {
			console.log('✅ Eliminación exitosa');
			return true;
		}
		return response.data;
	} catch (error: any) {
		console.error('❌ Error al eliminar:', error.message);
		console.error('Detalles del error:', error.response?.data || error);
		throw error;
	}
};
