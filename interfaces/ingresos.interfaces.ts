import { DateType } from "react-native-ui-datepicker";

export interface IngresoForm {
    origen: string;
    monto: string;
    fecha: DateType;
    descripcion: string;
}