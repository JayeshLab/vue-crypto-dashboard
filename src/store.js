import Vue from 'vue'
import Vuex from 'vuex'
import defaultPair from '@/assets/defaultpair.json'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    currencies: localStorage.hasOwnProperty('vue-crypto-currencies')? JSON.parse(localStorage.getItem('vue-crypto-currencies')) : defaultPair,
    tickers: {}
  },
  getters: {
    getSymbolById: state => (symbol) => {
      return state.currencies[symbol]
    },
    getTickerById: state => (symbol) => {
      return state.tickers[symbol]
    }
  },
  mutations: {
    UPDATE_TICKER: (state, payload) => {
      const tick = state.tickers[payload.symbol]
      payload.pchg = tick ? (payload.price > tick.price? 1 : -1 ) : 1
      Vue.set(state.tickers, payload.symbol, payload)
    },
    ADD_COIN_PAIR: (state, payload) => {
      Vue.set(state.tickers, payload.symbol, { pchg: 1 })
      Vue.set(state.currencies, payload.symbol, payload)
      localStorage.setItem('vue-crypto-currencies', JSON.stringify(state.currencies))
    },
    REMOVE_COIN_PAIR: (state, symbol) => {
      Vue.delete(state.currencies, symbol)
      Vue.delete(state.tickers, symbol)
      localStorage.setItem('vue-crypto-currencies', JSON.stringify(state.currencies))
    }
  },
  actions: {

  }
})
