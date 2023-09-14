

use cosmwasm_std::{
    entry_point, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult,Reply
};

use msg::{ ExecuteMsg, QueryMsg};
use error::ContractError;

mod contract;
mod state;
mod msg;
mod error;


#[entry_point]
pub fn instantiate(deps: DepsMut, env: Env, info: MessageInfo, msg: Empty)
                   -> StdResult<Response> {
    contract::instantiate(deps, env,  info, msg)
}

#[entry_point]
pub fn query(deps: Deps, env: Env, msg: QueryMsg)-> StdResult<Binary> {
    contract::query(deps, env,msg)
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg:ExecuteMsg) -> Result<Response, ContractError> {
    contract::execute(deps, env, info, msg)

}
#[entry_point]
pub fn reply(deps: DepsMut, _env: Env, msg: Reply) -> StdResult<Response> {
    contract::reply(deps,_env, msg)
}
