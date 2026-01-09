import { getProfilesServices } from "@/api/services";
import { getGastosPorDiaServices } from "@/api/services/estadisticas/get.estadisticas.services";
import { HeaderComponent } from "@/components";
import { useAuthStore } from "@/store/useAuthStore";
import { colors } from "@/styles/constants";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	Text,
	View,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";

const EstadisticasScreen = () => {
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
	const profileMap = (profiles || []).reduce(
		(acc: Record<string, string>, p: any) => {
			acc[p.id] = p.display_name;
			return acc;
		},
		{}
	);

	// Calcular total usando 'monto'
	const total = gastosData?.reduce((acc, item) => acc + item.monto, 0) || 0;

	// 1. Obtener todos los días del mes actual que tengan datos
	// O mejor, obtener todos los días del mes hasta hoy para una gráfica continua
	const daysInMonth = dayjs().date(); // Hasta el día de hoy
	const monthLabels = Array.from({ length: daysInMonth }, (_, i) =>
		dayjs()
			.date(i + 1)
			.format("DD/MM")
	);

	// 2. Agrupar gastos por usuario y por día
	const expensesByUser: Record<string, Record<string, number>> = {};
	const userIds = new Set<string>();
	const gastosPorDiaSummary: Record<string, number> = {};

	gastosData?.forEach((gasto) => {
		const userId = gasto.user_id || "Usuario Desconocido";
		userIds.add(userId);
		const date = dayjs(gasto.fecha).format("DD/MM");

		// Para la gráfica por usuario
		if (!expensesByUser[userId]) {
			expensesByUser[userId] = {};
		}
		expensesByUser[userId][date] =
			(expensesByUser[userId][date] || 0) + gasto.monto;

		// Para el resumen diario general
		gastosPorDiaSummary[date] =
			(gastosPorDiaSummary[date] || 0) + gasto.monto;
	});

	// 3. Preparar dataSets para LineChart
	const chartColors = [
		colors.primary,
		colors.alert,
		"#FF9500",
		"#FF2D55",
		"#5856D6",
		"#AF52DE",
	];

	const dataSets = Array.from(userIds).map((userId, index) => {
		const userData = monthLabels.map((date) => ({
			value: expensesByUser[userId][date] || 0,
			label: date,
		}));

		return {
			data: userData,
			color: chartColors[index % chartColors.length],
			thickness: 3,
			dataPointsColor: chartColors[index % chartColors.length],
			textColor: "gray",
		};
	});

	// Si no hay datos, mostramos un array vacío para evitar errores
	const mainData = dataSets.length > 0 ? dataSets[0].data : [];
	const otherDataSets = dataSets.length > 1 ? dataSets.slice(1) : [];
	return (
		<ScrollView
			className='flex-1 px-4'
			refreshControl={
				<RefreshControl
					refreshing={isLoading}
					onRefresh={() => {
						refetch();
					}}
				/>
			}>
			{/* <Text className='text-2xl font-bold mb-6 mt-4 text-text-black'>
				Estadísticas de Gastos
			</Text> */}
			<HeaderComponent title='Estadísticas de Gastos' />

			{isLoading ? (
				<View className='flex-1 justify-center items-center h-64'>
					<ActivityIndicator
						size='large'
						color={colors.primary}
					/>
				</View>
			) : (
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className='bg-white rounded-2xl p-4 shadow-sm mb-4'>
						<Text className='text-base font-semibold text-gray-500 mb-2'>
							Total del Mes
						</Text>
						<Text
							className='text-3xl font-bold'
							style={{ color: colors.primary }}>
							${total.toLocaleString("es-AR")}
						</Text>
					</View>

					{dataSets.length > 0 && (
						<View className='bg-white rounded-2xl p-4 shadow-sm mb-4'>
							<Text className='text-base font-semibold text-gray-500 mb-4'>
								Tendencia de Gastos por Usuario
							</Text>

							{/* Leyenda simple */}
							<View className='flex-row flex-wrap mb-4'>
								{Array.from(userIds).map((userId, index) => (
									<View
										key={userId}
										className='flex-row items-center mr-4 mb-2'>
										<View
											className='w-3 h-3 rounded-full mr-1'
											style={{
												backgroundColor:
													chartColors[
														index %
															chartColors.length
													],
											}}
										/>
										<Text className='text-xs text-gray-600'>
											{userId === user?.id
												? user.displayName || "Yo"
												: profileMap[userId] ||
													`User: ${userId.slice(0, 8)}...`}
										</Text>
									</View>
								))}
							</View>

							<LineChart
								data={mainData}
								dataSet={dataSets} // Usamos dataSet para múltiples líneas
								areaChart
								curved
								height={200}
								width={320}
								startFillColor={colors.primary}
								endFillColor='rgba(9, 255, 91, 0.1)'
								startOpacity={0.4}
								endOpacity={0.1}
								thickness={3}
								hideDataPoints={false}
								dataPointsRadius={4}
								textColor1='gray'
								textFontSize={10}
								hideRules
								xAxisColor='lightgray'
								yAxisColor='lightgray'
								noOfSections={4}
								isAnimated
							/>
						</View>
					)}

					<View className='bg-white rounded-2xl p-4 shadow-sm'>
						<Text className='text-base font-semibold text-gray-500 mb-4'>
							Gastos por Día (Mes Actual)
						</Text>
						{Object.keys(gastosPorDiaSummary).length > 0 ? (
							Object.entries(gastosPorDiaSummary)
								.sort((a, b) => b[0].localeCompare(a[0])) // Ordenar por fecha descendente
								.map(([date, monto], index) => (
									<View
										key={index}
										className='flex-row justify-between items-center py-3 border-b border-gray-100'>
										<Text className='text-base font-medium text-gray-700'>
											{date}
										</Text>
										<Text
											className='text-lg font-bold'
											style={{ color: colors.primary }}>
											${monto.toLocaleString("es-AR")}
										</Text>
									</View>
								))
						) : (
							<Text className='text-center text-gray-500 py-10'>
								No hay datos de gastos para este mes.
							</Text>
						)}
					</View>
				</ScrollView>
			)}
		</ScrollView>
	);
};

export default EstadisticasScreen;
