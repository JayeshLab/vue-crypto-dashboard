<template>
  <div class="board">
    <!-- it is not recommended to use the index in "v-for" for iteration because it restarts when the component is rendered causing the component positions to overlap.  -->
    <div class="card-block" v-for="value in currencies" :key="`currency-${value.symbol}`">
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