import { View, Text } from "react-native";
import React from "react";
import PokeList from "../components/PokeList";
import { NativeSafeAreaViewProps, SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";
import colors from "tailwindcss/colors";
import { SafeAreaOptions } from "../constants/safeArea";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props) => {
	return (
		<SafeAreaView {...SafeAreaOptions}>
			<PokeList navigation={navigation} />
		</SafeAreaView>
	);
};

export default Home;
