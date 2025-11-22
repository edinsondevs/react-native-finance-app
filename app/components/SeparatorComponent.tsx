import { View, Text } from "react-native";
import React from "react";

const SeparatorComponent = () => {
	return (
		// ... tu código de los botones
		<View className='flex-row items-center my-6'>
			{/* Línea divisoria izquierda */}
			<View className='flex-1 h-px bg-gray-300' />

			{/* Texto "o" centrado */}
			<Text className='mx-4 text-gray-500 font-sans'>o</Text>

			{/* Línea divisoria derecha */}
			<View className='flex-1 h-px bg-gray-300' />
		</View>
		// ... tu código de los botones sociales
	);
};

export default SeparatorComponent;
