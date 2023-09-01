const { getOfflineSignerAmino , getOfflineSignerProto} = require('cosmjs-utils');

const { chains } = require('chain-registry');
let address = "osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4";
let mnemonic = "drive organ stem speak melody spare ancient craft fun taste search identify girl object lesson write recall permit draw defy know brother pear coconut";
const chain = chains.find(({ chain_name }) => chain_name === 'osmosis');

console.log('chain: ', chain)
const getSigner = async ()=>{
    const signer = await getOfflineSignerProto({
        mnemonic,
        chain
    });
    return signer;

}

module.exports = getSigner;