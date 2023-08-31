# 合约调用send消息发送coin
原生代币被分配给其所有者，但可以根据其性质进行转移。区块链中有地址的所有东西都有资格拥有其本地代币。因此，代币可以分配给智能合约！

发送到智能合约的每条消息都可以附带一些资金。

## BankMsg

```
pub enum BankMsg {
    Send {
        to_address: String,
        amount: Vec<Coin>,
    },
    Burn { amount: Vec<Coin> },
} 

```
## Response

```
pub struct Response<T = Empty> {
    pub messages: Vec<SubMsg<T>>,
    pub attributes: Vec<Attribute>,
    pub events: Vec<Event>,
    pub data: Option<Binary>,
}
```

## sample
```
let messages = admins.into_iter().map(|admin| BankMsg::Send {
            to_address: admin.to_string(),
            amount: coins(donation_per_admin, &denom),
        });

        let resp = Response::new()
            .add_messages(messages)
            .add_attribute("action", "donate")
            .add_attribute("amount", donation.to_string())
            .add_attribute("per_admin", donation_per_admin.to_string());

        Ok(resp)
```