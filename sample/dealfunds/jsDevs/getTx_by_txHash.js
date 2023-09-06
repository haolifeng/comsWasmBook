
const { osmosis, cosmos, getSigningOsmosisClient, cosmwasm, getSigningCosmosClient, getSigningCosmwasmClient , } = require("osmojs");
const { createRPCQueryClient } = osmosis.ClientFactory;
const config = require('./config');
const f = async (txhash)=>{
    const client2 = await createRPCQueryClient({ rpcEndpoint: config.RPC_ENDPOINT });

    let tx2 = await client2.cosmos.tx.v1beta1.getTx({hash: txhash})
    //console.log('tx2: ', tx2);

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
        console.log(i, '  -- ', events[i])
        //console.log(i, '  -- ', events[i].type, ' | ', Buffer.from(events[i].attributes[0].key).toString(), ' : ', Buffer.from(events[i].attributes[0].value).toString())
      //  if(i === 11){
       //     console.log(i, '  -- ', events[i].type, ' | ', Buffer.from(events[i].attributes[0].key).toString(), ' : ', Buffer.from(events[i].attributes[0].value).toString())
        //    console.log(i, '  -- ', events[i].type, ' | ', Buffer.from(events[i].attributes[1].key).toString(), ' : ', Buffer.from(events[i].attributes[1].value).toString())
       // }
    }
    /*
    * 11   --  wasm-admin_added  |  _contract_address  :  osmo1k84p07h5m89d52nhuhp5metg8zerf9xvs25gk5p6wcvn65c209zqcy7jhv
      11   --  wasm-admin_added  |  addr  :  osmo1vzhn4rjqv9crxcccxmr88h75a5thjtd22h26s2

    * */
}

f(config.donateTxhash)

