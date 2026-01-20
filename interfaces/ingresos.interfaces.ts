import { DateType } from "react-native-ui-datepicker";

/* 
 * @interface IngresoForm
 * Propiedades para el formulario de ingresos.
 * Contiene la información de un ingreso individual para ser visualizado.
 */
export interface IngresoForm {
	origen: string;
	monto: string;
	fecha: DateType;
	descripcion: string;
}

/*
 * @interface InterfaceModalEdicionProps
 * Propiedades para el componente ModalEdicionMovimiento.
 * Contiene la información del movimiento que se va a editar.
 */

export interface InterfaceModalEdicionProps {
	modalVisible: boolean;
	setModalVisible: (visible: boolean) => void;
	newMonto: string;
	setNewMonto: (monto: string) => void;
	newDescripcion: string;
	setNewDescripcion: (descripcion: string) => void;
	mutation: any;
	deleteMutation: any;
	handleUpdate: () => void;
	handleDelete: () => void;
}

/*
 * @interface InterfaceMovimientosRecientesProps
 * Propiedades para el componente MovimientosRecientes.
 * Contiene la información de un movimiento individual para ser visualizado.
 */
export interface InterfaceMovimientosRecientesProps {
	item: {
		id?: number;
		categoria?: string;
		descripcion: string;
		monto: number;
		icon: any;
		iconName?: string;
		fecha?: string;
	};
}
