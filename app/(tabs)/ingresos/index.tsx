import { deleteIngresoServices } from "@/api/services/ingreso/delete.ingreso.services";
import {
	getIngresosServices,
	IngresoInterfaces,
} from "@/api/services/ingreso/get.ingresos.services";
import { updateIngresoServices } from "@/api/services/ingreso/update.ingreso.services";
import { CircleButton, HeaderComponent } from "@/components";
import { useFormatoMoneda } from "@/hooks";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { router } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Pressable,
	RefreshControl,
	Text,
	View,
} from "react-native";
import ModalEdicionIngreso from "./ModalEdicionIngreso";

dayjs.locale("es");

const Item = ({
	id,
	monto = 0,
	fecha,
	origen,
	descripcion = "",
}: Partial<IngresoInterfaces>) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [newMonto, setNewMonto] = useState(monto.toString());
	const [newDescripcion, setNewDescripcion] = useState(descripcion);
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: (data: Partial<IngresoInterfaces>) =>
			updateIngresoServices(id!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ingresos"] });
			queryClient.invalidateQueries({ queryKey: ["resumeIngresos"] });
			setModalVisible(false);
			Alert.alert("Éxito", "El ingreso ha sido actualizado.");
		},
		onError: (error) => {
			Alert.alert("Error", "No se pudo actualizar el ingreso.");
			console.error(error);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: () => deleteIngresoServices(id!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ingresos"] });
			queryClient.invalidateQueries({ queryKey: ["resumeIngresos"] });
			setModalVisible(false);
			Alert.alert("Éxito", "El ingreso ha sido eliminado.");
		},
		onError: (error) => {
			Alert.alert("Error", "No se pudo eliminar el ingreso.");
			console.error(error);
		},
	});

	const handleUpdate = () => {
		if (!id) return;
		updateMutation.mutate({
			monto: parseFloat(newMonto),
			descripcion: newDescripcion,
		});
	};

	const handleDelete = () => {
		if (!id) return;

		Alert.alert(
			"Confirmar Eliminación",
			"¿Estás seguro de que deseas eliminar este ingreso? Esta acción no se puede deshacer.",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Eliminar",
					style: "destructive",
					onPress: () => deleteMutation.mutate(),
				},
			]
		);
	};

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
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
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
