import { colors } from "@/styles/constants";
import { styles } from "@/styles/estadisticas.styles";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type TabType = "diario" | "usuario" | "tipo_pago" | "categoria";

interface TabSelectorEstadisticasProps {
	activeTab: TabType;
	setActiveTab: (tab: TabType) => void;
}

const TabSelectorEstadisticas = ({
	activeTab,
	setActiveTab,
}: TabSelectorEstadisticasProps) => {
	const tabs: { id: TabType; label: string }[] = [
		{ id: "diario", label: "Diario" },
		{ id: "usuario", label: "Usuario" },
		{ id: "tipo_pago", label: "Pago" },
		{ id: "categoria", label: "Categoría" },
	];

	return (
		<View style={styles.tabsContainer}>
			{tabs.map((tab) => (
				<TouchableOpacity
					key={tab.id}
					onPress={() => setActiveTab(tab.id)}
					style={[
						styles.tabButton,
						activeTab === tab.id && styles.tabButtonActive,
					]}
					activeOpacity={0.7}>
					<Text
						style={[
							styles.tabText,
							activeTab === tab.id && {
								color: colors.primary,
							},
						]}>
						{tab.label}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default TabSelectorEstadisticas;
