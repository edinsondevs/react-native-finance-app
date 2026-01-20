import { Pressable, Text, useWindowDimensions, View } from "react-native";

import { ChipComponentProps } from "@/interfaces";

// Umbral de ancho para considerar la pantalla como "grande" (equivale a 'md:')
const DESKTOP_WIDTH_THRESHOLD = 768;

/*
 * @component ChipComponent
 * Componente que permite seleccionar una fecha.
 * @param {function} onPressFunction - Función que se ejecuta al cerrar el date picker.
 * @param {string} text - Texto que se muestra en el chip.
 */
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
