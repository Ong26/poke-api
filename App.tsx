import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import PokeList from "./src/components/PokeList";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import PokeDetails from "./src/pages/PokeDetails";
import { RootStackParamList } from "./src/types/routes";
import { screenOptions } from "./src/constants/routes";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={screenOptions}>
						<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
						<Stack.Screen name="PokeDetails" component={PokeDetails} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</SafeAreaProvider>
	);
}
