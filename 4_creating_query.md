# 查询
## serde
添加serde到我们的依赖中，它帮助我们序列化和反序列化查询消息。更新Cargo.toml:
```
[package]
name = "contract"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
cosmwasm-std = { version = "1.0.0-beta8", features = ["staking"] }
serde = { version = "1.0.103", default-features = false, features = ["derive"] }

[dev-dependencies]
cw-multi-test = "0.13.4"

```

## 在src/lib.rs中添加新的查询进入点

```
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo,
    Response, StdResult,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct QueryResp {
    message: String,
}

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: Empty,
) -> StdResult<Response> {
    Ok(Response::new())
}

#[entry_point]
pub fn query(_deps: Deps, _env: Env, _msg: Empty) -> StdResult<Binary> {
    let resp = QueryResp {
        message: "Hello World".to_owned(),
    };

    to_binary(&resp)
}

```
我们在查询时要返回一个结构，我们使用serde的Serialize和Deserialize对该结构进行序列化和反序列化。

## 改进消息
为消息添加参数，由Empty转为我们自定义的QueryMsg类型
```
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct QueryResp {
    message: String,
}

#[derive(Serialize, Deserialize)]
pub enum QueryMsg {
    Greet {},
}

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: Empty,
) -> StdResult<Response> {
    Ok(Response::new())
}

#[entry_point]
pub fn query(_deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    use QueryMsg::*;

    match msg {
        Greet {} => {
            let resp = QueryResp {
                message: "Hello World".to_owned(),
            };

            to_binary(&resp)
        }
    }
}

```
## 添加消息分发机制

```
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct GreetResp {
    message: String,
}

#[derive(Serialize, Deserialize)]
pub enum QueryMsg {
    Greet {},
}

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: Empty,
) -> StdResult<Response> {
    Ok(Response::new())
}

#[entry_point]
pub fn query(_deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    use QueryMsg::*;

    match msg {
        Greet {} => to_binary(&query::greet()?),
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
}

```

## 结构化合约
