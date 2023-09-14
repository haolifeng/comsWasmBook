const getsigner = require('./wallet');
const getsigner2 = require('./wallet2');
const config = require('./config');
const scTools = require('./scTools');

const f = async ()=> {
    let singer = await getsigner();

    let use2Addr = config.wallet2.address;
    let user1Addr = config.wallet.address;


    let msgData = {
            Right:{}
    }
    await scTools.exeucte(singer,config.mangeScAddr, Buffer.from(JSON.stringify(msgData)));
    //txHash: 73A8A000EBF7D3073A93A14F9DA7B27D02FF30518F7A92D8926318792070F275
    // two operation
    //txHash 5A827C2A04FEEF78C77C911EC625C5E1202483E8D539275D696717C188368B75
}
f();