import {
	// ScrollView,
	View,
} from "react-native";
import CircleButton from "../../components/CircleButton";
import HeaderComponent from "../../components/HeaderComponent";
import ChipComponent from "@/app/components/ChipComponent";

const GastosScreen = () => {
	// TODO Cambiar el texto por el nombre del usuario logueado
	return (
		// <ScrollView>
		<View className='flex-1 '>
			{/* Componente header que muestra el nombre del usuario logueado y las notificaciones */}
			<HeaderComponent />

			{/* Componente de filtros por las fechas */}
			<View className="flex flex-row justify-around">
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
