const { Account: account } = require('js-sero-client');
const core = require('js-sero-client/core');

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
   * 生成收款码
   * @param {string} pkStr 公钥
   * @returns {object} result 返回结果
   * @memberof Account
   */
  generatePKr(pkStr) {
    let pk = Buffer.alloc(64, pkStr, 'hex');
    const rnd = core.GetCZero().RandomU32();
    let keys = account.NewKeys(undefined, undefined, undefined, pk); //pk 可以直接用字符串(hex|base58)
    let pkr = keys.GenPKr(rnd);
    let pkr_hex = pkr.toString('hex');
    let pkr_base58 = pkr.ToBase58();
    return { pkr, pkr_hex, pkr_base58 };
  }

  /**
   * 获取地址余额 Promise
   * @param {string} pk 公钥
   * @returns {Promise<object>} balance 余额
   * @memberof Account
   */
  async getBalance(address) {
    try {
      const result = await this.seroRpc.post('', {
        jsonrpc: '2.0',
        method: 'exchange_getBalances',
        params: [address, 'latest'],
        id: 0,
      });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   * 获取充值记录
   *
   * @param {number} start_number 开始的块号
   * @param {number} end_number 结束的块号
   * @param {string} pk 收款码(PKr)|账户公钥(PK)|留空
   * @returns {Promise<object>} result
   * @memberof Account
   */
  async getRecords(start_number, end_number, pk) {
    try {
      const result = await this.seroRpc.post('', {
        jsonrpc: '2.0',
        method: 'exchange_getRecords',
        params: [start_number, end_number, pk],
        id: 0,
      });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }
}

module.exports = Account;
