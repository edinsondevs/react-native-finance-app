import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { router } from 'expo-router';
import { useMemo } from 'react';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from 'react-native';

import { getIngresosServices } from '@/api/services/ingreso/get.ingresos.services';
import { CircleButton, HeaderComponent, ItemIngreso } from '@/components';

dayjs.locale('es');

// Eliminamos HeaderList ya que no es necesario en el nuevo diseño de tarjetas.

const IngresosScreen = () => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['ingresos'],
		queryFn: getIngresosServices,
	});

	// Procesar datos para agregar separadores de mes
	const ingresosConSeparadores = useMemo(() => {
		if (!data || data.length === 0) return [];

		// Agrupar por mes
		const sorted = [...data].sort((a, b) => {
			return dayjs(b.fecha).unix() - dayjs(a.fecha).unix();
		});

		const resultado: any[] = [];
		let mesAnterior: string | null = null;

		sorted.forEach((ingreso) => {
			const mesActual = dayjs(ingreso.fecha).format('MMMM YYYY');

			// Agregar separador si cambió el mes
			if (mesAnterior !== mesActual && mesAnterior !== null) {
				resultado.push({
					type: 'separator',
					mes: mesActual,
					id: `separator-${mesActual}`,
				});
			}

			// Agregar el ingreso
			resultado.push({
				type: 'ingreso',
				...ingreso,
			});

			mesAnterior = mesActual;
		});

		return resultado;
	}, [data]);

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
				data={ingresosConSeparadores}
				contentContainerStyle={{ paddingVertical: 8 }}
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						onRefresh={() => refetch()}
					/>
				}
				renderItem={({ item }: { item: any }) => {
					if (item.type === 'separator') {
						return <View className='bg-blue-500 h-1 my-3 mx-4' />;
					}

					return (
						<ItemIngreso
							monto={item.monto}
							fecha={item.fecha}
							origen={item.origen}
							descripcion={item.descripcion}
							id={item.id}
							user_id={item.user_id}
						/>
					);
				}}
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
						router.push('/(tabs)/ingresos/AgregarIngresos')
					}
				/>
			</View>
		</View>
	);
};

export default IngresosScreen;
