	// Formatear el monto con el signo y decimales
export const useFormatNumber = (number: number) => {
	const formatNumber = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	}).format(number);
	return formatNumber;
};
