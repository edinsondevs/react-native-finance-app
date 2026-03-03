import { useEstadisticasLogic } from "@/hooks/useEstadisticasLogic";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useState } from "react";
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
dayjs.locale("es");

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
	MonthSelector,
	PieChartComponent,
	TabSelectorEstadisticas,
} from "@/components";
import useCapitalize from "@/hooks/useCapitalize";
import { useFinanceStore } from "@/store/useFinanceStore";
import { colors } from "@/styles/constants";
import { styles } from "@/styles/estadisticas.styles";

const EstadisticasScreen = () => {
	const selectedMonth = useFinanceStore((state) => state.selectedMonth);
	const { capitalize } = useCapitalize();

	const [activeTab, setActiveTab] = useState<
		"diario" | "usuario" | "tipo_pago" | "categoria"
	>("diario");
	const [activeChart, setActiveChart] = useState<"line" | "pie">("line");

	const {
		data: gastosData,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["estadisticasGastos", selectedMonth.format("YYYY-MM")],
		queryFn: () => getGastosPorDiaServices(selectedMonth),
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

	// Lógica extraída al hook useEstadisticasLogic
	const {
		total,
		monthLabels,
		userIds,
		dataSets,
		mainData,
		gastosPorUsuarioData,
		gastosPorMetodoPagoData,
		gastosPorCategoriaData,
		gastosPorDiaSummary,
		chartColors,
		profileMap,
	} = useEstadisticasLogic({
		gastosData,
		user,
		profiles,
		metodosPago,
		categorias,
		selectedMonth,
	});

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
			<MonthSelector />

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
								{Array.from(userIds as Set<string>).map(
									(userId, index) => (
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
									),
								)}
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
								Días del mes de{" "}
								{capitalize(
									selectedMonth.locale("es").format("MMMM"),
								)}
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
