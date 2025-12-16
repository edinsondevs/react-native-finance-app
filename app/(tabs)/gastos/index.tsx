import MovimientosRecientes from "@/app/(tabs)/gastos/MovimientosRecientes";
import { CardsComponent, CircleButton, HeaderComponent, PeriodSelector, CharstComponent } from "@/components";

import { colors } from "@/styles/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { getResumeIngresosServices, getAllGastosServices, getResumeGastosServices } from "@/api/services/dashboard/get.alls.services";
import { useQuery } from "@tanstack/react-query";
// import { ServicesPurchases } from "@/api/services/purchases.services";

const chartData = [
	{ value: 54, color: "#177AD5" },
	{ value: 40, color: "#79D2DE" },
	{ value: 20, color: "#ED6665" },
];

const GastosScreen = () => {
	
	const { data: resumeIngresos } = useQuery({
		queryKey: ["ingresos"],
		queryFn: getResumeIngresosServices,
	});
	const { data: resumeGastos } = useQuery({
		queryKey: ["gastos"],
		queryFn: getResumeGastosServices,
	});
	const { data: allGastos } = useQuery({
		queryKey: ["gastos", "all"],
		queryFn: getAllGastosServices,
	});
	console.log({resumeIngresos})
	return (
		// <></>
		<View className='flex-1'>
			<FlatList
				data={allGastos}
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
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<>
						<HeaderComponent />

						{/* Balance del Mes */}
						<View className='mx-8 my-4'>
							<Text className='text-xl text-input-placeholder'>
								Balance del Mes
							</Text>
							<Text className='text-3xl font-Nunito-Bold'>
								{resumeIngresos}
							</Text>
						</View>

						{/* Ingresos / Gastos */}
						<View className='flex flex-row justify-around w-6/12'>
							<CardsComponent>
								<View className='flex flex-row items-center'>
									<MaterialIcons
										name='arrow-upward'
										size={24}
										className='text-secondary bg-secondary/10 p-1 rounded-full mr-4'
									/>
									<Text className='text-xl'>Ingresos</Text>
								</View>
								<Text className='text-lg font-Nunito-Bold text-secondary'>
									$ 1.550.000,00
								</Text>
							</CardsComponent>

							<CardsComponent>
								<View className='flex flex-row items-center'>
									<MaterialIcons
										name='arrow-downward'
										size={24}
										color={colors.alert}
										className='bg-alert/10 p-1 rounded-full mr-4'
									/>
									<Text className='text-xl'>Gastos</Text>
								</View>
								<Text className='text-lg font-Nunito-Bold text-alert'>
									$ 1.550.000,00
								</Text>
							</CardsComponent>
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
							<Text className='text-2xl text-text-dark font-Inter-ExtraBold'>
								Movimientos Recientes
							</Text>
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
