/**
 * Hook de utilidad para formatear valores numéricos a moneda local (ARS).
 *
 * Funcionalidad:
 * - Utiliza Intl.NumberFormat con localización 'es-AR'.
 * - Devuelve una cadena con el símbolo '$' y formato de miles/decimales correcto.
 *
 * @param number - El valor numérico a formatear.
 * @returns Cadena formateada o vacío si el número es indefinido.
 */
export const useFormatoMoneda = (number: number | undefined) => {
	if (!number) return "";
	const formatNumber = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	}).format(number);
	return formatNumber;
};
