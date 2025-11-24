import { Image } from "expo-image";
import React from "react";
import { FlatList, Text, View } from "react-native";

const DataMovimientosRecientes: React.FC = () => {
	return (
		<View className='flex flex-1 flex-row gap-4 my-2 items-stretch '>
			<Image
				style={{ width: 40, height: 40, borderRadius: 25 }}
				source='assets/images/investment.png'
				placeholder='usuario logueado'
				contentFit='cover'
				transition={1000}
			/>
			<Text>componente</Text>
		</View>
	);
};
const MovimientosRecientes = () => {
	return (
		<FlatList
			data={[2, 3, 4]}
			renderItem={() => <DataMovimientosRecientes />}
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
