use cosmwasm_std::{
    coins, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult, Event, BankMsg,Addr
};
use crate::state::ADMIN;
use crate::msg::{QueryMsg, AdminResp};

pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: Empty,
) -> StdResult<Response>{

    let admin  = &info.sender;
    ADMIN.save(deps.storage, admin);

    Ok(Response::new())
}

pub fn query(deps: Deps, _env: Env, msg:QueryMsg ) -> StdResult<Binary> {
    use QueryMsg::*;
    match msg {
        Admin {} => to_binary(&query::admin(deps)?),
    }
}

mod query {
    use super::*;
    pub fn admin(deps: Deps) -> StdResult<AdminResp> {
        let admin = ADMIN.load(deps.storage)?;
        let resp = AdminResp { admin};
        Ok(resp)
    }
}