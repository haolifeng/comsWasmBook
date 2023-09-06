const getSigner = require('./wallet');
const config = require('./config');

const scTools = require('./scTools');
const f = async ()=>{
    let signer = await getSigner();
    let user2Addr = config.wallet2.address;
    let msgData = {
        Donate:{}
    }
    let denom =  "factory/osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4/HLFCoin";
    let amount = '10000';

    await scTools.exeucteWithCustomCoin(signer,config.scAddr, Buffer.from(JSON.stringify(msgData)) ,denom, amount);
}
f();