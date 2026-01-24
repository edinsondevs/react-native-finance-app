import { deleteGastoServices } from "@/api/services/gastos/delete.gasto.services";
import { updateGastoServices } from "@/api/services/gastos/update.gasto.services";
import { InterfaceUseMutationsProps } from "@/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useGastosMutations = ({
	id,
	onSuccessCallback,
}: InterfaceUseMutationsProps) => {
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: (data: {
			monto: number;
			descripcion: string;
			user_id?: string;
		}) => updateGastoServices(id!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["gastos", "all"] });
			queryClient.invalidateQueries({ queryKey: ["resumeGastos"] });
			queryClient.invalidateQueries({ queryKey: ["resumeIngresos"] });
			onSuccessCallback?.();
			Alert.alert("Éxito", "El gasto ha sido actualizado.");
		},
		onError: (error) => {
			onSuccessCallback?.();
			Alert.alert("Error", `${error}`);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: () => deleteGastoServices(id!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["gastos", "all"] });
			queryClient.invalidateQueries({ queryKey: ["resumeGastos"] });
			queryClient.invalidateQueries({ queryKey: ["resumeIngresos"] });
			onSuccessCallback?.();
			Alert.alert("Éxito", "El gasto ha sido eliminado.");
		},
		onError: (error) => {
			onSuccessCallback?.();
			Alert.alert("Error", `${error}`);
		},
	});

	return {
		updateMutation,
		deleteMutation,
	};
};
