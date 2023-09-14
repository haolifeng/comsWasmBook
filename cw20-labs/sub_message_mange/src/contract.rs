use cosmwasm_std::{
    coins, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult, Event, BankMsg,Addr, Uint128, WasmMsg
};


use crate::state::ADMIN;
use crate::msg::{QueryMsg, AdminResp, ExecuteMsg};
use crate::error::ContractError;

use cw20::Cw20ExecuteMsg::{Mint, Burn};


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

pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
)-> Result<Response, ContractError> {
    use ExecuteMsg::*;
    match msg {
        Mint {sc,recipient, amount} => exec::mint(deps, info,sc, recipient, amount),
        Burn {sc, amount} => exec::burn(deps, info, sc,amount),
    }
}
mod exec {
    use super::*;
    pub fn mint(deps:DepsMut, info:MessageInfo, sc:Addr, recipient: Addr, amount:Uint128)-> Result<Response, ContractError> {
        let admin = ADMIN.load(deps.storage)?;
        if (admin != info.sender){
            return Err(ContractError::Unauthorized {sender: info.sender});
        }

        let mintMsg = to_binary(&Mint {
            recipient:recipient.to_string(),
            amount:amount
        });
        let msg = WasmMsg::Execute {
            contract_addr: sc.to_string(),
            msg: mintMsg?,
            funds:vec![]
        };
        Ok(Response::new()
            .add_attribute("action", "mint")
            .add_attribute("sc",sc)
            .add_attribute("receipient", recipient)
            .add_attribute("amount", amount).add_message(msg)
        )

    }
    pub fn burn(deps:DepsMut, info:MessageInfo, sc:Addr,  amount:Uint128) -> Result<Response, ContractError> {

        let burnMsg = to_binary(&Burn{
            amount:amount
        });
        let msg = WasmMsg::Execute {
            contract_addr:sc.to_string(),
            msg:burnMsg?,
            funds:vec![]
        };


        Ok(Response::new().add_attribute("action", "burn").add_attribute("sc", sc).add_attribute("amount", amount).add_message(msg))
    }

}