use serde::{Deserialize, Serialize};
use cosmwasm_std::Addr;

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub enum  QueryMsg {
    Admin {},
}

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct AdminResp {
    pub admin:Addr,
}