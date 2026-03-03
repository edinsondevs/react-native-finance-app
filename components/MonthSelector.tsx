import useCapitalize from "@/hooks/useCapitalize";
import { useFinanceStore } from "@/store/useFinanceStore";
import { colors } from "@/styles/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import "dayjs/locale/es";
import React from "react";
import { Pressable, Text, View } from "react-native";

const MonthSelector = () => {
	const { selectedMonth, nextMonth, previousMonth } = useFinanceStore();
	const { capitalize } = useCapitalize();

	const monthName = capitalize(
		selectedMonth.locale("es").format("MMMM YYYY"),
	);

	return (
		<View className='flex-row items-center justify-between bg-white mx-4 my-2 p-3 rounded-2xl shadow-sm border border-gray-100'>
			<Pressable
				onPress={previousMonth}
				className='p-2 rounded-full active:bg-gray-100'>
				<MaterialIcons
					name='chevron-left'
					size={28}
					color={colors.primary}
				/>
			</Pressable>

			<View className='items-center'>
				<Text className='text-lg font-Nunito-Bold capitalize text-text-dark'>
					{monthName}
				</Text>
			</View>

			<Pressable
				onPress={nextMonth}
				className='p-2 rounded-full active:bg-gray-100'>
				<MaterialIcons
					name='chevron-right'
					size={32}
					color={colors.primary}
				/>
			</Pressable>
		</View>
	);
};

export default MonthSelector;
