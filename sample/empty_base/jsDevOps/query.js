const { CosmWasmClient } = require('cosmwasm');

let scAddr = "osmo1g5v06m6j42mcdldz30slcxw6tg7yx440l5v2anzch7yd8ysq6gnstg6364"
let RPC_ENDPOINT = "https://rpc.osmotest5.osmosis.zone";
RPC_ENDPOINT = "https://rpc.testnet.osmosis.zone"
const f = async ()=>{
    const client = await CosmWasmClient.connect(RPC_ENDPOINT);
    const getCount = await client.queryContractSmart(scAddr,{})
    console.log(getCount);
    /*
    { count: 101 }
    * */
}

f();