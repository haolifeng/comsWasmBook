const getSigner = require('./wallet');
const getSigner2 = require('./wallet2');
const config = require('./config');

const scTools = require('./scTools');
const {getOfflineSignerProto} = require("cosmjs-utils");



const f = async ()=>{
    let signer = await getSigner2();
    let user2Addr = config.wallet2.address;
    let msgData = {
        add_members:{
            admins:[
                user2Addr
            ]
        }
    }

    await scTools.exeucte(signer,config.scAddr, Buffer.from(JSON.stringify(msgData)) );
}
f();