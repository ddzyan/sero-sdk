const { Tx: tx, Account: account } = require('js-sero-client');
const BaseRpc = require('./BaseRpc');

class Transfer extends BaseRpc {
  constructor(seroRpc, isdebug, jsonrpc, id) {
    super(seroRpc, isdebug);
    this.httpData = {
      jsonrpc,
      id,
    };
  }
  /**
   * 签名
   * @memberof Transfer
   * @param {string} tx_parm 序列化后的交易内容
   * @param {string} seedStr 签名种子
   * @returns {Promise<string>} hash 交易hash
   */
  signTx(tx_parm, seedStr) {
    return new Promise((resolve, reject) => {
      /*      const txParamStr =
        '{"Gas":25000,"GasPrice":1000000000,"From":{"SKr":"0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","PKr":"0x65f577e2bf871108ca34b16a9559af644f5ce9df198ea2a846836fa45c9b602cc3c2b5c28766c639b3ff14331b0a61a14ce180299c33475abf11e845d3238f20a5ac694b5caf937daeac748fe30096aa57ab6931a359c9c7d94b740ad09bf320"},"Ins":[{"SKr":"0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","Out":{"Root":"0x224013f83250b293c0ee8871f61e1637eeb1fc2ed449a1943a24a77bb6cf5d1c","State":{"OS":{"Index":69,"Out_O":null,"Out_Z":{"AssetCM":"0x6bf6baba3f4805d0e8f8ee7a956a4b2411d804dcb47a6e1d32578fd91aed9318","OutCM":"0x080c31c80d3bbbd0aab1a01d6a8aad6dda6e7e5019160c7aec2293e8b14f478f","RPK":"0x739342f3bddc45ecd43ac8cdcd384bf8adf04ab5794846d316762d102a01c94d","EInfo":"0x4043e110701d2c483164af75ee90f66832f7a4947e93d95dff39dcd1dee22e8bb431e38b55764ffb315be40ac419a2e4e2323e52938028bdb77c2c8ac8ec24bf4f39c2d64cee4d8f80142bbc882e022ecb0069558ee086044918ac92ea529bea7bdc8c219f5f0db027a0e9b94b4e7e353e84bd44920f3a100a062aacb25e649d128b9db6e47f9bceafd51e89e4d005e1a35a243f10e32878dab80c93562ce29a568b5b0769ca150840eeb66920824509aacfe5653a84e6e334e70f96a483cd7a6c3013e4af90e8afb46e27721dbc0c2d1253027c55702602da643f880c1cf6cf","PKr":"0x65f577e2bf871108ca34b16a9559af644f5ce9df198ea2a846836fa45c9b602cc3c2b5c28766c639b3ff14331b0a61a14ce180299c33475abf11e845d3238f20a5ac694b5caf937daeac748fe30096aa57ab6931a359c9c7d94b740ad09bf320","Proof":"0x03ed22d9e7e1194a60f82d03b870f85dd64a5be2cd5603ef84de6af7b93d9900140a3923664dd725039188626c3e7935f863b1ba4ce0b5c402327cbce4edee979de3aba76c1a615ff8cccacc3e7e89e83b5c3eeb7756f0af2fab479071b60ab34e0603bbb7a67f2b6078eb6c671b52c577c74148035b9b5bb5c0b47e52519fad0e4511"},"OutCM":null,"RootCM":"0xcd7fe67eb0a501c8c7c518424b990857fd3959c2a56641b020e8133965b5850b"},"TxHash":"0x0f4fb9b7d886b5cb18e1922326461758aae9a969d8bc300f35d3762083eeff7f","Num":32}},"Witness":{"Pos":"0x45","Paths":["0x41ec5b46e1c5785909ae38554cae2b5aad0db88fdcfbcc24b74dee14cbd47a12","0xe5b178544030ee054d5837008172fa9762521fcb5f0c64977b794c947d1bc29a","0x432403df67a365c57e19c61138edd3acb6527d78f302ffb4fee12956ffb19fa5","0x23b07f59402d6ed982e38170d08b5fdf2a48dda2e07029622d5472d49c264f1c","0xd789a8b2fdfaa399a5e40799e37146af40227a5bdfd4e23c9d7157c7f4ff130e","0x9970271e96d1771eff06ce5c540d6fcf5df59234af6204f45b31ea151c589ba9","0x22e2f7991e4fc3d11d14adc9b66c61050c7b8c2cbd7496fae19571cd1eef3d8e","0xa0f4e174f7fe46368a2c4ed56659c672e0187d0bca2e7619660b9e38564a958e","0x19faaa87edc67b3a03edb38a7690e88bb35f90eaa38556adf4eea04f0a41329b","0x78e2fae5201f6e8b5bcbb7d2cfd9a05b51ee5daac55dc1c67d5bf9496443b124","0x8c473676e83787c7748e9d956e0fd2f316e00dd13771f2cee0367fcf5588f40c","0x6488a7d2ae45fe1f028a2b3d140073efba82aba8db01e9c96d165d515a2b5ead","0xc2baf1c827cfce1eb852561d737b454fe12c7555945ba68017fa6222c93d7f1d","0xc6052c7af376fef1daf078b85913d5b147a68f4c6de75cc9e49399d62a515c92","0xbddc1775065a6ee9386737303af7b9da6ad995c369706fbdcf4a7fcb8cc2cca0","0xd14f617a18014f5bb594e7ca4c999354bc095a6b136a6cd3d097928fe3defd86","0xcfe35d771cfcc111868b623b0885277c74b94f6f5bc544c78c66bc0b5458a524","0x4163b9a6368d125edd8ee3e538f320752b0bd0f113dd79349a72fa3af06c64ab","0x78cb874b15e37a66ae8eee4cf13b1e8af6e63ea72c234067a1023f1f6d989a06","0x13c184ef8cd27a98857dcf2c0a21cefde8808551b4fbc18b1a62b97186662990","0x93584e7b2c0ced44fca221aa0d934cedb1cddb82e0296f041b1934875d505986","0x77865dd539eda3960520bee9cd3e0a8563b9a0ddc854885a1d9dee14b11b3da0","0x8665f83639732248eeba9454540184cc94598e0fe73d126b6e3db31725352f28","0xa322e919186a4b2f2039601db976b005e7b2968e56d75cbf71a77bbe8905292b","0xb995f437374bd1e1a9eb3443bc3d7855f15b4d6ce628051332fe20a3a8cd0e9c","0x75df3f7f39ed5132f0b10ca3d97487eca629128ad37d4e6b5ba391ece4f4702c","0xf59c191e25659b57738ef22ede3d6113091d0425f40ec862de14bf1149fb382e","0xa9588c6ec3513da0ecfdb7967fcf6711ca3566e5ae1b8b60bcc7d54a123f2a07","0x3edc6044a176db79bb6ffccd3f3c950cb5a56b9ba65d4243e9e03cbcf4bbe382"],"Anchor":"0xe909cf147b71fc441ba263b1d5b50870444a8c54bc1d111cf6989a531abf71ad"}}],"Outs":[{"PKr":"0x130da02681642fce51046e641c589b70dab751c95c577ed16bf1169e4fad0e8de7c93ecd80d93b26e9fe59de9c60a85bf015c031660c86ce037f3c17da53c19749eda6c5686e1cce7b2a928c429064f9cc357d73a946ad1c76e728630a882a14","Asset":{"Tkn":{"Currency":"0x000000000000000000000000000000000000000000000000000000005345524f","Value":1000000000000000000},"Tkt":null},"Memo":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},{"PKr":"0x65f577e2bf871108ca34b16a9559af644f5ce9df198ea2a846836fa45c9b602cc3c2b5c28766c639b3ff14331b0a61a14ce180299c33475abf11e845d3238f20a5ac694b5caf937daeac748fe30096aa57ab6931a359c9c7d94b740ad09bf320","Asset":{"Tkn":{"Currency":"0x000000000000000000000000000000000000000000000000000000005345524f","Value":14999900000000049973},"Tkt":null},"Memo":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"}]}';
      */
      const seed = Buffer.alloc(32, seedStr, 'hex');
      const keys = account.NewKeys(seed);
      tx.SignTx(tx_parm, keys.sk.toString('hex'), (err, content) => {
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
  async createTx({ Gas = 25000, GasPrice = 1000000000, From, RefundTo = '', Receptions = [], Roots = [] }) {
    try {
      const result = await this.seroRpc.post(
        '',
        Object.assign(this.httpData, {
          method: 'exchange_genTx',
          params: [{ Gas, GasPrice, From, RefundTo, Receptions, Roots }],
        })
      );
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }

  /**
   *
   * 广播
   * @param {string} hash 交易hash
   * @returns {Promise<object>} result 返回结果
   * @memberof Transfer
   */
  async broadcast(hash) {
    try {
      const result = await this.seroRpc.post(
        '',
        Object.assign(this.httpData, { method: 'ssi_commitTx', params: [hash] })
      );
      this.httpSuccess(result);
      return result.data;
    } catch (error) {
      this.httpError(error);
    }
  }
}

module.exports = Transfer;
