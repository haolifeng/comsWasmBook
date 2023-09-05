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
const config = require('./config')
let scByteCodePath = config.scByteCodePath;

const getSigner = require('./wallet');

const  {
    storecode, instantiate, exeucte
} = require('./scTools')
const fn_storecode = async (scByteCodePath) => {


    let singer = await getSigner();
    let fileContent = fs.readFileSync(scByteCodePath);
    storecode(singer, fileContent);

    /*
    *
    rawLog: '[{"events":[{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgStoreCode"},{"key":"module","value":"wasm"},{"key":"sender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"}]},{"type":"store_code","attributes":[{"key":"code_checksum","value":"3f0dcccec37c7fb2959562001b0813ff5526f2b2063b0bef5511d8e00ae8d2ce"},{"key":"code_id","value":"3808"}]}]}]',
        transactionHash: '4D48D940211FE6E5F0DF52B647B58465B764805C46C8E4BC098EEEBF8EBFF7D0',
*/
    }

fn_storecode(scByteCodePath)