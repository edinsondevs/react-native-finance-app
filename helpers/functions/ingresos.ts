import { Alert } from "react-native";

interface DeleteProps {
	id: number | undefined;
	deleteMutation: {
		mutate: () => void;
	};
}

interface UpdateProps {
	id: number | undefined;
	updateMutation: {
		mutate: (data: { monto: number; descripcion: string }) => void;
	};
}

const handleDelete = ({ id, deleteMutation }: DeleteProps) => {
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

const handleUpdate = ({ id, updateMutation }: UpdateProps, newMonto: string, newDescripcion: string) => {
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
