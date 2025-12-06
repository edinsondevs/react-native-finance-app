import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePicker, {
	DateType,
	useDefaultClassNames,
} from "react-native-ui-datepicker";

const DateTimePickerComponent = () => {
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
					today: "border-calendar-primary",
					selected:
						"bg-calendar-primary border-calendar-primary rounded-xl",
					selected_label: "text-white font-bold",
					header: "mb-4",
					day: `${defaultClassNames.day} active:bg-gray-100 rounded-lg`,
					day_label: "text-gray-400 font-medium text-sm mb-2",
					month: "font-bold text-lg text-black",

					// Navigation buttons
					button_prev:
						"bg-white rounded-xl w-10 h-10 shadow-sm border border-gray-100 flex items-center justify-center mr-2",
					button_next:
						"bg-white rounded-xl w-10 h-10 shadow-sm border border-gray-100 flex items-center justify-center",
					button_prev_image: "text-calendar-primary",
					button_next_image: "text-calendar-primary",
				}}
				styles={{
					selected: { borderRadius: 12 },
					today: {
						borderColor: "#10b981",
						borderWidth: 1,
						borderRadius: 12,
					},
				}}
				// headerButtonColor='#10b981'
				// selectedItemColor='#10b981'
			/>
            <Pressable
				className='w-full h-14 bg-secondary rounded-xl flex items-center justify-center active:bg-secondary/90'
				// onPress={() => props.onRequestClose()}
			    >
				<Text className='text-text-white font-Inter-Bold text-lg'>Seleccionar fecha</Text>
			</Pressable>
		</View>
	);
};

export default DateTimePickerComponent;
