const { Account: account } = require('js-sero-client');

const BaseRpc = require('./BaseRpc');

class Account extends BaseRpc {
  constructor(seroRpc, isdebug) {
    super(seroRpc, isdebug);
  }

  /**
   * 创建账号
   * @param {string} text 账号种子
   * @returns {object} {sk,tk_hex,pk,tk_base58,pk_base58} 账号信息
   * @memberof Account
   */
  createAccount(text) {
    const bufferSeed = Buffer.from(text, 'utf-8');
    const seedStr = bufferSeed.toString('hex');
    let seed = Buffer.alloc(32, seedStr, 'hex');
    let keys = account.NewKeys(seed); //seed 可以直接用字符串(hex|base58)
    let sk = keys.sk.toString('hex'); // 私钥
    let tk_hex = keys.tk.toString('hex');
    let tk_base58 = keys.tk.ToBase58();
    let pk = keys.pk.toString('hex'); // 公钥
    let pk_base58 = keys.pk.ToBase58();

    return { sk, tk_hex, pk, tk_base58, pk_base58 };
  }

  /**
   * 获取地址余额 Promise
   * @param {string} address 地址
   * @returns {Promise<object>} balance 余额
   * @memberof Account
   */
  async getBalance(address) {
    try {
      const result = await this.seroRpc.post('', {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 67,
      });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }
}

module.exports = Account;
