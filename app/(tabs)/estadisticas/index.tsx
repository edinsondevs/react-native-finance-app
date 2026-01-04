import { getGastosPorDiaServices } from "@/api/services/estadisticas/get.estadisticas.services";
import { HeaderComponent } from "@/components";
import ThemedView from "@/presentation/ThemedView";
import { colors } from "@/styles/constants";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

const EstadisticasScreen = () => {
	const { data: gastosData, isLoading } = useQuery({
		queryKey: ["estadisticasGastos"],
		queryFn: getGastosPorDiaServices,
	});

	// Calcular total
	const total = gastosData?.reduce((acc, item) => acc + item.total, 0) || 0;

	return (
		<ThemedView margin>
			<HeaderComponent />
			<Text className='text-2xl font-bold mb-6 mt-4 text-text-black'>
				Estadísticas de Gastos
			</Text>

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

					<View className='bg-white rounded-2xl p-4 shadow-sm'>
						<Text className='text-base font-semibold text-gray-500 mb-4'>
							Gastos por Día (Mes Actual)
						</Text>
						{gastosData && gastosData.length > 0 ? (
							gastosData.map((item, index) => (
								<View
									key={index}
									className='flex-row justify-between items-center py-3 border-b border-gray-100'>
									<Text className='text-base font-medium text-gray-700'>
										{item.date}
									</Text>
									<Text
										className='text-lg font-bold'
										style={{ color: colors.primary }}>
										${item.total.toLocaleString("es-AR")}
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
		</ThemedView>
	);
};

export default EstadisticasScreen;
