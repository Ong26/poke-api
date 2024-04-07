import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import { Pokemon, Status as TStatus, Option } from "../../types";
import pokemonApi from "../api/pokeApi";

export const Status = { IDLE: "idle", LOADING: "loading", SUCCESS: "success", FAILED: "failed" } as const;

export const fetchPokemons = createAsyncThunk("poke/fetchPokemons", async () => {
	try {
		const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
		return response.data.results.map((pokemon: Pokemon) => {
			const id = pokemon.url.split("/")[6];
			const name = pokemon.name.replace("-", " ");
			return { ...pokemon, id: +id, name };
		});
	} catch (error) {
		throw new Error("Network Error");
	}
});

interface FetchPokemonParams {
	name: string;
}
export const fetchPokemon = createAsyncThunk<Pokemon, FetchPokemonParams>("poke/fetchPokemon", async ({ name }) => {
	try {
		const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
		return response.data;
	} catch (error) {
		throw new Error("Network Error");
	}
});

interface PokeState {
	originalData: Pokemon[];
	modifiedData: Pokemon[];
	selectedPokemon: Pokemon;
	selectedCategory: string;
	search: any;
	sortBy: string;
	orderBy: string;
	status: TStatus;
	error: string;
}
const initialState: PokeState = {
	originalData: [],
	modifiedData: [],
	selectedPokemon: null,
	selectedCategory: "all",
	sortBy: "id",
	orderBy: "asc",
	search: "",
	status: Status.IDLE,
	error: null,
};

const handleFetchPokemonsPending = (state: PokeState) => {
	state.status = Status.LOADING;
};

const handleFetchPokemonsFulfilled = (state: PokeState, action: PayloadAction<Pokemon[]>) => {
	state.status = Status.SUCCESS;
	state.originalData = action.payload;
	state.modifiedData = action.payload;
};

const handleFetchPokemonsRejected = (state: PokeState, action: PayloadAction<any>) => {
	state.status = Status.FAILED;
	state.error = action.payload;
};

const handleFetchPokemonPending = (state: PokeState) => {
	state.status = Status.LOADING;
};

const handleFetchPokemonFulfilled = (state: PokeState, action: PayloadAction<Pokemon>) => {
	state.status = Status.SUCCESS;
	state.selectedPokemon = action.payload;
};

const handleFetchPokemonRejected = (state: PokeState, action: PayloadAction<any>) => {
	state.status = Status.FAILED;
	state.error = action.payload;
};
const handleSpecificPokemonTypePending = (state: PokeState) => {
	state.status = Status.LOADING;
};
const handleSpecificPokemonTypeFulfilled = (state: PokeState, action: PayloadAction<Pokemon[]>) => {
	state.status = Status.SUCCESS;
	state.originalData = action.payload;
	state.modifiedData = action.payload
		.sort((a, b) => {
			const sortOrder = state.orderBy === "desc" ? -1 : 1;
			if (typeof a[state.sortBy] === "string" && typeof b[state.sortBy] === "string") return sortOrder * (a[state.sortBy] < b[state.sortBy] ? -1 : 1);
			else return sortOrder * (+a[state.sortBy] < +b[state.sortBy] ? -1 : 1);
		})
		.filter((pokemon) => {
			if (state.search === "") return true;
			return pokemon.name.toLowerCase().includes(state.search.toLowerCase()) || pokemon.id === state.search;
		});
};

export const pokeSlice = createSlice({
	name: "pokeSlice",
	initialState,
	reducers: {
		search: (state, action: PayloadAction<any>) => {
			state.search = action.payload;
		},
		filterResults: (state) => {
			state.modifiedData = state.originalData.filter((pokemon) => {
				return pokemon.name.toLowerCase().includes(state.search.toLowerCase()) || pokemon.id === state.search;
			});
		},
		clearFilters: (state) => {
			state.selectedCategory = "all";
			state.search = "";
			state.sortBy = "id";
			state.orderBy = "asc";
			state.modifiedData = state.originalData;
		},
		setStatus: (state, action: PayloadAction<any>) => {
			state.status = action.payload;
		},
		sortBy: (state, action: PayloadAction<any>) => {
			state.sortBy = action.payload;
			state.modifiedData = state.modifiedData.sort((a, b) => {
				const sortOrder = state.orderBy === "desc" ? -1 : 1;
				if (typeof a[state.sortBy] === "string" && typeof b[state.sortBy] === "string")
					return sortOrder * (a[state.sortBy] < b[state.sortBy] ? -1 : 1);
				else return sortOrder * (+a[state.sortBy] < +b[state.sortBy] ? -1 : 1);
			});
		},
		orderBy: (state, action: PayloadAction<any>) => {
			state.orderBy = action.payload;
			state.modifiedData = state.modifiedData.sort((a, b) => {
				const sortOrder = state.orderBy === "desc" ? -1 : 1;
				if (typeof a[state.sortBy] === "string" && typeof b[state.sortBy] === "string")
					return sortOrder * (a[state.sortBy] < b[state.sortBy] ? -1 : 1);
				else return sortOrder * (+a[state.sortBy] < +b[state.sortBy] ? -1 : 1);
			});
		},
		selectCategory: (state, action: PayloadAction<string>) => {
			state.selectedCategory = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPokemons.pending, handleFetchPokemonsPending)
			.addCase(fetchPokemons.fulfilled, handleFetchPokemonsFulfilled)
			.addCase(fetchPokemons.rejected, handleFetchPokemonsRejected)
			.addCase(fetchPokemon.pending, handleFetchPokemonPending)
			.addCase(fetchPokemon.fulfilled, handleFetchPokemonFulfilled)
			.addCase(fetchPokemon.rejected, handleFetchPokemonRejected)
			.addMatcher(pokemonApi.endpoints.getType.matchRejected, handleFetchPokemonPending)
			.addMatcher(pokemonApi.endpoints.getType.matchPending, handleSpecificPokemonTypePending)
			.addMatcher(pokemonApi.endpoints.getType.matchFulfilled, handleSpecificPokemonTypeFulfilled);
	},
});
export const { search, filterResults, clearFilters, sortBy, orderBy, setStatus, selectCategory } = pokeSlice.actions;

export default pokeSlice.reducer;
