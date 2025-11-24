import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AgregarGastosScreen = () => {
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [date, setDate] = useState("24 de Mayo, 2024");
	const [description, setDescription] = useState("");
	const router = useRouter();

	return (
		<View className='flex-1 bg-white '>
			{/* Header */}
			<View className='flex flex-row items-center justify-between p-4 pb-2 border-t border-border-light '>
				<Text className='text-2xl font-Inter-Bold text-center flex-1  ' />

				<TouchableOpacity className='w-10 h-10 items-center justify-center'>
					<MaterialIcons
						name='close'
						size={24}
						color='#111827'
						onPress={() => router.back()}
					/>
				</TouchableOpacity>
			</View>

			{/* Main Content */}
			<ScrollView
				className='flex-1'
				contentContainerStyle={{ padding: 16 }}>
				{/* Monto */}
				<View className='mb-5'>
					<Text className='text-lg font-Inter-Bold pb-2 text-text-dark '>
						Monto
					</Text>
					<View className='relative'>
						<TextInput
							className='w-full rounded-lg border border-border-light  bg-background-light h-14 pl-10 pr-4 text-xl font-semibold text-text-dark'
							placeholder='0.00'
							keyboardType='numeric'
							value={amount}
							onChangeText={setAmount}
						/>
						<Text className='absolute left-3 top-[12px] text-xl font-semibold text-text-dark'>
							$
						</Text>
					</View>
				</View>

				{/* Categoría */}
				<View className='mb-5'>
					<Text className='text-lg font-Inter-Bold pb-2 text-text-dark '>
						Categoría
					</Text>
					<View className='relative'>
						<TextInput
							className='w-full rounded-lg border border-border-light  bg-background-light h-14 p-[15px] text-lg text-text-dark '
							placeholder='Seleccionar categoría'
							value={category}
							onChangeText={setCategory}
						/>
						<MaterialIcons
							name='expand-more'
							size={24}
							style={{ position: "absolute", right: 16, top: 18 }}
						/>
					</View>
				</View>

				{/* Fecha */}
				<View className='mb-5'>
					<Text className='text-lg font-Inter-Bold pb-2 text-text-dark '>
						Fecha
					</Text>
					<View className='relative'>
						<TextInput
							className='w-full rounded-lg border border-border-light bg-background-light  h-14 p-[15px] text-lg text-text-dark'
							value={date}
							editable={false}
						/>
						<MaterialIcons
							name='calendar-today'
							size={20}
							style={{ position: "absolute", right: 16, top: 18 }}
						/>
					</View>
				</View>

				{/* Descripción */}
				<View className='mb-5'>
					<Text className='text-lg font-Inter-Bold pb-2 text-text-dark '>
						Descripción (Opcional)
					</Text>
					<TextInput
						className='w-full rounded-lg border border-border-light bg-background-light min-h-[120px] p-[15px] text-lg text-text-dark'
						placeholder='Añade una nota...'
						multiline
						value={description}
						onChangeText={setDescription}
					/>
				</View>
			</ScrollView>

			{/* Guardar botón */}
			<View className='p-4 pt-2  '>
				<TouchableOpacity className='w-full h-14 bg-secondary rounded-xl flex items-center justify-center active:bg-secondary/90'>
					<Text className='text-text-white font-Inter-Bold text-lg'>
						Guardar Gasto
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default AgregarGastosScreen;
