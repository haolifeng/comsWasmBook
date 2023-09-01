use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo,
    Response, StdResult,
};
use serde::{Deserialize, Serialize};

use crate::msg::{GreetResp, QueryMsg};
#[derive(Serialize, Deserialize)]
struct QueryResp {
    message: String,
}
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: Empty,
) -> StdResult<Response> {
    Ok(Response::new())
}

pub fn query(_deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    use QueryMsg::*;

    match msg {
        Greet {} => to_binary(&query::greet()?),
    }
}

mod query {
    use super::*;
    pub fn greet()-> StdResult<GreetResp> {
        let resp = GreetResp {
            message: "Hello World".to_owned(),
        };
        Ok(resp)
    }

}

