import { Category, IconName } from "./IconType";


/**
 * Interfaz para el formulario de gastos
 * Representa la estructura de datos del formulario antes de ser enviado al backend
 */
export interface GastoFormData {
	monto: string;
	categoria: Category;
	metodo_pago_id: {
		id: number;
		name: string;
		icon?: IconName;
	};
	fecha: Date;
	descripcion: string;
}

/**
 * Interfaz para los datos necesarios al crear un nuevo gasto.
 * Coincide con el payload esperado por el endpoint POST /gastos.
 */
export interface GastoData {
	id?: number;
	user_id?: string;

	monto: number;
	fecha: string; // Formato YYYY-MM-DD
	descripcion: string;
	categoria_id: number;
	metodo_pago_id: number;
	icon: IconName;
}

/* 
 * @interface MontoItem
 * Interfaz para los datos de los gastos por día.
 * Coincide con el payload esperado por el endpoint GET /gastos_por_dia.
 */
export interface MontoItem {
	monto: number;
}