import axios from "axios";

export const instance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_DB_URL,
	headers: {
		apikey: process.env.EXPO_PUBLIC_API_KEY,
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
		Prefer: "return=representation",
		"Content-Type": "application/json",
	},
});
