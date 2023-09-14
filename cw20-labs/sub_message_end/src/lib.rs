use cosmwasm_std::{
    entry_point, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult,
    Event
};
use serde::{Deserialize, Serialize};
use cosmwasm_std::{Addr, StdError};
use thiserror::Error;


#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub enum ExecuteMsg {
    Right {},
    Wrong {},
}

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    StdError(#[from] StdError),
    #[error("{sender} is not contract admin")]
    Unauthorized { sender: Addr },
}

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: Empty,
) -> StdResult<Response> {
    Ok(Response::new())
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> Result<Response, ContractError> {
    use ExecuteMsg::*;
    match msg {
        Right {} => exec::right(deps, info),
        Wrong {} => exec::wrong(deps,info),
    }
}

mod exec {
    use super::*;
    pub fn right(deps: DepsMut,
                 info: MessageInfo)-> Result<Response, ContractError> {
        let event = Event::new("end_right").add_attribute("action", "right");
        Ok(Response::new().add_event(event).add_attribute("name","haolifeng").add_attribute("nation", "chinese"))
    }
    pub fn wrong(deps: DepsMut,
                 info: MessageInfo) -> Result<Response, ContractError> {

        return Err(ContractError::StdError(StdError::GenericErr {msg:String::from("this is wrong ")}))
    }
}
