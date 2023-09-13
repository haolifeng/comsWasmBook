const { instantiate } = require('./scTools');

const getSigner = require('./wallet');
const config = require('./config');
let codeId = config.addr_code_id;

const f = async  ()=>{
    let signer = await getSigner();
    let msgData = {
        count: 100
    }
    console.log('msgData: ', JSON.stringify(msgData))
    await instantiate(signer, codeId, Buffer.from(JSON.stringify(msgData)));
    /*

    * */
}

f();