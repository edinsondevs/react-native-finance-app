import { Pressable, Text } from "react-native";

import { InterfaceButtonProps } from "@/interfaces";

/*
 * @component CircleButton
 * Componente que permite seleccionar una fecha.
 * @param {function} onPressFunction - Función que se ejecuta al cerrar el date picker.
 * @param {string} text - Texto que se muestra en el chip.
 */

const CircleButton = ({
	onPressFunction,
	text,
	color = "bg-primary",
	className,
	classNameText,
}: InterfaceButtonProps) => {
	return (
		<Pressable
			onPress={onPressFunction}
			className={`${color} w-16 h-16 justify-center items-center rounded-full ${className}`}>
			<Text
				className={`text-4xl text-text-light font-Inter-Bold text-center pb-1 ${classNameText}`}>
				{text}
			</Text>
		</Pressable>
	);
};

export default CircleButton;
