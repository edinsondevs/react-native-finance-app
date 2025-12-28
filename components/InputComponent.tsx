import { Text, TextInput, TextInputProps, View } from "react-native";

import { formatCurrency, handleChangeText } from "@/helpers";

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

	// Usar valor formateado solo si iconDollar está activo
	const displayValue = iconDollar ? formatCurrency(value) : value;

	return (
		<View className='relative'>
			<TextInput
				className={`w-full rounded-lg border border-border-light bg-white h-14 ${pl} pr-4 text-xl font-semibold text-text-dark ${className}`}
				value={displayValue}
				onChangeText={
					iconDollar
						? (text) => handleChangeText(text, setValue)
						: setValue
				}
				keyboardType={iconDollar ? "decimal-pad" : props.keyboardType}
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
