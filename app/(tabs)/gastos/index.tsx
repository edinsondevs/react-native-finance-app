import MovimientosRecientes from "@/app/(tabs)/gastos/MovimientosRecientes";
import {
	CardsComponent,
	CircleButton,
	HeaderComponent,
	PeriodSelector,
} from "@/app/components";
import { colors } from "@/styles/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Text, View } from "react-native";

const GastosScreen = () => {
	// TODO Cambiar el texto por el nombre del usuario logueado
	return (
		// <ScrollView>
		<View className='flex-1 bg-white '>
			{/* Componente header que muestra el nombre del usuario logueado y las notificaciones */}
			<HeaderComponent />

			{/* Tarjeta con Balances del Mes*/}
			<View className='mx-8 my-4'>
				<View>
					<Text className='text-xl text-input-placeholder'>
						Balance del Mes
					</Text>
				</View>
				<View>
					<Text className='text-3xl font-Nunito-Bold'>
						$ 1.550.000,00
					</Text>
				</View>
			</View>

			{/*  Tarjetas con Ingresos y egresos*/}
			<View className='flex flex-row flex-wrap justify-around '>
				<CardsComponent>
					<View className='flex flex-row items-center '>
						<MaterialIcons
							name='arrow-upward'
							size={24}
							// color={colors.secondary}
							className='text-secondary bg-secondary/10 p-1 rounded-full mr-4'
						/>
						<Text className='text-xl'>Ingresos</Text>
					</View>
					<View>
						<Text className='text-2xl font-Nunito-Bold text-secondary'>
							$ 1.550.000,00
						</Text>
					</View>
				</CardsComponent>

				<CardsComponent>
					<View className=''>
						<View className='flex flex-row items-center '>
							<MaterialIcons
								name='arrow-downward'
								size={24}
								color={colors.alert}
								className='bg-alert/10 p-1 rounded-full mr-4'
							/>
							<Text className='text-xl'>Gastos</Text>
						</View>
						<View className='w-100%'>
							<Text className='text-2xl font-Nunito-Bold text-google-red'>
								$ 1.550.000,00
							</Text>
						</View>
					</View>
				</CardsComponent>
			</View>

			{/* Componente de filtros por las fechas */}
			<PeriodSelector />

			{/* Componente de Movimientos */}
			<View className='mt-3'>
				<MovimientosRecientes />
			</View>

			{/* Botón Circular Azul para Añadir */}
			<View className='bottom-0 right-0 m-6 absolute'>
				<CircleButton
					text='+'
					onPressFunction={() =>
						router.push("/(tabs)/gastos/AgregarGastos")
					}
				/>
			</View>
		</View>
		// </ScrollView>
	);
};

export default GastosScreen;
