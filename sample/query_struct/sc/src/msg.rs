use serde::{Deserialize, Serialize};
use cosmwasm_std::Addr;
#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct GreetResp {
    pub message: String,
}

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub enum  QueryMsg {
    Greet {},
    AdminsList {},
}

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct InstantiateMsg {
    pub admins: Vec<String>,
}

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct AdminsListResp  {
    pub admins: Vec<Addr>,
}