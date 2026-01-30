import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useMemo, useState } from "react";
dayjs.locale("es");

import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getCategoriasServices, getMetodosPagoServices, getProfilesServices } from "@/api/services";
import { getGastosPorDiaServices } from "@/api/services/estadisticas/get.estadisticas.services";
import { GastosPorCategoria, GastosPorTipoPago, GastosPorUsuario, GastosXdia, HeaderComponent, LineChartComponent, PieChartComponent, TabSelectorEstadisticas } from "@/components";
import { useAuthStore } from "@/store/useAuthStore";
import { colors } from "@/styles/constants";
import { styles } from "@/styles/estadisticas.styles";


const EstadisticasScreen = () => {
	const [activeTab, setActiveTab] = useState<
		"diario" | "usuario" | "tipo_pago" | "categoria"
	>("diario");
	const [activeChart, setActiveChart] = useState<"line" | "pie">("line");

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

			{/* Chart Selector (Fuera de la card) */}
			{gastosData && gastosData.length > 0 && (
				<View
					style={{
						flexDirection: "row",
						backgroundColor: "#f3f4f6",
						padding: 4,
						borderRadius: 12,
						marginBottom: 12,
					}}>
					<TouchableOpacity
						onPress={() => setActiveChart("line")}
						style={{
							flex: 1,
							paddingVertical: 8,
							borderRadius: 8,
							alignItems: "center",
							backgroundColor:
								activeChart === "line"
									? "white"
									: "transparent",
							shadowColor:
								activeChart === "line" ? "#000" : "transparent",
							shadowOffset: { width: 0, height: 1 },
							shadowOpacity: 0.1,
							shadowRadius: 2,
							elevation: activeChart === "line" ? 2 : 0,
						}}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color:
									activeChart === "line"
										? colors.primary
										: "#9ca3af",
							}}>
							Gráfico de Líneas
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setActiveChart("pie")}
						style={{
							flex: 1,
							paddingVertical: 8,
							borderRadius: 8,
							alignItems: "center",
							backgroundColor:
								activeChart === "pie" ? "white" : "transparent",
							shadowColor:
								activeChart === "pie" ? "#000" : "transparent",
							shadowOffset: { width: 0, height: 1 },
							shadowOpacity: 0.1,
							shadowRadius: 2,
							elevation: activeChart === "pie" ? 2 : 0,
						}}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color:
									activeChart === "pie"
										? colors.primary
										: "#9ca3af",
							}}>
							Gráfico de Torta
						</Text>
					</TouchableOpacity>
				</View>
			)}

			{/* Chart Card */}
			{gastosData && gastosData.length > 0 && (
				<View style={styles.chartCard}>
					<Text style={styles.chartLabel}>
						{activeChart === "line"
							? "Tendencia de Gastos por Usuario"
							: "Distribución por Categoría"}
					</Text>

					{activeChart === "line" ? (
						<>
							{/* Leyenda solo para LineChart */}
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
															index %
																chartColors.length
														],
												},
											]}
										/>
										<Text style={styles.legendText}>
											{userId === user?.id
												? user?.displayName || "Yo"
												: profileMap[userId] ||
													`User: ${userId.slice(
														0,
														8,
													)}...`}
										</Text>
									</View>
								))}
							</View>

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
						</>
					) : (
						<View style={{ alignItems: "center" }}>
							<PieChartComponent data={gastosPorCategoriaData} />
						</View>
					)}
				</View>
			)}

			{/* Tabs */}
			<TabSelectorEstadisticas
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>

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
