import type { ComponentProps } from "react";
import { TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
type widthType = 24 | 32 | 40 | 48 | 64 | 80 | 96 ;

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
	icon?: ComponentProps<typeof MaterialIcons>['name'];
}

const TextInputComponent = ({
	text,
	onChangeText,
	placeholder,
	keyboardType = "default",
	width = 96,
	icon = "person",
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
