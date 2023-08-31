# 事件

## use
```
use cosmwasm_std:: { Event };
```
事件由两部分组成：事件类型和属性。 使用 add_attributes 或 add_attribute 将属性添加到事件。 属性是键值对。 由于事件不能包含任何列表，为了实现报告发生的多个相似操作，我们需要发出多个小事件而不是一个集体事件。

通过使用 add_event 或 add_events 调用将事件添加到Response中来发出事件。 此外，还可以将属性直接添加到响应中。默认情况下，每次执行都会发出一个标准的“wasm”事件。 向结果添加属性会将它们添加到默认事件。

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
use cosmwasm_std:: { Event };

let events = admins.iter().map(|admin| Event::new("admin_added").add_attribute("addr", admin));

        let resp = Response::new()
            .add_events(events)
            .add_attribute("action", "add_members")
            .add_attribute("added_count", admins.len().to_string());

```
## data
在response中还可以带有data。但基本无用。
