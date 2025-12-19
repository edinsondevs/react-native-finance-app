import React from "react";
import { Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useFormatNumber } from "@/hooks";

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

	// Nota: La clase 'text-expense' se reemplaza aquí por 'text-red-500' o el color que definas para gastos
	// Y los colores como 'bg-primary/10' se usan directamente.

	return (
		<View className='flex flex-row items-center gap-4 rounded-lg p-2  '>
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
			<View className='flex-1 '>
				{/* Categoría: Supermercado */}
				<Text className='font-semibold text-[#111318]'>
					{category}
				</Text>

				{/* Descripción: Comida */}
				<Text className='text-sm text-[#616f89]  '>
					{description}
				</Text>
			</View>

			{/* Columna 3: Monto */}
			<Text className='font-bold text-alert'>{useFormatNumber(amount)}</Text>
		</View>
	);
};

export default ItemMovimientosCards;
