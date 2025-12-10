import { useAuthStore } from "@/store/useAuthStore";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const RegisterScreen = () => {
	const { signUp, loading, error, user } = useAuthStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleRegister = async () => {
		if (password !== confirmPassword) {
			alert("Las contraseñas no coinciden");
			return;
		}
		await signUp(email.trim(), password);
		
	};

	return (
		<View style={{ padding: 20 }}>
			<Text style={{ fontSize: 22, marginBottom: 20 }}>Crear cuenta</Text>

			<TextInput
				placeholder='Email'
				keyboardType='email-address'
				autoCapitalize='none'
				value={email}
				onChangeText={setEmail}
				style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
			/>

			<TextInput
				placeholder='Contraseña'
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
			/>

			<TextInput
				placeholder='Confirmar contraseña'
				secureTextEntry
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
			/>

			<Button
				title={loading ? "Registrando..." : "Registrarse"}
				onPress={handleRegister}
			/>

			{error && (
				<Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
			)}

			{user && (
				<Text style={{ marginTop: 10 }}>
					✅ Usuario registrado: {user.email}
				</Text>
			)}
		</View>
	);
};
export default RegisterScreen;
