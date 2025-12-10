import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

import { CircleButton } from "@/components";

interface Props {
	id: string;
	monto: string;
	fecha: string;
	origen: string;
}
const DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		monto: "1000",
		fecha: "12/12/2025",
		origen: "Sueldo",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		monto: "1000",
		fecha: "12/12/2025",
		origen: "Reintegro",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		monto: "1000",
		fecha: "12/12/2025",
		origen: "Sueldo",
	},
];

const Item = ({ monto, fecha, origen }: Props) => (
	<View className='flex p-4 border border-border-light h-24 gap-5'>
		<View className='flex flex-row justify-between items-center'>
			<Text className='font-Inter-Bold'>Monto</Text>
			<Text className='font-Inter-Bold'>Fecha</Text>
			<Text className='font-Inter-Bold'>Origen</Text>
		</View>
		<View className='flex flex-row justify-between align-bottom'>
			<Text className=''>{monto}</Text>
			<Text className=''>{fecha}</Text>
			<Text className=''>{origen}</Text>
		</View>
	</View>
);

const IngresosScreen = () => {
	return (
		<View className='flex-1'>
			<FlatList
				data={DATA}
				renderItem={({ item }) => (
					<Item
						monto={item.monto}
						fecha={item.fecha}
						origen={item.origen}
						id={item.id}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
			<View className='bottom-0 right-0 m-6 absolute'>
				<CircleButton
					text='+'
					color='bg-secondary'
					onPressFunction={() =>
						router.push("/(tabs)/ingresos/AgregarIngresos")
					}
				/>
			</View>
		</View>
	);
};

export default IngresosScreen;
