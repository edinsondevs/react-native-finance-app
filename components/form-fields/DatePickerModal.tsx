import { DateTimePickerComponent, ModalComponent } from "@/components";
import { InterfaceDatePickerModalProps } from "@/interfaces";
import { DateType } from "react-native-ui-datepicker";

/**
 * Componente reutilizable para el modal de selección de fecha
 * Envuelve DateTimePickerComponent con configuración estándar
 */
import dayjs from "dayjs";

export const DatePickerModal = ({
	visible,
	value,
	onClose,
	onSelect,
	maximumDate = new Date(),
	minimumDate = new Date(2020, 0, 1),
}: InterfaceDatePickerModalProps) => {
	const handleSelect = (selectedDate: DateType) => {
		const dateToSave = dayjs(selectedDate).toDate();
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
