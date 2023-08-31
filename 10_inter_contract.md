# 合约间交互
## 通过消息执行对方方法
### WasmMsg消息类型
```
pub enum WasmMsg {

    Execute {
        contract_addr: String,
        msg: Binary,
        funds: Vec<Coin>,
    },

    Instantiate {
        admin: Option<String>,
        code_id: u64,

        msg: Binary,
        funds: Vec<Coin>,

        label: String,
    },

    Instantiate2 {
        admin: Option<String>,
        code_id: u64,
       
        label: String,
        
       
        msg: Binary,
        funds: Vec<Coin>,
        salt: Binary,
    },

    Migrate {
        contract_addr: String,
        
        new_code_id: u64,

        msg: Binary,
    },

    UpdateAdmin {
        contract_addr: String,
        admin: String,
    },

    ClearAdmin { contract_addr: String },
}
```
### other函数

```
pub fn wasm_instantiate(
    code_id: u64,
    msg: &impl Serialize,
    funds: Vec<Coin>,
    label: String,
) -> StdResult<WasmMsg> {
    let payload = to_binary(msg)?;
    Ok(WasmMsg::Instantiate {
        admin: None,
        code_id,
        msg: payload,
        funds,
        label,
    })
}

/// Shortcut helper as the construction of WasmMsg::Instantiate can be quite verbose in contract code
pub fn wasm_execute(
    contract_addr: impl Into<String>,
    msg: &impl Serialize,
    funds: Vec<Coin>,
) -> StdResult<WasmMsg> {
    let payload = to_binary(msg)?;
    Ok(WasmMsg::Execute {
        contract_addr: contract_addr.into(),
        msg: payload,
        funds,
    })
}
```

## query 


### WasmQuery 
```
pub enum WasmQuery {

    Smart {
        contract_addr: String,
        /// msg is the json-encoded QueryMsg struct
        msg: Binary,
    },

    Raw {
        contract_addr: String,
        /// Key is the raw key used in the contracts Storage
        key: Binary,
    },
    
    ContractInfo { contract_addr: String },

    CodeInfo { code_id: u64 },
}
```
### 使用deps.querier.query查询

+ Deps
```
#[derive(Clone)]
pub struct Deps<'a, C: CustomQuery = Empty> {
    pub storage: &'a dyn Storage,
    pub api: &'a dyn Api,
    pub querier: QuerierWrapper<'a, C>,
}
```
+ example
```
fn get_collection_id_by_name(
   env: Env,
   deps: Deps,
   collection_name: String,
) -> Result<String, ContractError> {

   let query_response: CollectionIdResponse =  
        deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart {
         contract_addr: contract_address.to_string(),
         msg: to_binary(&query_msg)?,
        }))?;   
   Ok(query_response.collection_id)
}
```