import { Text, Pressable } from "react-native";
import React from "react";
import { PressableProps } from "react-native/Libraries/Components/Pressable/Pressable";


// 💡 Nota: Cambié el nombre de la interfaz a un estándar (ButtonProps)
interface ButtonProps extends PressableProps {
	onPressFunction: () => void;
	text: string;
	// Usamos 'bg-primary' como un ejemplo de clase de Tailwind para el color
	color?:'bg-primary' | 'bg-secondary' | 'bg-google-red' ;
	// Añadimos tamaño para que sea un círculo más grande o pequeño
	size?: "w-12 h-12" | "w-14 h-14" | "w-16 h-16" | "w-20 h-20";
	textColor?: string;
}

const CircleButton = ({
	onPressFunction,
	text,
	color = "bg-primary",
}: ButtonProps) => {

	return (
		<Pressable
			onPress={onPressFunction}
			// Clases de NativeWind para estilo
            className={`${color} w-16 h-16 justify-center items-center rounded-full`}
			>
			<Text  className={'text-white text-4xl'} >
				{text}
			</Text>
		</Pressable>
	);
};

export default CircleButton;
