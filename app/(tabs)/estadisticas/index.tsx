import { getProfilesServices } from "@/api/services";
import { getGastosPorDiaServices } from "@/api/services/estadisticas/get.estadisticas.services";
import {
	GastosPorUsuario,
	GastosXdia,
	HeaderComponent,
	LineChartComponent,
} from "@/components";
import { useAuthStore } from "@/store/useAuthStore";
import { colors } from "@/styles/constants";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useState, useMemo } from "react";
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
} from "react-native";

dayjs.locale("es");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	scrollView: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	totalCard: {
		backgroundColor: "white",
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: "#9ca3af",
		marginBottom: 8,
	},
	totalAmount: {
		fontSize: 32,
		fontWeight: "bold",
	},
	chartCard: {
		backgroundColor: "white",
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	chartLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: "#9ca3af",
		marginBottom: 16,
	},
	legendContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 16,
	},
	legendItem: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 16,
		marginBottom: 8,
	},
	legendDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 4,
	},
	legendText: {
		fontSize: 12,
		color: "#4b5563",
	},
	chartContainer: {
		paddingBottom: 10,
	},
	monthLabel: {
		marginTop: 16,
		marginBottom: 8,
		textAlign: "center",
		fontSize: 11,
		color: "#9ca3af",
		fontWeight: "bold",
		fontStyle: "italic",
	},
	tabsContainer: {
		flexDirection: "row",
		marginBottom: 16,
		backgroundColor: "#f3f4f6",
		padding: 4,
		borderRadius: 12,
	},
	tabButton: {
		flex: 1,
		paddingVertical: 8,
		borderRadius: 8,
		alignItems: "center",
	},
	tabButtonActive: {
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	tabText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#9ca3af",
	},
	contentContainer: {
		marginBottom: 16,
	},
	horizontalScroll: {
		paddingBottom: 10,
	},
});

const EstadisticasScreen = () => {
	const [activeTab, setActiveTab] = useState<"diario" | "usuario">("diario");

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

	// Crear un mapa de ID -> Nombre para búsqueda rápida
	const profileMap = useMemo(
		() =>
			(profiles || []).reduce((acc: Record<string, string>, p: any) => {
				acc[p.id] = p.display_name;
				return acc;
			}, {}),
		[profiles],
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
			</View>

			{/* Contenido por tab */}
			<View style={styles.contentContainer}>
				{activeTab === "diario" ? (
					<GastosXdia gastosPorDiaSummary={gastosPorDiaSummary} />
				) : (
					<GastosPorUsuario data={gastosPorUsuarioData} />
				)}
			</View>
		</ScrollView>
	);
};

export default EstadisticasScreen;
