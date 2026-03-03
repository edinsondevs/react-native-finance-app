import dayjs from "dayjs";
import { create } from "zustand";

interface FinanceState {
	selectedMonth: dayjs.Dayjs;
	setSelectedMonth: (month: dayjs.Dayjs) => void;
	nextMonth: () => void;
	previousMonth: () => void;
}

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
