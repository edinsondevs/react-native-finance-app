import { categoriesData, Category } from "@/api/mocks/data";
import {
	DateTimePickerComponent,
	InputComponent,
	ModalComponent,
} from "@/components";
import CustomSelector from "@/components/CustomSelector";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateType } from "react-native-ui-datepicker";

const AgregarGastosScreen = () => {
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState<DateType>(new Date());
	const [description, setDescription] = useState("");
	const router = useRouter();
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View className='flex-1 bg-background-light'>
			{/* Header */}
			<View className='flex flex-row items-center justify-between p-4 pb-2 border-t border-border-light absolute z-10 '>
				<Text className='text-2xl font-Inter-Bold text-center flex-1' />
				<Pressable className='w-10 h-10 items-center justify-center bg-primary/50 rounded-full'>
					<MaterialIcons
						name='close'
						size={24}
						color='#111827'
						onPress={() => router.back()}
					/>
				</Pressable>
			</View>

			{/* Main Content - KeyboardAwareScrollView */}
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ padding: 16 }}
				showsVerticalScrollIndicator={false}
				extraScrollHeight={100}
				enableOnAndroid={true}>
				{/* Monto */}
				<View className='mb-5'>
					<Text className='text-lg font-Inter-Bold pb-2 text-text-dark'>
						Monto
					</Text>
					<View className='relative'>
						<InputComponent
							value={amount}
							setValue={setAmount}
							placeholder='0.00'
							keyboardType='numeric'
						/>
						<Text className='absolute left-3 top-2.5 text-xl font-semibold text-text-dark'>
							$
						</Text>
					</View>
				</View>

				{/* Categoría */}
				<View className='mb-5'>
					<Text className='text-lg font-Inter-Bold pb-2 text-text-dark'>
						Categoría
					</Text>
					<View className='relative'>
						<CustomSelector<Category>
							data={categoriesData}
							labelKey='name'
							valueKey='id'
							placeholder='Selecciona una categoría...'
							onSelect={(item) => console.log(item)}
						/>
					</View>
				</View>

				{/* Fecha */}
				<Pressable
					className='mb-5'
					onPress={() => setModalVisible(!modalVisible)}>
					<Text className='text-lg font-Inter-Bold pb-2 text-text-dark'>
						Fecha
					</Text>
					<View className='relative'>
						<InputComponent
							value={dayjs(date).format("DD/MM/YYYY")}
							setValue={setDate}
							placeholder='Seleccionar fecha'
							editable={false}
							className='pl-3'
						/>
						<MaterialIcons
							name='calendar-today'
							size={20}
							style={{
								position: "absolute",
								right: 16,
								top: 18,
							}}
						/>
					</View>
				</Pressable>

				{/* Descripción */}
				<View className='mb-5'>
					<Text className='text-lg font-Inter-Bold pb-2 text-text-dark'>
						Descripción (Opcional)
					</Text>
					<InputComponent
						placeholder='Añade una nota...'
						multiline
						value={description}
						setValue={setDescription}
						className='h-40 pl-3'
						style={{ textAlignVertical: "top" }}
					/>
				</View>

				{/* Guardar botón - Dentro del scroll para que scroll hacia él */}
				<View className='pt-4'>
					<Pressable className='w-full h-14 bg-primary rounded-xl flex items-center justify-center active:bg-secondary/90'>
						<Text className='text-text-white font-Inter-Bold text-lg'>
							Guardar Gasto
						</Text>
					</Pressable>
				</View>
			</KeyboardAwareScrollView>

			{/* Modal para fecha */}
			<ModalComponent
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}>
				<DateTimePickerComponent
					cancelRequestClose={() => setModalVisible(!modalVisible)}
					onRequestClose={(date) => {
						setDate(date);
						setModalVisible(!modalVisible);
					}}
				/>
			</ModalComponent>
		</View>
	);
};

export default AgregarGastosScreen;
