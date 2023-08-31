# instantiate
```
pub fn instantiate(deps: DepsMut, env:Env, info: MessageInfo, msg: InstantiateMsg)
```
## DepsMut
 ```
 pub struct DepsMut<'a, C: CustomQuery = Empty> {
    pub storage: &'a mut dyn Storage,
    pub api: &'a dyn Api,
    pub querier: QuerierWrapper<'a, C>,
}
 ```
DepsMut 是一种用于与外部世界通信的实用程序类型 - 它允许查询和更新合约状态、查询其他合约状态，并提供对 Api 对象的访问以及几个用于处理 CW 地址的辅助函数。
## Env
 ```
 #[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Env {
    pub block: BlockInfo,

    pub transaction: Option<TransactionInfo>,
    pub contract: ContractInfo,
}
 ```
Env 是一个代表执行消息时区块链状态的对象 - 链高度和 ID、当前时间戳和调用的合约地址。
## MessageInfo
 ```

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct MessageInfo {

    pub sender: Addr,

    pub funds: Vec<Coin>,
}
 ```
 MessageInfo 包含有关触发执行的消息的元信息 - 发送消息的地址以及与消息一起发送的链本机令牌。
## InstantiateMsg
 这个InstantiateMsg是用户自定义的。在本样例中
 ```
 pub struct InstantiateMsg {
    pub admins: Vec<String>,
    pub donation_denom: String,
}
 ```
 传递admins的地址数组和denom的类型。

## 返回值
 ```
 Result<Response, ContractError> 
 ```
 其中Result为：
 ```

pub enum Result<T, E> {
    /// Contains the success value
    #[lang = "Ok"]
    #[stable(feature = "rust1", since = "1.0.0")]
    Ok(#[stable(feature = "rust1", since = "1.0.0")] T),

    /// Contains the error value
    #[lang = "Err"]
    #[stable(feature = "rust1", since = "1.0.0")]
    Err(#[stable(feature = "rust1", since = "1.0.0")] E),
}
 ```
 在样例中Err为定制的ContractError
 ```
 pub enum ContractError {
    #[error("{0}")]
    StdError(#[from] StdError),
    #[error("{sender} is not contract admin")]
    Unauthorized { sender: Addr},
    #[error("Payment error: {0}")]
    Payment(#[from] PaymentError),
}
 ```

# sample中instantiate逻辑

 ```
    let admins: StdResult<Vec<_>> = msg.admins.into_iter().map(|addr| deps.api.addr_validate(&addr)).collect();
    ADMINS.save(deps.storage, &admins?)?;
    DONATION_DENOM.save(deps.storage, &msg.donation_denom)?;
    Ok(Response::new())
 ```