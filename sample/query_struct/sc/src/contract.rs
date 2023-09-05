use crate::msg::{GreetResp, InstantiateMsg, QueryMsg,AdminsListResp};
use crate::state::ADMINS;
use cosmwasm_std::{
    to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult
};

pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response>{
    let admins: StdResult<Vec<_>> = msg.admins.into_iter().map(|addr| deps.api.addr_validate(&addr)).collect();
    ADMINS.save(deps.storage, &admins?)?;
    Ok(Response::new())
}

pub fn query(deps: Deps, _env: Env, msg:QueryMsg ) -> StdResult<Binary> {
    use QueryMsg::*;
    match msg {
        Greet {} => to_binary(&query::greet()?),
        AdminsList {} => to_binary(&query::admins_list(deps)?),

    }
}

mod query {
    use super::*;
    pub fn greet() -> StdResult<GreetResp> {
        let resp = GreetResp {
            message: "Hello World".to_owned(),
        };

        Ok(resp)
    }
    pub fn admins_list(deps: Deps)-> StdResult<AdminsListResp> {
        let admins = ADMINS.load(deps.storage)?;
        let resp = AdminsListResp { admins };
        Ok(resp)
    }
}