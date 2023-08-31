# Entry points 合约进入点
smart contracts have a couple corresponding to different message types: instantiate, execute, query, sudo, migrate and more.

智能合约有几个对应于不同的消息类型：实例化、执行、查询、sudo、迁移等等。  
我们将使用三个基本的进入点（entry points):
+ instantiate 构造并初始化一个合约。
+ execute 处理改变合约状态的信息。
+ query 处理查询合约状态的信息。

在src/lib.rs文件中添加instantiate进入点
```
use cosmwasm_std::{
    entry_point, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult,
};

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: Empty,
) -> StdResult<Response> {
    Ok(Response::new())
}

```
## instantiate的参数：
+ deps: DepsMut 与外界沟通的工具类型。它允许查询，更新合约状态，查询其他合约状态，并提供对Api对象的访问权限，该对象具有用于处理CW地址的几个助手功能。
+ env: Env 代表区块链的状态，链高， ID， 当前的时间戳，以及被调用的地址。
+ info: MessageInfo 触发一个执行的消息的元数据-发送消息的地址， 随着消息的nativate tokens。
+ msg: Empty 消息的本身。

## 必要的属性装饰#[entry_point]  
它的目的是将整个入口点包装成 Wasm 运行时可以理解的形式。 正确的 Wasm 入口点只能使用 Wasm 规范本身支持的基本类型，Rust 结构和枚举不在此集合中。 使用这样的入口点会相当复杂，因此 CosmWasm 创建者提供了entry_point 宏。 它创建原始 Wasm 入口点，在内部调用修饰函数，并根据 Wasm 运行时传递的参数执行构建高级 Rust 参数所需的所有魔法。

## 返回值

StdResult< Response > 是 Result<Response, StdError> 的别名。返回入口点类型始终是 Result 类型，其中一些错误类型实现 ToString 特征，以及成功案例的定义良好的类型。 对于大多数入口点，“Ok”情况将是允许将合约拟合到我们的参与者模型中的响应类型。

# 进入点函数说明
## instantiate
```
pub fn instantiate(deps: DepsMut, env:Env, info: MessageInfo, msg: InstantiateMsg)
```
 ### DepsMut
 ```
 pub struct DepsMut<'a, C: CustomQuery = Empty> {
    pub storage: &'a mut dyn Storage,
    pub api: &'a dyn Api,
    pub querier: QuerierWrapper<'a, C>,
}
 ```
DepsMut 是一种用于与外部世界通信的实用程序类型 - 它允许查询和更新合约状态、查询其他合约状态，并提供对 Api 对象的访问以及几个用于处理 CW 地址的辅助函数。
 ### Env
 ```
 #[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Env {
    pub block: BlockInfo,

    pub transaction: Option<TransactionInfo>,
    pub contract: ContractInfo,
}
 ```
Env 是一个代表执行消息时区块链状态的对象 - 链高度和 ID、当前时间戳和调用的合约地址。
 ### MessageInfo
 ```

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct MessageInfo {

    pub sender: Addr,

    pub funds: Vec<Coin>,
}
 ```
 MessageInfo 包含有关触发执行的消息的元信息 - 发送消息的地址以及与消息一起发送的链本机令牌。
 ### InstantiateMsg
 这个InstantiateMsg是用户自定义的。在本样例中
 ```
 pub struct InstantiateMsg {
    pub admins: Vec<String>,
    pub donation_denom: String,
}
 ```
 传递admins的地址数组和denom的类型。