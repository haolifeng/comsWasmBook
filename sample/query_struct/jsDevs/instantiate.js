const { instantiate } = require('./scTools');

const getSigner = require('./wallet');
const config = require('./config');
let codeId = config.code_id;

const f = async  ()=>{
    let signer = await getSigner();
    let msgData = {
        admins:[
            "osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4",
            "osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"
        ]
    }
    console.log('msgData: ', JSON.stringify(msgData))
    await instantiate(signer, codeId, Buffer.from(JSON.stringify(msgData)));
    /*
  rawLog: '[{"events":[{"type":"instantiate","attributes":[{"key":"_contract_address","value":"osmo165kgp558qrg2psnumfnqs7nvcg5qc5cthfujvvh5u7njv0p80wvqdd0mrw"},{"key":"code_id","value":"3808"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgInstantiateContract"},{"key":"module","value":"wasm"},{"key":"sender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"}]}]}]',
  transactionHash: '07D9C27C6B165CF4683D0C6F229333984745A90F3EAD0361400089CCE8F4E4D6',
    * */
}

f();