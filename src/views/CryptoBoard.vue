<template>
    <div class="board">
        <div class="d-block" v-for="(value, key) in tickers" :key="key">
            <CurrencyCard :ticker="value" :info="currencies[key]"></CurrencyCard>
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