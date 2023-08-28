# 开发环境
## 安装Rust
### ubuntu和macos
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
安装后的位置在HOME/.cargo
### windows
下载rustup-init.exe， 安装即可

## 安装Wasm的rust编译器
```
rustup target add wasm32-unknown-unknown
```

## 测试模拟环境Wasmd安装

## 安装CosmWasm Rust Optimizer

### 安装docker
```
sudo apt install docker.io
```
### 安装 cargo-run-script

```
cargo install cargo-run-script
```

## 编译合约
使用cargo build命令编译合约
```
cargo build --target wasm32-unknown-unknown --release
```
为了方便在项目中配置合约
在项目中创建.cargo/config文件
```
[alias]
wasm = "build --target wasm32-unknown-unknown --release"
wasm-debug = "build --target wasm32-unknown-unknown"

```
现在使用**cargo wasm**进行编译。编译后的文件很大，需要优化
在项目中的Cargo.toml中添加

```
[package.metadata.scripts]
optimize = """sudo docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.14.0
"""
```
执行优化的编译

```
cargo run-script optimize
```