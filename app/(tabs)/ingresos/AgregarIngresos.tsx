import React, { JSX, useState } from "react";
import { Text, View } from "react-native";

import { ButtomComponent, CircleButton, InputComponent } from "@/components";
import dayjs from "dayjs";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateType } from "react-native-ui-datepicker";

interface PropsTitle {
	title: string;
}

const TitleOption = ({ title }: PropsTitle): JSX.Element => {
	return (
		<Text className='text-lg font-Inter-Bold pb-2 text-text-dark'>
			{title}
		</Text>
	);
};
const AgregarIngresos = () => {
	const [date, setDate] = useState<DateType>(new Date());

	return (
		<View className='flex-1 px-4'>
			<View className='flex flex-row items-center  p-4 pb-2 border-t border-border-light absolute z-10 '>
				<View className='flex-1' />
				<CircleButton
					text='x'
					className='bg-primary/50 w-9 h-9'
					classNameText='text-xl'
					onPressFunction={() =>
						router.push("/(tabs)/ingresos/AgregarIngresos")
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
					<TitleOption title={"Monto"} />
					<InputComponent
						placeholder='0.00'
						keyboardType='numeric'
						value={""}
						setValue={() => {}}
						iconDollar
					/>
					<TitleOption title={"Fuente"} />
					<InputComponent
						placeholder='Ej. Salario, Venta, Reintegros'
						keyboardType='default'
						value={""}
						setValue={() => {}}
					/>
					<TitleOption title={"Fecha"} />
					<InputComponent
						value={dayjs(date).format("DD/MM/YYYY")}
						setValue={setDate}
						placeholder='Seleccionar fecha'
						editable={false}
						className='pl-3'
					/>
					<TitleOption title={"Descripción (opcional)"} />
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
