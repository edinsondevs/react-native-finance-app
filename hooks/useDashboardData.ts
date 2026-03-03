import {
	getAllGastosServices,
	getResumeGastosServices,
	getResumeIngresosServices,
} from "@/api/services/dashboard/get.alls.services";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useQuery } from "@tanstack/react-query";

export const useDashboardData = () => {
	const selectedMonth = useFinanceStore((state) => state.selectedMonth);

	const {
		data: resumeIngresos,
		isLoading: isLoadingResumeIngresos,
		refetch: refetchResumeIngresos,
	} = useQuery({
		queryKey: ["resumeIngresos", selectedMonth.format("YYYY-MM")],
		queryFn: () => getResumeIngresosServices(selectedMonth),
	});

	const {
		data: resumeGastos,
		isLoading: isLoadingResumeGastos,
		refetch: refetchResumeGastos,
	} = useQuery({
		queryKey: ["resumeGastos", selectedMonth.format("YYYY-MM")],
		queryFn: () => getResumeGastosServices(selectedMonth),
	});

	const {
		data: allGastos,
		isLoading: isLoadingAllGastos,
		refetch: refetchAllGastos,
	} = useQuery({
		queryKey: ["gastos", "all", selectedMonth.format("YYYY-MM")],
		queryFn: () => getAllGastosServices(selectedMonth),
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
