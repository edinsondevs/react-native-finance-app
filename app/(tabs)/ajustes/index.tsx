import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuthStore } from "@/store/useAuthStore";

import { postAppSettingsServices } from "@/api/services/settingsApp/post.app.settings.services";
import { ButtomComponent, DividerComponent, HeaderComponent, IconPickerModal, IconTrigger, InputComponent, TitleOpcionInput } from "@/components";
import { useCapitalize } from "@/hooks";

import ThemedView from "@/presentation/ThemedView";



const TitleEditScreen = ({ title, origen }: { title: string; origen: string }) => {

	return (
		<View className='flex-row justify-between items-center'>
			<TitleOpcionInput title={title} />
			<FontAwesome
				name='edit'
				size={24}
				color='#333'
				onPress={() =>
					router.push({
						pathname: "/ajustes/settings",
						params: { origen },
					})
				}
			/>
		</View>
	);
};

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

	const pathName = usePathname();
	const title = capitalizeWords(pathName.split("/").pop() || "");

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

	const { signOut } = useAuthStore();

	const handleLogout = async () => {
		Alert.alert(
			"Cerrar Sesión",
			"¿Estás seguro de que quieres cerrar sesión?",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Salir",
					style: "destructive",
					onPress: async () => {
						await signOut();
						router.replace("/login");
					},
				},
			]
		);
	};

	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps='handled'
			contentContainerStyle={{ paddingTop: 0 }}
			showsVerticalScrollIndicator={true}
			extraScrollHeight={170}
			enableOnAndroid={true}>
			<HeaderComponent title={title} />
			<ThemedView
				margin
				className='gap-4 mt-6'>
				<View className='gap-4'>
					<TitleEditScreen
						title='Agregar Categoria'
						origen='categorias'
					/>
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
					<TitleEditScreen
						title='Agregar Metodo de Pago'
						origen='metodos_pago'
					/>
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

				<DividerComponent />

				<View className='mt-6'>
					<ButtomComponent
						onPressFunction={handleLogout}
						text='Cerrar Sesión'
						color='bg-google-red'
					/>
				</View>

				<View className='mt-10 mb-6 items-center'>
					<Text className='text-text-muted text-xs font-Inter-Regular'>
						Versión {Constants.expoConfig?.version || "1.0.0"}
					</Text>
				</View>
			</ThemedView>

			{/* Modal para el IconPicker */}
			<IconPickerModal
				visible={showIconPicker}
				onClose={() => setShowIconPicker(false)}
				selectedIcon={activeIconField ? form[activeIconField] : ""}
				onSelectIcon={(icon) => {
					if (activeIconField) {
						handleChange(activeIconField, icon);
					}
					setShowIconPicker(false);
					setActiveIconField(null);
				}}
			/>
		</KeyboardAwareScrollView>
	);
};

export default AjustesScreen;
