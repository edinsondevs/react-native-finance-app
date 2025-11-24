import CardsComponent from "@/app/components/CardsComponent";
import ChipComponent from "@/app/components/ChipComponent";
import {
	Text,
	// ScrollView,
	View,
} from "react-native";
import CircleButton from "../../components/CircleButton";
import HeaderComponent from "../../components/HeaderComponent";

const GastosScreen = () => {
	// TODO Cambiar el texto por el nombre del usuario logueado
	return (
		// <ScrollView>
		<View className='flex-1 '>
			{/* Componente header que muestra el nombre del usuario logueado y las notificaciones */}
			<HeaderComponent />

			{/* Componente de filtros por las fechas */}
			<View className='flex flex-row justify-around'>
				<ChipComponent
					onPressFunction={() => alert("Filtro por fecha")}
					text='Este mes'
				/>
				<ChipComponent
					onPressFunction={() => alert("Filtro por fecha")}
					text='Esta Semana'
				/>
				<ChipComponent
					onPressFunction={() => alert("Filtro por fecha")}
					text='Este Año'
				/>
			</View>

			{/* Tarjeta con Balances del Mes*/}
			<CardsComponent>
				<View>
					<Text className='text-xl'>Balance del Mes</Text>
				</View>
				<View>
					<Text className='text-3xl Inter-Bold'>$ 1.550.000,00</Text>
				</View>
			</CardsComponent>
			{/* Tarjetas con Ingresos y egresos*/}

			<View className='flex flex-row flex-wrap justify-around '>
				<CardsComponent>
					<View>
						<Text className='text-xl'>Ingresos</Text>
					</View>
					<View>
						<Text className='text-2xl font-Inter-Bold text-secondary'>
							$ 1.550.000,00
						</Text>
					</View>
				</CardsComponent>

				<CardsComponent>
					<View className=''>
						<View>
							<Text className='text-xl'>Gastos</Text>
						</View>
						<View className='w-100%'>
							<Text className='text-2xl Inter-Bold text-google-red'>
								$ 1.550.000,00
							</Text>
						</View>
					</View>
				</CardsComponent>
			</View>

			{/* Botón Circular Azul para Añadir */}
			<View className='bottom-0 right-0 m-6 absolute'>
				<CircleButton
					text='+'
					onPressFunction={() => alert("Ayuda")}
				/>
			</View>
		</View>
		// </ScrollView>
	);
};

export default GastosScreen;
