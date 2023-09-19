const { osmosis, cosmos, getSigningOsmosisClient } = require("osmojs");
const { createRPCQueryClient } = osmosis.ClientFactory;

const { getOfflineSignerAmino , getOfflineSignerProto} = require('cosmjs-utils');

const { chains } = require('chain-registry');
const {Coin} = require("osmojs/dist/codegen/cosmos/base/v1beta1/coin");

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
    const signer = await getOfflineSignerProto({
        mnemonic,
        chain
    });

    console.log('singer : ', signer)

    const client = await getSigningOsmosisClient({
        rpcEndpoint:RPC_ENDPOINT,
        signer:signer // OfflineSigner
    });

    let mintMsg = mint({
        sender: address,
       // amount: "100000000000factory/osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4/HLFCoin",
        amount:  {
            denom: "factory/osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4/HLFCoin",
            amount: '100000000000'
        },
        mintToAddress: address
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

    const response = await client.signAndBroadcast(address, [mintMsg], fee);
    console.log('response: ', response);
    /**

     * https://testnet.mintscan.io/osmosis-testnet/txs/CE2C12274C0024846D6D22DE354BE99A98DB0DD80A1379DE17A3D1A86A07DF1D?height=2310275

     */

}
f();
//g();