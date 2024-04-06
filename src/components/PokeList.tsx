import { Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { memo, useEffect } from "react";
import SearchBarWithFilter from "./SearchBarWithFilter";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Status, fetchPokemons } from "../redux/slice/pokeSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "tailwindcss/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/routes";
import LoadingIndicator from "./LoadingIndicator";
const PokeList = ({ navigation }) => {
	const dispatch = useAppDispatch();
	const originalData = useAppSelector((state) => state.poke.originalData);
	const modifiedData = useAppSelector((state) => state.poke.modifiedData);
	const isHavingQuery = useAppSelector((state) => !!state.poke.search || !!state.poke.sortBy || !!state.poke.orderBy);
	const status = useAppSelector((state) => state.poke.status);
	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchPokemons());
		}
	}, [status, dispatch]);
	return (
		<>
			<SearchBarWithFilter />
			{status === Status.FAILED && <CustomConditionComponent title="Fail to fetch results" refetch />}
			{status === Status.LOADING && <LoadingIndicator />}
			{status === "success" && (
				<FlatList
					showsVerticalScrollIndicator={false}
					data={isHavingQuery ? modifiedData : originalData}
					keyExtractor={(item) => item.id.toString()}
					ListEmptyComponent={() => <CustomConditionComponent title="No Results" />}
					renderItem={({ item }) => <ListItem name={item.name} id={+item.id} />}
				/>
			)}
		</>
	);
};

type ListItemProps = {
	name: string;
	id: number;
};
const ListItem = memo(({ name, id }: ListItemProps) => {
	const navigation: NavigationProp<RootStackParamList> = useNavigation();
	const navigate = () => {
		navigation.navigate("PokeDetails", { id, name });
	};
	return (
		<TouchableOpacity key={id} onPress={navigate} className="bg-orange-300 p-3 mb-[1]" activeOpacity={0.8}>
			<Text className="text-orange-800 font-semibold capitalize">{name}</Text>
		</TouchableOpacity>
	);
});

const CustomConditionComponent = ({ title, refetch = false }) => {
	const status = useAppSelector((state) => state.poke.status);
	const dispatch = useAppDispatch();
	const refetchFunc = () => {
		if (status === "failed") dispatch(fetchPokemons());
	};
	return (
		<TouchableOpacity onPress={refetchFunc} activeOpacity={refetch ? 0.8 : 1.0} className="flex-row flex-1 justify-center items-center mt-4">
			<Text className="text-orange-600 font-bold ">{title}</Text>
			{refetch && <Ionicons name="refresh" size={18} className="ml-2" color={colors.orange[500]} />}
		</TouchableOpacity>
	);
};

export default PokeList;
