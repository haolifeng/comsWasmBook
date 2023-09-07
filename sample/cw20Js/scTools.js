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
const config = require('./config');

let RPC_ENDPOINT = config.RPC_ENDPOINT;

//RPC_ENDPOINT = "https://rpc.testnet.osmosis.zone"
const storecode = async (signer , fileContent) => {

    let accounts = await signer.getAccounts();

    console.log('accounts: ', accounts);
    let admin = accounts[0];

    let storecodeMsg = storeCode({
        sender:admin.address,
        wasmByteCode:fileContent
    })

    const client = await getSigningCosmwasmClient({
        rpcEndpoint:RPC_ENDPOINT,
        signer:signer // OfflineSigner
    });

    const fee = {
        amount: [
            {
                denom: 'uosmo',
                amount: '50000'
            }
        ],
        gas: '8000000'
    };

    const response = await client.signAndBroadcast(admin.address, [storecodeMsg], fee);
    console.log('response: ', response);
}
const instantiate = async (signer, codeId, msgBuff) => {

    let accounts = await signer.getAccounts();

    console.log('accounts: ', accounts);
    let admin = accounts[0];


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
            sender:admin.address,
            codeId: codeId,
            label:"haolifeng first test contract",
            msg:msgBuff,



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

    const response = await client.signAndBroadcast(admin.address, [instantiateMsg], fee);
    console.log('response: ', response);
}


const exeucte = async (signer, scAddr, msgBuff) => {

    let accounts = await signer.getAccounts();

    console.log('accounts: ', accounts);
    let admin = accounts[0];

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
            sender:admin.address,
            contract:scAddr,
            msg:msgBuff
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

    const response = await client.signAndBroadcast(admin.address, [executeContractMsg], fee);
    console.log('response: ', response);

}

const exeucteWithCustomCoin = async (signer, scAddr, msgBuff, denom, amount) => {

    let accounts = await signer.getAccounts();

    console.log('accounts: ', accounts);
    let admin = accounts[0];

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
            sender:admin.address,
            contract:scAddr,
            msg:msgBuff,
            funds:[{
                denom: denom,
                amount: amount
            }]
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

    const response = await client.signAndBroadcast(admin.address, [executeContractMsg], fee);
    console.log('response: ', response);

}
const getBalance  = async (_address)=>{
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT });
    const balance = await client.cosmos.bank.v1beta1
        .allBalances({ address: _address });
    console.log("address: ",_address ,  '- balance: ', balance);

}

module.exports = {
    storecode, instantiate, exeucte, getBalance, exeucteWithCustomCoin
}