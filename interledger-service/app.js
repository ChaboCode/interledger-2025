import http from 'http';


const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, Docker!");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import { createAuthenticatedClient, isFinalizedGrant } from "@interledger/open-payments";
import { error } from "console";
import * as fs from "fs";
import { isUtf8 } from "node:buffer";
import * as readline from 'node:readline/promises';
import { url } from 'node:inspector';

(async () => {
  const privateKey = fs.readFileSync("private.key", "utf8");
  const client = await createAuthenticatedClient({
    walletAddressUrl: "https://ilp.interledger-test.dev/tutia-dev",
    privateKey: 'private.key',
    keyId: "013676a1-e063-463a-b894-a4fec52be563",
  });

  const customer = await client.walletAddress.get({
    url: `https://ilp.interledger-test.dev/jor2`
  })
  const retailer = await client.walletAddress.get({
    url: `https://ilp.interledger-test.dev/jor3`
  })
  const incomingPaymentGrant = await client.grant.request(
        {
        url: retailer.authServer,
        },
        {
            access_token:{
                access: [
                    {
                        type: "incoming-payment",
                        actions: ["create"],
                    }
                ]
            }
        }
    );

    if(!isFinalizedGrant(incomingPaymentGrant)){
        throw new error("se espera se finalice la concesion");
    }
  const incomingPayment = await client.incomingPayment.create(
      {
          url: retailer.resourceServer,
          accessToken: incomingPaymentGrant.access_token.value,
      },
      {
          walletAddress: retailer.id,
          incomingAmount: {
              assetCode: retailer.assetCode,
              assetScale: retailer.assetScale,
              value: `50000`,
          },
      }
  );
  const customerQuoteGrant = await client.grant.request(
    {
      url: customer.authServer
    },
    {
      access_token: {
        access: [
          {
            type: 'quote',
            actions: ['create']
          }
        ]
      }
    }
  );
  const customerQuote = await client.quote.create(
    {
      url: customer.resourceServer,
      accessToken: customerQuoteGrant.access_token.value
    },
    {
      method: 'ilp',
      walletAddress: customer.id,
      receiver: incomingPayment.id
    }
  );
  const authPayment = await client.grant.request(
    {
      url: customer.authServer
    },
    {
      access_token: {
        access: [
          {
            type: "outgoing-payment",
            actions: ["create"],
            limits:{
              debitAmount:customerQuote.debitAmount,
            },
            identifier: customer.id,
          }
        ]
      },
      interact: {
        start: ['redirect'],
        /*finish: {
          method: 'redirect',
          uri: 'https://paymentplatform.example/finish/{...}', // where to redirect the customer after they've completed the interaction
          nonce: NONCE
        }*/
      }
    }
  );
  if(!isFinalizedGrant(authPayment)){
    console.log("XD")
  }
  console.log(authPayment);
  await readline
        .createInterface({
            input: process.stdin,
            output: process.stdout
        })
        .question("Press enter para salir del pago saliente")

  const finishPaymentGrant = await client.grant.continue(
    {
      url:authPayment.continue.uri,
      accessToken: authPayment.continue.access_token.value
    },
  );
  const finishPayment = await client.outgoingPayment.create(
    {
      url: customer.resourceServer,
      accessToken: finishPaymentGrant.access_token.value
    },
    {
      walletAddress: customer.id,
      quoteId: customerQuote.id
    }
  )
  console.log({finishPaymentGrant, finishPayment});
})();