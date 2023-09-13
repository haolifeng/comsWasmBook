const { CosmWasmClient } = require('cosmwasm');
const config = require("./config")
let scAddr = config.addrScAddr
let RPC_ENDPOINT = config.RPC_ENDPOINT;
const f = async ()=>{
    const client = await CosmWasmClient.connect(RPC_ENDPOINT);
    const getCount = await client.queryContractSmart(scAddr,{"get_count": {}})
    console.log(getCount);
    /*
{
  admins: [
    'osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4',
    'osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4'
  ]
}
    * */
}

f();