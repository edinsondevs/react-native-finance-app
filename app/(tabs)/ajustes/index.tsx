import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { postAppSettingsServices } from "@/api/services/settingsApp/post.app.settings.services";
import { ButtomComponent, DividerComponent, IconPicker, InputComponent, TitleOpcionInput } from "@/components";

import ThemedView from "@/presentation/ThemedView";
import { useCapitalize } from "@/hooks";

const AjustesScreen = () => {
	const queryClient = useQueryClient();

	const [form, setForm] = useState({
		categoria: "",
		categoriaIcon: "",
		fuenteIngreso: "",
		fuenteIngresoIcon: "",
		metodoPago: "",
		metodoPagoIcon: "",
	});

	const { capitalizeWords } = useCapitalize();

	const [showIconPicker, setShowIconPicker] = useState(false);
	const [activeIconField, setActiveIconField] = useState<
		keyof typeof form | null
	>(null);

	const handleChange = (name: keyof typeof form, text: string) => {
		setForm((prev: typeof form) => ({
			...prev,
			[name]: name.endsWith("Icon")
				? text.toLowerCase()
				: capitalizeWords(text),
		}));
	};

	const openIconPicker = (field: keyof typeof form) => {
		setActiveIconField(field);
		setShowIconPicker(true);
	};

	const { mutate, isPending } = useMutation({
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
			const fieldMap: Record<string, keyof typeof form> = {
				categorias: "categoria",
				origen_ingreso: "fuenteIngreso",
				metodos_pago: "metodoPago",
			};

			const iconFieldMap: Record<string, keyof typeof form> = {
				categorias: "categoriaIcon",
				origen_ingreso: "fuenteIngresoIcon",
				metodos_pago: "metodoPagoIcon",
			};

			const field = fieldMap[origen];
			const iconField = iconFieldMap[origen];

			setForm((prev: typeof form) => ({
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

		const iconFieldMap: Record<string, keyof typeof form> = {
			categorias: "categoriaIcon",
			origen_ingreso: "fuenteIngresoIcon",
			metodos_pago: "metodoPagoIcon",
		};

		const icon = form[iconFieldMap[origen]];

		// Incluye el icono si se ha seleccionado uno
		const payload = icon ? { data, icon } : { data };

		mutate({ origen, ...payload });
	};

	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps='handled'
			contentContainerStyle={{ paddingTop: 16 }}
			showsVerticalScrollIndicator={false}
			extraScrollHeight={170}
			enableOnAndroid={true}>
			<ThemedView
				margin
				className='gap-4 mt-6'>
				<View className='gap-4'>
					<TitleOpcionInput title='Agregar Categoria' />

					<InputComponent
						value={form.categoria}
						setValue={(text) => handleChange("categoria", text)}
						placeholder='Agrega nueva categoria'
						editable
						autoCapitalize='words'
					/>

					{/* Selector de icono */}
					<IconTrigger
						icon={form.categoriaIcon}
						onPress={() => openIconPicker("categoriaIcon")}
					/>

					<ButtomComponent
						onPressFunction={() =>
							handleCreate("categorias", form.categoria)
						}
						text={
							isPending ? "Creando..." : "Crear Nueva Categoría"
						}
						color='bg-primary'
						disabled={isPending}
					/>
				</View>

				<DividerComponent />

				<View className='gap-4'>
					<TitleOpcionInput title='Agregar Metodo de Pago' />
					<InputComponent
						value={form.metodoPago}
						autoCapitalize='words'
						setValue={(text) => handleChange("metodoPago", text)}
						placeholder='Agrega nuevo metodo de pago'
						editable
					/>
					<IconTrigger
						icon={form.metodoPagoIcon}
						onPress={() => openIconPicker("metodoPagoIcon")}
					/>
					<ButtomComponent
						onPressFunction={() =>
							handleCreate("metodos_pago", form.metodoPago)
						}
						text={isPending ? "Creando..." : "Crear Metodo de Pago"}
						color='bg-primary'
						disabled={isPending}
					/>
				</View>
			</ThemedView>

			{/* Modal para el IconPicker */}
			<Modal
				visible={showIconPicker}
				animationType='slide'
				onRequestClose={() => setShowIconPicker(false)}>
				<View className='flex-1 bg-white pt-12 px-4'>
					<View className='flex-row justify-between items-center mb-4'>
						<Text className='text-xl font-bold'>
							Seleccionar Icono
						</Text>
						<TouchableOpacity
							onPress={() => setShowIconPicker(false)}>
							<FontAwesome
								name='times'
								size={24}
								color='#333'
							/>
						</TouchableOpacity>
					</View>

					<IconPicker
						selectedIcon={
							activeIconField ? form[activeIconField] : ""
						}
						onSelectIcon={(icon) => {
							if (activeIconField) {
								handleChange(activeIconField, icon);
							}
							setShowIconPicker(false);
							setActiveIconField(null);
						}}
					/>
				</View>
			</Modal>
		</KeyboardAwareScrollView>
	);
};

export default AjustesScreen;

const IconTrigger = ({
	icon,
	onPress,
}: {
	icon: string;
	onPress: () => void;
}) => (
	<TouchableOpacity
		onPress={onPress}
		className='p-4 border border-gray-300 rounded-lg flex-row items-center gap-3 bg-white'>
		{icon ? (
			<>
				<FontAwesome
					name={icon as any}
					size={24}
					color='#333'
				/>
				<Text className='text-base flex-1'>{icon}</Text>
				<Text className='text-gray-500'>Cambiar</Text>
			</>
		) : (
			<>
				<FontAwesome
					name='question-circle'
					size={24}
					color='#999'
				/>
				<Text className='text-gray-500 flex-1'>Seleccionar icono</Text>
			</>
		)}
	</TouchableOpacity>
);
