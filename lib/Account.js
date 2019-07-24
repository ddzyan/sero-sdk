const { Account: account } = require('js-sero-client');
const core = require('js-sero-client/core');

const BaseRpc = require('./BaseRpc');

class Account extends BaseRpc {
  constructor(seroRpc, isdebug, jsonrpc, id) {
    super(seroRpc, isdebug);
    Object.assign(this, {
      jsonrpc,
      id
    });
  }

  /**
   * 创建账号
   * @param {string} text 账号种子
   * @returns {object} {sk,tk,pk,tk_base58,pk_base58,sk_base58} 账号信息
   * @memberof Account
   */
  createAccount(text) {
    const bufferSeed = Buffer.from(text, 'utf-8');
    const seedStr = bufferSeed.toString('hex');
    const seed = Buffer.alloc(32, seedStr, 'hex');
    const keys = account.NewKeys(seed); //seed 可以直接用字符串(hex|base58)
    const sk = keys.sk.toString('hex'); // 私钥
    const pk = keys.pk.toString('hex'); // 公钥
    const tk = keys.tk.toString('hex');
    const tk_base58 = keys.tk.ToBase58();
    const pk_base58 = keys.pk.ToBase58();
    const sk_base58 = keys.sk.ToBase58();

    return { seed: text, sk, tk, pk, tk_base58, pk_base58, sk_base58 };
  }

  /**
   * 生成收款码
   * @param {string} pkStr 公钥
   * @returns {object} result 返回结果
   * @memberof Account
   */
  generatePKr(pkStr) {
    const pk = Buffer.alloc(64, pkStr, 'hex');
    const rnd = core.GetCZero().RandomU32();
    const keys = account.NewKeys(undefined, undefined, undefined, pk); //pk 可以直接用字符串(hex|base58)
    const pkrBuffer = keys.GenPKr(rnd);
    const pkr = pkrBuffer.toString('hex');
    const pkrBase58 = pkrBuffer.ToBase58();
    return { pkr, rnd: rnd.toString('hex'), pkrBase58 };
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
        method: 'exchange_getMaxAvailable',
        params: [address, 'SERO'],
        jsonrpc: this.jsonrpc,
        id: this.id
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
      const result = await this.seroRpc.post('', { method: 'exchange_getRecords', params: [start_number, end_number, pk], jsonrpc: this.jsonrpc, id: this.id });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   * 根据私钥和prk随机数产生Skr
   *
   * @param {string} sk
   * @param {string} pkrRandom
   * @returns {string} skr_hex skr_hex
   * @memberof Account
   */
  generateSkr(sk, pkrRandom) {
    // skr前64 byte是sk，后32 byte其实是生成PKr的随机数
    const skBuffer64 = Buffer.alloc(64, sk, 'hex');
    const randomBuffer32 = Buffer.alloc(32, pkrRandom, 'utf8');

    const skrBuffer = Buffer.concat([skBuffer64, randomBuffer32]);
    const skr = skrBuffer.toString('hex');
    return skr;
  }

  /**
   * 清除锁定的UTXO状态
   *
   * @param {seedStr} pk 公钥
   * @returns {Promise<object>} result
   * @memberof Account
   */
  async clearUsedFlag(pk) {
    try {
      const result = await this.seroRpc.post('', { method: 'exchange_clearUsedFlag', params: [pk], jsonrpc: this.jsonrpc, id: this.id });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }
}

module.exports = Account;
