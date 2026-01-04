import { ButtomComponent, InputComponent, LinkComponent } from "@/components";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuthStore } from "../../store/useAuthStore";

const RegisterScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { signUp, loading } = useAuthStore();

	async function onRegister() {
		if (!name || !email || !password || !confirmPassword) {
			Alert.alert("Error", "Por favor completa todos los campos");
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert("Error", "Las contraseñas no coinciden");
			return;
		}

		await signUp(email, password, name);
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
		<View className='flex-1'>
			<KeyboardAwareScrollView
				className='flex-1'
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
				}}
				showsVerticalScrollIndicator={false}
				enableOnAndroid={true}>
				<View className='mb-4 max-w-xs  '>
					<Text className='text-4xl text-center font-Nunito-ExtraBold '>
						Crear Cuenta
					</Text>
				</View>
				<View className='gap-4 w-full px-6 mt-8'>
					<Text className='text-text-gray font-Inter-ExtraBold'>
						Nombre Completo
					</Text>
					<InputComponent
						value={name}
						setValue={setName}
						placeholder='Introduce tu nombre completo'
						autoCapitalize='words'
					/>
					<Text className='text-text-gray font-Inter-ExtraBold'>
						Correo Eléctronico
					</Text>
					<InputComponent
						value={email}
						setValue={setEmail}
						placeholder='Introduce tu correo electrónico'
						keyboardType='email-address'
					/>
					<Text className='text-text-gray font-Inter-ExtraBold'>
						Contraseña
					</Text>
					<InputComponent
						value={password}
						setValue={setPassword}
						placeholder='Introduce tu contraseña'
						secureTextEntry
					/>
					<Text className='text-text-gray font-Inter-ExtraBold'>
						Confirmar Contraseña
					</Text>
					<InputComponent
						value={confirmPassword}
						setValue={setConfirmPassword}
						placeholder='Confirma tu contraseña'
						secureTextEntry
					/>
					{confirmPassword && confirmPassword !== password && (
						<Text className='text-red-500 font-Inter-Medium text-center'>
							Las contraseñas deben coincidir
						</Text>
					)}
					{password && password.length < 5 && (
						<Text className='text-red-500 font-Inter-Medium text-center'>
							La contraseña debe tener al menos 5 caracteres
						</Text>
					)}

					<View className='mt-4 items-center'>
						<ButtomComponent
							disabled={
								loading ||
								!name ||
								confirmPassword !== password ||
								password.length < 5
							}
							color={
								loading ||
								!name ||
								confirmPassword !== password ||
								password.length < 5
									? "bg-button-disabled"
									: "bg-primary"
							}
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
			</KeyboardAwareScrollView>
		</View>
	);
};

export default RegisterScreen;
