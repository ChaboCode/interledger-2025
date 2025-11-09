import {createAuthenticatedClient, isFinalizedGrant} from "@interledger/open-payments";
import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 3005;

const purchases = {}

app.post('/payment', async (req, res) => {
    const amount = req.body.amount
    const redirect = await firstPayment(amount)
    res.status(200).json(redirect)
})

app.get('/finish', async (req, res) => {
    const {nonce, interact_ref} = req.query
    const purchase = purchases[nonce]
    console.log(purchase)
    await finishPayment({
        ...purchase,
        interact_ref,
    })
    res.status(200).send('Payment Finished Successfully. You should receive a confirmation via WhatsApp in an instance.')
})

const client = await createAuthenticatedClient({
    walletAddressUrl: "https://ilp.interledger-test.dev/tutia-dev",
    privateKey: 'private.key',
    keyId: "013676a1-e063-463a-b894-a4fec52be563",
});

async function firstPayment(value) {
    const customer = await client.walletAddress.get({
        url: `https://ilp.interledger-test.dev/jor2`
    })
    const retailer = await client.walletAddress.get({
        url: `https://ilp.interledger-test.dev/jor3`
    })
    const incomingPaymentGrant = await client.grant.request({
        url: retailer.authServer,
    }, {
        access_token: {
            access: [{
                type: "incoming-payment", actions: ["create"],
            }]
        }
    });

    if (!isFinalizedGrant(incomingPaymentGrant)) {
        throw new Error("se espera se finalice la concesion");
    }
    const incomingPayment = await client.incomingPayment.create({
        url: retailer.resourceServer, accessToken: incomingPaymentGrant.access_token.value,
    }, {
        walletAddress: retailer.id, incomingAmount: {
            assetCode: retailer.assetCode, assetScale: retailer.assetScale, value: `${value*100}`,
        },
    });
    const customerQuoteGrant = await client.grant.request({
        url: customer.authServer
    }, {
        access_token: {
            access: [{
                type: 'quote', actions: ['create']
            }]
        }
    });
    const customerQuote = await client.quote.create({
        url: customer.resourceServer, accessToken: customerQuoteGrant.access_token.value
    }, {
        method: 'ilp', walletAddress: customer.id, receiver: incomingPayment.id
    });
    const nonce = Date.now()

    const authPayment = await client.grant.request({
        url: customer.authServer
    }, {
        access_token: {
            access: [{
                type: "outgoing-payment", actions: ["create"], limits: {
                    debitAmount: customerQuote.debitAmount,
                }, identifier: customer.id,
            }]
        }, interact: {
            start: ['redirect'], finish: {
                method: 'redirect', uri: `https://a07d0f32e965.ngrok-free.app/finish?nonce=${nonce}`, // where to redirect the customer after they've completed the interaction
                nonce: `${nonce}`
            }
        }
    })

    const purchase = {
        authPayment, customer, customerQuote
    }
    purchases[nonce] = (purchase);
    if (!isFinalizedGrant(authPayment)) {
        console.log("XD")
    }
    console.log(authPayment);
    return authPayment.interact.redirect

}

async function finishPayment(purchase) {
    const {authPayment, customer, customerQuote, interact_ref} = purchase;

    const finishPaymentGrant = await client.grant.continue({
        url: authPayment.continue.uri, accessToken: authPayment.continue.access_token.value
    },
        {interact_ref}
    );
    const finishPayment = await client.outgoingPayment.create({
        url: customer.resourceServer, accessToken: finishPaymentGrant.access_token.value
    }, {
        walletAddress: customer.id, quoteId: customerQuote.id
    })
    console.log({finishPaymentGrant, finishPayment});
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})