import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { getIngresosServices, IngresoInterfaces } from "@/api/services/ingreso/get.ingresos.services";
import { CircleButton } from "@/components";

const Item = ({ monto, fecha, origen }: Partial<IngresoInterfaces>) => (
	<View className='flex p-4 border border-border-light h-24 gap-5'>
		<View className='flex flex-row justify-between align-bottom'>
			<Text className=''>{monto?.toString()}</Text>
			<Text className=''>
				{fecha ? new Date(fecha).toLocaleDateString() : ""}
			</Text>
			<Text className=''>{origen}</Text>
		</View>
	</View>
);

const HeaderList = () => (
	<View className='flex justify-evenly   border border-border-light h-12 gap-5'>
		<View className='flex flex-row justify-around items-center'>
			<Text className='font-Inter-Bold'>Monto</Text>
			<Text className='font-Inter-Bold'>Fecha</Text>
			<Text className='font-Inter-Bold'>Origen</Text>
		</View>
	</View>
);

const IngresosScreen = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["ingresos"],
		queryFn: getIngresosServices,
	});

	if (isLoading) {
		return (
			<View className='flex-1 justify-center items-center'>
				<ActivityIndicator
					size='large'
					color='#0000ff'
				/>
			</View>
		);
	}

	if (error) {
		return (
			<View className='flex-1 justify-center items-center'>
				<Text>Error cargando ingresos</Text>
			</View>
		);
	}

	return (
		<View className='flex-1'>
			<HeaderList />
			<FlatList
				data={data}
				renderItem={({ item }: { item: IngresoInterfaces }) => (
					<Item
						monto={item.monto}
						fecha={item.fecha}
						origen={item.origen}
						id={item.id}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={
					<Text className='text-center mt-5'>
						No hay ingresos registrados
					</Text>
				}
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
