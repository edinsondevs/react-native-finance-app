import dayjs from "dayjs";
import { useState } from "react";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { Pressable, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { DatePickerModal } from "./DatePickerModal";
import { InputComponent, TitleOpcionInput } from "@/components";
import { InterfaceFechaFieldProps } from "@/interfaces";


/*
 * Componente reutilizable para el campo de fecha
 * Incluye modal de selección de fecha y formato de visualización
 */
export const FechaField = <TFieldValues extends FieldValues = FieldValues>({
	control,
	watch,
	setValue,
	name = "fecha" as Path<TFieldValues>,
	title = "Fecha",
	defaultValue = new Date(),
}: InterfaceFechaFieldProps<TFieldValues>) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleSelectDate = (date: Date) => {
		setValue(name, date as PathValue<TFieldValues, Path<TFieldValues>>);
	};

	const fieldValue = watch(name);
	// Verificar si el valor es una fecha válida
	const dateValue =
		fieldValue && (fieldValue as any) instanceof Date
			? (fieldValue as unknown as Date)
			: typeof fieldValue === "string" || typeof fieldValue === "number"
				? new Date(fieldValue)
				: defaultValue;

	return (
		<>
			<View className='mb-5'>
				<TitleOpcionInput title={title} />
				<Controller
					name={name}
					control={control}
					defaultValue={
						defaultValue as PathValue<
							TFieldValues,
							Path<TFieldValues>
						>
					}
					render={({ field }) => {
						const displayDate =
							field.value && (field.value as any) instanceof Date
								? (field.value as unknown as Date)
								: typeof field.value === "string" ||
									  typeof field.value === "number"
									? new Date(field.value)
									: defaultValue;

						return (
							<Pressable onPress={() => setModalVisible(true)}>
								<View>
									<InputComponent
										value={dayjs(displayDate).format(
											"DD/MM/YYYY"
										)}
										setValue={() => {}}
										placeholder='Seleccionar fecha'
										editable={false}
										className='pl-3'
									/>
									<View className='absolute right-3 top-3'>
										<FontAwesome
											name='calendar'
											size={24}
											color='black'
										/>
									</View>
								</View>
							</Pressable>
						);
					}}
				/>
			</View>

			<DatePickerModal
				visible={modalVisible}
				value={dateValue}
				onClose={() => setModalVisible(false)}
				onSelect={handleSelectDate}
			/>
		</>
	);
};
