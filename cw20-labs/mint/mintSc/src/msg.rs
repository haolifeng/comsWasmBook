use serde::{Deserialize, Serialize};
use cosmwasm_std::{Addr, Uint128};

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub enum  QueryMsg {
    Admin {},
}

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub enum ExecuteMsg {
    Mint { sc: Addr, recipient: Addr, amount: Uint128},
    Burn { sc:Addr, amount:Uint128 }
}

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct AdminResp {
    pub admin:Addr,
}