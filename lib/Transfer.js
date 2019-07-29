const { Tx: tx, Account: account } = require('js-sero-client');
const BaseRpc = require('./BaseRpc');

class Transfer extends BaseRpc {
  constructor(seroRpc, isdebug, jsonrpc, id) {
    super(seroRpc, isdebug);
    Object.assign(this, {
      jsonrpc,
      id
    });
  }
  /**
   * 签名
   * @memberof Transfer
   * @param {string} tx_parm 序列化后的交易内容
   * @param {string} text 签名种子
   * @returns {Promise<string>} hash 交易hash
   */
  signTx(tx_parm, text) {
    return new Promise((resolve, reject) => {
      const bufferSeed = Buffer.from(text, 'utf-8');
      const seedStr = bufferSeed.toString('hex');
      const seed = Buffer.alloc(32, seedStr, 'hex');
      const keys = account.NewKeys(seed);
      const sk = keys.sk.toString('hex');
      tx.SignTx(tx_parm, sk, (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }

  /**
   *
   *
   * @param {object} {
   *  Gas = 25000,
   *  GasPrice = 1000000000,
   *  From:账户的PK,
   *  RefundTo ='':找零收款码(PKr)，为空则自动生成,
   *  Receptions = []:接受者信息,
   *  Roots = []:需要使用哪些UTXO，空值代表自动选择
   * } 构建交易s参数
   * @returns
   * @memberof Transfer
   */
  async createTx({ Gas = 25000, GasPrice = 1000000000, From, Ins, Outs }) {
    try {
      const result = await this.seroRpc.post('', {
        method: 'ssi_genTx',
        params: [{ Gas, GasPrice, From, Ins, Outs }],
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
   *
   * 广播
   * @param {string} txHash 交易hash
   * @returns {Promise<object>} result 返回结果
   * @memberof Transfer
   */
  async broadcast(txHash) {
    try {
      const result = await this.seroRpc.post('', { method: 'ssi_commitTx', params: [txHash], jsonrpc: this.jsonrpc, id: this.id });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   * 根据txHash 获取交易详情
   *
   * @param {string} txHash
   * @returns {Promise<object>} result 返回结果
   * @memberof Transfer
   */
  async getTransactionReceipt(txHash) {
    try {
      const result = await this.seroRpc.post('', { method: 'sero_getTransactionReceipt', params: [txHash], jsonrpc: this.jsonrpc, id: this.id });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }
}

module.exports = Transfer;
