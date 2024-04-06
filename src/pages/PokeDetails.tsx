import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";
import { capitalize } from "../../utils/CommonUtils";
import pokemonAPI from "../redux/api/pokeApi";
import ConditionalRenderer from "../components/ConditionalRenderer";
import LoadingIndicator from "../components/LoadingIndicator";

type Props = NativeStackScreenProps<RootStackParamList, "PokeDetails">;

const PokeDetails = ({ navigation, route }: Props) => {
	const pokemonName = route?.params.name;
	const id = route?.params.id;

	const { data, isError, isLoading } = pokemonAPI.useGetByNameQuery({ id });
	useEffect(() => {
		navigation.setOptions({ title: capitalize(pokemonName) });
	}, []);
	return (
		<ScrollView className="flex-1 bg-orange-100 p-4">
			{isError ? (
				<Text className="text-orange-500">Error. Please try again later</Text>
			) : (
				<ConditionalRenderer shouldRender={!isLoading} fallbackComponent={<LoadingIndicator />}>
					<View>
						<View className=" flex-1 justify-center flex-row">
							<ConditionalRenderer
								shouldRender={!!data?.sprites.front_default}
								fallbackComponent={<Text className="text-orange-500 italic my-3">Image not found</Text>}
							>
								<Image src={data?.sprites.front_default} className="h-24 w-24" />
							</ConditionalRenderer>
						</View>
						<View>
							<Stat name="Name" value={pokemonName} />
							<Stat name="Base Exp." value={data?.base_experience} />
						</View>
					</View>
				</ConditionalRenderer>
			)}
		</ScrollView>
	);
};

const Stat = ({ name, value }) => {
	return (
		<View className="flex-col justify-between mb-6">
			<Text className="capitalize font-[300]">{name}</Text>
			<Text className="font-semibold capitalize">{value || "-"}</Text>
		</View>
	);
};
export default PokeDetails;
