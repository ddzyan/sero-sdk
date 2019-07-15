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
        method: 'eth_blockNumber',
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
   * @param {string} start_point 10进制的区块高度
   * @param {string} end_point 10进制的区块高度
   * @returns {Promise<object>} result 区块信息
   * @memberof Block
   */
  async getBlockByNumbers(start_point, end_point) {
    try {
      const blockNumber_start = `0x${Number.parseInt(start_point, 10).toString(16)}`;
      const blockNumber_end = `0x${Number.parseInt(end_point, 10).toString(16)}`;
      const result = await this.seroRpc.post('', {
        jsonrpc: '2.0',
        method: 'ssi_getBlocksInfo',
        params: [blockNumber_start, blockNumber_end],
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
}

module.exports = Block;
