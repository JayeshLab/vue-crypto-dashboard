<template>
  <div class="board">
    <div class="card-block" v-for="(value, index) in currencies" :key="index">
      <CurrencyCard :ticker="tickers[value.symbol] || {}" :info="value"></CurrencyCard>
    </div>
  </div>
</template>
<script>
  import CurrencyCard from '../components/CurrencyCard.vue'
  import { mapState } from 'vuex'
  export default {
    name: 'CryptoBoard',
    components: {
      CurrencyCard
    },
    computed: {
      ...mapState(['tickers', 'currencies'])
    }
  }
</script>