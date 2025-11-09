import {ChatOllama} from "@langchain/ollama";
import {AIMessage, ToolMessage} from "@langchain/core/messages";
import {getProductInfo} from "./tools.js";

const llm = new ChatOllama({
    model: process.env.MODEL_NAME || "qwen3:4b",
    maxRetries: 2,
    think: false,

    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
})

const inventoryAgent = llm.bindTools([getProductInfo])

export async function inventoryAsk(question) {
    console.log('INVENTORY | asking...')
    const response = await inventoryAgent.invoke(question);

    if (response.tool_calls?.length > 0) {
        console.log('INVENTORY | reaching tool')
        const toolCall = response.tool_calls[0]
        const toolResult = await getProductInfo.invoke(toolCall.args)

        console.log('INVENTORY | finishing...')
        const final = await inventoryAgent.invoke([
            new AIMessage(response.content),
            new ToolMessage({
                tool_call_id: toolCall.id,
                name: toolCall.name,
                content: JSON.stringify(toolResult),
            })
        ])

        console.log('INVENTORY | Response: ', final.content)
        return final.content
    } else {
        return response.content
    }
}