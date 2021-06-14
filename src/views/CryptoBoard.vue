<template>
  <div class="board">
    <div class="card-block" v-for="value in currencies" :key="value.symbol">
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
