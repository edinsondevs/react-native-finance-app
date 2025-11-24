import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import ButtomComponent from "../components/ButtomComponent";
import LinkComponent from "../components/LinkComponent";
import SeparatorComponent from "../components/SeparatorComponent";
import TextInputComponent from "../components/TextInputComponent";

const LoginScreen = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	function onPressFunction() {
		router.push("/(tabs)/gastos");
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
				/>
				<Text className='text-text-gray font-Inter-ExtraBold'>
					Contraseña
				</Text>
				<TextInputComponent
					text={password}
					onChangeText={setPassword}
					icon='lock'
					placeholder='Introduce tu contraseña'
				/>

				<LinkComponent
					text='¿Olvidaste tu contraseña?'
					onPress={() => {}}
				/>

				<View className='mt-4 items-center'>
					<ButtomComponent
						onPressFunction={onPressFunction}
						text='Iniciar Sesión'
					/>
				</View>
			</View>

			<SeparatorComponent />
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
			</View>
			<View className='mt-6 flex-row justify-center items-center gap-2'>
				<Text className='text-text-gray font-Inter-Medium'>
					¿No tienes una cuenta?
				</Text>
				<LinkComponent
					text='Regístrate'
					onPress={() => {}}
				/>
			</View>
		</View>
	);
};

export default LoginScreen;
