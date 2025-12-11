import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePicker, {
	DateType,
	useDefaultClassNames,
} from "react-native-ui-datepicker";

interface DateTimePickerComponentProps {
	onRequestClose: (date: DateType) => void;
	cancelRequestClose: () => void;
	value?: DateType;
	mode?: "single" | "range";
	maximumDate?: Date;
	minimumDate?: Date;
}

const DateTimePickerComponent = ({
	onRequestClose,
	cancelRequestClose,
	value = new Date(),
	mode = "single",
	maximumDate = new Date(),
	minimumDate = new Date(2020, 0, 1),
}: DateTimePickerComponentProps) => {
	const [selected, setSelected] = useState<DateType>(new Date());
	const defaultClassNames = useDefaultClassNames();

	return (
		<View className='bg-white m-5 p-5 rounded-3xl shadow-lg shadow-gray-200/50'>
			<DateTimePicker
				mode='single'
				date={selected}
				onChange={({ date }) => setSelected(date)}
				classNames={{
					...defaultClassNames,
					today: "border-primary",
					selected: "bg-primary border-primary rounded-xl",
					selected_label: "text-white font-bold",
					header: "mb-4",
					day: `${defaultClassNames.day} active:bg-gray-100 rounded-lg`,
					day_label: "text-gray-400 font-medium text-sm mb-2",
					month: "font-bold text-lg text-black",

					// Navigation buttons
					button_prev:
						"bg-primary/60 rounded-xl w-10 h-10 shadow-sm border border-border-light flex items-center justify-center",
					button_next:
						"bg-primary/60 rounded-xl w-10 h-10 shadow-sm border border-border-light flex items-center justify-center",
					button_prev_image: "text-text-white",
					button_next_image: "text-text-white",
				}}
				styles={{
					selected: { borderRadius: 12 },
					today: {
						borderWidth: 1,
						borderRadius: 12,
					},
				}}
				// headerButtonColor='#10b981'
				// selectedItemColor='#10b981'
			/>
			<View className='flex flex-row items-center justify-between'>
				<Pressable
					className='w-3/6 h-14 bg-primary/60 rounded-xl flex items-center justify-center active:bg-primary/90'
					onPress={() => onRequestClose(selected)}>
					<Text className='text-text-white font-Inter-Bold text-sm'>
						Seleccionar
					</Text>
				</Pressable>
				<Pressable
					className=' w-2/6 h-14 flex items-center justify-center bg-alert/90 rounded-xl active:bg-alert/60 '
					onPress={cancelRequestClose}>
					<Text className='text-text-white font-Inter-Bold text-sm '>
						Cancelar
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default DateTimePickerComponent;
