type Sprites = {
	front_default: string;
};

export type Pokemon = {
	name?: string;
	id?: string | number;
	url?: string;
	base_experience?: number;
	sprites?: Sprites;
};

export type PokemonSlot = {
	pokemon: Pokemon;
	slot: number;
};
export type Status = "idle" | "loading" | "success" | "failed";
export type Option = { label: string; value: string };

export type PokemonCategory = {
	label?: string;
	value?: string;
	name?: string;
	url?: string;
};
