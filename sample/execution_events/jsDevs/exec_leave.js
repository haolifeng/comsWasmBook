const getSigner = require('./wallet');
const config = require('./config');

const scTools = require('./scTools');
const f = async ()=>{
    let signer = await getSigner();
    let user2Addr = config.wallet2.address;
    let msgData = {
        Leave:{}
    }

    await scTools.exeucte(signer,config.scAddr, Buffer.from(JSON.stringify(msgData)) );
}
f();