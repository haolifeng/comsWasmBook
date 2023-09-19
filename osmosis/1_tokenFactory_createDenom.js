const { osmosis, cosmos, getSigningOsmosisClient, cosmwasm } = require("osmojs");
const { createRPCQueryClient } = osmosis.ClientFactory;

const { getOfflineSignerAmino , getOfflineSignerProto} = require('cosmjs-utils');

const { chains } = require('chain-registry');

const {
    multiSend,
    send
} = cosmos.bank.v1beta1.MessageComposer.fromPartial;

const {
    createDenom,mint,burn,changeAdmin,setDenomMetadata,forceTransfer

} =  osmosis.tokenfactory.v1beta1.MessageComposer.withTypeUrl;

const {
    clearAdmin,
    executeContract,
    instantiateContract,
    migrateContract,
    storeCode,
    updateAdmin
} = cosmwasm.wasm.v1.MessageComposer.withTypeUrl;

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
    const signer = await getOfflineSignerProto({
        mnemonic,
        chain
    });

    console.log('singer : ', signer)

    const client = await getSigningOsmosisClient({
        rpcEndpoint:RPC_ENDPOINT,
        signer:signer // OfflineSigner
    });



    let createDenomMsg = createDenom({
        sender: address,
        subdenom: "HLFCoin"

    })

    const fee = {
        amount: [
            {
                denom: 'uosmo',
                amount: '8640'
            }
        ],
        gas: '2186364'
    };

    const response = await client.signAndBroadcast(address, [createDenomMsg], fee);
    console.log('response: ', response);
    /**
     * {
     *   code: 0,
     *   height: 2309642,
     *   events: [
     *     { type: 'coin_spent', attributes: [Array] },
     *     { type: 'coin_received', attributes: [Array] },
     *     { type: 'transfer', attributes: [Array] },
     *     { type: 'message', attributes: [Array] },
     *     { type: 'tx', attributes: [Array] },
     *     { type: 'tx', attributes: [Array] },
     *     { type: 'tx', attributes: [Array] },
     *     { type: 'message', attributes: [Array] },
     *     { type: 'create_denom', attributes: [Array] },
     *     { type: 'coin_spent', attributes: [Array] },
     *     { type: 'coin_received', attributes: [Array] },
     *     { type: 'transfer', attributes: [Array] },
     *     { type: 'message', attributes: [Array] },
     *     { type: 'tx', attributes: [Array] },
     *     { type: 'tx', attributes: [Array] },
     *     { type: 'tx', attributes: [Array] }
     *   ],
     *   rawLog: '[{"events":[{"type":"create_denom","attributes":[{"key":"creator","value":"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"},{"key":"new_token_denom","value":"factory/osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4/HLFCoin"}]},{"type":"message","attributes":[{"key":"action","value":"/osmosis.tokenfactory.v1beta1.MsgCreateDenom"}]}]}]',
     *   transactionHash: 'C66596BBAAF0FDDA46BD75CB0A33260A34FC3D7A893B46A946A06731DF5697D4',
     *   gasUsed: 1100664,
     *   gasWanted: 2186364
     * }
     *

     */

}
f();
//g();