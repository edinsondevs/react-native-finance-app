import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputComponentProps extends TextInputProps {
	value: string;
	setValue: (value: string) => void;
}
const InputComponent = ({ value, setValue, ...props }: InputComponentProps) => {
	return (
		<TextInput
			className='w-full rounded-lg border border-border-light bg-white h-14 pl-10 pr-4 text-xl font-semibold text-text-dark'
			value={value}
			onChangeText={setValue}
			{...props}
		/>
	);
};

export default InputComponent;
