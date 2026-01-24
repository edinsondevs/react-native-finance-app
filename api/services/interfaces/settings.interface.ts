
/* 
 * @interface DataSettingsInterface
 * Interfaz para los datos de los gastos por día.
 * Coincide con el payload esperado por el endpoint GET /gastos_por_dia.
 */

export interface DataSettingsInterface {
	origen: "categorias" | "metodos_pago";
	icon?: string;
	name?: string;
    id?: number;
}
