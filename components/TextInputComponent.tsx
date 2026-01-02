import { MaterialIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { TextInput, View } from "react-native";
type widthType = 24 | 32 | 40 | 48 | 64 | 80 | 96;

// TODO:  CAMBIAR AL COMPONENTE INPUTCOMPONENT Y ELIMINAR ESTE

interface TextInputComponentProps {
	// Define aquí las props que necesites
	text: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	keyboardType?:
		| "default"
		| "email-address"
		| "url"
		| "web-search"
		| "twitter";
	width?: widthType;
	icon?: ComponentProps<typeof MaterialIcons>["name"];
	secureTextEntry?: boolean;
}

const TextInputComponent = ({
	text,
	onChangeText,
	placeholder,
	keyboardType = "default",
	width = 96,
	icon = "person",
	secureTextEntry = false,
}: TextInputComponentProps) => {
	return (
		// El View actúa como contenedor principal del input
		<View className='flex-row items-center border border-gray-300 rounded-lg p-3 bg-white'>
			{/* 1. Icono */}
			<MaterialIcons
				name={icon}
				size={20}
				color='gray'
			/>

			{/* 2. TextInput */}
			<TextInput
				className={`rounded-md  min-w-12 w-${width} font-Medium`}
				onChangeText={onChangeText}
				value={text}
				placeholder={placeholder}
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
			/>
			{/* <MaterialIcons
				name={icon}
				size={20}
				color='gray'
			/> */}
		</View>
	);
};

export default TextInputComponent;
