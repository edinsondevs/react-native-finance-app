import { View, Text } from "react-native";
import React from "react";
// Asumiendo que usas MaterialIcons para los iconos
import { MaterialIcons } from "@expo/vector-icons";

interface ItemMovimientosCardsProps {
	category: string;
	description: string;
	amount: number; // Por ejemplo: 45.50
	iconName: keyof typeof MaterialIcons.glyphMap; // Nombre del icono (ej: 'shopping-cart')
}

const ItemMovimientosCards = ({
	category,
	description,
	amount,
	iconName,
}: ItemMovimientosCardsProps) => {
	// Formatear el monto con el signo y decimales
	const formattedAmount = `-$${amount.toFixed(2)}`;

	// Nota: La clase 'text-expense' se reemplaza aquí por 'text-red-500' o el color que definas para gastos
	// Y los colores como 'bg-primary/10' se usan directamente.

	return (
		<View className='flex flex-row items-center gap-4 rounded-lg bg-white p-2 dark:bg-transparent'>
			{/* Columna 1: Icono */}
			<View className='flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20'>
				{/* Usamos el componente MaterialIcons de Expo */}
				<MaterialIcons
					name={iconName}
					size={20}
					// El color 'text-primary' se aplica al padre, pero en RN el icono necesita su propio color
					color='#1E40FF' // Asumiendo que '#1E40FF' es tu color 'primary'
				/>
			</View>

			{/* Columna 2: Texto de Categoría y Descripción */}
			<View className='flex-1'>
				{/* Categoría: Supermercado */}
				<Text className='font-semibold text-[#111318] dark:text-white'>
					{category}
				</Text>

				{/* Descripción: Comida */}
				<Text className='text-sm text-[#616f89] dark:text-gray-400'>
					{description}
				</Text>
			</View>

			{/* Columna 3: Monto */}
			<Text className='font-bold text-red-500'>{formattedAmount}</Text>
		</View>
	);
};

export default ItemMovimientosCards;

