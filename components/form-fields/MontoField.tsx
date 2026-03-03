import { InputComponent, TitleOpcionInput } from "@/components";
import { InterfaceMontoFieldProps } from "@/interfaces";
import { Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";

/**
 * @component MontoField
 * Campo de entrada especializado para montos monetarios.
 *
 * Funcionalidad:
 * - Utiliza un Controller de react-hook-form para manejar el estado.
 * - Incluye un icono de dólar visual y configuración de teclado numérico.
 * - Es genérico para integrarse con cualquier esquema de formulario (SOLID: Reutilización).
 *
 * @param control - Objeto control de react-hook-form.
 * @param name - Nombre de la clave en el objeto del formulario.
 * @param title - Etiqueta visual del campo.
 */
export const MontoField = <TFieldValues extends FieldValues = FieldValues>({
	control,
	name = "monto" as Path<TFieldValues>,
	title = "Monto",
}: InterfaceMontoFieldProps<TFieldValues>) => {
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
