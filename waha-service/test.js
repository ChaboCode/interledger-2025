import express from 'express'
import axios from 'axios'

const app = express()
app.use(express.json())

function answer(msg) {
    const wahaData = {
        session: 'default', chatId: '5214494288355@c.us', text: msg
    }

    console.log(msg)
    axios.post('http://waha:3000/api/sendText', {
        ...wahaData
    }, {
        headers: {
            'X-Api-Key': 'a5887a01b01144febfcb13d9d0fc88f1'
        }
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

app.post('/answer', async (req, res) => {
    const data = req.body
    const {msg, dest} = data

    const wahaData = {
        session: 'default', chatID: dest, text: msg
    }

    axios.post('http://waha:3000/api/sendText', wahaData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
})

app.post('/msg', async (req, res) => {
    const data = req.body

    if (data.event === 'message') {

        const response = await axios.post('http://ollama-service:8080/inventory', data)
        console.log(response.data)
        await answer(response.data)
    }

    res.send('OK')
})

app.listen(3000, () => {
    console.log('Listening on port 3000 🗿👍')
})