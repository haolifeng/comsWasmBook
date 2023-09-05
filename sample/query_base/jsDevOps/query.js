const { CosmWasmClient } = require('cosmwasm');

let scAddr = "osmo1vtpmxctwn0lm7ptsyy2xm94zgd6hn4svyp6h8v49a4t2mknju54qy2ke8c"
let RPC_ENDPOINT = "https://rpc.osmotest5.osmosis.zone";
const f = async ()=>{
    const client = await CosmWasmClient.connect(RPC_ENDPOINT);
    const getCount = await client.queryContractSmart(scAddr,{"Greet": {}})
    console.log(getCount);
    /*

    * */
}

f();