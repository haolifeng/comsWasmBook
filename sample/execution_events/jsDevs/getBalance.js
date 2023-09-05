const {
    storecode, instantiate, exeucte, getBalance
} = require("./scTools");
const config = require('./config');
const f = async ()=>{
    addres = config.wallet.address;
    await getBalance(addres);

}

f();