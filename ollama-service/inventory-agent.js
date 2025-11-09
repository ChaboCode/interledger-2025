import {ChatOllama} from "@langchain/ollama";
import {AIMessage, ToolMessage} from "@langchain/core/messages";
import {getProductInfo, sendPaymentLink} from "./tools.js";

const llm = new ChatOllama({
    model: process.env.MODEL_NAME || "qwen3:4b",
    maxRetries: 2,
    temperature: 0.2,
    think: false,

    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
})

const inventoryAgent = llm.bindTools([getProductInfo, sendPaymentLink])

let lastProduct = null;

export async function inventoryAsk(question) {
    console.log('INVENTORY | asking...')
    const response = await inventoryAgent.invoke(question);

    if (response.tool_calls?.length > 0) {
        console.log('INVENTORY | reaching tool')
        const toolCall = response.tool_calls[0]
        let result

        if (toolCall.name === "get_product_info") {
            console.log('INVENTORY | inventory service...')
            result = await getProductInfo.invoke(toolCall.args);
            lastProduct = toolCall.args.sku;
            console.log(toolCall.args)
            console.log(`New last product: ${lastProduct}`);
        }

        if (toolCall.name === "purchase_product") {
            console.log(`Purchase product: ${lastProduct}`);
            if (!lastProduct) {
                result = {error: "No hay un producto reciente para comprar"}
            } else {
                console.log('INVENTORY | purchase service...')
                result = await sendPaymentLink.invoke({
                    product: lastProduct
                });
                console.log(JSON.stringify(result))
            }
        }

        const final = await inventoryAgent.invoke([
            new AIMessage(response.content),
            new ToolMessage({
                tool_call_id: toolCall.id,
                name: toolCall.name,
                content: JSON.stringify(result),
            })
        ])

        console.log('INVENTORY | Response: ', final.content)
        return final.content
    } else {
        return response.content
    }
}