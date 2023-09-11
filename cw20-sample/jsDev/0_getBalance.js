const {
    storecode, instantiate, exeucte, getBalance
} = require("./scTools");
const config = require('./config');
const f = async ()=>{
    let addres = config.wallet.address;
    await getBalance(addres);
    let user2 = config.wallet2.address;
    await getBalance(user2);

}

f();