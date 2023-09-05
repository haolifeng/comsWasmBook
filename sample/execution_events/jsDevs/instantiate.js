const { instantiate } = require('./scTools');

const getSigner = require('./wallet');
const config = require('./config');
let codeId = config.code_id;

const f = async  ()=>{
    let signer = await getSigner();
    let msgData = {
        admins:[
            "osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4",
        ]
    }
    console.log('msgData: ', JSON.stringify(msgData))
    await instantiate(signer, codeId, Buffer.from(JSON.stringify(msgData)));
    /*

    * */
}

f();