/* 
 * @interface IngresoInterfaces
 * Interfaz para los datos de los ingresos.
 * Coincide con el payload esperado por el endpoint GET /ingresos.
 */
export interface IngresoInterfaces {
    id: number;
    createdAt: Date;
    origen: string;
    monto: number;
    fecha: Date | string;
    descripcion: string;
}
