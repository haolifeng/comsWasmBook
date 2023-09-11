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

*/
    }

fn_storecode(scByteCodePath)