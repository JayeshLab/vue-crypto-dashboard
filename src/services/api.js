import WS from './ws'

export default class Api {
  constructor(timeout=5e3, maxAttempts=5) {
    this.timeout = timeout;
    this.maxAttempts = maxAttempts;
    this._baseUrl = 'wss://stream.binance.com:9443/ws/';
    this._combinedBaseUrl = 'wss://stream.binance.com:9443/stream?streams=';
    this.subscription = {};
    this.streams = {
      depth: (symbol) => `${symbol.toLowerCase()}@depth`,
      depthLevel: (symbol, level) => `${symbol.toLowerCase()}@depth${level}`,
      kline: (symbol, interval) => `${symbol.toLowerCase()}@kline_${interval}`,
      aggTrade: (symbol) => `${symbol.toLowerCase()}@aggTrade`,
      trade: (symbol) => `${symbol.toLowerCase()}@trade`,
      ticker: (symbol) => `${symbol.toLowerCase()}@ticker`,
      miniTicker: (symbol) => `${symbol.toLowerCase()}@miniTicker`,
      allMiniTicker: () => `!miniTicker@arr`,
      allTickers: () => '!ticker@arr'
    };
  }
  subscribe (cb, endpoint, isCombined = false) {
    let ws;
    try {
      let path = (isCombined ? this._combinedBaseUrl : this._baseUrl) + endpoint;
      if (this.subscription[path]) {
        return this.subscription[path];
      }
      ws = new WS(path, {
        timeout: this.timeout,
        maxAttempts: this.maxAttempts,
        onopen: e => console.log('Connected!', e),
        onmessage: e => cb(JSON.parse(e.data)),
        onreconnect: e => console.log('Reconnecting...', e),
        onmaximum: e => console.log('Stop Attempting!', e),
        onclose: e => { console.log('Closed!', e);  this.removeSubscription(e.endpoint)},
        onerror: e => console.log('Error:', e)
      });
      this.subscription[path] = ws
    }
    catch(ex) {
      console.log("Error :" + ex)
    }
  }
  caller(fname, ...args) {
    return this.streams[fname].call(null, ...args)
  }
  removeSubscription(endpoint){
    if(this.subscription[endpoint]) {
      delete this.subscription[endpoint]
    }
  }
  closeSubscription(type, isCombined = false, ...args) {
    const endpoint = this.caller(type, ...args);
    const path = (isCombined ? this._combinedBaseUrl : this._baseUrl) + endpoint;
    const ws = this.subscription[path];
    if(ws) {
      ws.close(1000, "");
    }
  }
  closeAll() {
    for (const key in this.subscription) {
      this.subscription[key].close();
      delete this.subscription[key]
    }
    this.subscription = {}
  }
  onDepthUpdate(symbol, eventHandler) {
    return this.subscribe(eventHandler, this.streams.depth(symbol));
  }

  onDepthLevelUpdate(symbol, level, eventHandler) {
    return this.subscribe(eventHandler, this.streams.depthLevel(symbol, level));
  }

  onKline(symbol, interval, eventHandler) {
    return this.subscribe(eventHandler, this.streams.kline(symbol, interval));
  }

  onAggTrade(symbol, eventHandler) {
    return this.subscribe(eventHandler, this.streams.aggTrade(symbol));
  }

  onTrade(symbol, eventHandler) {
    return this.subscribe(eventHandler, this.streams.trade(symbol));
  }

  onTicker(symbol, eventHandler) {
    return this.subscribe(eventHandler, this.streams.ticker(symbol));
  }
  onMiniTicker(symbol, eventHandler) {
    return this.subscribe(eventHandler, this.streams.miniTicker(symbol));
  }
  onAllMiniTickers(eventHandler) {
    return this.subscribe(eventHandler, this.streams.allMiniTicker());
  }
  onAllTickers(eventHandler) {
    return this.subscribe(eventHandler, this.streams.allTickers());
  }
  onCombinedStream(streams, eventHandler) {
    return this.subscribe(eventHandler, streams.join('/'), true);
  }
}