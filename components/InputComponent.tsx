import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputComponentProps extends TextInputProps {
	value: string;
	setValue: (value: string) => void;
	className?: string;
}
const InputComponent = ({ value, setValue, className, ...props }: InputComponentProps) => {
	return (
		<TextInput
			className={`w-full rounded-lg border border-border-light bg-white h-14 pl-8 pr-4 text-xl font-semibold text-text-dark ${className}`}
			value={value}
			onChangeText={setValue}
			{...props}
		/>
	);
};

export default InputComponent;
