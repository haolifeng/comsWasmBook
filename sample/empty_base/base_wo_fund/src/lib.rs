
use cosmwasm_std::{entry_point, DepsMut,Deps, Env, MessageInfo, Empty, StdResult, Response, Binary, to_binary};
use serde::{ Deserialize, Serialize};
#[entry_point]
pub fn instantiate(deps: DepsMut, env:Env, info: MessageInfo, msg:Empty) -> StdResult<Response> {
    Ok(Response::new())
}

#[derive(Serialize, Deserialize)]
struct QueryResp {
    message: String
}

#[entry_point]
pub fn query(dep:Deps, env:Env, msg:Empty) -> StdResult<Binary> {
    let resp = QueryResp {
        message: "Hellow World".to_owned(),
    };
    to_binary(&resp)
}

