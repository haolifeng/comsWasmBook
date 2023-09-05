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

let scByteCodePath = "../base_query/artifacts/base_query.wasm";

const getSigner = require('./wallet');

const  {
    storecode, instantiate, exeucte
} = require('./scTools')
const fn_storecode = async (scByteCodePath) => {


    let singer = await getSigner();
    let fileContent = fs.readFileSync(scByteCodePath);
    storecode(singer, fileContent);

    /*
    * {
  code: 0,
  height: 2519931,
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
    { type: 'store_code', attributes: [Array] },
    { type: 'coin_spent', attributes: [Array] },
    { type: 'coin_received', attributes: [Array] },
    { type: 'transfer', attributes: [Array] },
    { type: 'message', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] },
    { type: 'tx', attributes: [Array] }
  ],
  rawLog: '[{"events":[{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgStoreCode"},{"key":"module","value":"wasm"},{"key":"sender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"}]},{"type":"store_code","attributes":[{"key":"code_checksum","value":"04aaad43d81b2824b849ef329a59102f136c4f0f3006f0f50ab59cee5e34079b"},{"key":"code_id","value":"3807"}]}]}]',
  transactionHash: 'BB2EFAE20EC75E541E4EA85367F742030951054264B29D1720783F13F7BB6B58',
  gasUsed: 1845024,
  gasWanted: 3186364
}

    * */


    }

fn_storecode(scByteCodePath)