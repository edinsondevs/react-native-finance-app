import { InputComponent, TitleOpcionInput } from "@/components";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";

interface DescripcionFieldProps<
	TFieldValues extends FieldValues = FieldValues
> {
	control: Control<TFieldValues>;
	name?: Path<TFieldValues>;
	title?: string;
	placeholder?: string;
}

/**
 * Componente reutilizable para el campo de descripción
 * Campo multilinea opcional para notas adicionales
 */
export const DescripcionField = <
	TFieldValues extends FieldValues = FieldValues
>({
	control,
	name = "descripcion" as Path<TFieldValues>,
	title = "Descripción (Opcional)",
	placeholder = "Añade una nota...",
}: DescripcionFieldProps<TFieldValues>) => {
	return (
		<View className='mb-5'>
			<TitleOpcionInput title={title} />
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<InputComponent
						placeholder={placeholder}
						multiline
						value={field.value}
						setValue={field.onChange}
						className='h-40 pl-3'
						style={{ textAlignVertical: "top" }}
					/>
				)}
			/>
		</View>
	);
};
