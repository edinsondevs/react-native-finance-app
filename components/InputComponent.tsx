import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputComponentProps extends TextInputProps {
	value: string;
	setValue: (value: string) => void;
	className?: string;
	iconDollar?: boolean;
}
const InputComponent = ({
	value,
	setValue,
	className,
	iconDollar = false,
	...props
}: InputComponentProps) => {

	const pl = iconDollar ? "pl-8" : "pl-4";
	return (
		<View className='relative'>
			<TextInput
				className={`w-full rounded-lg border border-border-light bg-white h-14 ${pl} pr-4 text-xl font-semibold text-text-dark ${className}`}
				value={value}
				onChangeText={setValue}
				{...props}
			/>
			{iconDollar && (
				<Text className='absolute left-3 top-3.5 text-xl font-semibold text-text-dark'>
					$
				</Text>
			)}
		</View>
	);
};

export default InputComponent;
