import React from "react";
import { Pressable, Text } from "react-native";
import { PressableProps } from "react-native/Libraries/Components/Pressable/Pressable";

// 💡 Nota: Cambié el nombre de la interfaz a un estándar (ButtonProps)
interface ButtonProps extends PressableProps {
	onPressFunction: () => void;
	text: string;
	// Usamos 'bg-primary' como un ejemplo de clase de Tailwind para el color
	color?: "bg-primary" | "bg-secondary" | "bg-google-red";
	textColor?: "text-text-dark" | "text-text-light";
	className?: string;
	classNameText?: string;
}

const CircleButton = ({
	onPressFunction,
	text,
	color = "bg-primary",
	className,
	classNameText,
}: ButtonProps) => {
	return (
		<Pressable
			onPress={onPressFunction}
			className={`${color} w-16 h-16 justify-center items-center rounded-full ${className}`}>
			<Text className={`text-4xl text-text-light font-Inter-Bold text-center pb-1 ${classNameText}`}>
				{text}
			</Text>
		</Pressable>
	);
};

export default CircleButton;
