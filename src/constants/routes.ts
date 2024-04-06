import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import colors from "tailwindcss/colors";
import { Text } from "react-native";
export const screenOptions: Partial<NativeStackNavigationOptions> = {
	headerStyle: {
		backgroundColor: colors.orange[600],
	},
	headerTintColor: colors.orange[50],
	headerBackTitle: "",
	headerTitleStyle: {
		fontWeight: "bold",
	},
};
