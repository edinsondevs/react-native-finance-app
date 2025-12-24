/**
 * Interfaz que representa una categoría de gasto.
 * Se utiliza para listar y seleccionar categorías en la UI.
 */
export interface Category {
	id: number;
	name: string;
	description: string;
	/** Nombre del icono de MaterialIcons opcional para mostrar en la lista */
	icon?: string;
}

/**
 * Interfaz para los datos necesarios al crear un nuevo gasto.
 * Coincide con el payload esperado por el endpoint POST /gastos.
 */
export interface GastoData {
	monto: number;
	fecha: string; // Formato YYYY-MM-DD
	descripcion: string;
	categoria_id: number;
	metodo_pago_id: number;
	icon: string;
}
