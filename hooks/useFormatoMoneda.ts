// Formatear el monto con el signo y decimales
export const useFormatoMoneda = (number: number | undefined) => {
	if (!number) return "";
	const formatNumber = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	}).format(number);
	return formatNumber;
};
