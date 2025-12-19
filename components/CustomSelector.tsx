import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";

interface CustomSelectorProps<T> {
	data?: T[];
	onSelect?: (item: T) => void;
	placeholder?: string;
	labelKey?: keyof T;
	valueKey?: keyof T;
	isLoading?: boolean;
	error?: string | null;
	value?: T | null;
}

const CustomSelector = <T extends object>({
	data = [],
	onSelect,
	placeholder = "Seleccionar opción",
	labelKey = "label" as keyof T,
	valueKey = "id" as keyof T,
	isLoading = false,
	error = null,
	value = null,
}: CustomSelectorProps<T>): React.ReactElement => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<T | null>(null);

	// Sincronizar el estado interno con el valor externo (para resetear)
	useEffect(() => {
		setSelected(value);
	}, [value]);

	const handleSelect = (item: T): void => {
		setSelected(item);
		onSelect?.(item);
		setIsOpen(false);
	};

	const selectedLabel = String(selected?.[labelKey] || placeholder);

	const renderItem = ({ item }: { item: T }): React.ReactElement => (
		<Pressable
			style={styles.optionItem}
			onPress={() => handleSelect(item)}>
			<Text style={styles.optionText}>{String(item[labelKey])}</Text>
		</Pressable>
	);

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
	optionText: TextStyle;
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
	},
	optionText: {
		fontSize: 16,
		color: "#333",
	},
});

export default CustomSelector;
