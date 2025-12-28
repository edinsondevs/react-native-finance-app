import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";

import { getIngresosServices, IngresoInterfaces } from "@/api/services/ingreso/get.ingresos.services";
import { CircleButton } from "@/components";
import { useFormatNumber } from "@/hooks";

const Item = ({
	monto,
	fecha,
	origen,
	descripcion,
}: Partial<IngresoInterfaces>) => {
	
	const height = descripcion ? "h-28" : "h-18";
	return (
		<View className={`flex p-4 border border-border-light ${height} gap-5`}>
			<View className='flex flex-row justify-between align-bottom'>
				<Text className='w-1/3 text-center'>
					{monto && useFormatNumber(monto)}
				</Text>
				<Text className='w-1/3 text-center'>
					{fecha ? dayjs(fecha).format("DD/MM/YYYY") : ""}
				</Text>
				<Text className='w-1/3 text-center'>{origen}</Text>
			</View>
			{descripcion && (
				<View className='flex flex-row justify-end '>
					<Text className='font-Inter-Regular text-right'>
						{descripcion}
					</Text>
				</View>
			)}
		</View>
	);
};

const HeaderList = () => (
	<View className='flex justify-evenly   border border-border-light h-12 gap-5'>
		<View className='flex flex-row justify-around items-center'>
			<Text className='font-Inter-Bold w-1/3 text-center'>Monto</Text>
			<Text className='font-Inter-Bold w-1/3 text-center'>Fecha</Text>
			<Text className='font-Inter-Bold w-1/3 text-center'>Origen</Text>
		</View>
	</View>
);

const IngresosScreen = () => {
	const { data, isLoading, error, refetch } = useQuery({
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
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						onRefresh={() => refetch()}
					/>
				}
				renderItem={({ item }: { item: IngresoInterfaces }) => (
					<Item
						monto={item.monto}
						fecha={item.fecha}
						origen={item.origen}
						descripcion={item.descripcion}
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
