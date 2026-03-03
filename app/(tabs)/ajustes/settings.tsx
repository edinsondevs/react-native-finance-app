import { FontAwesome } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Modal,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import {
	deleteSettingsServices,
	getSettingsServices,
	updateSettingsServices,
} from '@/api/services';
import {
	ButtomComponent,
	IconPickerModal,
	IconTrigger,
	InputComponent,
} from '@/components';

const Settings = () => {
	const { origen } = useLocalSearchParams();
	const queryClient = useQueryClient();
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [iconPickerVisible, setIconPickerVisible] = useState(false);
	const [formData, setFormData] = useState({ name: '', icon: '' });
	const [isDeleting, setIsDeleting] = useState(false);

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['settings', origen],
		queryFn: () =>
			getSettingsServices({
				origen: origen as 'categorias' | 'metodos_pago',
			}),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: updateSettingsServices,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['settings', origen] });
			refetch();
			setEditModalVisible(false);
		},
		onError: (error) => {
			console.error('Error updating settings:', error);
			Alert.alert('Error', 'No se pudo actualizar el elemento');
		},
	});

	const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
		mutationFn: deleteSettingsServices,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['settings', origen] });
			refetch();
			setEditModalVisible(false);
			setIsDeleting(false);
			Alert.alert('Éxito', 'Elemento eliminado correctamente');
		},
		onError: (error) => {
			console.error('Error deleting settings:', error);
			setIsDeleting(false);
			Alert.alert(
				'Error',
				'No se pudo eliminar el elemento. Asegúrate de que no esté siendo usado.',
			);
		},
	});

	const handleEdit = (item: any) => {
		setSelectedItem(item);
		setFormData({ name: item.name, icon: item.icon });
		setEditModalVisible(true);
	};

	const handleSave = () => {
		if (!formData.name.trim()) {
			Alert.alert('Error', 'El nombre no puede estar vacío');
			return;
		}
		if (selectedItem) {
			mutate({
				origen: origen as 'categorias' | 'metodos_pago',
				id: selectedItem.id,
				name: formData.name,
				icon: formData.icon,
			});
		}
	};

	const handleDelete = (item: any) => {
		Alert.alert(
			'Confirmar eliminación',
			`¿Estás seguro de que deseas eliminar "${item.name}"?`,
			[
				{
					text: 'Cancelar',
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: 'Eliminar',
					onPress: () => {
						setIsDeleting(true);
						deleteMutate({
							origen: origen as 'categorias' | 'metodos_pago',
							id: item.id,
						});
					},
					style: 'destructive',
				},
			],
		);
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
						<TouchableOpacity
							className='ml-3'
							onPress={(e) => {
								e.stopPropagation();
								setSelectedItem(item);
								setFormData({
									name: item.name,
									icon: item.icon,
								});
								setEditModalVisible(true);
							}}>
							<FontAwesome
								name='pencil'
								size={18}
								color='#999'
							/>
						</TouchableOpacity>
						<TouchableOpacity
							className='ml-3'
							onPress={(e) => {
								e.stopPropagation();
								handleDelete(item);
							}}>
							<FontAwesome
								name='trash'
								size={18}
								color='#e74c3c'
							/>
						</TouchableOpacity>
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
							Editar{' '}
							{origen === 'categorias'
								? 'Categoría'
								: 'Método de Pago'}
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

						{/* Botones reorganizados */}
						<View className='gap-3 mt-4'>
							{/* Fila 1: Botón Guardar */}
							<ButtomComponent
								onPressFunction={handleSave}
								text={isPending ? 'Guardando...' : 'Guardar'}
								color='bg-primary'
								disabled={isPending || isDeletePending}
							/>

							{/* Fila 2: Botones Eliminar y Cancelar */}
							<View className='flex-row gap-3'>
								<View className='flex-1'>
									<ButtomComponent
										onPressFunction={() =>
											handleDelete(selectedItem)
										}
										text={
											isDeleting
												? 'Eliminando...'
												: 'Eliminar'
										}
										color='bg-red-500'
										disabled={isPending || isDeleting}
									/>
								</View>
								<View className='flex-1'>
									<ButtomComponent
										onPressFunction={() => {
											setEditModalVisible(false);
											setIsDeleting(false);
										}}
										text='Cancelar'
										color='transparent'
										textColor='text-text-black'
										disabled={isPending || isDeleting}
									/>
								</View>
							</View>
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
