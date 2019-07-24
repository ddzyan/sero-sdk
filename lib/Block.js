const BaseRpc = require('./BaseRpc');

class Block extends BaseRpc {
  constructor(seroRpc, isdebug, jsonrpc, id) {
    super(seroRpc, isdebug);
    Object.assign(this, {
      jsonrpc,
      id
    });
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
        id: 1
      });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   *
   * 根据区块号获得交易hash
   * @param {number} number 区块高度
   * @returns {Promise<object>} result 区块信息
   * @memberof Block
   */
  async getBlockByNumber(number) {
    try {
      const result = await this.seroRpc.post('', { method: 'exchange_getBlockByNumber', params: [number], jsonrpc: this.jsonrpc, id: this.id });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   *
   * 根据区块高度区间，获取区块详细信息
   * @param {number} start_number 起始区块高度
   * @param {number} block_number 要查询的区块数量
   * @returns {Promise<object>} result 区块信息
   * @memberof Block
   */
  async getBlocksInfo(start_number, block_number) {
    try {
      const start_str = `0x${Number.parseInt(start_number, 10).toString(16)}`;
      const block_number_str = `0x${Number.parseInt(block_number, 10).toString(16)}`;
      const result = await this.seroRpc.post('', { method: 'ssi_getBlocksInfo', params: [start_str, block_number_str], jsonrpc: this.jsonrpc, id: this.id });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   * 获取对应Out的明文信息
   *
   * @param {object} out_root_list 数组
   * @param {string} SKr 字符串
   * @returns {Promise<object>} result  返回结果
   * @memberof Block
   */
  async getBlockDetail(out_root_list, SKr) {
    try {
      const result = await this.seroRpc.post('', { method: 'ssi_detail', params: [out_root_list, SKr], jsonrpc: this.jsonrpc, id: this.id });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   * 根据 hash 获取区块信息
   *
   * @param {string} txHash 交易Hash
   * @returns {Promise<object>} result  返回结果
   * @memberof Block
   */
  async getBlockByTxHash(txHash) {
    try {
      const result = await this.seroRpc.post('', { method: 'exchange_getTx', params: [txHash], jsonrpc: this.jsonrpc, id: this.id });
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }
}

module.exports = Block;
