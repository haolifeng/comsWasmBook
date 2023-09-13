const getsigner = require('./wallet');
const getsigner2 = require('./wallet2');
const config = require('./config');
const scTools = require('./scTools');

const f = async ()=> {
    let singer = await getsigner();

    let use2Addr = config.wallet2.address;
    let user1Addr = config.wallet.address;


    let msgData = {
            increment:{}
    }
    await scTools.exeucte(singer,config.addrScAddr, Buffer.from(JSON.stringify(msgData)));
    //txHash: 04557C0F563159F0879C392F2AD0D5E1FE20A682345BF1B8540F0377CF225AA2
}
f();