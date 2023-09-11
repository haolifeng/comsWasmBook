const getsigner = require('./wallet');
const getsigner2 = require('./wallet2');
const config = require('./config');
const scTools = require('./scTools');

const f = async ()=> {
    let singer = await getsigner();

    let use2Addr = config.wallet2.address;

    let msgData = {
        Mint:{
            sc:config.cw20ScAddr,
            recipient:use2Addr,
            amount:"11111"
        }
    }
    await scTools.exeucte(singer,config.scAddr, Buffer.from(JSON.stringify(msgData)));
}
f();