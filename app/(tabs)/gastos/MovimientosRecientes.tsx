import { ItemMovimientosCards } from "@/components";
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
		<View>
			<ItemMovimientosCards
				category={categoria}
				description={descripcion}
				amount={monto}
				iconName={iconName}
			/>
		</View>
	);
};

export default MovimientosRecientes;
