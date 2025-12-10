import React, { useState } from "react";
import { View } from "react-native";

import { ButtomComponent, CircleButton, InputComponent, TitleOpcionInput } from "@/components";
import dayjs from "dayjs";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateType } from "react-native-ui-datepicker";

const AgregarIngresos = () => {
	const [date, setDate] = useState<DateType>(new Date());

	return (
		<View className='flex-1 px-4'>
			<View className='flex flex-row items-center border-t border-border-light absolute z-10 pt-3'>
				<View className='flex-1' />
				<CircleButton
					text='x'
					className='bg-primary/50 w-9 h-9'
					classNameText='text-xl'
					onPressFunction={() =>
						router.back()
					}
				/>
			</View>
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ paddingTop: 16 }}
				showsVerticalScrollIndicator={false}
				extraScrollHeight={100}
				enableOnAndroid={true}>
				<View className='flex flex-col '>
					<TitleOpcionInput title={"Monto"} />
					<InputComponent
						placeholder='0.00'
						keyboardType='numeric'
						value={""}
						setValue={() => {}}
						iconDollar
					/>
					<TitleOpcionInput title={"Fuente"} />
					<InputComponent
						placeholder='Ej. Salario, Venta, Reintegros'
						keyboardType='default'
						value={""}
						setValue={() => {}}
					/>
					<TitleOpcionInput title={"Fecha"} />
					<InputComponent
						value={dayjs(date).format("DD/MM/YYYY")}
						setValue={setDate}
						placeholder='Seleccionar fecha'
						editable={false}
						className='pl-3'
					/>
					<TitleOpcionInput title={"Descripción (opcional)"} />
					<InputComponent
						placeholder='Añade una nota...'
						multiline
						value={""}
						setValue={() => {}}
						className='h-40 pl-3'
						style={{ textAlignVertical: "top" }}
					/>
				</View>
			</KeyboardAwareScrollView>
			<ButtomComponent
				onPressFunction={() => router.push("/(tabs)/ingresos")}
				text='Guardar Ingreso'
				color='bg-primary'
				className='mb-6 '
			/>
		</View>
	);
};

export default AgregarIngresos;
