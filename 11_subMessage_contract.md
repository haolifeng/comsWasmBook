# SubMessage
## replay进入点
```
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(deps: DepsMut, _env: Env, reply: Reply) -> StdResult<Response> 
```
### 参数说明
+ DepsMut和Env同instantiate

+ Reply参数
```

pub struct SubMsgResponse {
    pub events: Vec<Event>,
    pub data: Option<Binary>,
}

pub enum SubMsgResult {
    Ok(SubMsgResponse),
    Err(String),
}


pub struct Reply {

    pub id: u64,
    pub result: SubMsgResult,
}
```

# 使用步骤
## 1. SumMsg
```
pub struct SubMsg<T> {
    pub id: u64,                // reply_id that will be used to handle the reply
    pub msg: CosmosMsg<T>,      // message to be sent
    pub gas_limit: Option<u64>, // gas limit for the submessage
    pub reply_on: ReplyOn,      // a flag to determine when the reply should be sent
}
```

## 2. 创建SubMsg并发送
```
const INSTANTIATE_REPLY_ID = 1u64;

// Creating a message to create a new cw20 token
let instantiate_message = WasmMsg::Instantiate {
    admin: None,
    code_id: msg.cw20_code_id,
    msg: to_binary(&Cw20InstantiateMsg {
        name: "new token".to_string(),
        symbol: "nToken".to_string(),
        decimals: 6,
        initial_balances: vec![],
        mint: Some(MinterResponse {
            minter: env.contract.address.to_string(),
            cap: None,
        }),
    })?,
    funds: vec![],
    label: "".to_string(),
};

// Creating a submessage that wraps the message above
let submessage = SubMsg::reply_on_success(instantiate_message.into(), INSTANTIATE_REPLY_ID);

// Creating a response with the submessage
let response = Response::new().add_submessage(submessage);
```

## 3. 实现Replay进入点并处理返回值
```
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(deps: DepsMut, _env: Env, msg: Reply) -> StdResult<Response> {
    match msg.id {
        INSTANTIATE_REPLY_ID => handle_instantiate_reply(deps, msg),
        id => Err(StdError::generic_err(format!("Unknown reply id: {}", id))),
    }
}

fn handle_instantiate_reply(deps: DepsMut, msg: Reply) -> StdResult<Response> {
    let res = parse_reply_instantiate_data(msg)?;
    Ok(Response::new())
}
```

