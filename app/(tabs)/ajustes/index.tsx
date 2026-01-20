import { router, usePathname } from "expo-router";
import { Alert, Text, View } from "react-native";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";

import { useCapitalize, useSettingsMutations } from "@/hooks";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ButtomComponent, DividerComponent, HeaderComponent, IconPickerModal, IconTrigger, InputComponent, TitleOpcionInput } from "@/components";
import { useAuthStore } from "@/store/useAuthStore";

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
	const { capitalizeWords } = useCapitalize();
	const pathName = usePathname();
	const title = capitalizeWords(pathName.split("/").pop() || "");

	const {
		form,
		showIconPicker,
		activeIconField,
		isPending,
		handleChange,
		openIconPicker,
		closeIconPicker,
		handleCreate,
	} = useSettingsMutations();

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
				onClose={closeIconPicker}
				selectedIcon={activeIconField ? form[activeIconField] : ""}
				onSelectIcon={(icon) => {
					if (activeIconField) {
						handleChange(activeIconField, icon);
					}
					closeIconPicker();
				}}
			/>
		</KeyboardAwareScrollView>
	);
};

export default AjustesScreen;
