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


const getDenomMetadata = async () =>{
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT });
    let result = await client.cosmos.bank.v1beta1.denomMetadata({
        denom: "factory/osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4/HLFCoin"
    })
    console.log('result: ', result);
    console.log('result.metadata: denomUnits: ', result.metadata.denomUnits)
}

getDenomMetadata();