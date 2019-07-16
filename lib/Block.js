const BaseRpc = require('./BaseRpc');

class Block extends BaseRpc {
  constructor(seroRpc, isdebug) {
    super(seroRpc, isdebug);
  }

  /**
   *
   * 获得最新区块信息
   * @returns {Promise<object>} result 返回结果
   * @memberof Block
   */
  async getLastBlock() {
    try {
      const result = await this.seroRpc.post('', {
        jsonrpc: '2.0',
        method: 'exchange_getBlockByNumber',
        params: [],
        id: 1,
      });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   *
   *
   * @param {number} number 区块高度
   * @returns {Promise<object>} result 区块信息
   * @memberof Block
   */
  async getBlockByNumber(number) {
    try {
      const result = await this.seroRpc.post('', {
        jsonrpc: '2.0',
        method: 'exchange_getBlockByNumber',
        params: [number],
        id: 0,
      });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   *
   *
   * @param {object} out_root_list 数组
   * @param {string} SKr 字符串
   * @returns {Promise<object>} result  返回结果
   * @memberof Block
   */
  async getBlockDetail(out_root_list, SKr) {
    try {
      const result = await this.seroRpc.post('', {
        jsonrpc: '2.0',
        method: 'ssi_detail',
        params: [out_root_list, SKr],
        id: 1,
      });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }
  
  async getBlockByTxHash(txHash) {
    try {
      const result = await this.seroRpc.post('', {
        jsonrpc: '2.0',
        method: 'exchange_getTx',
        params: [txHash],
        id: 1,
      });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }


}

module.exports = Block;
