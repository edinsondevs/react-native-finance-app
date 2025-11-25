import { ItemMovimientosCards } from "@/app/components";
import { View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface MovimientosRecientesProps {
	item: {
		category: string;
		description: string;
		amount: number;
		iconName: keyof typeof MaterialIcons.glyphMap
	}
}
const MovimientosRecientes = ({item}: MovimientosRecientesProps) => {
	const {amount,category,description,iconName} = item
	return (
		<View>
			<ItemMovimientosCards
				category={category}
				description={description}
				amount={amount}
				iconName={iconName}
			/>
		</View>
	);
};

export default MovimientosRecientes;
