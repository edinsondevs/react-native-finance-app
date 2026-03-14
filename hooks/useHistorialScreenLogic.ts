import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useMemo, useState } from "react";

import { getProfilesServices } from "@/api/services";
import { getHistorialIngresosServices } from "@/api/services/historial/get.historial.ingresos.services";
import { getHistorialGastosServices } from "@/api/services/historial/get.historial.services";
import { useAuthStore } from "@/store/useAuthStore";
import { colors } from "@/styles/constants";

dayjs.locale("es");

export const useHistorialScreenLogic = () => {
	const [selectedYear, setSelectedYear] = useState(dayjs().year());
	const { user } = useAuthStore();
	const queryClient = useQueryClient();

	const { data: gastosYear, isLoading: isLoadingGastos } = useQuery({
		queryKey: ["historialGastos", selectedYear],
		queryFn: () => getHistorialGastosServices(selectedYear),
	});

	const { data: ingresosYear, isLoading: isLoadingIngresos } = useQuery({
		queryKey: ["historialIngresos", selectedYear],
		queryFn: () => getHistorialIngresosServices(selectedYear),
	});

	const isLoading = isLoadingGastos || isLoadingIngresos;

	const { data: profiles } = useQuery({
		queryKey: ["profiles"],
		queryFn: getProfilesServices,
	});

	// Refrescar manualmente
	const refreshAll = async () => {
		await queryClient.refetchQueries({ queryKey: ["historialGastos"] });
		await queryClient.refetchQueries({ queryKey: ["historialIngresos"] });
		await queryClient.refetchQueries({ queryKey: ["profiles"] });
	};

	const profileMap = useMemo(() => {
		const map: Record<string, string> = {};
		profiles?.forEach((p) => {
			map[p.id] = p.display_name;
		});
		return map;
	}, [profiles]);

	const {
		dataSets,
		monthLabels,
		userIds,
		chartColors,
		totalYear,
		totalIncomeYear,
	} = useMemo(() => {
		let totalYearCalculated = 0;
		let totalIncomeYearCalculated = 0;

		if (ingresosYear) {
			ingresosYear.forEach((i) => {
				totalIncomeYearCalculated += i.monto || 0;
			});
		}

		if (!gastosYear)
			return {
				dataSets: [],
				monthLabels: [],
				userIds: new Set<string>(),
				chartColors: [],
				totalYear: 0,
				totalIncomeYear: totalIncomeYearCalculated,
			};

		const months = [
			"Ene",
			"Feb",
			"Mar",
			"Abr",
			"May",
			"Jun",
			"Jul",
			"Ago",
			"Sep",
			"Oct",
			"Nov",
			"Dic",
		];
		const userSet = new Set<string>();

		// Extraer usuarios distintos e incrementar el total
		gastosYear.forEach((g) => {
			if (g.user_id) userSet.add(g.user_id);
			totalYearCalculated += g.monto || 0;
		});

		// Si no hay ninguno (para evitar roturas visuales) agrega al usuario por defecto
		if (userSet.size === 0 && user?.id) {
			userSet.add(user.id);
		}

		const userIdsArray = Array.from(userSet);

		const userMonthSums: Record<string, number[]> = {};
		userIdsArray.forEach((uid) => {
			userMonthSums[uid] = new Array(12).fill(0);
		});

		gastosYear.forEach((g) => {
			if (!g.fecha || !g.user_id) return;
			// Extraer indice de mes (0 = enero) para sumar sus valores
			const monthIndex = dayjs(g.fecha.split("T")[0]).month();
			if (userMonthSums[g.user_id]) {
				userMonthSums[g.user_id][monthIndex] += g.monto || 0;
			}
		});

		const palette = [
			colors.primary, // Azul/primario natural
			"#f59e0b", // Amarillo/naranja
			"#10b981", // Verde oscuro
			"#ef4444", // Rojo
			"#8b5cf6", // Violeta
			"#06b6d4", // Cyan
		];

		const dataSetsResult = userIdsArray.map((uid, index) => {
			return {
				data: userMonthSums[uid].map((val, mIndex) => ({
					value: val,
					label: months[mIndex],
				})),
				color: palette[index % palette.length],
				userId: uid,
			};
		});

		return {
			dataSets: dataSetsResult,
			monthLabels: months,
			userIds: userSet,
			chartColors: palette,
			totalYear: totalYearCalculated,
			totalIncomeYear: totalIncomeYearCalculated,
		};
	}, [gastosYear, ingresosYear, user?.id]);

	return {
		selectedYear,
		setSelectedYear,
		isLoading,
		refetch: refreshAll,
		dataSets,
		monthLabels,
		userIds,
		chartColors,
		totalYear,
		totalIncomeYear,
		profileMap,
		user,
	};
};
