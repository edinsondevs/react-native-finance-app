import { deleteGastoServices } from "@/api/services/gastos/delete.gasto.services";
import { updateGastoServices } from "@/api/services/gastos/update.gasto.services";
import { ItemMovimientosCards } from "@/components";
import ThemedView from "@/presentation/ThemedView";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Pressable, View } from "react-native";
import ModalEdicionMovimiento from "./ModalEdicionMovimiento";

/**
 * Propiedades para el componente MovimientosRecientes.
 * Contiene la información de un movimiento individual para ser visualizado.
 */
interface MovimientosRecientesProps {
	item: {
		id?: number;
		categoria?: string;
		descripcion: string;
		monto: number;
		icon: any;
		iconName?: string;
	};
}
/**
 * Componente que muestra una lista de movimientos recientes.
 * Actúa como un contenedor temático para el componente ItemMovimientosCards,
 * asegurando que la presentación se adhiera al tema de la aplicación.
 *
 * @param {MovimientosRecientesProps} props - Propiedades que incluyen los datos del movimiento
 * @returns {JSX.Element} Vista del movimiento reciente envolviendo la tarjeta de detalles
 */
const MovimientosRecientes = ({ item }: MovimientosRecientesProps) => {
	const { id, monto, descripcion, icon } = item;
	const [modalVisible, setModalVisible] = useState(false);
	const [newMonto, setNewMonto] = useState(monto.toString());
	const [newDescripcion, setNewDescripcion] = useState(descripcion);

	const queryClient = useQueryClient();
	const { user } = useAuthStore();

	const mutation = useMutation({
		mutationFn: (data: {
			monto: number;
			descripcion: string;
			user_id?: string;
		}) => updateGastoServices(id!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["gastos", "all"] });
			queryClient.invalidateQueries({ queryKey: ["resumeGastos"] });
			setModalVisible(false);
			Alert.alert("Éxito", "El movimiento ha sido actualizado.");
		},
		onError: (error) => {
			Alert.alert("Error", "No se pudo actualizar el movimiento.");
			console.error(error);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: () => deleteGastoServices(id!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["gastos", "all"] });
			queryClient.invalidateQueries({ queryKey: ["resumeGastos"] });
			setModalVisible(false);
			Alert.alert("Éxito", "El movimiento ha sido eliminado.");
		},
		onError: (error) => {
			Alert.alert("Error", "No se pudo eliminar el movimiento.");
			console.error(error);
		},
	});

	const handleUpdate = () => {
		if (!id) return;
		mutation.mutate({
			monto: parseFloat(newMonto),
			descripcion: newDescripcion,
			user_id: user?.id,
		});
	};

	const handleDelete = () => {
		if (!id) return;

		Alert.alert(
			"Confirmar Eliminación",
			"¿Estás seguro de que deseas eliminar este movimiento? Esta acción no se puede deshacer.",
			[
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "Eliminar",
					style: "destructive",
					onPress: () => deleteMutation.mutate(),
				},
			]
		);
	};

	return (
		<View className='h-18'>
			<Pressable onPress={() => setModalVisible(true)}>
				<ThemedView margin>
					<ItemMovimientosCards
						description={descripcion}
						amount={monto}
						icon={icon}
					/>
				</ThemedView>
			</Pressable>

			<ModalEdicionMovimiento
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				newMonto={newMonto}
				setNewMonto={setNewMonto}
				newDescripcion={newDescripcion}
				setNewDescripcion={setNewDescripcion}
				mutation={mutation}
				deleteMutation={deleteMutation}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
			/>
		</View>
	);
};

export default MovimientosRecientes;
