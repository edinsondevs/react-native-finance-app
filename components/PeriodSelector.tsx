import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

// 1. Definir los períodos disponibles
const periods = [
	{ label: "Semana", value: "Semana" },
	{ label: "Mes", value: "Mes" },
	{ label: "Año", value: "Año" },
];

// Componente reutilizable para cada pestaña
interface TabButtonProps {
	label: string;
	value: string;
	isSelected: boolean;
	onPress: (value: string) => void;
}

const TabButton = ({ label, value, isSelected, onPress }: TabButtonProps) => {
	// Clases base y condicionales

	// Clase base para la etiqueta (reemplaza 'label' y 'grow')
	const baseClasses =
		"flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 text-sm  leading-normal";

	// Clases dinámicas basadas en el estado 'isSelected' (reemplaza has-[:checked])
	const activeClasses = isSelected
		? "bg-white text-[#111318] shadow-[0_0_4px_rgba(0,0,0,0.1)] "
		: "text-[#616f89] ";

	return (
		<Pressable
			onPress={() => onPress(value)}
			className={`${baseClasses} ${activeClasses}`}>
			<Text className='truncate'>{label}</Text>
		</Pressable>
	);
};

// Componente Principal
const PeriodSelector = () => {
	// Estado para rastrear el período seleccionado. 'Mes' es el valor por defecto (como checked="" en HTML)
	const [selectedPeriod, setSelectedPeriod] = useState("Mes");

	const handlePress = (value: string) => {
        // TODO: Descomentar para habilitar el cambio de período
		// setSelectedPeriod(value);
		// Aquí puedes añadir la lógica para filtrar los datos
		console.log(`Período seleccionado: ${value}`);
	};

	return (
		// Reemplaza <div class="py-5">
		<View className='flex h-10 flex-row items-center justify-center rounded-lg p-1 '>
			<View className='flex h-10 flex-row flex-1 items-center justify-center rounded-lg bg-border-light p-1'>
				{periods.map((period) => (
					<TabButton
						key={period.value}
						label={period.label}
						value={period.value}
						isSelected={selectedPeriod === period.value}
						onPress={handlePress}
					/>
				))}
			</View>
		</View>
	);
};

export default PeriodSelector;
