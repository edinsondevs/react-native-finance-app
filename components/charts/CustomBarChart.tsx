import { colors } from "@/styles/constants";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface CustomBarChartProps {
	mainData: any[]; // Se mantiene para compatibilidad, aunque no se use directamente
	dataSets: any[];
	monthLabels: string[];
	chartColors: string[];
}

/**
 * @component CustomBarChart
 * Visualización de gráfica de barras agrupada para tendencias de gastos diarios por usuario.
 *
 * Funcionalidad:
 * - Renderiza múltiples barras agrupadas por día (una por cada usuario).
 * - Soporta scroll horizontal automático basado en la cantidad de días del mes.
 * - Implementa un tooltips detallados ('pointerConfig') al interactuar.
 * - Formatea automáticamente las etiquetas del eje Y (k para miles, M para millones).
 *
 * @param mainData - Dataset principal (proporcina la estructura base).
 * @param dataSets - Array de datasets configurados por usuario.
 * @param monthLabels - Etiquetas para el eje X (días del mes).
 * @param chartColors - Paleta de colores para los datasets.
 */

const CustomBarChart = ({
	dataSets,
	monthLabels,
	chartColors,
}: CustomBarChartProps) => {
	// Preparamos los datos transformándolos para que funcionen como grupos de barras por día
	const barData = useMemo(() => {
		const result: any[] = [];

		if (!dataSets || dataSets.length === 0) return result;

		const numDays = dataSets[0]?.data?.length || 0;
		const numUsers = dataSets.length;

		for (let i = 0; i < numDays; i++) {
			dataSets.forEach((dataset, index) => {
				const isLastInGroup = index === numUsers - 1;
				const isFirstInGroup = index === 0;

				const value = dataset.data[i]?.value || 0;

				// Cada usuario tendrá su color representativo
				const frontColor =
					dataset.color || chartColors[index % chartColors.length];

				result.push({
					value,
					label: isFirstInGroup ? dataset.data[i]?.label : "", // Mostramos el label solo en la primera barra del día
					frontColor,
					// Espaciado entre barras del mismo grupo vs grupos diferentes (días)
					spacing: isLastInGroup ? 20 : 2,
					labelWidth: 30,
					labelTextStyle: { color: "gray", fontSize: 12 },
				});
			});
		}

		return result;
	}, [dataSets, chartColors]);

	return (
		<BarChart
			data={barData}
			key={`bar-chart-${barData.length}`} // Fuerza re-render cuando los datos cambian drásticamente
			height={220}
			barWidth={12} // Barras personalizadas más delgadas y estéticas
			barBorderRadius={4} // Bordes redondeados 'Customised'
			spacing={20}
			initialSpacing={10}
			yAxisLabelWidth={55}
			hideRules
			xAxisColor='lightgray'
			yAxisColor='lightgray'
			noOfSections={4}
			isAnimated
			formatYLabel={(value) => {
				if (Number(value) >= 1000000)
					return `${(Number(value) / 1000000).toFixed(1)}M`;
				if (Number(value) >= 1000)
					return `${(Number(value) / 1000).toFixed(0)}k`;
				return value;
			}}
			xAxisLabelsVerticalShift={10}
			xAxisLabelsHeight={30}
			pointerConfig={{
				pointerStripColor: "lightgray",
				pointerStripWidth: 2,
				pointerColor: colors.primary,
				radius: 6,
				pointerLabelComponent: (items: any) => {
					// Dado que items devolverá la barra actual en focus, mostramos el tooltip
					if (!items || items.length === 0) return null;
					return (
						<View
							style={{
								backgroundColor: "white",
								padding: 8,
								borderRadius: 8,
								minWidth: 100,
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 2,
								},
								shadowOpacity: 0.25,
								shadowRadius: 3.84,
								elevation: 5,
								borderWidth: 1,
								borderColor: "#f0f0f0",
							}}>
							<Text
								style={{
									fontWeight: "bold",
									fontSize: 12,
									marginBottom: 4,
									textAlign: "center",
								}}>
								Valor
							</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
									marginTop: 2,
								}}>
								<Text
									style={{
										fontSize: 16,
										color: items[0].frontColor,
										marginRight: 6,
										lineHeight: 16,
									}}>
									●
								</Text>
								<Text
									style={{
										fontSize: 11,
										color: "#333",
										fontWeight: "500",
									}}>
									${items[0].value.toLocaleString("es-AR")}
								</Text>
							</View>
						</View>
					);
				},
			}}
		/>
	);
};

export default CustomBarChart;
