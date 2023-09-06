const { getOfflineSignerAmino , getOfflineSignerProto} = require('cosmjs-utils');

const { chains } = require('chain-registry');
const config = require("./config");

let address = config.wallet.address;
let mnemonic = config.wallet.mnemonic;
const chain = chains.find(({ chain_name }) => chain_name === 'osmosis');

//console.log('chain: ', chain)
const getSigner = async ()=>{
    const signer = await getOfflineSignerProto({
        mnemonic,
        chain
    });
    return signer;

}

module.exports = getSigner;