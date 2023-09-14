const getsigner = require('./wallet');
const getsigner2 = require('./wallet2');
const config = require('./config');
const scTools = require('./scTools');

const f = async ()=> {
    let singer = await getsigner();

    let use2Addr = config.wallet2.address;
    let user1Addr = config.wallet.address;


    let msgData = {
            Wrong:{}
    }
    await scTools.exeucte(singer,config.mangeScAddr, Buffer.from(JSON.stringify(msgData)));

}
f();