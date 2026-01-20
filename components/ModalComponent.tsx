import { Modal, View } from "react-native";
import { InterfaceModalComponentProps } from "@/interfaces";

/*
 * @component ModalComponent
 * Componente que permite crear un modal.
 * @param {React.ReactNode} children - Contenido del modal.
 * @param {ModalProps} props - Propiedades del modal.
 */

const ModalComponent = ({ children, ...props }: InterfaceModalComponentProps) => {
	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={props.visible}>
			<View className='flex-1 items-center justify-center bg-black/50'>
				<View className='p-5 rounded-3xl shadow-lg shadow-gray-200/50'>
					{children}
				</View>
			</View>
		</Modal>
	);
};

export default ModalComponent;
