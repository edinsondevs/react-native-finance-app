import { CardsComponent, CircleButton, PeriodSelector, HeaderComponent } from "@/app/components";
import MovimientosRecientes from './MovimientosRecientes';

import {
	Text,
	View,
} from "react-native";



const GastosScreen = () => {
	// TODO Cambiar el texto por el nombre del usuario logueado
	return (
		// <ScrollView>
		<View className='flex-1 bg-white '>
			{/* Componente header que muestra el nombre del usuario logueado y las notificaciones */}
			<HeaderComponent />

			{/* Tarjeta con Balances del Mes*/}
			<View className='mx-8 my-4' >
				<View>
					<Text className='text-xl text-text-input-placeholder'>
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
					<View>
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
						<View>
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
			<MovimientosRecientes />

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
