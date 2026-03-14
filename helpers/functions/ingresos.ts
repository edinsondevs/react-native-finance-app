import { InterfaceDeleteProps, InterfaceUpdateProps } from "@/interfaces";
import { Alert } from "react-native";

const handleDelete = ({ id, deleteMutation }: InterfaceDeleteProps) => {
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
		],
	);
};

import dayjs from "dayjs";

const handleUpdate = (
	{ id, updateMutation }: InterfaceUpdateProps,
	newMonto: string,
	newDescripcion: string,
	newOrigen?: string,
	newFecha?: Date,
) => {
	if (!id) return;

	const updateData: any = {
		monto: parseFloat(newMonto),
		descripcion: newDescripcion,
	};

	if (newOrigen) updateData.origen = newOrigen;
	if (newFecha) updateData.fecha = dayjs(newFecha).format("YYYY-MM-DD");

	updateMutation.mutate(updateData);
};

export const FnIngresos = {
	handleDelete,
	handleUpdate,
};
