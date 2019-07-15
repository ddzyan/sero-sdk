class BaseRpc {
  constructor(seroRpc, isDebug) {
    this.seroRpc = seroRpc;

    this.isDebug = isDebug;
  }

  httpSuccess() {
    console.log(error);
    console.log('isDebug', this.isDebug);
    if (this.isDebug && result.status === 200) {
      const logText = `${result.config.url}||${JSON.stringify(result.data)}`;
      console.log(logText);
    }
  }

  httpError(error) {
    console.log(error);
    console.log('isDebug', this.isDebug);
    const logText = `${error.config.url}||${error.message}||${error.response.data}`;
    if (this.isDebug && error.response.datas) {
      console.error(logText);
    }
    throw new Error(logText);
  }
}

module.exports = BaseRpc;
