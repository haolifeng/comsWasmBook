const { getOfflineSignerAmino , getOfflineSignerProto} = require('cosmjs-utils');

const { chains } = require('chain-registry');
const config = require("./config");

let address = config.wallet2.address;
let mnemonic = config.wallet2.mnemonic;
const chain = chains.find(({ chain_name }) => chain_name === 'osmosis');

//console.log('chain: ', chain)
const getSigner2 = async ()=>{
    const signer = await getOfflineSignerProto({
        mnemonic,
        chain
    });
    return signer;

}

module.exports = getSigner2;