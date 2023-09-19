const { osmosis, cosmos, getSigningOsmosisClient, cosmwasm, getSigningCosmosClient, getSigningCosmwasmClient , } = require("osmojs");
const { createRPCQueryClient } = osmosis.ClientFactory;

const { getOfflineSignerAmino , getOfflineSignerProto} = require('cosmjs-utils');

const { chains } = require('chain-registry');

const {
    multiSend,
    send
} = cosmos.bank.v1beta1.MessageComposer.fromPartial;

const  { createDenom,mint,burn,changeAdmin,setDenomMetadata,forceTransfer } =  osmosis.tokenfactory.v1beta1.MessageComposer.withTypeUrl;

const {
    clearAdmin,
    executeContract,
    instantiateContract,
    migrateContract,
    storeCode,
    updateAdmin
} = cosmwasm.wasm.v1.MessageComposer.withTypeUrl;
const { sha256 } =require("@cosmjs/crypto");
const { toHex } =require("@cosmjs/encoding");


const fs = require('fs');
const {Coin} = require("osmojs/dist/codegen/cosmos/base/v1beta1/coin");

const { decodeTxRaw } = require('@cosmjs/proto-signing')
let RPC_ENDPOINT = "https://rpc.osmotest5.osmosis.zone";

let address = "osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4";
let mnemonic = "drive organ stem speak melody spare ancient craft fun taste search identify girl object lesson write recall permit draw defy know brother pear coconut"

let toMnemonic = "swamp evolve wire grunt resource twice glimpse elevator solution fresh that arrive amazing wish inhale kick rescue law visa glow obscure ignore casual news";
let toAddress  = "osmo1vzhn4rjqv9crxcccxmr88h75a5thjtd22h26s2"

const { CosmWasmClient } = require('cosmwasm');
const buffer = require("buffer");

let scAddr = "osmo1guvkz6e7xgvysr85kseskpl278eytk0nnn6ta0wmv8zpfmsc9r7q5f5lav"


const getBlock = async () => {
    const client = await CosmWasmClient.connect(RPC_ENDPOINT);

   // let hight = await client.getHeight();
  //  console.log('hight: ', hight);
    let hight = 2339395
    let block = await client.getBlock(hight);
    //console.log('block: ', block);

    let txs = block.txs;
    for(let i = 0; i< txs.length; i++ ) {
        //console.log('txs[', i, '] : ', txs[i].toString());
        const transactionId = toHex(sha256(txs[i])).toUpperCase();
        console.log(i , ' -- transactionId: ', transactionId);

        let decodedTx = decodeTxRaw(txs[i]);
        console.log('decodedTx: ', decodedTx);
        console.log('decodedTx.body.messages: ', decodedTx.body.messages)
    }
    let txhash = 'DF665A6AB4924C6D8A46E351FF8FECC11DE9D8694C4C46763157D9A8A4B83764'
    txhash = 'EDFD690DE82F015F16EBE294C443C1C6871F8AF172826CE2094188D74A4BC8C5';// in 6
/*
    let tx = await client.getTx(txhash);
    console.log('tx: ', tx)
    let rawLog = tx.rawLog;
    let evens = tx.events;
    console.log('evens: ', evens);

    let parseRawLog = JSON.parse(rawLog);
    console.log('parseRawLog: ', parseRawLog);
    let events_in_log = parseRawLog[0].events;
    for(let j = 0; j < events_in_log.length; j++){
        console.log(j , '  events in log : ', events_in_log[j]);
    }

    const client2 = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT });

    let tx2 = await client2.cosmos.tx.v1beta1.getTx({
        hash: txhash});
    console.log('tx2: ', tx2);
    //console.log('tx2.tx.body.message: ', tx2.tx.body.messages)



    let messages = tx2.tx.body.messages;
    for(let k = 0; k < messages.length ;k++){
        let message = messages[k];
        console.log('message: ', message);
        let value = Buffer.from(message.value,).toString('utf-8')
        for(let o = 0; o <25; o++){
          //  console.log(o, ' ', message.value[message.value.length - o], );
        }
        console.log('value: ', value)
        console.log('valuel.length: ', value.length)
        for(let o = 0; o <25; o++){
          //  console.log(o, ' ', value[value.length - o], );
        }
        console.log('1 ', value.slice(2,46))
        console.log('2 ', value.slice(46+2,46+2 + 64 ))
        console.log('3 ', value.slice(46+2+64 + 2))



    }

    let events = tx2.txResponse.events;
    for(let i = 0; i < events.length; i++) {
        console.log(i, '  -- ', events[i].type, ' | ', Buffer.from(events[i].attributes[0].key).toString(), ' : ', Buffer.from(events[i].attributes[0].value).toString())
    }
*/
}
getBlock()