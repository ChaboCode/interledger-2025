import {tool} from "@langchain/core/tools";
import axios from "axios";
import * as z from "zod";

export const getPokemonInfo = tool(async ({pokemonName}) => {
    try {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        return {
            name: data.name,
            height_m: data.height / 10,
            weight_kg: data.weight / 10,
            types: data.types.map((t) => t.type.name),
        };
    } catch (error) {
        return {error: `No encontré al Pokémon '${pokemonName}'.`};
    }
}, {
    name: "get_pokemon_info",
    description: "Obtiene información (nombre, altura, peso, tipos) de un Pokémon por su nombre. Si una palabra parece un error tipografico, probablemente es el nombre de un pokemon",
    schema: z.object({
        pokemonName: z.string().describe("El nombre del Pokémon a consultar"),
    }),
});

export const getProductInfo = tool(async ({sku}) => {
    try {
        const {data} = await axios.get(`http://mongo-service:8080/api/productos/${sku.toLowerCase()}`);
        return data
    }
    catch (error) {
        return {error: 'No se encontro el producto con el SKU indicado'}
    }
}, {
    name: "get_product_info",
    description: "Obtiene información sobre los productos de la tienda. Requiere del SKU o el codigo del producto para encontrarlo. Si el usuario busca por un nombre, es bueno sugerir que envie el SKU o código del producto.",
    schema: z.object({
        sku: z.string().describe("El SKU o código del producto a consultar"),
    })
})