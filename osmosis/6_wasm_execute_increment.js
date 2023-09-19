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
const {Coin} = require("osmojs/dist/codegen/cosmos/base/v1beta1/coin");
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

    /** Sender is the that actor that signed the messages */
   // sender: string;
    /** Contract is the address of the smart contract */
  //  contract: string;
    /** Msg json encoded message to be passed to the contract */
   // msg: Uint8Array;
    /** Funds coins that are transferred to the contract on execution */
  //  funds: Coin[];

    let executeContractMsg = executeContract({
        sender:address,
        contract:"osmo1guvkz6e7xgvysr85kseskpl278eytk0nnn6ta0wmv8zpfmsc9r7q5f5lav",
        msg:Buffer.from('{"increment": {}}')
    })
    console.log('msg: ', executeContractMsg);
    const fee = {
        amount: [
            {
                denom: 'uosmo',
                amount: '8640'
            }
        ],
        gas: '3186364'
    };

    const response = await client.signAndBroadcast(address, [executeContractMsg], fee);
    console.log('response: ', response);
    /*
    *
response:  {
  code: 0,
  height: 2326251,
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
    { type: 'execute', attributes: [Array] },
    { type: 'wasm', attributes: [Array] },
    { type: 'coin_spent', attributes: [Array] },
    { type: 'coin_received', attributes: [Array] },
    { type: 'transfer', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] }
  ],
  rawLog: '[{"events":[{"type":"execute","attributes":[{"key":"_contract_address","value":"osmo1guvkz6e7xgvysr85kseskpl278eytk0nnn6ta0wmv8zpfmsc9r7q5f5lav"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgExecuteContract"},{"key":"module","value":"wasm"},{"key":"sender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"}]},{"type":"wasm","attributes":[{"key":"_contract_address","value":"osmo1guvkz6e7xgvysr85kseskpl278eytk0nnn6ta0wmv8zpfmsc9r7q5f5lav"},{"key":"method","value":"try_increment"}]}]}]',
  transactionHash: 'EDFD690DE82F015F16EBE294C443C1C6871F8AF172826CE2094188D74A4BC8C5',
  gasUsed: 137853,
  gasWanted: 3186364
}

    * */


}
f();