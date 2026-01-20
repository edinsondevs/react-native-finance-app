import { InterfaceDeleteProps, InterfaceUpdateProps } from "@/interfaces";
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
		]
	);
};

const handleUpdate = (
	{ id, updateMutation, user_id }: InterfaceUpdateProps,
	newMonto: string,
	newDescripcion: string
) => {
	if (!id) return;
	updateMutation.mutate({
		monto: parseFloat(newMonto),
		descripcion: newDescripcion,
		user_id,
	});
};

export const FnGastos = {
	handleDelete,
	handleUpdate,
};
