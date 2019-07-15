class BaseRpc {
  constructor(seroRpc, debug) {
    this.seroRpc = seroRpc;

    this.debug = debug;
  }

  hhttpSuccess() {
    if (this.isDebug && result.status === 200) {
      const logText = `${result.config.url}||${JSON.stringify(result.data)}`;
      console.log(logText);
    }
  }

  httpError(error) {
    const logText = `${error.config.url}||${error.message}||${error.response.data}`;
    if (this.isDebug && error.response.datas) {
      console.error(logText);
    }
    throw new Error(logText);
  }
}

module.exports = BaseRpc;
