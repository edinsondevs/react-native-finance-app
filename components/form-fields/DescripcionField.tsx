import { InputComponent, TitleOpcionInput } from "@/components";
import { InterfaceDescripcionFieldProps } from "@/interfaces";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";

/**
 * Componente reutilizable para el campo de descripción
 * Campo multilinea opcional para notas adicionales
 */
export const DescripcionField = <TFieldValues extends FieldValues = FieldValues>({
	control,
	name = "descripcion" as Path<TFieldValues>,
	title = "Descripción (Opcional)",
	placeholder = "Añade una nota...",
	maxLength = 50,
}: InterfaceDescripcionFieldProps<TFieldValues>) => {
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
						className='h-20 pl-3'
						maxLength={maxLength}
						style={{ textAlignVertical: "top" }}
					/>
				)}
			/>
		</View>
	);
};
