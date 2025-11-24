import { ItemMovimientosCards }from "@/app/components";
import { FlatList, Text, View } from "react-native";
import data from '../../../data/data.json'

const MovimientosRecientes = () => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<ItemMovimientosCards
					category={item.category}
					description={item.description}
					amount={item.amount}
					iconName={item.iconName}
				/>
			)}
			keyExtractor={(item, index) => index.toString()}
			ListHeaderComponent={() => (
				<View className='mx-8 my-4'>
					<Text className='text-2xl text-text-dark font-Inter-ExtraBold'>
						Movimientos Recientes
					</Text>
				</View>
			)}></FlatList>
	);
};

export default MovimientosRecientes;
