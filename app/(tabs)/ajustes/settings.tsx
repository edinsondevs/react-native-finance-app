import { getSettingsServices } from "@/api/services/settingsApp/get.settings.services";
import { updateSettingsServices } from "@/api/services/settingsApp/update.settings.services";
import {
	ButtomComponent,
	IconPickerModal,
	IconTrigger,
	InputComponent,
} from "@/components";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Modal,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const Settings = () => {
	const { origen } = useLocalSearchParams();
	const queryClient = useQueryClient();
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [iconPickerVisible, setIconPickerVisible] = useState(false);
	const [formData, setFormData] = useState({ name: "", icon: "" });

	const { data, isLoading, error } = useQuery({
		queryKey: ["settings", origen],
		queryFn: () =>
			getSettingsServices({
				origen: origen as "categorias" | "metodos_pago",
			}),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: updateSettingsServices,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["settings", origen] });
			setEditModalVisible(false);
		},
		onError: (error) => {
			console.error("Error updating settings:", error);
		},
	});

	const handleEdit = (item: any) => {
		setSelectedItem(item);
		setFormData({ name: item.name, icon: item.icon });
		setEditModalVisible(true);
	};

	const handleSave = () => {
		if (selectedItem) {
			mutate({
				origen: origen as "categorias" | "metodos_pago",
				id: selectedItem.id,
				name: formData.name,
				icon: formData.icon,
			});
		}
	};

	if (isLoading) {
		return (
			<View className='flex-1 justify-center items-center'>
				<ActivityIndicator
					size='large'
					color='#0000ff'
				/>
			</View>
		);
	}

	if (error) {
		return (
			<View className='flex-1 justify-center items-center'>
				<Text>Error cargando datos</Text>
			</View>
		);
	}

	return (
		<View className='flex-1 bg-white px-4 pt-4'>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						className='flex-row items-center p-4 border-b border-gray-200'
						onPress={() => handleEdit(item)}>
						<View className='w-10 items-center justify-center mr-4'>
							<FontAwesome
								name={item.icon}
								size={24}
								color='#333'
							/>
						</View>
						<Text className='text-lg font-Inter-Medium text-text-dark flex-1'>
							{item.name}
						</Text>
						<FontAwesome
							name='pencil'
							size={18}
							color='#999'
						/>
					</TouchableOpacity>
				)}
			/>

			{/* Modal de Edición */}
			<Modal
				visible={editModalVisible}
				animationType='slide'
				transparent={true}
				onRequestClose={() => setEditModalVisible(false)}>
				<View className='flex-1 justify-center items-center bg-black/50 px-4'>
					<View className='bg-white w-full rounded-2xl p-6 gap-6'>
						<Text className='text-xl font-Nunito-Bold text-center'>
							Editar{" "}
							{origen === "categorias"
								? "Categoría"
								: "Método de Pago"}
						</Text>

						<View className='gap-2'>
							<Text className='font-Inter-Bold text-text-gray'>
								Nombre
							</Text>
							<InputComponent
								value={formData.name}
								setValue={(text) =>
									setFormData({ ...formData, name: text })
								}
							/>
						</View>

						<View className='gap-2'>
							<Text className='font-Inter-Bold text-text-gray'>
								Icono
							</Text>
							<IconTrigger
								icon={formData.icon}
								onPress={() => setIconPickerVisible(true)}
							/>
						</View>

						<View className='gap-3'>
							<ButtomComponent
								onPressFunction={handleSave}
								text={isPending ? "Guardando..." : "Guardar"}
								color='bg-primary'
								disabled={isPending}
							/>
							<ButtomComponent
								onPressFunction={() =>
									setEditModalVisible(false)
								}
								text='Cancelar'
								color='transparent'
								textColor='text-text-black'
							/>
						</View>
					</View>
				</View>
			</Modal>

			<IconPickerModal
				visible={iconPickerVisible}
				onClose={() => setIconPickerVisible(false)}
				selectedIcon={formData.icon}
				onSelectIcon={(icon) => {
					setFormData({ ...formData, icon });
					setIconPickerVisible(false);
				}}
			/>
		</View>
	);
};

export default Settings;
