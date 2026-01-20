/* 
 * @interface GastoPorDia
 * Interfaz para los datos de los gastos por día.
 * Coincide con el payload esperado por el endpoint GET /gastos_por_dia.
 */
export interface GastoPorDia {
    date: string;
    total: number;
}
