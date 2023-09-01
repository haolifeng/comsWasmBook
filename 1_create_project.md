# 创建项目
## 使用命令创建项目
```
cargo new --lib ./empty-contract
```
empty-contact  
-- src/lib.rs  
-- targe  
-- Cargo.toml
## 更新Cargo.toml文件

```
[package]
name = "contract"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[package.metadata.scripts]
optimize = """sudo docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.14.0
"""

[dependencies]
cosmwasm-std = { version = "1.0.0-beta8", features = ["staking"] }
```
+ 在[lib]增加crate-type为cdylib。表示这是一个web assembly二进制。不能被其他库使用。
+ 在[dependencies]中增加cosmwasm-std库。它是智能合约的标准库。

+ 添加[package.metadata.scripts]。 添加优化代码的执行脚本
## 添加依赖
 
```
cargo add cosmwasm-std
cargo add cosmwasm-schema
cargo add cosmwasm-storage
cargo add cw-storage-plus
cargo add schemars
cargo add serde
cargo add thiserror
```
