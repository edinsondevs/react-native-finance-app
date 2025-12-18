import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, View } from "react-native";

// import { useAuthStore } from "@/store/useAuthStore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateType } from "react-native-ui-datepicker";

import { postIngresoServices } from "@/api/services/ingreso/post.ingreso.services";
import { ButtomComponent, CircleButton, DateTimePickerComponent, InputComponent, ModalComponent, TitleOpcionInput } from "@/components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IngresoForm } from "./ingresos.interfaces";
import { FontAwesome } from "@expo/vector-icons";

const AgregarIngresos = () => {
	// const user = useAuthStore((state) => state.user);
	const [date, setDate] = useState<DateType>(new Date());
	const [textButton, setTextButton] = useState("Guardar Ingreso");
	const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);
	const { control, handleSubmit, reset } = useForm<IngresoForm>();
	const queryClient = useQueryClient();

	// Configurar la mutación
	const { mutate: crearIngreso, isPending } = useMutation({
		mutationFn: async (data: IngresoForm) => {
			return postIngresoServices({
				origen: data.origen,
				monto: Number(data.monto),
				fecha: dayjs(data.fecha).format("YYYY-MM-DD"),
				descripcion: data.descripcion,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ingresos"] });
			Alert.alert("Éxito", "Ingreso guardado correctamente", [
				{ text: "OK", onPress: () => router.back() },
			]);
			reset();
		},
		onError: (error) => {
			console.error(error);
			Alert.alert("Error", "No se pudo guardar el ingreso");
		},
	});

	const onSubmit: SubmitHandler<IngresoForm> = (data) => {
		crearIngreso(data);
	};

	useEffect(() => {
		if (isPending) {
			setTextButton("Guardando...");
		} else {
			setTextButton("Guardar Ingreso");
		}
	}, [isPending]);

	return (
		<View className='flex-1 px-4'>
			<View className='flex flex-row items-center border-t border-border-light absolute z-10 pt-3'>
				<View className='flex-1' />
				{!isPending && (
					<CircleButton
						text='x'
						className='bg-primary/50 w-9 h-9'
						classNameText='text-xl'
						onPressFunction={() => router.back()}
					/>
				)}
			</View>
			{isPending ? (
				<ActivityIndicator
					size='large'
					color='#0000ff'
					className='flex-1'
				/>
			) : (
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps='handled'
					contentContainerStyle={{ paddingTop: 16 }}
					showsVerticalScrollIndicator={false}
					extraScrollHeight={100}
					enableOnAndroid={true}>
					<View className='flex flex-col '>
						<TitleOpcionInput title={"Monto"} />
						<Controller
							name='monto'
							control={control}
							render={({ field }) => (
								<InputComponent
									placeholder='0.00'
									keyboardType='numeric'
									value={field.value}
									setValue={field.onChange}
									iconDollar
								/>
							)}
						/>
						<TitleOpcionInput title={"Origen"} />
						<Controller
							name='origen'
							control={control}
							render={({ field }) => (
								<InputComponent
									placeholder='Ej. Salario, Venta, Reintegros'
									keyboardType='default'
									value={field.value}
									setValue={field.onChange}
									autoCapitalize='sentences'
								/>
							)}
						/>

						<TitleOpcionInput title={"Fecha"} />
						<Pressable onPress={() => setIsDatePickerVisible(true)}>
							<InputComponent
								value={dayjs(date).format("DD/MM/YYYY")}
								setValue={() => {}}
								placeholder='Seleccionar fecha'
								editable={false}
								className='pl-3'
							/>
							<View className='absolute right-3 top-3'>
								<FontAwesome name='calendar' size={24} color='black' />
							</View>
						</Pressable>

						<ModalComponent
							visible={isDatePickerVisible}
							onRequestClose={() =>
								setIsDatePickerVisible(!isDatePickerVisible)
							}>
							<DateTimePickerComponent
								value={date}
								maximumDate={new Date()}
								minimumDate={new Date(2020, 0, 1)}
								cancelRequestClose={() =>
									setIsDatePickerVisible(!isDatePickerVisible)
								}
								onRequestClose={(date) => {
									setIsDatePickerVisible(
										!isDatePickerVisible
									);
									setDate(date || new Date());
								}}
							/>
						</ModalComponent>

						<TitleOpcionInput title={"Descripción (opcional)"} />
						<Controller
							name='descripcion'
							control={control}
							render={({ field }) => (
								<InputComponent
									placeholder='Añade una nota...'
									multiline
									value={field.value}
									setValue={field.onChange}
									className='h-40 pl-3'
									style={{ textAlignVertical: "top" }}
								/>
							)}
						/>
					</View>
				</KeyboardAwareScrollView>
			)}
			<ButtomComponent
				onPressFunction={handleSubmit(onSubmit)}
				text={textButton}
				color='bg-primary'
				className='mb-6 '
			/>
		</View>
	);
};

export default AgregarIngresos;
