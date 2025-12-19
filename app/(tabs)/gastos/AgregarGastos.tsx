import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import { categoriesData } from "@/api/mocks/data";
import { getCategoriasServices } from "@/api/services";

import { Category } from "@/api/services/shared/get.categorias.services";
import {
	ButtomComponent,
	CircleButton,
	CustomSelector,
	DateTimePickerComponent,
	InputComponent,
	ModalComponent,
	TitleOpcionInput,
} from "@/components";

const AgregarGastosScreen = () => {
	const router = useRouter();
	const [modalVisible, setModalVisible] = useState(false);
	const queryClient = useQueryClient();
	const [textButton, setTextButton] = useState("Guardar Gasto");
	const { control, handleSubmit, reset, watch, setValue } = useForm();

	const onSubmit: SubmitHandler<any> = (data) => {
		// Formatear la fecha al formato YYYY-MM-DD antes de enviar
		const formattedData = {
			...data,
			fecha: data.fecha ? dayjs(data.fecha).format("YYYY-MM-DD") : null,
		};

		// crearGasto(formattedData);
		console.log({ data: formattedData });
		reset();
	};

	const {
		data: categoriesData,
		isPending,
		error,
	} = useQuery({
		queryKey: ["categorias"],
		queryFn: getCategoriasServices,
	});

	// console.log(JSON.stringify(categoriesData, null, 2))
	// useEffect(() => {
	// 	if (isPending) {
	// 		setTextButton("Guardando...");
	// 	} else {
	// 		setTextButton("Guardar Ingreso");
	// 	}
	// }, [isPending]);

	return (
		<View className='flex-1 bg-background-light px-4'>
			{/* Header */}
			<View className='flex flex-row items-center justify-between p-4 pb-2 border-t border-border-light absolute z-10 '>
				<Text className='text-2xl font-Inter-Bold text-center flex-1' />
				<CircleButton
					text='x'
					className='bg-primary/50 w-9 h-9'
					classNameText='text-xl'
					onPressFunction={() => router.back()}
				/>
			</View>

			{/* Main Content - KeyboardAwareScrollView */}
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ paddingTop: 16 }}
				showsVerticalScrollIndicator={false}
				extraScrollHeight={100}
				enableOnAndroid={true}>
				{/* Monto */}
				<View className='mb-5'>
					<TitleOpcionInput title='Monto' />
					<Controller
						name='monto'
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

				{/* Categoría */}
				<View className='mb-5'>
					<TitleOpcionInput title='Categoría' />
					<Controller
						name='categoria'
						control={control}
						render={({ field }) => (
							<CustomSelector<Category>
								data={categoriesData}
								labelKey='name'
								valueKey='id'
								placeholder='Selecciona una categoría...'
								value={field.value}
								onSelect={(item) => field.onChange(item)}
							/>
						)}
					/>
				</View>

				{/* Fecha */}
				<View className='mb-5'>
					<TitleOpcionInput title='Fecha' />
					<Controller
						name='fecha'
						control={control}
						defaultValue={new Date()}
						render={({ field }) => (
							<Pressable
								onPress={() => setModalVisible(!modalVisible)}>
								<View>
									<InputComponent
										value={dayjs(
											field.value || new Date()
										).format("DD/MM/YYYY")}
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
						)}
					/>
				</View>

				{/* Descripción */}
				<View className='mb-5'>
					<TitleOpcionInput title='Descripción (Opcional)' />
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

			<ButtomComponent
				onPressFunction={handleSubmit(onSubmit)}
				text={textButton}
				color='bg-primary'
				className='mb-6 '
			/>

			{/* Modal para fecha */}
			<ModalComponent
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}>
				<DateTimePickerComponent
					value={watch("fecha") || new Date()}
					maximumDate={new Date()}
					minimumDate={new Date(2020, 0, 1)}
					cancelRequestClose={() => setModalVisible(!modalVisible)}
					onRequestClose={(selectedDate) => {
						setValue("fecha", selectedDate || new Date());
						setModalVisible(!modalVisible);
					}}
				/>
			</ModalComponent>
		</View>
	);
};

export default AgregarGastosScreen;
