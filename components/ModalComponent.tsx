import React from "react";
import { Modal, ModalProps, View } from "react-native";

interface Props extends ModalProps {
	children: React.ReactNode;
}
const ModalComponent = ({ children, ...props }: Props) => {
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
