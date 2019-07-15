class Block {
  constructor(seroRpc, isdebug) {
    super(seroRpc, isdebug);
  }

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
   * @param {string} number 10进制的区块高度
   * @returns
   * @memberof Block
   */
  async getBlockByNumbers(start_point, end_point) {
    try {
      const blockNumber_start = `0x${Number.parseInt(start_point, '10').toString('16')}`;
      const blockNumber_end = `0x${Number.parseInt(end_point, '10').toString('16')}`;
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
