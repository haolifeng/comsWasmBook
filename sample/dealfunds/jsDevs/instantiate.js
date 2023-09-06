const { instantiate } = require('./scTools');

const getSigner = require('./wallet');
const config = require('./config');
let codeId = config.code_id;

const f = async  ()=>{
    let signer = await getSigner();
    let msgData = {
        admins:[
            "osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4","osmo1vzhn4rjqv9crxcccxmr88h75a5thjtd22h26s2"
        ],
        donation_denom:"factory/osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4/HLFCoin"
    }
    console.log('msgData: ', JSON.stringify(msgData))
    await instantiate(signer, codeId, Buffer.from(JSON.stringify(msgData)));
    /*

    * */
}

f();