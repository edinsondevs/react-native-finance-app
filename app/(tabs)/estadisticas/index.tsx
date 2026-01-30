import {
	getCategoriasServices,
	getMetodosPagoServices,
	getProfilesServices,
} from "@/api/services";
import { getGastosPorDiaServices } from "@/api/services/estadisticas/get.estadisticas.services";
import {
	GastosPorCategoria,
	GastosPorTipoPago,
	GastosPorUsuario,
	GastosXdia,
	HeaderComponent,
	LineChartComponent,
} from "@/components";
import { useAuthStore } from "@/store/useAuthStore";
import { colors } from "@/styles/constants";
import { styles } from "@/styles/estadisticas.styles";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useMemo, useState } from "react";
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

dayjs.locale("es");

const EstadisticasScreen = () => {
	const [activeTab, setActiveTab] = useState<
		"diario" | "usuario" | "tipo_pago" | "categoria"
	>("diario");

	const {
		data: gastosData,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["estadisticasGastos"],
		queryFn: getGastosPorDiaServices,
	});

	const { user } = useAuthStore();

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
			gastosData?.reduce((acc: any, item: any) => acc + item.monto, 0) ||
			0,
		[gastosData],
	);

	// Obtener todos los días del mes actual
	const daysInMonth = dayjs().date();
	const monthLabels = useMemo(
		() =>
			Array.from({ length: daysInMonth }, (_, i) =>
				dayjs()
					.date(i + 1)
					.format("DD/MM"),
			),
		[daysInMonth],
	);

	// Agrupar gastos por usuario y por día - memoizado
	const { expensesByUser, userIds, gastosPorDiaSummary, chartColors } =
		useMemo(() => {
			const expensesByUser: Record<string, Record<string, number>> = {};
			const userIds = new Set<string>();
			const gastosPorDiaSummary: Record<string, number> = {};
			const chartColors = [
				colors.primary,
				colors.alert,
				"#FF9500",
				"#FF2D55",
				"#5856D6",
				"#AF52DE",
			];

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
				chartColors,
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

	const mainData = dataSets.length > 0 ? dataSets[0].data : [];

	// Preparar datos para el componente de gastos por usuario - memoizado
	const gastosPorUsuarioData = useMemo(() => {
		return Array.from(userIds).map((userId, index) => {
			const monto = Object.values(expensesByUser[userId] || {}).reduce(
				(a, b) => a + b,
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

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator
					size='large'
					color={colors.primary}
				/>
			</View>
		);
	}

	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl
					refreshing={isLoading}
					onRefresh={refetch}
				/>
			}
			showsVerticalScrollIndicator={false}>
			<HeaderComponent title='Estadísticas de Gastos' />

			{/* Total Card */}
			<View style={styles.totalCard}>
				<Text style={styles.totalLabel}>Total del Mes</Text>
				<Text style={[styles.totalAmount, { color: colors.primary }]}>
					${total.toLocaleString("es-AR")}
				</Text>
			</View>

			{/* Chart Card */}
			{gastosData && gastosData.length > 0 && (
				<View style={styles.chartCard}>
					<Text style={styles.chartLabel}>
						Tendencia de Gastos por Usuario
					</Text>

					{/* Leyenda */}
					<View style={styles.legendContainer}>
						{Array.from(userIds).map((userId, index) => (
							<View
								key={userId}
								style={styles.legendItem}>
								<View
									style={[
										styles.legendDot,
										{
											backgroundColor:
												chartColors[
													index % chartColors.length
												],
										},
									]}
								/>
								<Text style={styles.legendText}>
									{userId === user?.id
										? user?.displayName || "Yo"
										: profileMap[userId] ||
											`User: ${userId.slice(0, 8)}...`}
								</Text>
							</View>
						))}
					</View>

					{/* Gráfico */}
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						scrollEnabled={dataSets.length > 0}>
						<View style={styles.chartContainer}>
							{dataSets.length > 0 && (
								<LineChartComponent
									mainData={mainData}
									dataSets={dataSets}
									monthLabels={monthLabels}
									chartColors={chartColors}
								/>
							)}
						</View>
					</ScrollView>

					<Text style={styles.monthLabel}>
						Días del mes de {dayjs().format("MMMM")}
					</Text>
				</View>
			)}

			{/* Tabs */}
			<View style={styles.tabsContainer}>
				<TouchableOpacity
					onPress={() => setActiveTab("diario")}
					style={[
						styles.tabButton,
						activeTab === "diario" && styles.tabButtonActive,
					]}
					activeOpacity={0.7}>
					<Text
						style={[
							styles.tabText,
							activeTab === "diario" && {
								color: colors.primary,
							},
						]}>
						Diario
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setActiveTab("usuario")}
					style={[
						styles.tabButton,
						activeTab === "usuario" && styles.tabButtonActive,
					]}
					activeOpacity={0.7}>
					<Text
						style={[
							styles.tabText,
							activeTab === "usuario" && {
								color: colors.primary,
							},
						]}>
						Usuario
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setActiveTab("tipo_pago")}
					style={[
						styles.tabButton,
						activeTab === "tipo_pago" && styles.tabButtonActive,
					]}
					activeOpacity={0.7}>
					<Text
						style={[
							styles.tabText,
							activeTab === "tipo_pago" && {
								color: colors.primary,
							},
						]}>
						Pago
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setActiveTab("categoria")}
					style={[
						styles.tabButton,
						activeTab === "categoria" && styles.tabButtonActive,
					]}
					activeOpacity={0.7}>
					<Text
						style={[
							styles.tabText,
							activeTab === "categoria" && {
								color: colors.primary,
							},
						]}>
						Categoría
					</Text>
				</TouchableOpacity>
			</View>

			{/* Contenido por tab */}
			<View style={styles.contentContainer}>
				{activeTab === "diario" && (
					<GastosXdia gastosPorDiaSummary={gastosPorDiaSummary} />
				)}
				{activeTab === "usuario" && (
					<GastosPorUsuario data={gastosPorUsuarioData} />
				)}
				{activeTab === "tipo_pago" && (
					<GastosPorTipoPago data={gastosPorMetodoPagoData} />
				)}
				{activeTab === "categoria" && (
					<GastosPorCategoria data={gastosPorCategoriaData} />
				)}
			</View>
		</ScrollView>
	);
};

export default EstadisticasScreen;
