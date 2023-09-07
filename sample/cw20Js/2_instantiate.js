const { instantiate } = require('./scTools');

const getSigner = require('./wallet');
const config = require('./config');
let codeId = config.code_id;


/*
*pub struct InstantiateMsg {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub initial_balances: Vec<Cw20Coin>,   //account
    pub mint: Option<MinterResponse>,
    pub marketing: Option<InstantiateMarketingInfo>,
}
* */
const f = async  ()=>{
    let signer = await getSigner();


    msgData = {
        name:"HaoToken",
        symbol:"HTO",
        decimals:18,
        initial_balances:[{
            address: "osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4", amount:"123456789"
        }, {
            address: "osmo1vzhn4rjqv9crxcccxmr88h75a5thjtd22h26s2", amount:"123456789"
        }],
        mint: {minter:"osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4", cap:"100000000000000000001"},
        marketing:{project:"haocompany", description:"goodcompany", marketing: "osmo1v6l9eda6mp49zzeaezd2lamdge04qtwhwfdae4"}


    };
    console.log('msgData: ', JSON.stringify(msgData))
    await instantiate(signer, codeId, Buffer.from(JSON.stringify(msgData)));
    /*

    * */
}

f();