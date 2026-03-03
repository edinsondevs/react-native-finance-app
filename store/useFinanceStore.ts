import dayjs from "dayjs";
import { create } from "zustand";

/**
 * Interfaz que define el estado global de la selección de fechas
 * para toda la aplicación financiera.
 */
interface FinanceState {
	/** Objeto dayjs que representa el primer día del mes seleccionado actualmente */
	selectedMonth: dayjs.Dayjs;
	/** Función para establecer manualmente un mes específico */
	setSelectedMonth: (month: dayjs.Dayjs) => void;
	/** Función de conveniencia para avanzar un mes en el calendario */
	nextMonth: () => void;
	/** Función de conveniencia para retroceder un mes en el calendario */
	previousMonth: () => void;
}

/**
 * Store de Zustand para manejar el estado del periodo seleccionado.
 * Este store es el punto central de verdad para filtrar datos en todas las pantallas.
 */
export const useFinanceStore = create<FinanceState>((set) => ({
	selectedMonth: dayjs().startOf("month"),
	setSelectedMonth: (month) => set({ selectedMonth: month }),
	nextMonth: () =>
		set((state) => ({
			selectedMonth: state.selectedMonth.add(1, "month"),
		})),
	previousMonth: () =>
		set((state) => ({
			selectedMonth: state.selectedMonth.subtract(1, "month"),
		})),
}));
