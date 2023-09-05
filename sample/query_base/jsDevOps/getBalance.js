const {
    storecode, instantiate, exeucte, getBalance
} = require("./scTools");

const f = async ()=>{
    addres = "osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4";
    await getBalance(addres);

}

f();