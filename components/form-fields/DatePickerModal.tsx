import { DateTimePickerComponent, ModalComponent } from "@/components";
import { DateType } from "react-native-ui-datepicker";

interface DatePickerModalProps {
	visible: boolean;
	value: Date;
	onClose: () => void;
	onSelect: (date: Date) => void;
	maximumDate?: Date;
	minimumDate?: Date;
}

/**
 * Componente reutilizable para el modal de selección de fecha
 * Envuelve DateTimePickerComponent con configuración estándar
 */
export const DatePickerModal = ({
	visible,
	value,
	onClose,
	onSelect,
	maximumDate = new Date(),
	minimumDate = new Date(2020, 0, 1),
}: DatePickerModalProps) => {
	const handleSelect = (selectedDate: DateType) => {
		const dateToSave =
			selectedDate instanceof Date ? selectedDate : new Date();
		onSelect(dateToSave);
		onClose();
	};

	return (
		<ModalComponent
			visible={visible}
			onRequestClose={onClose}>
			<DateTimePickerComponent
				value={value}
				maximumDate={maximumDate}
				minimumDate={minimumDate}
				cancelRequestClose={onClose}
				onRequestClose={handleSelect}
			/>
		</ModalComponent>
	);
};
