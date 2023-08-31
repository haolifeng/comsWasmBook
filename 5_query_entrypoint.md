# Query
## query函数
```
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> 
```

## 参数说明
+ 同instantiate相比较，没有DepsMute。也就算不需要同外界交互,也没有MessageInfo。
+ Env, msg, 同instantiate。
+ Deps
```
#[derive(Clone)]
pub struct Deps<'a, C: CustomQuery = Empty> {
    pub storage: &'a dyn Storage,
    pub api: &'a dyn Api,
    pub querier: QuerierWrapper<'a, C>,
}
```
## 返回值

```
StdResult<Binary>
```
StdResult 是：
```
pub type StdResult<T> = core::result::Result<T, StdError>;
```

