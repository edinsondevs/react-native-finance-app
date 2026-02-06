import { Pressable, Text } from "react-native";

import { ButtomComponentProps } from "@/interfaces";

/*
 * @component ButtomComponent
 * Componente que permite seleccionar una fecha.
 * @param {function} onPressFunction - Función que se ejecuta al cerrar el date picker.
 * @param {string} text - Texto que se muestra en el chip.
 */

const ButtomComponent = ({
	onPressFunction,
	text,
	textColor = "text-text-white",
	color = "bg-primary",
	width = "w-full",
	className = "",
	disabled = false,
}: ButtomComponentProps) => {
	const border =
		color === "transparent"
			? "border border-border-light"
			: "border-transparent";

	// Cambiar color a gris cuando está deshabilitado
	const buttonColor = disabled ? "bg-gray-400" : color;

	return (
		<Pressable
			className={`${buttonColor} p-3
			${width} 
			rounded-${"lg"} 
			justify-center items-center ${border} ${className} `}
			onPress={onPressFunction}
			disabled={disabled}>
			<Text
				className={`${textColor} text-center font-Inter-Bold text-lg`}>
				{text}
			</Text>
		</Pressable>
	);
};

export default ButtomComponent;
