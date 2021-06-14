<template>
    <div class="content-box">
        <div class="menu-bar">
            <v-select id="base" :options="currencyList[quote]['pairs']" :clearable="false" v-model="baseCurrency" placeholder="Select Token"></v-select>
            <span class="slash">/</span>
            <v-select id="quote" :options="quoteOptions" :searchable="false" :clearable="false" v-model="quote" @input="resetBase" style="width: 100px"></v-select>
            <button class="add-btn" @click="addCoinPair"><i class="fa fa-plus fa-lg" aria-hidden="true"></i></button>
        </div>
        <CryptoBoard></CryptoBoard>
    </div>
</template>
<script>
  import vSelect from 'vue-select'
  import coins from '@/assets/group.json'
  import CryptoBoard from '@/views/CryptoBoard.vue'
  import { isEmpty } from '../util/Utility'
  import {subscribeSymbol} from '../services/binance'
  import { mapState } from 'vuex'
  export default {
    name: 'dashboard',
    data() {
      return {
        currencyList: coins,
        quote: 'BNB',
        baseCurrency: {}
      }
    },
    mounted(){
      if(this.currencies) {
        this.currencies.forEach(currency => {
          subscribeSymbol(currency.symbol);
        });
      }
    },
    computed: {
      ...mapState(['currencies']),
        quoteOptions() {
          return Object.keys(coins)
        }
    },
    components: {
      vSelect,
      CryptoBoard
    },
    methods: {
      resetBase() {
        this.baseCurrency = {}
      },
      addCoinPair() {
        if(!isEmpty(this.baseCurrency)){
          const symbol = `${this.baseCurrency.value}${this.quote}`;
          subscribeSymbol(symbol);
          this.$store.commit('ADD_COIN_PAIR',{"symbol": symbol ,"base": this.baseCurrency.value, "quote": this.quote, "name": this.baseCurrency.name, "cid": this.baseCurrency.cid})
        }
      }
    }
  }
</script>
