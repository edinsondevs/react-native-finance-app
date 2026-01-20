import { deleteIngresoServices } from "@/api/services/ingreso/delete.ingreso.services";
import { IngresoInterfaces } from "@/api/services/ingreso/get.ingresos.services";
import { updateIngresoServices } from "@/api/services/ingreso/update.ingreso.services";
import { InterfaceUseMutationsProps } from "@/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useIngresosMutations = ({
	id,
	onSuccessCallback,
}: InterfaceUseMutationsProps) => {
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: (data: Partial<IngresoInterfaces>) =>
			updateIngresoServices(id!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ingresos"] });
			queryClient.invalidateQueries({ queryKey: ["resumeIngresos"] });
			onSuccessCallback?.();
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
			onSuccessCallback?.();
			Alert.alert("Éxito", "El ingreso ha sido eliminado.");
		},
		onError: (error) => {
			Alert.alert("Error", "No se pudo eliminar el ingreso.");
			console.error(error);
		},
	});

	return {
		updateMutation,
		deleteMutation,
	};
};
