// Tipos
export interface Category {
	id: number;
	name: string;
	description: string;
}
// Datos de prueba - Categorías
export const categoriesData: Category[] = [
	{
		id: 1,
		name: "Electrónica",
		description: "Dispositivos electrónicos y gadgets",
	},
	{
		id: 2,
		name: "Ropa y Accesorios",
		description: "Prendas de vestir y complementos",
	},
	{
		id: 3,
		name: "Hogar y Jardín",
		description: "Artículos para el hogar y exterior",
	},
	{
		id: 4,
		name: "Deportes",
		description: "Equipamiento deportivo y fitness",
	},
	{
		id: 5,
		name: "Libros",
		description: "Literatura y libros digitales",
	},
	{
		id: 6,
		name: "Alimentos",
		description: "Productos alimentarios y bebidas",
	},
	{
		id: 7,
		name: "Belleza",
		description: "Cosméticos y cuidado personal",
	},
];


export const metodo_pago = [
	{
		id: 1,
		name: "Efectivo",
		description: "Pago en efectivo",
	},
	{
		id: 2,
		name: "Tarjeta de crédito",
		description: "Pago con tarjeta de crédito",
	},
	{
		id: 3,
		name: "Tarjeta de débito",
		description: "Pago con tarjeta de débito",
	},
];