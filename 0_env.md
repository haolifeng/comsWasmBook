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