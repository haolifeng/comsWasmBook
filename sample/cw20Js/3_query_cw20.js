const config = require('./config');
const scTools = require('./scTools');
const { CosmWasmClient } = require('cosmwasm');
async function balanceOf() {
    const client = await CosmWasmClient.connect(config.RPC_ENDPOINT);
    let balance = await client.queryContractSmart(config.scAddr, {"balance":{"address": config.wallet.address}});
    console.log('balance is :', balance.balance);

    let balance2 = await client.queryContractSmart(config.scAddr, {"balance":{"address": config.wallet2.address}});
    console.log('balance2 is :', balance2.balance);
    
}
async function tokenInfo() {
    const client = await CosmWasmClient.connect(config.RPC_ENDPOINT);
    let tokenInfo = await client.queryContractSmart(config.scAddr, {"token_info":{}});
    console.log('tokenInfo is :', tokenInfo);
}
async function minter() {
    const client = await CosmWasmClient.connect(config.RPC_ENDPOINT);
    let minter = await client.queryContractSmart(config.scAddr, {"minter":{}});
    console.log('minter is :', minter);
}
const allowance = async ()=>{
    const client = await CosmWasmClient.connect(config.RPC_ENDPOINT);
    let ret = await client.queryContractSmart(config.scAddr, {"allowance":{"owner":config.wallet.address, "spender":config.wallet2.address}});
    console.log('ret is :', ret);
}



//balanceOf();
//tokenInfo();
minter();
//allowance();