import { InputComponent, TitleOpcionInput } from "@/components";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";

interface MontoFieldProps<TFieldValues extends FieldValues = FieldValues> {
	control: Control<TFieldValues>;
	name?: Path<TFieldValues>;
	title?: string;
}

/**
 * Componente reutilizable para el campo de monto
 * Incluye validación de formato de moneda y símbolo de dólar
 */
export const MontoField = <TFieldValues extends FieldValues = FieldValues>({
	control,
	name = "monto" as Path<TFieldValues>,
	title = "Monto",
}: MontoFieldProps<TFieldValues>) => {
	return (
		<View className='mb-5'>
			<TitleOpcionInput title={title} />
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<InputComponent
						value={field.value}
						setValue={field.onChange}
						placeholder='0.00'
						keyboardType='numeric'
						iconDollar
					/>
				)}
			/>
		</View>
	);
};
