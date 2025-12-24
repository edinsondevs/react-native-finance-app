import { ItemMovimientosCards } from "@/components";
import ThemedView from "@/presentation/ThemedView";
import { FontAwesome } from "@expo/vector-icons";

/**
 * Propiedades para el componente MovimientosRecientes.
 * Contiene la información de un movimiento individual para ser visualizado.
 */
interface MovimientosRecientesProps {
	item: {
		categoria: string;
		descripcion: string;
		monto: number;
		icon: keyof typeof FontAwesome.glyphMap;
	};
}
/**
 * Componente que muestra una lista de movimientos recientes.
 * Actúa como un contenedor temático para el componente ItemMovimientosCards,
 * asegurando que la presentación se adhiera al tema de la aplicación.
 *
 * @param {MovimientosRecientesProps} props - Propiedades que incluyen los datos del movimiento
 * @returns {JSX.Element} Vista del movimiento reciente envolviendo la tarjeta de detalles
 */
const MovimientosRecientes = ({ item }: MovimientosRecientesProps) => {
	const { monto, categoria, descripcion, icon } = item;
	return (
		<ThemedView margin>
			<ItemMovimientosCards
				category={categoria}
				description={descripcion}
				amount={monto}
				icon={icon}
			/>
		</ThemedView>
	);
};

export default MovimientosRecientes;
