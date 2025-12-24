/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */


import { useColorScheme } from "@/hooks/use-color-scheme";
import { ColorsTheme } from "@/styles/constants";

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof ColorsTheme.light & keyof typeof ColorsTheme.dark
) {
	const theme = useColorScheme() ?? "light";
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return ColorsTheme[theme][colorName];
	}
}
