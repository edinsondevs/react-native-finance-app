import { useState } from "react";
import {
	FlatList,
	TextInput,
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesomeGlyphs from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/FontAwesome.json";

interface IconPickerProps {
	onSelectIcon: (iconName: string) => void;
	selectedIcon?: string;
}

const IconPicker = ({ onSelectIcon, selectedIcon }: IconPickerProps) => {
	const [search, setSearch] = useState("");
	const availableIcons = Object.keys(FontAwesomeGlyphs);

	const filteredIcons = availableIcons.filter((icon) =>
		icon.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<View style={styles.container}>
			<TextInput
				placeholder='Buscar icono...'
				value={search}
				onChangeText={setSearch}
				style={styles.searchInput}
			/>

			<FlatList
				data={filteredIcons}
				numColumns={4}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => onSelectIcon(item)}
						style={[
							styles.iconButton,
							selectedIcon === item && styles.iconButtonSelected,
						]}>
						<FontAwesome
							name={item as any}
							size={28}
							color='#333'
						/>
						<Text
							style={styles.iconName}
							numberOfLines={1}>
							{item}
						</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchInput: {
		padding: 12,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		marginBottom: 10,
		fontSize: 16,
	},
	iconButton: {
		flex: 1,
		padding: 12,
		margin: 4,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		backgroundColor: "#f5f5f5",
	},
	iconButtonSelected: {
		backgroundColor: "#e3f2fd",
		borderWidth: 2,
		borderColor: "#2196f3",
	},
	iconName: {
		fontSize: 9,
		marginTop: 4,
		textAlign: "center",
		color: "#666",
	},
});

export default IconPicker;
