
const {createHash} = require('crypto');
const {randomBytes} = require('crypto');
const lnService = require('ln-service');
const {once} = require('events');
const {payViaPaymentDetails, createInvoice, getWalletInfo, getNode, subscribeToInvoice, verifyMessage} = require('ln-service');

class Node{
    constructor(cert, macaroon, socket){
        this.lnd = lnService.authenticatedLndGrpc({
            cert: cert,
            macaroon: macaroon,
            socket: socket,
        });
        this.cert= cert;
        this.macaroon = macaroon;
        this.socket = socket;
    }

    async getWalletInfo(){
        let walletInfo = await getWalletInfo(this.lnd)
        return walletInfo
    }

    async getNodeInfo(pubkey){
        const {lnd} = this.lnd
        const nodeInfo = await getNode({lnd, public_key: pubkey})
        return nodeInfo
    }

    async keysend(amt, dest_pk){
        const destination = dest_pk;
        const tokens = amt; 
        const preimage = randomBytes(32);
        const id = createHash('sha256').update(preimage).digest().toString('hex');
        const secret = preimage.toString('hex');
        const messages =  [{type: '5482373484', value: secret}]
        const {lnd} = this.lnd
        try{
            const test = await payViaPaymentDetails({destination, id, lnd ,messages, tokens})
        }catch(err){
            console.log(err)
            // throw Error(err.message)
        }
    }


    async generateInvoice(amount, memo){
        const {lnd} = this.lnd
        const invoice = await createInvoice({lnd, tokens: amount, description: memo})
        return invoice
    }

    async getInvoiceStatus(id){
        const {lnd} = this.lnd
        const sub = subscribeToInvoice({lnd, id})
        const [invoice]  = await once(sub, 'invoice_updated')
        return invoice
    }

    async verifyMessage(message, signature){
        const {lnd} = this.lnd
        // const pubkey = (await verifyMessage({lnd, message, signature})).signed_by;
        const pubkey = (await verifyMessage({lnd, message, signature})).signed_by;
        console.log(pubkey)
        return pubkey
    }

    streamSats(amt, num_of_payments, timeout, dest_pk) {
        for (var i = 1; i <= num_of_payments; i++){
            setTimeout(() => { 
                this.keysend(amt, dest_pk)
                console.log('paid')
            }, timeout*i);
        }
    }

}

module.exports = { Node }