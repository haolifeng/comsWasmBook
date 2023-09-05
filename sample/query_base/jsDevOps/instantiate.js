const { instantiate } = require('./scTools');

const getSigner = require('./wallet');
let codeId = 3807;

const f = async  ()=>{
    let signer = await getSigner();
    await instantiate(signer, codeId, Buffer.from('{}'))
    /*
 {
  code: 0,
  height: 2519958,
  events: [
    { type: 'coin_spent', attributes: [Array] },
    { type: 'coin_received', attributes: [Array] },
    { type: 'transfer', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'instantiate', attributes: [Array] },
    { type: 'coin_spent', attributes: [Array] },
    { type: 'coin_received', attributes: [Array] },
    { type: 'transfer', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] }
  ],
  rawLog: '[{"events":[{"type":"instantiate","attributes":[{"key":"_contract_address","value":"osmo1vtpmxctwn0lm7ptsyy2xm94zgd6hn4svyp6h8v49a4t2mknju54qy2ke8c"},{"key":"code_id","value":"3807"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgInstantiateContract"},{"key":"module","value":"wasm"},{"key":"sender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"}]}]}]',
  transactionHash: '8A124B56C7B3F35C158A2BBB0C517B8A141804D8B4360F9A1F9BF43F14BEF643',
  gasUsed: 162258,
  gasWanted: 3186364
}


    * */
}

f();