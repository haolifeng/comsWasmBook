use serde::{Deserialize, Serialize};
use cosmwasm_std::Addr;
use schemars::JsonSchema;
use cosmwasm_schema::{cw_serde, QueryResponses};


#[cw_serde]
pub enum ExecuteMsg {
    Mint { recipient: String, amount: Uint128 },
    
}