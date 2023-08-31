# 合约状态
## 依赖库
```
cw-storage-plus
```

## Item 

使用样例

```
#[derive(Serialize, Deserialize, PartialEq, Debug)]
struct Config {
    pub owner: String,
    pub max_tokens: i32,
}

// note const constructor rather than 2 functions with Singleton
const CONFIG: Item<Config> = Item::new("config");

fn demo() -> StdResult<()> {
    let mut store = MockStorage::new();

    // may_load returns Option<T>, so None if data is missing
    // load returns T and Err(StdError::NotFound{}) if data is missing
    let empty = CONFIG.may_load(&store)?;
    assert_eq!(None, empty);
    let cfg = Config {
        owner: "admin".to_string(),
        max_tokens: 1234,
    };
    CONFIG.save(&mut store, &cfg)?;
    let loaded = CONFIG.load(&store)?;
    assert_eq!(cfg, loaded);

    // update an item with a closure (includes read and write)
    // returns the newly saved value
    let output = CONFIG.update(&mut store, |mut c| -> StdResult<_> {
        c.max_tokens *= 2;
        Ok(c)
    })?;
    assert_eq!(2468, output.max_tokens);

    // you can error in an update and nothing is saved
    let failed = CONFIG.update(&mut store, |_| -> StdResult<_> {
        Err(StdError::generic_err("failure mode"))
    });
    assert!(failed.is_err());

    // loading data will show the first update was saved
    let loaded = CONFIG.load(&store)?;
    let expected = Config {
        owner: "admin".to_string(),
        max_tokens: 2468,
    };
    assert_eq!(expected, loaded);

    // we can remove data as well
    CONFIG.remove(&mut store);
    let empty = CONFIG.may_load(&store)?;
    assert_eq!(None, empty);

    Ok(())
}
```

## Map
```
#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
struct Data {
    pub name: String,
    pub age: i32,
}

const PEOPLE: Map<&str, Data> = Map::new("people");

fn demo() -> StdResult<()> {
    let mut store = MockStorage::new();
    let data = Data {
        name: "John".to_string(),
        age: 32,
    };

    // load and save with extra key argument
    let empty = PEOPLE.may_load(&store, "john")?;
    assert_eq!(None, empty);
    PEOPLE.save(&mut store, "john", &data)?;
    let loaded = PEOPLE.load(&store, "john")?;
    assert_eq!(data, loaded);

    // nothing on another key
    let missing = PEOPLE.may_load(&store, "jack")?;
    assert_eq!(None, missing);

    // update function for new or existing keys
    let birthday = |d: Option<Data>| -> StdResult<Data> {
        match d {
            Some(one) => Ok(Data {
                name: one.name,
                age: one.age + 1,
            }),
            None => Ok(Data {
                name: "Newborn".to_string(),
                age: 0,
            }),
        }
    };

    let old_john = PEOPLE.update(&mut store, "john", birthday)?;
    assert_eq!(33, old_john.age);
    assert_eq!("John", old_john.name.as_str());

    let new_jack = PEOPLE.update(&mut store, "jack", birthday)?;
    assert_eq!(0, new_jack.age);
    assert_eq!("Newborn", new_jack.name.as_str());

    // update also changes the store
    assert_eq!(old_john, PEOPLE.load(&store, "john")?);
    assert_eq!(new_jack, PEOPLE.load(&store, "jack")?);

    // removing leaves us empty
    PEOPLE.remove(&mut store, "john");
    let empty = PEOPLE.may_load(&store, "john")?;
    assert_eq!(None, empty);

    Ok(())
}

```

## IndexedMap
这个有的复杂

```
waiting
```