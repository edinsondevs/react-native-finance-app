import { getIngresosServices } from "@/api/services/ingreso/get.ingresos.services";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";

/**
 * Hook de lógica para la pantalla de Ingresos.
 * Maneja la obtención de datos, el filtrado por mes y la agrupación por separadores temporales.
 */
export const useIngresosScreenLogic = () => {
	const selectedMonth = useFinanceStore((state) => state.selectedMonth);

	// Consulta de ingresos del mes seleccionado
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["ingresos", selectedMonth.format("YYYY-MM")],
		queryFn: () => getIngresosServices(selectedMonth),
	});

	/**
	 * Procesa la lista plana de ingresos para insertar separadores visuales por mes.
	 * Aunque el query ya filtra por mes, esto permite mostrar el encabezado del mes actual
	 * o manejar casos donde se traigan rangos más amplios.
	 */
	const ingresosConSeparadores = useMemo(() => {
		if (!data || data.length === 0) return [];

		// Ordenar por fecha descendente
		const sorted = [...data].sort((a, b) => {
			return dayjs(b.fecha).unix() - dayjs(a.fecha).unix();
		});

		const resultado: any[] = [];
		let mesAnterior: string | null = null;

		sorted.forEach((ingreso) => {
			const mesActual = dayjs(ingreso.fecha).format("MMMM YYYY");

			// Agregar separador si el mes cambia (útil si se expande el filtrado)
			if (mesAnterior !== mesActual) {
				resultado.push({
					type: "separator",
					mes: mesActual,
					id: `separator-${mesActual}`,
				});
			}

			resultado.push({
				type: "ingreso",
				...ingreso,
			});

			mesAnterior = mesActual;
		});

		return resultado;
	}, [data]);

	return {
		isLoading,
		error,
		refetch,
		ingresosConSeparadores,
	};
};
