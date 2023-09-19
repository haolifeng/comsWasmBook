const { osmosis, cosmos, getSigningOsmosisClient, cosmwasm, getSigningCosmosClient, getSigningCosmwasmClient } = require("osmojs");
const { createRPCQueryClient } = osmosis.ClientFactory;

const { getOfflineSignerAmino , getOfflineSignerProto} = require('cosmjs-utils');

const { chains } = require('chain-registry');

const {
    multiSend,
    send
} = cosmos.bank.v1beta1.MessageComposer.fromPartial;

const  { createDenom,mint,burn,changeAdmin,setDenomMetadata,forceTransfer } =  osmosis.tokenfactory.v1beta1.MessageComposer.withTypeUrl;

const {
    clearAdmin,
    executeContract,
    instantiateContract,
    migrateContract,
    storeCode,
    updateAdmin
} = cosmwasm.wasm.v1.MessageComposer.withTypeUrl;
const fs = require('fs');
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
    const chain = chains.find(({ chain_name }) => chain_name === 'osmosis');
    const signer = await getOfflineSignerProto({
        mnemonic,
        chain
    });

    console.log('singer : ', signer)

    const client = await getSigningCosmwasmClient({
        rpcEndpoint:RPC_ENDPOINT,
        signer:signer // OfflineSigner
    });


    /*
    * sender: string;
    /** Admin is an optional address that can execute migrations */
  //  admin: string;
    /** CodeID is the reference to the stored WASM code */
 //   codeId: bigint;
    /** Label is optional metadata to be stored with a contract instance. */
 //   label: string;
    /** Msg json encoded message to be passed to the contract on instantiation */
 //   msg: Uint8Array;
    /** Funds coins that are transferred to the contract on instantiation */
 //   funds: Coin[];
 //   * */
    let instantiateMsg = instantiateContract({
        sender:address,
        codeId: 3467,
        label:"haolifeng first test contract",
        msg:Buffer.from('{"count":100}'),



    })
    console.log('msg: ', instantiateMsg);
    const fee = {
        amount: [
            {
                denom: 'uosmo',
                amount: '8640'
            }
        ],
        gas: '3186364'
    };

    const response = await client.signAndBroadcast(address, [instantiateMsg], fee);
    console.log('response: ', response);
    /*
    *
response:  {
  code: 0,
  height: 2326091,
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
    { type: 'wasm', attributes: [Array] },
    { type: 'coin_spent', attributes: [Array] },
    { type: 'coin_received', attributes: [Array] },
    { type: 'transfer', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] }
  ],
  rawLog: '[{"events":[{"type":"instantiate","attributes":[{"key":"_contract_address","value":"osmo1guvkz6e7xgvysr85kseskpl278eytk0nnn6ta0wmv8zpfmsc9r7q5f5lav"},{"key":"code_id","value":"3467"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgInstantiateContract"},{"key":"module","value":"wasm"},{"key":"sender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"}]},{"type":"wasm","attributes":[{"key":"_contract_address","value":"osmo1guvkz6e7xgvysr85kseskpl278eytk0nnn6ta0wmv8zpfmsc9r7q5f5lav"},{"key":"method","value":"instantiate"},{"key":"owner","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"},{"key":"count","value":"100"}]}]}]',
  transactionHash: '143AC32F006BFDC163D95EBA04268AA196BA505819BDC895FF9DE50E6975FF5A',
  gasUsed: 173146,
  gasWanted: 3186364
}

    * */


}
f();