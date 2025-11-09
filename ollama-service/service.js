import axios from "axios"
import express from "express"
import {pokeask} from "./pokemon-agent.js";
import {inventoryAsk} from "./inventory-agent.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))

// Pokemon route
app.post("/pokeask", async (req, res) => {
    const data = req.body
    console.log(data)
    const {body} = data.payload

    const response = await pokeask(body)
    res.status(200).send(response)
})

// Inventory route
app.post("/inventory", async (req, res) => {
    const {body} = req.body.payload

    const response = await inventoryAsk(body)
    res.status(200).send(response)
})

app.listen(8080)
console.log('Servidor activo en :8080')