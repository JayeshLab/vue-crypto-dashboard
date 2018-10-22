import Api from './api'
import store from '../store'
const wsApi = new Api();

const subscribeSymbol = function(symbol) {
  wsApi.onTicker(symbol,(ticker) => {
    const tick = {
      price: parseFloat(ticker.c),
      vol: parseFloat(ticker.q).toFixed(2),
      percent: parseFloat(ticker.P).toFixed(2),
      chg: ticker.p,
      high: ticker.h,
      low: ticker.l,
      open: ticker.o,
      time:ticker.E,
      symbol: symbol
    };
    store.commit('UPDATE_TICKER', tick)
  })
};
const unSubscribeSymbol = function(symbol) {
  wsApi.closeSubscription('ticker',false, symbol)
};

export {subscribeSymbol, unSubscribeSymbol}