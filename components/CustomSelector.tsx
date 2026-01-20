import { useEffect, useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

import { InterfaceCustomSelectorProps } from "@/interfaces";


/*
 * @component CustomSelector
 * Componente de selector personalizado reutilizable (generico).
 * Soporta iconos personalizados, estados de carga, error y selección tipada.
 * Se comporta como un Select/Dropdown que abre un Modal en dispositivos móviles.
 * @param {T[]} data - Array de opciones a mostrar.
 * @param {function} onSelect - Callback que se ejecuta al seleccionar una opción.
 * @param {string} placeholder - Texto a mostrar cuando no hay ninguna opción seleccionada.
 * @param {string} labelKey - Nombre de la propiedad del objeto a usar como etiqueta (display).
 * @param {string} valueKey - Nombre de la propiedad del objeto a usar como valor único (id).
 * @param {string} iconKey - Nombre de la propiedad del objeto que contiene el nombre del icono.
 * @param {boolean} isLoading - Indica si se están cargando los datos.
 * @param {string} error - Mensaje de error a mostrar.
 * @param {T} value - Valor actualmente seleccionado (controlado externamente).
 */
const CustomSelector = <T extends object>({
	data = [],
	onSelect,
	placeholder = "Seleccionar opción",
	labelKey = "label" as keyof T,
	valueKey = "id" as keyof T,
	iconKey,
	isLoading = false,
	error = null,
	value = null,
}: InterfaceCustomSelectorProps<T>): React.ReactElement => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<T | null>(null);

	// Sincronizar el estado interno con el valor externo (para resetear)
	useEffect(() => {
		setSelected(value);
	}, [value]);

	// Maneja la selección de un item: actualiza el estado local, notifica al padre y cierra el modal
	const handleSelect = (item: T): void => {
		setSelected(item);
		onSelect?.(item);
		setIsOpen(false);
	};

	const selectedLabel = String(selected?.[labelKey] || placeholder);

	// Renderiza cada opción dentro del Modal
	const renderItem = ({ item }: { item: T }): React.ReactElement => {
		const isSelected = selected?.[valueKey] === item[valueKey];
		const iconName = iconKey ? String(item[iconKey]) : null;

		return (
			<Pressable
				style={[
					styles.optionItem,
					// Estilo condicional si está seleccionado
					isSelected && styles.optionItemSelected,
				]}
				onPress={() => handleSelect(item)}>
				{/* Contenedor Izquierdo: Icono (si existe) + Texto */}
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					{iconName && (
						<FontAwesome
							name={iconName as any}
							size={20}
							// Cambia de color si está seleccionado
							color={isSelected ? "#0066cc" : "#666"}
							style={[
								styles.itemIcon,
								{ width: 24, textAlign: "center" },
							]}
						/>
					)}
					<Text
						style={[
							styles.optionText,
							isSelected && styles.optionTextSelected,
						]}>
						{String(item[labelKey])}
					</Text>
				</View>

				{/* Contenedor Derecho: Check de verificación (solo si seleccionado) */}
				{isSelected && (
					<MaterialIcons
						name='check'
						size={24}
						color='#0066cc'
						style={styles.checkIcon}
					/>
				)}
			</Pressable>
		);
	};

	return (
		<View style={styles.container}>
			{/* Botón selector */}
			<Pressable
				style={[styles.button, error && styles.buttonError]}
				onPress={() => setIsOpen(true)}
				disabled={isLoading}>
				{isLoading ? (
					<ActivityIndicator
						size='small'
						color='#0066cc'
					/>
				) : (
					<Text
						style={[
							styles.buttonText,
							!selected && styles.placeholderText,
						]}>
						{selectedLabel}
					</Text>
				)}
				<MaterialIcons
					name='expand-more'
					size={24}
					style={{ position: "absolute", right: 16, top: 18 }}
				/>
			</Pressable>

			{/* Mostrar error */}
			{error && <Text style={styles.errorText}>{error}</Text>}

			{/* Modal con lista */}
			<Modal
				visible={isOpen}
				transparent
				animationType='fade'
				onRequestClose={() => setIsOpen(false)}>
				<Pressable
					style={styles.overlay}
					onPress={() => setIsOpen(false)}>
					<View style={styles.modalContent}>
						<FlatList<T>
							data={data}
							keyExtractor={(item) => String(item[valueKey])}
							renderItem={renderItem}
							scrollEnabled={data.length > 6}
							nestedScrollEnabled
						/>
					</View>
				</Pressable>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create<{
	container: ViewStyle;
	button: ViewStyle;
	buttonError: ViewStyle;
	buttonText: TextStyle;
	placeholderText: TextStyle;
	errorText: TextStyle;
	overlay: ViewStyle;
	modalContent: ViewStyle;
	optionItem: ViewStyle;
	optionItemSelected: ViewStyle;
	optionText: TextStyle;
	optionTextSelected: TextStyle;
	itemIcon: TextStyle;
	checkIcon: TextStyle;
}>({
	container: {
		marginVertical: 8,
	},
	button: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 14,
		backgroundColor: "#fff",
		justifyContent: "center",
		minHeight: 44,
	},
	buttonError: {
		borderColor: "#cc0000",
		backgroundColor: "#fff5f5",
	},
	buttonText: {
		fontSize: 16,
		color: "#000",
		fontWeight: "500",
	},
	placeholderText: {
		color: "#999",
		fontWeight: "400",
	},
	errorText: {
		color: "#cc0000",
		fontSize: 12,
		marginTop: 4,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		maxHeight: "60%",
		paddingBottom: 20,
	},
	optionItem: {
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	optionItemSelected: {
		backgroundColor: "#f0f8ff",
	},
	optionText: {
		fontSize: 16,
		color: "#333",
	},
	optionTextSelected: {
		color: "#0066cc",
		fontWeight: "600",
	},
	itemIcon: {
		marginRight: 12,
	},
	checkIcon: {
		marginLeft: 8,
	},
});

export default CustomSelector;
