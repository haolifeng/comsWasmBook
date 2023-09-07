use serde::{Deserialize, Serialize};
use cosmwasm_std::Addr;
use schemars::JsonSchema;
use cosmwasm_schema::{cw_serde, QueryResponses};
/***************************** MSG */
#[cw_serde]
pub struct InstantiateMsg {
    pub admins: Vec<String>,
    pub donation_denom:String,
}


#[cw_serde]
#[derive(QueryResponses)]
pub enum  QueryMsg {
    #[returns(GreetResp)]
    Greet {},
    #[returns(AdminsListResp)]
    AdminsList {},
}

#[cw_serde]
pub enum ExecuteMsg {
    AddMembers { admins: Vec<String>},
    Leave {},
    Donate {}
}

/*-------------------------- RESP*/
#[cw_serde]
pub struct AdminsListResp  {
    pub admins: Vec<Addr>,
}

#[cw_serde]
pub struct GreetResp {
    pub message: String,
}
