import { Category, GastoData, Profile } from "@/api/services/interfaces";
import { User } from "@/store/useAuthStore";
import dayjs from "dayjs";
import { useMemo } from "react";

interface UseEstadisticasLogicProps {
	gastosData: GastoData[] | undefined;
	user: User;
	profiles: Profile[] | undefined;
	metodosPago: string[] | undefined;
	categorias: Category[] | undefined;
	selectedMonth: dayjs.Dayjs;
}

/**
 * Componente funcional que encapsula toda la lógica de agregación y formateo
 * estadístico para los gráficos de la aplicación.
 *
 * Funcionalidad:
 * - Genera etiquetas de días (DD/MM) dinámicamente según el mes seleccionado.
 * - Agrupa gastos por usuario y día para la gráfica de líneas.
 * - Agrupa gastos por categoría y método de pago para gráficas de torta.
 * - Mapea IDs de perfiles y categorías a nombres legibles.
 * - Calcula totales generales y por usuario.
 *
 * @param props - Datos crudos de gastos, usuarios, perfiles, categorías y el mes actual.
 * @returns Objeto con datasets formateados para GiftedCharts y mapas de referencia.
 */
export const useEstadisticasLogic = ({
	gastosData,
	user,
	profiles,
	metodosPago,
	categorias,
	selectedMonth,
}: UseEstadisticasLogicProps) => {
	const chartColors = useMemo(
		() => [
			"#135BEC", // Azul (Primary)
			"#FF9500", // Naranja
			"#28A745", // Verde
			"#FF2D55", // Rosa
			"#5856D6", // Índigo
			"#AF52DE", // Púrpura
			"#FFCC00", // Amarillo
			"#00CCCC", // Cyan
			"#DC3545", // Rojo (Alert)
			"#34C759", // Verde Manzana
			"#5AC8FA", // Celeste
			"#8E8E93", // Gris
			"#CC6633", // Café
			"#004085", // Azul Marino
		],
		[],
	);

	// Crear un mapa de ID -> Nombre para búsqueda rápida
	const profileMap = useMemo(
		() =>
			(profiles || []).reduce((acc: Record<string, string>, p: any) => {
				acc[p.id] = p.display_name;
				return acc;
			}, {}),
		[profiles],
	);

	const metodosPagoMap = useMemo(
		() =>
			(metodosPago || []).reduce(
				(acc: Record<string, string>, m: any) => {
					acc[m.id] = m.name;
					return acc;
				},
				{},
			),
		[metodosPago],
	);

	const categoriasMap = useMemo(
		() =>
			(categorias || []).reduce((acc: Record<string, string>, c: any) => {
				acc[c.id] = c.name;
				return acc;
			}, {}),
		[categorias],
	);

	// Calcular total usando 'monto'
	const total = useMemo(
		() =>
			gastosData?.reduce(
				(acc: number, item: GastoData) => acc + item.monto,
				0,
			) || 0,
		[gastosData],
	);

	// Obtener todos los días del mes seleccionado
	const daysInMonth = selectedMonth.daysInMonth();
	const monthLabels = useMemo(
		() =>
			Array.from({ length: daysInMonth }, (_, i) =>
				selectedMonth.date(i + 1).format("DD/MM"),
			),
		[daysInMonth, selectedMonth],
	);

	// Agrupar gastos por usuario y por día - memoizado
	const { expensesByUser, userIds, gastosPorDiaSummary } = useMemo(() => {
		const expensesByUser: Record<string, Record<string, number>> = {};
		const userIds = new Set<string>();
		const gastosPorDiaSummary: Record<string, number> = {};

		gastosData?.forEach((gasto: any) => {
			const userId = gasto.user_id || "Usuario Desconocido";
			userIds.add(userId);
			const date = dayjs(gasto.fecha).format("DD/MM");

			if (!expensesByUser[userId]) {
				expensesByUser[userId] = {};
			}
			expensesByUser[userId][date] =
				(expensesByUser[userId][date] || 0) + gasto.monto;

			gastosPorDiaSummary[date] =
				(gastosPorDiaSummary[date] || 0) + gasto.monto;
		});

		return {
			expensesByUser,
			userIds,
			gastosPorDiaSummary,
		};
	}, [gastosData]);

	// Preparar dataSets para LineChart - memoizado
	const dataSets = useMemo(() => {
		return Array.from(userIds).map((userId, index) => {
			const userData = monthLabels.map((date, idx) => ({
				value: expensesByUser[userId][date] || 0,
				label: (idx + 1).toString(),
			}));

			return {
				data: userData,
				color: chartColors[index % chartColors.length],
				thickness: 3,
				dataPointsColor: chartColors[index % chartColors.length],
				textColor: "gray",
			};
		});
	}, [userIds, monthLabels, expensesByUser, chartColors]);

	const mainData = useMemo(
		() => (dataSets.length > 0 ? dataSets[0].data : []),
		[dataSets],
	);

	// Preparar datos para el componente de gastos por usuario - memoizado
	const gastosPorUsuarioData = useMemo(() => {
		return Array.from(userIds).map((userId, index) => {
			const monto = Object.values(expensesByUser[userId] || {}).reduce(
				(a: number, b: number) => a + b,
				0,
			);
			const displayName =
				userId === user?.id
					? user?.displayName || "Yo"
					: profileMap[userId] || `User: ${userId.slice(0, 8)}...`;
			const color = chartColors[index % chartColors.length];
			return { userId, displayName, monto, color };
		});
	}, [
		userIds,
		expensesByUser,
		profileMap,
		user?.id,
		user?.displayName,
		chartColors,
	]);

	// Preparar datos para el componente de gastos por método de pago (luego llamado Tipo de Pago)
	const gastosPorMetodoPagoData = useMemo(() => {
		const totalsByMetodo: Record<string, number> = {};

		gastosData?.forEach((gasto: any) => {
			const metodoId = gasto.metodo_pago_id || "unknown";
			totalsByMetodo[metodoId] =
				(totalsByMetodo[metodoId] || 0) + gasto.monto;
		});

		return Object.entries(totalsByMetodo).map(
			([metodoId, monto], index) => {
				const name = metodosPagoMap[metodoId] || `Método ${metodoId}`;
				const color = chartColors[index % chartColors.length];
				return { name, monto, color };
			},
		);
	}, [gastosData, metodosPagoMap, chartColors]);

	// Preparar datos para el componente de gastos por categoría
	const gastosPorCategoriaData = useMemo(() => {
		const totalsByCategoria: Record<string, number> = {};

		gastosData?.forEach((gasto: any) => {
			const categoriaId = gasto.categoria_id || "unknown";
			totalsByCategoria[categoriaId] =
				(totalsByCategoria[categoriaId] || 0) + gasto.monto;
		});

		return Object.entries(totalsByCategoria).map(
			([categoriaId, monto], index) => {
				const name =
					categoriasMap[categoriaId] || `Categoría ${categoriaId}`;
				const color = chartColors[index % chartColors.length];
				return { name, monto, color };
			},
		);
	}, [gastosData, categoriasMap, chartColors]);

	return {
		total: total as number,
		monthLabels: monthLabels as string[],
		userIds: userIds as Set<string>,
		dataSets,
		mainData,
		gastosPorUsuarioData,
		gastosPorMetodoPagoData,
		gastosPorCategoriaData,
		gastosPorDiaSummary: gastosPorDiaSummary as Record<string, number>,
		chartColors: chartColors as string[],
		profileMap: profileMap as Record<string, string>,
	};
};
