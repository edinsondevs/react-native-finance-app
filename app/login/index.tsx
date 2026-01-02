import {
	ButtomComponent,
	LinkComponent,
	TextInputComponent,
} from "@/components";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signIn, loading } = useAuthStore();

	async function onPressFunction() {
		if (!email || !password) {
			Alert.alert("Error", "Por favor ingresa correo y contraseña");
			return;
		}

		await signIn(email, password);
		const { error, user } = useAuthStore.getState();

		if (error) {
			Alert.alert("Error al iniciar sesión", error);
		} else if (user) {
			router.replace("/(tabs)/gastos");
		}
	}

	return (
		<View className='flex-1 justify-center items-center '>
			<View className='mb-4 max-w-xs  '>
				<Text className='text-4xl text-center font-Nunito-ExtraBold '>
					App de Finanzas Personales
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

				<LinkComponent
					text='¿Olvidaste tu contraseña?'
					onPress={() => {}}
				/>

				<View className='mt-4 items-center'>
					<ButtomComponent
						onPressFunction={onPressFunction}
						text={loading ? "Cargando..." : "Iniciar Sesión"}
					/>
				</View>
			</View>

			{/* <SeparatorComponent />
			<View className='mt-4 items-center gap-2'>
				<ButtomComponent
					onPressFunction={onPressFunction}
					text='Continuar con Google'
					color='transparent'
					textColor='text-text-black'
					width='w-96'
				/>
				<ButtomComponent
					onPressFunction={onPressFunction}
					text='Continuar con GitHub'
					color='transparent'
					textColor='text-text-black'
					width='w-96'
				/>
			</View> */}
			<View className='mt-6 flex-row justify-center items-center gap-2'>
				<Text className='text-text-gray font-Inter-Medium'>
					¿No tienes una cuenta?
				</Text>
				<LinkComponent
					text='Regístrate'
					onPress={() => router.push("/register")}
				/>
			</View>
		</View>
	);
};

export default LoginScreen;
