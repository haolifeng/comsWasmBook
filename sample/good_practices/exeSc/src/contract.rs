use crate::error::ContractError;
use crate::msg::{GreetResp, InstantiateMsg, QueryMsg,AdminsListResp, ExecuteMsg};
use crate::state::{ADMINS, DONATION_DENOM};
use cosmwasm_std::{
    coins, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult, Event, BankMsg,
};

pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response>{
    let admins: StdResult<Vec<_>> = msg.admins.into_iter().map(|addr| deps.api.addr_validate(&addr)).collect();
    ADMINS.save(deps.storage, &admins?)?;
    DONATION_DENOM.save(deps.storage, &msg.donation_denom)?;
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

pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
)-> Result<Response, ContractError> {
    use ExecuteMsg::*;
    match msg {
        AddMembers { admins} => exec::add_members(deps, info,admins),
        Leave {} => exec::leave(deps, info).map_err(Into::into),
        Donate {} => exec::donate(deps, info),
    }
}

mod exec {
    use cosmwasm_std::StdError;
    use super::*;
    pub fn add_members(deps: DepsMut,
                        info: MessageInfo,
                        admins: Vec<String>,)-> Result<Response, ContractError> {
        let mut curr_admins = ADMINS.load(deps.storage)?;
        if !curr_admins.contains(&info.sender) {
            return Err(ContractError::Unauthorized{ sender: info.sender});
        }

        let events = admins.iter().map(|admin| Event::new("admin_added").add_attribute("addr", admin));

        let resp = Response::new().add_events(events).add_attribute("action", "add_members").add_attribute("added_count", admins.len().to_string());


        let admins: StdResult<Vec<_>> = admins.into_iter().map(|addr| deps.api.addr_validate(&addr)).collect();
        curr_admins.append(&mut admins?);
        ADMINS.save(deps.storage, &curr_admins)?;

        Ok(resp)

    }
    pub fn leave(deps:DepsMut, info: MessageInfo) -> Result<Response, ContractError>{
        ADMINS.update(deps.storage, move |admins|-> StdResult<_> {
            let admins = admins.into_iter().filter(|admin| * admin != info.sender).collect();
            Ok(admins)
        })?;
        Ok(Response::new())
    }

    pub fn donate(deps: DepsMut, info: MessageInfo) -> Result<Response, ContractError> {
        let denom = DONATION_DENOM.load(deps.storage)?;
        let admins = ADMINS.load(deps.storage)?;

        let donation = cw_utils::must_pay(&info, &denom)?.u128();
        let donation_per_admin = donation / (admins.len() as u128);

        let messages = admins.into_iter().map(|admin| BankMsg::Send {
            to_address: admin.to_string(),
            amount: coins(donation_per_admin, &denom)
        });
        let resp = Response::new().add_messages(messages)
            .add_attribute("action", "donate")
            .add_attribute("amount", donation.to_string())
            .add_attribute("per_admin", donation_per_admin.to_string());
        Ok(resp)
    }

}