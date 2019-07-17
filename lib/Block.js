const BaseRpc = require('./BaseRpc');

class Block extends BaseRpc {
  constructor(seroRpc, isdebug, jsonrpc, id) {
    super(seroRpc, isdebug);
    this.httpData = {
      jsonrpc,
      id,
    };
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
      const result = await this.seroRpc.post(
        '',
        Object.assign(this.httpData, { method: 'exchange_getBlockByNumber', params: [number] })
      );
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   *
   * 获取区块信息
   * @param {number} start_number 起始区块高度
   * @param {number} end_number 结束区块高度
   * @returns {Promise<object>} result 区块信息
   * @memberof Block
   */
  async getBlocksInfo(start_number, end_number) {
    try {
      const start_str = `0x${Number.parseInt(start_number, 10).toString(16)}`;
      const end_str = `0x${Number.parseInt(end_number, 10).toString(16)}`;
      const result = await this.seroRpc.post(
        '',
        Object.assign(this.httpData, { method: 'ssi_getBlocksInfo', params: [start_str, end_str] })
      );
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
      const result = await this.seroRpc.post(
        '',
        Object.assign(this.httpData, { method: 'ssi_detail', params: [out_root_list, SKr] })
      );
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
      const result = await this.seroRpc.post(
        '',
        Object.assign(this.httpData, { method: 'exchange_getTx', params: [txHash] })
      );
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }
}

module.exports = Block;
