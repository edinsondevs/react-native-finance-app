import { Category, IconName } from "./index";

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
