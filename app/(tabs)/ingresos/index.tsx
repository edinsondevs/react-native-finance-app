import dayjs from "dayjs";
import "dayjs/locale/es";
import { router } from "expo-router";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery,  } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from "react-native";

import { getIngresosServices, IngresoInterfaces } from "@/api/services/ingreso/get.ingresos.services";
import { CircleButton, HeaderComponent } from "@/components";
import { FnIngresos } from "@/helpers/functions/ingresos";
import { useFormatoMoneda, useIngresosMutations } from "@/hooks";
import ModalEdicionIngreso from "./ModalEdicionIngreso";

dayjs.locale("es");

const Item = ({ id, monto = 0, fecha, origen, descripcion = "" }: Partial<IngresoInterfaces>) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [newMonto, setNewMonto] = useState(monto.toString());
	const [newDescripcion, setNewDescripcion] = useState(descripcion);

	// Usar el custom hook para las mutaciones
	const { updateMutation, deleteMutation } = useIngresosMutations({ id, onSuccessCallback: () => setModalVisible(false), });

	return (
		<>
			<Pressable onPress={() => setModalVisible(true)}>
				<View className='flex mx-4 my-2 p-4 border border-border-light rounded-2xl bg-white shadow-sm'>
					<View className='flex flex-row items-center gap-4'>
						{/* Icono de Ingreso */}
						<View className='size-12 rounded-full bg-green-100 items-center justify-center'>
							<FontAwesome
								name='arrow-up'
								size={20}
								color='#10b981'
							/>
						</View>

						{/* Información Central */}
						<View className='flex-1'>
							<Text className='font-Inter-Bold text-lg text-text-dark'>
								{origen}
							</Text>
							<Text className='font-Inter-Regular text-xs text-text-muted'>
								{fecha
									? dayjs(fecha).format("DD [de] MMMM, YYYY")
									: ""}
							</Text>
						</View>

						{/* Monto y Acción */}
						<View className='items-end gap-1'>
							<Text className='font-Inter-Bold text-xl text-green-600'>
								+ {useFormatoMoneda(monto)}
							</Text>
							<FontAwesome
								name='chevron-right'
								size={14}
								color='#d1d5db'
							/>
						</View>
					</View>

					{descripcion ? (
						<View className='mt-3 pt-3 border-t border-gray-50'>
							<Text className='font-Inter-Regular text-sm text-text-muted italic'>
								{descripcion}
							</Text>
						</View>
					) : null}
				</View>
			</Pressable>

			<ModalEdicionIngreso
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				newMonto={newMonto}
				setNewMonto={setNewMonto}
				newDescripcion={newDescripcion}
				setNewDescripcion={setNewDescripcion}
				mutation={updateMutation}
				deleteMutation={deleteMutation}
				handleUpdate={() => FnIngresos.handleUpdate( { id, updateMutation }, newMonto, newDescripcion ) }
				handleDelete={() => FnIngresos.handleDelete({ id, deleteMutation }) }
			/>
		</>
	);
};

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
