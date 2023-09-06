use serde::{Deserialize, Serialize};
use cosmwasm_std::Addr;

/***************************** MSG */
#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct InstantiateMsg {
    pub admins: Vec<String>,
    pub donation_denom:String,
}


#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub enum  QueryMsg {
    Greet {},
    AdminsList {},
}

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub enum ExecuteMsg {
    AddMembers { admins: Vec<String>},
    Leave {},
    Donate {}
}

/*-------------------------- RESP*/
#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct AdminsListResp  {
    pub admins: Vec<Addr>,
}

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct GreetResp {
    pub message: String,
}
