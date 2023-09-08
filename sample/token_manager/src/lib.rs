use cosmwasm_std::{
    entry_point, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult,
};

pub mod error;
pub mod state;
pub mod contract;
pub mod msg;

#[entry_point]
pub fn instantiate(deps: DepsMut, env: Env, info: MessageInfo, msg: Empty)
                   -> StdResult<Response>
{
    contract::instantiate(deps, env, info, msg)
}


#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg:ExecuteMsg) -> Result<Response, ContractError> {
    contract::execute(deps, env, info, msg)
}