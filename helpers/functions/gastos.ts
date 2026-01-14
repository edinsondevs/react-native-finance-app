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
		mutate: (data: {
			monto: number;
			descripcion: string;
			user_id?: string;
		}) => void;
	};
	user_id?: string;
}

const handleDelete = ({ id, deleteMutation }: DeleteProps) => {
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
	{ id, updateMutation, user_id }: UpdateProps,
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
