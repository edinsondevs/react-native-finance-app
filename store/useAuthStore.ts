import { create } from "zustand";
import { supabase } from "../api/lib/supabase";

export type User = {
	id: string;
	email: string;
	displayName?: string;
} | null;

type AuthStore = {
	user: User;
	loading: boolean;
	error: string | null;
	signUp: (
		email: string,
		password: string,
		displayName: string
	) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	fetchSession: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	loading: false,
	error: null,

	// 🔐 Registrar usuario
	signUp: async (email, password, displayName) => {
		set({ loading: true, error: null });
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					full_name: displayName,
				},
			},
		});
		if (error) set({ error: error.message });
		else
			set({
				user: data.user
					? {
							id: data.user.id,
							email: data.user.email!,
							displayName: data.user.user_metadata.full_name,
						}
					: null,
			});
		set({ loading: false });
	},

	// 🔓 Iniciar sesión
	signIn: async (email, password) => {
		set({ loading: true, error: null });

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) set({ error: "El correo o la contraseña son incorrectos" });
		else
			set({
				user: data.user
					? {
							id: data.user.id,
							email: data.user.email!,
							displayName: data.user.user_metadata?.full_name,
						}
					: null,
			});
		set({ loading: false });
	},

	// 🚪 Cerrar sesión
	signOut: async () => {
		await supabase.auth.signOut();
		set({ user: null });
	},

	// 🔄 Verificar si hay sesión activa al iniciar la app
	fetchSession: async () => {
		const { data } = await supabase.auth.getSession();
		if (data.session) {
			set({
				user: {
					id: data.session.user.id,
					email: data.session.user.email!,
					displayName: data.session.user.user_metadata?.full_name,
				},
			});
		}
	},
}));
