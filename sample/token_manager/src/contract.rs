use crate::error::ContractError;

use crate::state::{ADMIN};
use crate::msg::{ ExecuteMsg};

use cosmwasm_std::{
    coins, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult, Event, BankMsg,
};

pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: Empty,
) -> StdResult<Response>{
    
    ADMIN.save(deps.storage, &info.sender)?;
    
    Ok(Response::new())
}

pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
)-> Result<Response, ContractError> {
    use ExecuteMsg::*;
    match msg {
        Mint {recipient, amount} => exec::mint(deps, info, recipient, amount)
    }
}

mod exec {
    use cosmwasm_std::{DepsMut, MessageInfo};

    use crate::error::ContractError;

    pub fn mint(deps:DepsMut, info: MessageInfo, recipient:String, amount:u128) -> Result<Response, ContractError> {
        Ok(Response::new())
    }
}