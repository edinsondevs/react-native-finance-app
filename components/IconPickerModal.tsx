import { Modal, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IconPicker from "./IconPicker";
import { InterfaceIconPickerModalProps } from "@/interfaces";

/*
 * @component IconPickerModal
 * Componente que permite seleccionar un icono.
 * @param {function} onPressFunction - Función que se ejecuta al cerrar el date picker.
 * @param {string} text - Texto que se muestra en el chip.
 */

const IconPickerModal = ({
	visible,
	onClose,
	selectedIcon,
	onSelectIcon,
}: InterfaceIconPickerModalProps) => {
	return (
		<Modal
			visible={visible}
			animationType='slide'
			onRequestClose={onClose}>
			<View className='flex-1 bg-white pt-12 px-4'>
				<View className='flex-row justify-between items-center mb-4'>
					<Text className='text-xl font-bold'>Seleccionar Icono</Text>
					<TouchableOpacity onPress={onClose}>
						<FontAwesome
							name='times'
							size={24}
							color='#333'
						/>
					</TouchableOpacity>
				</View>

				<IconPicker
					selectedIcon={selectedIcon}
					onSelectIcon={onSelectIcon}
				/>
			</View>
		</Modal>
	);
};

export default IconPickerModal;
