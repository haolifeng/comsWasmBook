use cosmwasm_std::{
    coins, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult, Event, BankMsg,Addr, Uint128, WasmMsg,
    Reply,SubMsg, StdError
};
use serde::{Deserialize, Serialize};

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
        Right{} => exec::right(deps, info),
        Wrong {} => exec::wrong(deps, info),
    }
}
mod exec {
    use std::num::FpCategory::Subnormal;

    use super::*;

    #[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
    pub enum AddExecuteMsg {
        increment {},
        reset { count: i32 },
    }

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
    pub fn right(deps:DepsMut, info:MessageInfo)-> Result<Response, ContractError> {



        let add_increment_msg = to_binary(&AddExecuteMsg::increment {})?;
        let msg = WasmMsg::Execute {
            contract_addr: String::from("osmo1zsdyjgvytgecng6n9mc2u2p29s4wwsrwcd7jtghgkxtvgghq0mjsktawn8").to_owned(),
            msg: add_increment_msg,
            funds:vec![]
        };

        let summessage = SubMsg::reply_on_success( msg, 1);

        Ok(Response::new().add_submessage(summessage))
    }
    pub fn wrong(deps:DepsMut, info:MessageInfo)-> Result<Response,ContractError> {

        let add_increment_msg = to_binary(&AddExecuteMsg::increment {})?;

        let msg = WasmMsg::Execute {
            contract_addr: String::from("osmo1zsdyjgvytgecng6n9mc2u2p29s4wwsrwcd7jtghgkxtvgghq0mjsktawn8").to_owned(),
            msg: add_increment_msg,
            funds:vec![]
        };

        let summessage = SubMsg::reply_on_success(msg, 2);

        Ok(Response::new().add_submessage(summessage))

    }

}
pub fn reply(deps: DepsMut, _env: Env, reply: Reply) -> StdResult<Response> {
     match reply.id {
         1=> reply::right(deps, reply),
         2=> reply::wrong(deps, reply),
         id => Err(StdError::generic_err(format!("invalid reply id: {}", id))),
     }

}

mod reply {
    use  super::*;

    #[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
    pub enum EndExecuteMsg {
        Right {},
        Wrong {},
    }
    pub fn right(deps: DepsMut, msg: Reply)-> StdResult<Response> {

        let rigth_msg = to_binary(&EndExecuteMsg::Right {})?;
        let msg = WasmMsg::Execute {
            contract_addr:String::from("osmo1x2fmekv4gpjqgtqvsfdal9mzjth333p84fcf3n4s7cksrhu2ylhskd9y77").to_owned(),
            msg:rigth_msg,
            funds:vec![]
        };


        let event = Event::new("reply_right").add_attribute("action", "right");
        Ok(Response::new().add_message(msg).add_event(event))
    }
    pub fn wrong(deps:DepsMut, msg: Reply) -> StdResult<Response> {

        let wrong_msg = to_binary(&EndExecuteMsg::Wrong {})?;
        let msg = WasmMsg::Execute {
            contract_addr:String::from("osmo1x2fmekv4gpjqgtqvsfdal9mzjth333p84fcf3n4s7cksrhu2ylhskd9y77").to_owned(),
            msg:wrong_msg,
            funds:vec![]
        };


        let event = Event::new("reply_wrong").add_attribute("action", "wrong");
        Ok(Response::new().add_message(msg).add_event(event))

    }
}