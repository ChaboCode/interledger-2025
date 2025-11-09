import {ChatOllama} from "@langchain/ollama";
import {getPokemonInfo} from "./tools.js";
import {AIMessage, ToolMessage} from "@langchain/core/messages";

//////////////////
// Models
const llm = new ChatOllama({
    model: process.env.MODEL_NAME || "qwen3:4b",
    temperature: 0,
    maxRetries: 2,
    think: false,

    baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
})

const pokellm = llm.bindTools([getPokemonInfo])

////////////////////
// Functions
export async function pokeask(question) {
    console.log('asking...')
    console.log(`question: ${JSON.stringify(question)}`)
    const response = await pokellm.invoke(question);

    if (response.tool_calls?.length > 0) {
        console.log('reaching tool...')
        const toolCall = response.tool_calls[0]
        const toolResult = await getPokemonInfo.invoke(toolCall.args)

        console.log('finishing...')
        const final = await pokellm.invoke([
            new AIMessage(response.content),
            new ToolMessage({
                tool_call_id: toolCall.id,
                name: toolCall.name,
                content: JSON.stringify(toolResult),
            })
        ])

        console.log("Final:", final.content)
        return final.content
    }
    else {
        console.log("Respuesta: ", response.content)
        return response.content
    }
}