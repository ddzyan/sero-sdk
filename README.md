## 注意事项

不支持在 windows 环境下使用

## 操作

请注意先修改 sero.test.js 中的节点 IP 和 port

### 测试

```sh
npm i

npm test
```

## 功能

### Account

- 创建账号
- 创建收款地址
- 查询余额
- 获取充值记录
- 生成 skr

### Block

- 获取最新区块高度
- 根据区块号获得交易 hash
- 根据区块高度区间，获取区块详细信息
- 获取对应 Out 的明文信息
- 根据 hash 获取区块信息

### Transfer

- 构建交易
- 签名
- 创建交易

## 使用

请参考测试 demo
