const getsigner = require('./wallet');
const getsigner2 = require('./wallet2');
const config = require('./config');
const scTools = require('./scTools');

const f = async ()=> {
    let singer = await getsigner();

    let use2Addr = config.wallet2.address;
    let user1Addr = config.wallet.address;
    let sc = config.scAddr;

    let msgData = {
        Mint:{
            sc:config.cw20ScAddr,
            recipient: sc,
            amount:"10000000000"
        }
    }
    await scTools.exeucte(singer,config.scAddr, Buffer.from(JSON.stringify(msgData)));
}
f();