const getsigner = require('./wallet');
const getsigner2 = require('./wallet2');
const config = require('./config');
const scTools = require('./scTools');

const f = async ()=> {
    let singer = await getsigner();

    let use2Addr = config.wallet2.address;
    let user1Addr = config.wallet.address;


    let msgData = {
        reset:{ count: 10 }
    }
    await scTools.exeucte(singer,config.addrScAddr, Buffer.from(JSON.stringify(msgData)));
    //txhash: 5D3BB2429637F77C4FAD77F75DA1647E90433AA24B57EEC56A4278EA259F1844
}
f();