import MovimientosRecientes from "@/app/(tabs)/gastos/MovimientosRecientes";
import {
	CardsComponent,
	CharstComponent,
	CircleButton,
	HeaderComponent,
	PeriodSelector,
} from "@/components";

import {
	getAllGastosServices,
	getResumeGastosServices,
	getResumeIngresosServices,
} from "@/api/services/dashboard/get.alls.services";
import { useFormatNumber } from "@/hooks";
import { colors } from "@/styles/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

const chartData = [
	{ value: 54, color: "#177AD5" },
	{ value: 40, color: "#79D2DE" },
	{ value: 20, color: "#ED6665" },
];

const GastosScreen = () => {
	const { data: resumeIngresos } = useQuery({
		queryKey: ["resumeIngresos"],
		queryFn: getResumeIngresosServices,
	});

	// const { data, isLoading, error } = useQuery({
	// 	queryKey: ["gastos"],
	// 	queryFn: getGastosServices,
	// })

	const { data: resumeGastos } = useQuery({
		queryKey: ["gastos", "resumen"],
		queryFn: getResumeGastosServices,
	});

	const { data: allGastos } = useQuery({
		queryKey: ["gastos", "all"],
		queryFn: getAllGastosServices,
	});

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
										{useFormatNumber(resumeIngresos)}
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
										{useFormatNumber(resumeGastos)}
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
