const { instantiate } = require('./scTools');

const getSigner = require('./wallet');
let codeId = 3780;

const f = async  ()=>{
    let signer = await getSigner();
    await instantiate(signer, codeId, Buffer.from('{}'))
    /*
    * response:  {
  code: 0,
  height: 2457901,
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
  rawLog: '[{"events":[{"type":"instantiate","attributes":[{"key":"_contract_address","value":"osmo1g5v06m6j42mcdldz30slcxw6tg7yx440l5v2anzch7yd8ysq6gnstg6364"},{"key":"code_id","value":"3780"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgInstantiateContract"},{"key":"module","value":"wasm"},{"key":"sender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"}]}]}]',
  transactionHash: '8AC4EE1354E1EC53AF29F2550015A05B9D39997E9CB2B8660CD932921CBCBB42',
  gasUsed: 162570,
  gasWanted: 3186364

    * */
}

f();