import { useState } from "react";
import { Alert } from "react-native";
import { postAppSettingsServices } from "@/api/services/settingsApp/post.app.settings.services";
import { useCapitalize } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InterfaceSettingsForm } from "@/interfaces";

export const useSettingsMutations = () => {
	const queryClient = useQueryClient();
	const { capitalizeWords } = useCapitalize();

	const [form, setForm] = useState<InterfaceSettingsForm>({
		categoria: "",
		categoriaIcon: "",
		fuenteIngreso: "",
		fuenteIngresoIcon: "",
		metodoPago: "",
		metodoPagoIcon: "",
	});

	const [showIconPicker, setShowIconPicker] = useState(false);
	const [activeIconField, setActiveIconField] = useState<
		keyof InterfaceSettingsForm | null
	>(null);

	const handleChange = (name: keyof InterfaceSettingsForm, text: string) => {
		setForm((prev) => ({
			...prev,
			[name]: name.endsWith("Icon")
				? text.toLowerCase()
				: capitalizeWords(text),
		}));
	};

	const openIconPicker = (field: keyof InterfaceSettingsForm) => {
		setActiveIconField(field);
		setShowIconPicker(true);
	};

	const closeIconPicker = () => {
		setShowIconPicker(false);
		setActiveIconField(null);
	};

	const mutation = useMutation({
		mutationFn: postAppSettingsServices,
		onSuccess: (_, variables) => {
			const { origen } = variables;

			// Invalida la query correspondiente
			const queryKeyMap: Record<string, string> = {
				categorias: "categorias",
				metodos_pago: "metodos-pago",
				origen_ingreso: "origen-ingreso",
			};

			const queryKey = queryKeyMap[origen];
			if (queryKey) {
				queryClient.invalidateQueries({ queryKey: [queryKey] });
			}

			// Limpia el campo correspondiente y su icono
			const fieldMap: Record<string, keyof InterfaceSettingsForm> = {
				categorias: "categoria",
				origen_ingreso: "fuenteIngreso",
				metodos_pago: "metodoPago",
			};

			const iconFieldMap: Record<string, keyof InterfaceSettingsForm> = {
				categorias: "categoriaIcon",
				origen_ingreso: "fuenteIngresoIcon",
				metodos_pago: "metodoPagoIcon",
			};

			const field = fieldMap[origen];
			const iconField = iconFieldMap[origen];

			setForm((prev) => ({
				...prev,
				[field]: "",
				[iconField]: "",
			}));

			Alert.alert("Éxito", "Creado correctamente");
		},
		onError: (error) => {
			console.error("Error creating setting:", error);
			Alert.alert("Error", "No se pudo crear el ajuste");
		},
	});

	const handleCreate = (
		origen: "categorias" | "origen" | "metodos_pago",
		data: string
	) => {
		if (!data.trim()) return;

		const iconFieldMap: Record<string, keyof InterfaceSettingsForm> = {
			categorias: "categoriaIcon",
			origen: "fuenteIngresoIcon",
			metodos_pago: "metodoPagoIcon",
		};

		const icon = form[iconFieldMap[origen]];
		const payload = icon ? { data, icon } : { data };

		mutation.mutate({ origen, ...payload });
	};

	return {
		form,
		showIconPicker,
		activeIconField,
		isPending: mutation.isPending,
		handleChange,
		openIconPicker,
		closeIconPicker,
		handleCreate,
	};
};
