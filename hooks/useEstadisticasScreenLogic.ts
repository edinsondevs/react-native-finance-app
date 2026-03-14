import {
	getCategoriasServices,
	getMetodosPagoServices,
	getProfilesServices,
} from "@/api/services";
import { getGastosPorDiaServices } from "@/api/services/estadisticas/get.estadisticas.services";
import { useAuthStore } from "@/store/useAuthStore";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useEstadisticasLogic } from "./useEstadisticasLogic";

/**
 * Hook que gestiona el estado y la carga de datos para la pantalla de Estadísticas.
 * Implementa la separación de preocupaciones al manejar pestañas, tipos de gráficos y peticiones.
 */
export const useEstadisticasScreenLogic = () => {
	const selectedMonth = useFinanceStore((state) => state.selectedMonth);
	const { user } = useAuthStore();

	const [activeTab, setActiveTab] = useState<
		"diario" | "usuario" | "tipo_pago" | "categoria"
	>("diario");
	const [activeChart, setActiveChart] = useState<"line" | "pie">("line");

	const queryClient = useQueryClient();

	// Consultas de datos
	const {
		data: gastosData,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["estadisticasGastos", selectedMonth.format("YYYY-MM")],
		queryFn: () => getGastosPorDiaServices(selectedMonth),
	});

	const { data: profiles } = useQuery({
		queryKey: ["profiles"],
		queryFn: getProfilesServices,
	});

	const { data: metodosPago } = useQuery({
		queryKey: ["metodosPago"],
		queryFn: getMetodosPagoServices,
	});

	const { data: categorias } = useQuery({
		queryKey: ["categorias"],
		queryFn: getCategoriasServices,
	});

	// Procesamiento de datos mediante hook especializado
	const stats = useEstadisticasLogic({
		gastosData,
		user: user!,
		profiles,
		metodosPago,
		categorias,
		selectedMonth,
	});

	// Refrescar manualmente
	const refreshAll = async () => {
		await queryClient.refetchQueries({ queryKey: ["estadisticasGastos"] });
		await queryClient.refetchQueries({ queryKey: ["profiles"] });
		await queryClient.refetchQueries({ queryKey: ["metodosPago"] });
		await queryClient.refetchQueries({ queryKey: ["categorias"] });
	};

	return {
		activeTab,
		setActiveTab,
		activeChart,
		setActiveChart,
		isLoading,
		refetch: refreshAll,
		gastosData,
		selectedMonth,
		user,
		...stats,
	};
};
