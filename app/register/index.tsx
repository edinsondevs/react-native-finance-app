import {
	ButtomComponent,
	LinkComponent,
	TextInputComponent,
} from "@/components";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { signUp, loading } = useAuthStore();

	async function onRegister() {
		if (!email || !password || !confirmPassword) {
			Alert.alert("Error", "Por favor completa todos los campos");
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert("Error", "Las contraseñas no coinciden");
			return;
		}

		await signUp(email, password);
		const { error, user } = useAuthStore.getState();

		if (error) {
			Alert.alert("Error al registrarse", error);
		} else if (user) {
			Alert.alert("Éxito", "Usuario creado correctamente", [
				{ text: "OK", onPress: () => router.replace("/(tabs)/gastos") },
			]);
		}
	}

	return (
		<View className='flex-1 justify-center items-center '>
			<View className='mb-4 max-w-xs  '>
				<Text className='text-4xl text-center font-Nunito-ExtraBold '>
					Crear Cuenta
				</Text>
			</View>
			<View className='gap-4 mt-8'>
				<Text className='text-text-gray font-Inter-ExtraBold'>
					Correo Eléctronico
				</Text>
				<TextInputComponent
					text={email}
					onChangeText={setEmail}
					icon='alternate-email'
					placeholder='Introduce tu correo electrónico'
					keyboardType='email-address'
				/>
				<Text className='text-text-gray font-Inter-ExtraBold'>
					Contraseña
				</Text>
				<TextInputComponent
					text={password}
					onChangeText={setPassword}
					icon='lock'
					placeholder='Introduce tu contraseña'
					secureTextEntry
				/>
				<Text className='text-text-gray font-Inter-ExtraBold'>
					Confirmar Contraseña
				</Text>
				<TextInputComponent
					text={confirmPassword}
					onChangeText={setConfirmPassword}
					icon='lock'
					placeholder='Confirma tu contraseña'
					secureTextEntry
				/>

				<View className='mt-4 items-center'>
					<ButtomComponent
						onPressFunction={onRegister}
						text={loading ? "Registrando..." : "Registrarse"}
					/>
				</View>
			</View>

			<View className='mt-6 flex-row justify-center items-center gap-2'>
				<Text className='text-text-gray font-Inter-Medium'>
					¿Ya tienes una cuenta?
				</Text>
				<LinkComponent
					text='Inicia Sesión'
					onPress={() => router.back()}
				/>
			</View>
		</View>
	);
};

export default RegisterScreen;
