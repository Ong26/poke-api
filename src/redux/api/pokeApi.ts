import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon, PokemonCategory, PokemonSlot } from "../../types";

type GetByNameParams = {
	id: string | number;
};
type GetByCategoryParams = {
	category: string;
};

type GetTypeResponse =
	| {
			pokemon: PokemonSlot[];
	  }
	| { results: Pokemon[] };
export const pokemonApi = createApi({
	reducerPath: "pokeApi",
	tagTypes: ["pokemon", "pokemonType"],
	keepUnusedDataFor: 3600,
	baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
	endpoints: (builder) => ({
		getAll: builder.query<Pokemon[], void>({
			providesTags: ["pokemon"],
			transformResponse: (response: { results: Pokemon[] }) => {
				return response.results;
			},
			query: () => "?limit=10000",
		}),
		getTypes: builder.query<PokemonCategory[], void>({
			providesTags: [{ type: "pokemonType", id: "LIST" }],
			transformResponse: (response: { results: any }) => {
				const res = response.results.map((x) => ({ label: x.name.charAt(0).toUpperCase() + x.name.slice(1), value: x.name }));
				res.unshift({ label: "All", value: "all" });
				return res;
			},
			query: () => "/type",
		}),
		getType: builder.query<Pokemon[], GetByCategoryParams>({
			providesTags: (result, error, { category }) => [
				{ type: "pokemon", id: "type" },
				{ type: "pokemonType", id: category },
			],
			transformResponse: (response: GetTypeResponse) => {
				if ("results" in response)
					return response.results.map((pokemon: Pokemon) => {
						const id = pokemon.url.split("/")[6];
						const name = pokemon.name.replace("-", " ");
						return { ...pokemon, id: +id, name } as Pokemon;
					});
				else
					return response.pokemon.map((x: PokemonSlot) => {
						const id = x.pokemon.url.split("/")[6];
						const name = x.pokemon.name.replace("-", " ");
						return { ...x.pokemon, id: +id, name };
					});
			},
			query: ({ category }) => {
				if (category === "all") return "/pokemon?limit=10000";
				return `/type/${category}`;
			},
		}),

		getByName: builder.query<Pokemon, GetByNameParams>({
			providesTags: (result, error, { id }) => [{ type: "pokemon", id }],
			query: ({ id }) => `/pokemon/${id}`,
		}),
	}),
});
export const { useGetByNameQuery } = pokemonApi;
export default pokemonApi;
