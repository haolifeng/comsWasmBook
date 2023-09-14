const config = require('./config')
const scTools = require('./scTools')

const getSinger = require('./wallet');
const getSigner2 = require('./wallet2');

const transfer = async ()=>{
    let signer = await getSinger();
    let toAddr = config.wallet2.address;

    let msgData = {
        transfer: {
            recipient: toAddr,
            amount:"11111"
        }
    }
    let strMsgData = JSON.stringify(msgData);
    console.log('msgData :', strMsgData);

    await scTools.exeucte(signer, config.scAddr, Buffer.from(strMsgData));

}
const mint = async ()=>{
    let signer = await getSinger();
    let toAddr = config.wallet2.address;

    let msgData = {
        mint: {
            recipient: toAddr,
            amount:"20000000000"
        }
    }
    let strMsgData = JSON.stringify(msgData);
    console.log('msgData :', strMsgData);

    await scTools.exeucte(signer, config.scAddr, Buffer.from(strMsgData));
}
const burn = async ()=>{
    let signer = await getSigner2();
   

    let msgData = {
        burn: {
            amount:"10000000000"
        }
    }
    let strMsgData = JSON.stringify(msgData);
    console.log('msgData :', strMsgData);

    await scTools.exeucte(signer, config.scAddr, Buffer.from(strMsgData));
}

const updateMint = async ()=> {
    let signer = await getSinger();
    let toAddr = config.wallet2.address;

    let msgData = {
        update_minter: {
            new_minter: "osmo1cwp06zegl87jmhuqrxrrgpwp04fulsngxv5x5pkf2rc4zewc8efsmk25ss",
            
        }
    }
    let strMsgData = JSON.stringify(msgData);
    console.log('msgData :', strMsgData);

    await scTools.exeucte(signer, config.scAddr, Buffer.from(strMsgData));
}


//transfer();
mint();
//burn();

//updateMint()

