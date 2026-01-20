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
		]
	);
};

const handleUpdate = ({ id, updateMutation }: InterfaceUpdateProps, newMonto: string, newDescripcion: string) => {
    if (!id) return;
	updateMutation.mutate({
		monto: parseFloat(newMonto),
		descripcion: newDescripcion,
	});
};

export const FnIngresos = {
	handleDelete,
	handleUpdate,
};
