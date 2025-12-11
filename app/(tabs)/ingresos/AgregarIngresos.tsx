import React, { useState } from "react";
import { Alert, View } from "react-native";

import { postIngresoServices } from "@/api/services/ingreso/post.ingreso.services";
import {
	ButtomComponent,
	CircleButton,
	InputComponent,
	TitleOpcionInput,
} from "@/components";
import { useAuthStore } from "@/store/useAuthStore";
import dayjs from "dayjs";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateType } from "react-native-ui-datepicker";

const AgregarIngresos = () => {
	const user = useAuthStore((state) => state.user);
	const [date, setDate] = useState<DateType>(new Date());
	const [monto, setMonto] = useState("");
	const [fuente, setFuente] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [loading, setLoading] = useState(false);
	

	const handleSave = async () => {
		// if (!monto || !fuente) {
		// 	Alert.alert("Error", "Por favor completa el monto y la fuente");
		// 	return;
		// }

		// if (!user) {
		// 	Alert.alert("Error", "No se encontró sesión de usuario");
		// 	return;
		// }

		try {
			setLoading(true);
			await postIngresoServices({
				origen: "desde el frontend",
				monto: (Math.random() * 1000000).toFixed(2),
				fecha: dayjs(date).format("YYYY-MM-DD"),
				descripcion: "test",
				id: 3,
			});
			Alert.alert("Éxito", "Ingreso guardado correctamente", [
				{ text: "OK", onPress: () => router.back() },
			]);
		} catch (error) {
			console.error(error);
			Alert.alert("Error", "No se pudo guardar el ingreso");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View className='flex-1 px-4'>
			<View className='flex flex-row items-center border-t border-border-light absolute z-10 pt-3'>
				<View className='flex-1' />
				<CircleButton
					text='x'
					className='bg-primary/50 w-9 h-9'
					classNameText='text-xl'
					onPressFunction={() => router.back()}
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
						value={monto}
						setValue={setMonto}
						iconDollar
					/>
					<TitleOpcionInput title={"Fuente"} />
					<InputComponent
						placeholder='Ej. Salario, Venta, Reintegros'
						keyboardType='default'
						value={fuente}
						setValue={setFuente}
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
						value={descripcion}
						setValue={setDescripcion}
						className='h-40 pl-3'
						style={{ textAlignVertical: "top" }}
					/>
				</View>
			</KeyboardAwareScrollView>
			<ButtomComponent
				onPressFunction={handleSave}
				text='Guardar Ingreso'
				color='bg-primary'
				className='mb-6 '
			/>
		</View>
	);
};

export default AgregarIngresos;
