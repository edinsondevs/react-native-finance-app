import { instance } from '@/api/apiService';
import { DataSettingsInterface } from '../interfaces';

//* Eliminar Un Ajuste App
export const deleteSettingsServices = async ({
	origen,
	id,
}: Pick<DataSettingsInterface, 'origen' | 'id'>) => {
	try {
		console.log(`Eliminando: ${origen} con id: ${id}`);
		const response = await instance.delete(`/${origen}?id=eq.${id}`, {
			headers: {
				Prefer: 'return=minimal',
			},
		});
		console.log('Respuesta del delete:', response.status);
		console.log('Status:', response.status);

		// Supabase devuelve 204 (No Content) si usa return=minimal
		// o 200 con array vacío si usa return=representation
		// En ambos casos, si no hay error, la eliminación fue exitosa
		if (response.status === 200 || response.status === 204) {
			return true;
		}
		return response.data;
	} catch (error) {
		console.error('Error al eliminar:', error);
		throw error;
	}
};
