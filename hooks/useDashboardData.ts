import { useQuery } from "@tanstack/react-query";
import { getAllGastosServices, getResumeGastosServices, getResumeIngresosServices } from "@/api/services/dashboard/get.alls.services";

export const useDashboardData = () => {
	const { data: resumeIngresos, isLoading: isLoadingResumeIngresos, refetch: refetchResumeIngresos, } = useQuery({
		queryKey: ["resumeIngresos"],
		queryFn: getResumeIngresosServices,
	});

	const { data: resumeGastos, isLoading: isLoadingResumeGastos, refetch: refetchResumeGastos, } = useQuery({
		queryKey: ["resumeGastos"],
		queryFn: getResumeGastosServices,
	});

	const { data: allGastos, isLoading: isLoadingAllGastos, refetch: refetchAllGastos, } = useQuery({
		queryKey: ["gastos", "all"],
		queryFn: getAllGastosServices,
	});

	const refreshAll = () => {
		refetchAllGastos();
		refetchResumeGastos();
		refetchResumeIngresos();
	};

	return {
		resumeIngresos,
		isLoadingResumeIngresos,
		resumeGastos,
		isLoadingResumeGastos,
		allGastos,
		isLoadingAllGastos,
		refreshAll,
	};
};
