import dayjs from "dayjs";
import "dayjs/locale/es";
import { router } from "expo-router";
import { useQuery,  } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";

import { getIngresosServices } from "@/api/services/ingreso/get.ingresos.services";
import { CircleButton, HeaderComponent } from "@/components";
import { IngresoInterfaces } from "@/api/services/interfaces"
import { ItemIngreso } from "./ItemIngreso";

dayjs.locale("es");


// Eliminamos HeaderList ya que no es necesario en el nuevo diseño de tarjetas.

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
		<View className='flex-1 bg-gray-50'>
			<HeaderComponent title='Ingresos' />
			<FlatList
				data={data}
				contentContainerStyle={{ paddingVertical: 8 }}
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						onRefresh={() => refetch()}
					/>
				}
				renderItem={({ item }: { item: IngresoInterfaces }) => (
					<ItemIngreso
						monto={item.monto}
						fecha={item.fecha}
						origen={item.origen}
						descripcion={item.descripcion}
						id={item.id}
						user_id={item.user_id}
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
