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
        console.log(`Buscando el producto ${sku}`);
        const {data} = await axios.get(`http://mongo-service:3000/api/productos/${sku.toUpperCase()}`);
        return data
    } catch (error) {
        return {error: 'No se encontro el producto con el SKU indicado'}
    }
}, {
    name: "get_product_info",
    description: "Obtiene información sobre los productos de la tienda. Requiere del SKU o el codigo del producto para encontrarlo. Si el usuario busca por un nombre, es bueno sugerir que envie el SKU o código del producto. SKU de ejemplo: A-001, B-100, C-104",
    schema: z.object({
        sku: z.string().describe("El SKU o código del producto a consultar"),
    })
})

export const sendPaymentLink = tool(async ({product}) => {
    try {
        console.log(`Realizando la compra del producto ${product}`);
        const {data} = await axios.get(`http://mongo-service:3000/api/productos/${product}`);
        const price = parseInt(data.precio['$numberDecimal']) // XD
        const paymentResult = await axios.post(`http://interledger:3005/payment`, {
            amount: price
        })
        console.log(paymentResult)
        return JSON.stringify(paymentResult.data)
    } catch (error) {
        console.log(error)
        return {error: 'Hubo un error al realizar la compra'}
    }
}, {
    name: "purchase_product",
    description: "Realiza la compra del producto y devuelve el enlace para que el usuario autorize la transacción. Usa esta herramienta solo si el usuario confirma la compra. Si el usuario confirma una compra, da por hecho que el id de producto está disponible.",
    schema: z.object({
        product: z.string().describe("Id del producto a comprar. El usuario no lo proporciona manualmente, es un campo generado automáticamente"),
    })
})