import { graphql } from "~/graphql";

export const PokemonsQuery = graphql(`
  query PokemonsList($limit: Int = 10) {
    pokemons(limit: $limit) {
      id
      name
    }
  }
`);
