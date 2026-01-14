import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

import { formatCurrency, handleChangeText } from "@/helpers";
import FontAwesome from "@expo/vector-icons/FontAwesome";
interface InputComponentProps extends TextInputProps {
	value: string;
	setValue: (value: string) => void;
	className?: string;
	iconDollar?: boolean;
	showCounter?: boolean;
}

const InputComponent = ({
	value,
	setValue,
	className,
	iconDollar = false,
	secureTextEntry = false,
	showCounter = true,
	maxLength,
	...props
}: InputComponentProps) => {
	const [isSecure, setIsSecure] = useState(secureTextEntry);
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
				secureTextEntry={isSecure}
				maxLength={maxLength}
				{...props}
			/>
			{iconDollar && (
				<Text className='absolute left-3 top-3.5 text-xl font-semibold text-text-dark'>
					$
				</Text>
			)}
			{secureTextEntry && (
				<Pressable onPress={() => setIsSecure(!isSecure)}>
					<Text className='absolute right-4 bottom-3.5 text-xl font-semibold text-text-dark'>
						{isSecure ? (
							<FontAwesome
								name='eye'
								size={24}
								color='black'
							/>
						) : (
							<FontAwesome
								name='eye-slash'
								size={24}
								color='black'
							/>
						)}
					</Text>
				</Pressable>
			)}

			{showCounter && maxLength && (
				<Text
					className={`absolute right-2 bottom-1 text-[10px] ${
						(value || "").length >= maxLength
							? "text-red-500"
							: "text-text-muted"
					} opacity-70`}>
					{(value || "").length}/{maxLength}
				</Text>
			)}
		</View>
	);
};

export default InputComponent;
