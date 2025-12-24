import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { colors } from "@/styles/constants";
import { useFormatNumber } from "@/hooks";
import { CardsComponent, CharstComponent, CircleButton, HeaderComponent, PeriodSelector, TitleOpcionInput } from "@/components";

import { getAllGastosServices, getResumeGastosServices, getResumeIngresosServices } from "@/api/services/dashboard/get.alls.services";
import MovimientosRecientes from "@/app/(tabs)/gastos/MovimientosRecientes";

const chartData = [
	{ value: 54, color: "#177AD5" },
	{ value: 40, color: "#79D2DE" },
	{ value: 20, color: "#ED6665" },
];

const GastosScreen = () => {
	const { data: resumeIngresos, isLoading: isLoadingResumeIngresos } = useQuery({
			queryKey: ["resumeIngresos"],
			queryFn: getResumeIngresosServices,
		});

	const { data: resumeGastos, isLoading: isLoadingResumeGastos } = useQuery({
		queryKey: ["resumeGastos"],
		queryFn: getResumeGastosServices,
	});

	const { data: allGastos, isLoading: isLoadingAllGastos, refetch } = useQuery({
		queryKey: ["gastos", "all"],
		queryFn: getAllGastosServices,
	});

	return (
		<View className='flex-1'>
			<FlatList
				data={allGastos}
				refreshControl={<RefreshControl refreshing={isLoadingAllGastos} onRefresh={refetch} />}
				keyExtractor={(_item, index) => index.toString()}
				renderItem={({ item }) => (
					<MovimientosRecientes
						item={{
							...item,
							iconName:
								item.iconName as keyof typeof MaterialIcons.glyphMap,
						}}
					/>
				)}
				ListEmptyComponent={
					isLoadingAllGastos ? (
						<ActivityIndicator
							size='large'
							color={colors.primary}
						/>
					) : (
						<Text className='text-center text-gray-500 mt-10'>
							No hay movimientos
						</Text>
					)
				}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<>
						<HeaderComponent />

						{/* Ingresos / Gastos */}
						<View className='flex flex-row justify-around '>
							<View className='w-6/12'>
								<CardsComponent className='gap-1 items-center'>
									<View className='flex flex-row items-center'>
										<MaterialIcons
											name='arrow-upward'
											size={24}
											className='text-secondary bg-secondary/10 p-1 rounded-full mr-4'
										/>
										<Text className='text-xl'>
											Ingresos
										</Text>
									</View>
									<Text className='font-Nunito-Bold text-secondary'>
										{isLoadingResumeIngresos ? (
											<ActivityIndicator />
										) : (
											useFormatNumber(resumeIngresos)
										)}
									</Text>
								</CardsComponent>
							</View>

							<View className='w-6/12'>
								<CardsComponent className='gap-1 items-center'>
									<View className='flex flex-row items-center'>
										<MaterialIcons
											name='arrow-downward'
											size={24}
											color={colors.alert}
											className='bg-alert/10 p-1 rounded-full mr-4'
										/>
										<Text className='text-xl'>Gastos</Text>
									</View>
									<Text className='font-Nunito-Bold text-alert'>
										{isLoadingResumeGastos ? (
											<ActivityIndicator />
										) : (
											useFormatNumber(resumeGastos)
										)}
									</Text>
								</CardsComponent>
							</View>
						</View>

						{
							// TODO: Filtro y gráfico
						}
						<PeriodSelector />
						{
							// TODO: Gráfico
						}
						<View className='flex items-center mb-6'>
							<CharstComponent data={chartData} />
						</View>

						{/* Título antes de los movimientos */}
						<View className='mx-8 mb-2'>
							<TitleOpcionInput title='Movimientos Recientes' />
						</View>
					</>
				}
				contentContainerStyle={{ paddingBottom: 100 }}
			/>

			{/* Botón flotante */}
			<View className='bottom-0 right-0 m-6 absolute'>
				<CircleButton
					text='+'
					onPressFunction={() =>
						router.push("/(tabs)/gastos/AgregarGastos")
					}
				/>
			</View>
		</View>
	);
};

export default GastosScreen;
