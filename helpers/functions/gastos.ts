import { InterfaceDeleteProps, InterfaceUpdateProps } from "@/interfaces";
import dayjs from "dayjs";
import { Alert } from "react-native";

const handleDelete = ({ id, deleteMutation }: InterfaceDeleteProps) => {
	if (!id) return;

	Alert.alert(
		"Confirmar Eliminación",
		"¿Estás seguro de que deseas eliminar este gasto? Esta acción no se puede deshacer.",
		[
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Eliminar",
				style: "destructive",
				onPress: () => deleteMutation.mutate(),
			},
		],
	);
};

const handleUpdate = (
	{ id, updateMutation, user_id }: InterfaceUpdateProps,
	newMonto: string,
	newDescripcion: string,
	newFecha?: Date,
	newCategoriaId?: string | number,
) => {
	if (!id) return;

	const updateData: any = {
		monto: parseFloat(newMonto),
		descripcion: newDescripcion,
		user_id,
	};

	if (newFecha) updateData.fecha = dayjs(newFecha).format("YYYY-MM-DD");
	if (newCategoriaId) updateData.categoria_id = Number(newCategoriaId);

	updateMutation.mutate(updateData);
};

export const FnGastos = {
	handleDelete,
	handleUpdate,
};
