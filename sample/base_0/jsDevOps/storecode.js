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

let scByteCodePath = "../base_wo_fund/artifacts/base_wo_fund.wasm";

const getSinger = require('./wallet');
const fn_storecode = async (scByteCodePath) => {
    let singer = await getSinger();
    let fileContent = fs.readFileSync(scByteCodePath);
    let accounts = await singer.getAccounts();

    console.log('accounts: ', accounts);
    let admin = accounts[0];

    let storecodeMsg = storeCode({
        sender:admin.address,
        wasmByteCode:fileContent
    })

    const client = await getSigningCosmwasmClient({
        rpcEndpoint:RPC_ENDPOINT,
        signer:singer // OfflineSigner
    });

    const fee = {
        amount: [
            {
                denom: 'uosmo',
                amount: '8640'
            }
        ],
        gas: '3186364'
    };

    const response = await client.signAndBroadcast(admin.address, [storecodeMsg], fee);
    console.log('response: ', response);
    /*
    response:  {
        code: 0,
            height: 2457460,
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
            rawLog: '[{"events":[{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgStoreCode"},{"key":"module","value":"wasm"},{"key":"sender","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"}]},{"type":"store_code","attributes":[{"key":"code_checksum","value":"82291ba03368fa484221063c782c5d784c3b405f2d3bbdff94b7147874befc39"},{"key":"code_id","value":"3780"}]}]}]',
            transactionHash: 'CF1B822E6FBEC8C93D7A30CC7AECEE1C651D4587E040CFBC90E748D8CD77D7A8',
            gasUsed: 1824926,
            gasWanted: 3186364

*/
    }

fn_storecode(scByteCodePath)