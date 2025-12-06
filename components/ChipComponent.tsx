import React from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

interface ChipComponentProps {
	// Define las props que necesites para el ChipComponent
	onPressFunction: () => void;
	text: string;
}

// Umbral de ancho para considerar la pantalla como "grande" (equivale a 'md:')
const DESKTOP_WIDTH_THRESHOLD = 768;

const ChipComponent = ({ onPressFunction, text }: ChipComponentProps) => {
	// Obtener el ancho actual de la ventana
	const { width } = useWindowDimensions();
	const isDesktop = width >= DESKTOP_WIDTH_THRESHOLD;

	// Las clases que no cambian de tamaño/forma
	const baseClasses = isDesktop ? "flex p-4 rounded-full shadow-md w-96" : "flex p-3 rounded-full shadow-md w-32 ";
    
	return (
		<View className={`${baseClasses} bg-white  `}>
			<Pressable onPress={onPressFunction} >
				<Text className='text-center'>{text}</Text>
			</Pressable>
		</View>
	);
};

export default ChipComponent;
