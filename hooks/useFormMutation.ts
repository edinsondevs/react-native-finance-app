import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

interface UseFormMutationProps<TData> {
	mutationFn: (data: TData) => Promise<any>;
	queryKeys: string[][];
	successMessage: string;
	errorMessage?: string;
	onSuccessCallback?: () => void;
}

/**
 * Custom hook para manejar mutaciones de formularios con lógica común
 * - Invalida queries después del éxito
 * - Muestra alertas de éxito/error
 * - Navega hacia atrás después del éxito
 * - Ejecuta callbacks opcionales
 */
export const useFormMutation = <TData>({
	mutationFn,
	queryKeys,
	successMessage,
	errorMessage = "No se pudo guardar",
	onSuccessCallback,
}: UseFormMutationProps<TData>) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationFn,
		onSuccess: () => {
			// Invalidar todas las queries especificadas
			queryKeys.forEach((queryKey) => {
				queryClient.invalidateQueries({ queryKey });
			});

			// Mostrar alerta de éxito
			Alert.alert("Éxito", successMessage, [
				{ text: "OK", onPress: () => router.back() },
			]);

			// Ejecutar callback opcional
			onSuccessCallback?.();
		},
		onError: (error) => {
			console.error("Error en mutación:", error);
			Alert.alert("Error", errorMessage);
		},
	});

	return { mutate, isPending };
};
