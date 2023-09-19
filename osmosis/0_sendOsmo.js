const { osmosis, cosmos, getSigningOsmosisClient, cosmwasm } = require("osmojs");
const { createRPCQueryClient } = osmosis.ClientFactory;
const {
    clearAdmin,
    executeContract,
    instantiateContract,
    migrateContract,
    storeCode,
    updateAdmin
} = cosmwasm.wasm.v1.MessageComposer.withTypeUrl;
const { getOfflineSignerAmino , getOfflineSignerProto} = require('cosmjs-utils');

const { chains } = require('chain-registry');

const {
    multiSend,
    send
} = cosmos.bank.v1beta1.MessageComposer.fromPartial;

const {
    createDenom,mint,burn,changeAdmin,setDenomMetadata,forceTransfer

} =  osmosis.tokenfactory.v1beta1.MessageComposer.withTypeUrl;


let RPC_ENDPOINT = "https://rpc.osmotest5.osmosis.zone";

let address = "osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4";
let mnemonic = "drive organ stem speak melody spare ancient craft fun taste search identify girl object lesson write recall permit draw defy know brother pear coconut"

let toMnemonic = "swamp evolve wire grunt resource twice glimpse elevator solution fresh that arrive amazing wish inhale kick rescue law visa glow obscure ignore casual news";
let toAddress  = "osmo1vzhn4rjqv9crxcccxmr88h75a5thjtd22h26s2"

const getBalance  = async (_address)=>{
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT });
    const balance = await client.cosmos.bank.v1beta1
        .allBalances({ address: _address });
    console.log("address: ",_address ,  '- balance: ', balance);
}
const g = async ()=>{
    await getBalance(address);
    await getBalance(toAddress);
}

const f = async ()=>{

    //const mnemonic = 'unfold client turtle either pilot stock floor glow toward bullet car science';
    const chain = chains.find(({ chain_name }) => chain_name === 'osmosis');

    console.log('chain: ', chain)
    const signer = await getOfflineSignerProto({
        mnemonic,
        chain
    });

    console.log('singer : ', signer)

    const client = await getSigningOsmosisClient({
        rpcEndpoint:RPC_ENDPOINT,
        signer:signer // OfflineSigner
    });

    const msg = send({
        amount: [
            {
                denom: 'uosmo',
                amount: '1000000'
            }
        ],
        toAddress: toAddress,
        fromAddress: address
    });

    const fee = {
        amount: [
            {
                denom: 'uosmo',
                amount: '864'
            }
        ],
        gas: '186364'
    };

   // const response = await client.signAndBroadcast(address, [msg], fee);
  //  console.log('response: ', response);
    /**
     * 
     * {
  code: 0,
  height: 2309218,
  events: [
    { type: 'coin_spent', attributes: [Array] },
    { type: 'coin_received', attributes: [Array] },
    { type: 'transfer', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'coin_spent', attributes: [Array] },
    { type: 'coin_received', attributes: [Array] },
    { type: 'transfer', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'coin_spent', attributes: [Array] },
    { type: 'coin_received', attributes: [Array] },
    { type: 'transfer', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] }
  ],
  rawLog: '[{"events":[{"type":"coin_received","attributes":[{"key":"receiver","value":"osmo1vzhn4rjqv9crxcccxmr88h75a5thjtd22h26s2"},{"key":"amount","value":"1000000uosmo"}]},{"type":"coin_spent","attributes":[{"key":"spender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"},{"key":"amount","value":"1000000uosmo"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmos.bank.v1beta1.MsgSend"},{"key":"sender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"},{"key":"module","value":"bank"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"osmo1vzhn4rjqv9crxcccxmr88h75a5thjtd22h26s2"},{"key":"sender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"},{"key":"amount","value":"1000000uosmo"}]}]}]',
  transactionHash: '49E288D309C9E82064AF1F03326340B8C741DEB0F4CF99AA8CBB11198F0C045D',
  gasUsed: 91772,
  gasWanted: 186364
}

     */

}
f();
//g();