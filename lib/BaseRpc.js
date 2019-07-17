class BaseRpc {
  constructor(seroRpc, isDebug) {
    this.seroRpc = seroRpc;

    this.isDebug = isDebug;
  }

  httpSuccess(result) {
    if (this.isDebug && result.status === 200) {
      const {config:{url,data:requestData,method},data} = result;
      const logText = {
        url,
        method,
        request:JSON.parse(requestData),
        response:data
      };
      console.log(JSON.stringify(logText));
    }
  }

  httpError(result) {
   if (this.isDebug && result.toJSON() ) {
      const {config:{url,data:requestData,method},message} = result.toJSON(); 
      const logText = {
        url,
        method,
        request:JSON.parse(requestData),
        message,
      };
      console.error(JSON.stringify(logText));
    }
    throw result;
  }
}

module.exports = BaseRpc;
