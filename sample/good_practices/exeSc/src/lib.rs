use cosmwasm_std::{
    entry_point, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult,
};
use msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::error::ContractError;


pub mod msg;
pub mod contract;
pub mod state;
pub mod error;

#[entry_point]
pub fn instantiate(deps: DepsMut, env: Env, info: MessageInfo, msg: InstantiateMsg)
                   -> StdResult<Response>
{
    contract::instantiate(deps, env, info, msg)
}

#[entry_point]
pub fn query(deps: Deps, env: Env, msg: msg::QueryMsg)
             -> StdResult<Binary>
{
    contract::query(deps, env, msg)
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg:ExecuteMsg) -> Result<Response, ContractError> {
    contract::execute(deps, env, info, msg)
}

