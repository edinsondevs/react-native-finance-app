import { ButtomComponent, InputComponent, LinkComponent } from "@/components";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
						App de Finanzas Personales
					</Text>
				</View>
				<View className='gap-4 w-full px-6 mt-8'>
					<Text className='text-text-gray font-Inter-ExtraBold'>
						Correo Eléctronico
					</Text>
					<InputComponent
						value={email}
						setValue={setEmail}
						autoComplete='email'
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

					<LinkComponent
						text='¿Olvidaste tu contraseña?'
						onPress={() => {}}
					/>

					<View className='mt-4 items-center'>
						<ButtomComponent
							disabled={loading || !email || !password}
							color={loading || !email || !password ? "bg-button-disabled" : "bg-primary"}
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
			</KeyboardAwareScrollView>
		</View>
	);
};

export default LoginScreen;
