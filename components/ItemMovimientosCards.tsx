import React from "react";
import { Text, View } from "react-native";

import { useFormatNumber } from "@/hooks";
import { colors } from "@/styles/constants";
import { FontAwesome } from "@expo/vector-icons";

/**
 * Interfaz que define las propiedades para el componente ItemMovimientosCards.
 * Define la estructura de datos que representa una tarjeta de movimiento financiero.
 */
interface ItemMovimientosCardsProps {
	category: string;
	description: string;
	amount: number; // Por ejemplo: 45.50
	icon: keyof typeof FontAwesome.glyphMap; // Nombre del icono de FontAwesome (ej: 'shopping-cart')
}

/**
 * Componente que renderiza una tarjeta individual para un movimiento financiero.
 * Muestra el icono de la categoría, nombre, descripción y el monto formateado.
 *
 * @param {ItemMovimientosCardsProps} props - Propiedades del componente
 * @returns {JSX.Element} Elemento React que representa la tarjeta del movimiento
 */
const ItemMovimientosCards = ({
	category,
	description,
	amount,
	icon,
}: ItemMovimientosCardsProps) => {
	// Nota: La clase 'text-expense' se reemplaza aquí por 'text-red-500' o el color que definas para gastos
	// Y los colores como 'bg-primary/10' se usan directamente.

	return (
		<View className='flex flex-row items-center gap-4 rounded-lg p-2  '>
			{/* Columna 1: Icono */}
			<View className='flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
				{/* Usamos el componente FontAwesome de Expo */}
				<FontAwesome
					name={icon}
					size={20}
					// El color 'text-primary' se aplica al padre, pero en RN el icono necesita su propio color
					color={colors.primary} // Asumiendo que '#1E40FF' es tu color 'primary'
				/>
			</View>

			{/* Columna 2: Texto de Categoría y Descripción */}
			<View className='flex '>
				{/* Categoría: Supermercado */}
				<Text className='font-semibold text-[#111318]'>{category}</Text>
			</View>

			<View className='flex-1 '>
				{/* Descripción: Comida */}
				<Text className='text-sm text-[#616f89]  '>{description}</Text>
			</View>

			{/* Columna 3: Monto */}
			<View>
				<Text className='font-bold text-alert'>
					{useFormatNumber(amount)}
				</Text>
			</View>
		</View>
	);
};

export default ItemMovimientosCards;
