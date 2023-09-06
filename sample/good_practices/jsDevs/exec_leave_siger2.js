const getSigner = require('./wallet');
const getSigner2 = require('./wallet2');
const config = require('./config');

const scTools = require('./scTools');
const f = async ()=>{
    let signer = await getSigner2();

    let msgData = {
        leave:{}
    }

    await scTools.exeucte(signer,config.scAddr, Buffer.from(JSON.stringify(msgData)) );
}
f();