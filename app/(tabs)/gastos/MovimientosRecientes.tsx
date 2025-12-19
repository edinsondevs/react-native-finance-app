import { ItemMovimientosCards } from "@/components";
import ThemedView from "@/presentation/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";

interface MovimientosRecientesProps {
	item: {
		categoria: string;
		descripcion: string;
		monto: number;
		iconName: keyof typeof MaterialIcons.glyphMap;
	};
}
const MovimientosRecientes = ({ item }: MovimientosRecientesProps) => {
	const { monto, categoria, descripcion, iconName } = item;
	return (
		<ThemedView margin>
			<ItemMovimientosCards
				category={categoria}
				description={descripcion}
				amount={monto}
				iconName={iconName}
			/>
		</ThemedView>
	);
};

export default MovimientosRecientes;
