import { GetStaticProps } from 'next'

import Container from '@/components/Container';
import PokeCard from '@/components/PokeCard';
import pokedex from '@/lib/pokeapi';
import { capitalize } from '@/lib/helper_functions';

const pokeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const itemSpriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/';

import { PokeResponse, Option, Sprites, HomeProps } from '@/lib/interfaces';

// on build time, fetch whole list of pokemon and format options for the select
export const getStaticProps: GetStaticProps = async () => {
	const pokemonList: PokeResponse[] = (await pokedex.getPokemonsList()).results;
	const naturesList: PokeResponse[] = (await pokedex.getNaturesList()).results;
	const itemList: PokeResponse[] = (await pokedex.getItemsList()).results;

	const pokemonSprites: Sprites = {};
	const pokemonOptions: Option[] = pokemonList.map(pokemon => {
		const name: string = pokemon.name;
		const spriteNum: string = pokemon.url.substring(pokemon.url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1);
		const spriteUrl: string = pokeSpriteUrl + spriteNum + ".png";
		pokemonSprites[name] = spriteUrl;

		return { value: name, label: capitalize(name) } as Option;
	});

	const natureOptions: Option[] = naturesList.map(nature => {
		return { value: nature.name, label: capitalize(nature.name) } as Option;
	});

	const itemSprites: Sprites = {};
	const itemOptions: Option[] = itemList.map(item => {
		const name: string = item.name;
		const spriteUrl: string = itemSpriteUrl + item.name + '.png';
		itemSprites[name] = spriteUrl;

		return { value: name, label: capitalize(name) } as Option;
	});

	return {
		props: {
			options: {
				pokemonOptions,
				natureOptions,
				itemOptions
			},
			sprites: {
				pokemonSprites,
				itemSprites
			}
		}
	}
}

export default function Home({ options, sprites }: HomeProps) {

	return (
		<Container>
			<PokeCard cardIndex={1} options={options} sprites={sprites} />
			<PokeCard cardIndex={2} options={options} sprites={sprites} />
		</Container>
	)
}