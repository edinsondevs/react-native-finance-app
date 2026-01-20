import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { InterfaceIconTriggerProps } from "@/interfaces";

/*
 * @component IconTrigger
 * Componente que permite seleccionar un icono.
 * @param {function} onPressFunction - Función que se ejecuta al cerrar el date picker.
 * @param {string} text - Texto que se muestra en el chip.
 */

const IconTrigger = ({ icon, onPress }: InterfaceIconTriggerProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className='p-4 border border-gray-300 rounded-lg flex-row items-center gap-3 bg-white'>
			{icon ? (
				<>
					<FontAwesome
						name={icon as any}
						size={24}
						color='#333'
					/>
					<Text className='text-base flex-1'>{icon}</Text>
					<Text className='text-gray-500'>Cambiar</Text>
				</>
			) : (
				<>
					<FontAwesome
						name='question-circle'
						size={24}
						color='#999'
					/>
					<Text className='text-gray-500 flex-1'>
						Seleccionar icono
					</Text>
				</>
			)}
		</TouchableOpacity>
	);
};

export default IconTrigger;
