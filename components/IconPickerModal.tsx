import { FontAwesome } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import IconPicker from "./IconPicker";

interface IconPickerModalProps {
	visible: boolean;
	onClose: () => void;
	selectedIcon: string;
	onSelectIcon: (icon: string) => void;
}

const IconPickerModal = ({
	visible,
	onClose,
	selectedIcon,
	onSelectIcon,
}: IconPickerModalProps) => {
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
