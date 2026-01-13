import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { router } from "expo-router";
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from "react-native";

import {
	getIngresosServices,
	IngresoInterfaces,
} from "@/api/services/ingreso/get.ingresos.services";
import { CircleButton, HeaderComponent } from "@/components";
import { useFormatoMoneda } from "@/hooks";

const Item = ({
	monto,
	fecha,
	origen,
	descripcion,
}: Partial<IngresoInterfaces>) => {
	return (
		<View className='flex p-4 border border-border-light min-h-[72px] gap-3'>
			<View className='flex flex-row justify-between items-center'>
				<Text className='w-1/3 text-center'>
					{monto && useFormatoMoneda(monto)}
				</Text>
				<Text className='w-1/3 text-center'>
					{fecha ? dayjs(fecha).format("DD/MM/YYYY") : ""}
				</Text>
				<Text className='w-1/3 text-center'>{origen}</Text>
			</View>
			{descripcion && (
				<View className='flex flex-row justify-end'>
					<Text className='font-Inter-Regular text-right flex-1 text-text-muted text-sm'>
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
			<HeaderComponent title='Ingresos' />
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
