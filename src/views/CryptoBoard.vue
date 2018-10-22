<template>
    <div class="live-content">
        <div class="d-block" v-for="(value, key) in tickers" :key="key">
            <CurrencyCard :ticker="value" :info="currencies[key]"></CurrencyCard>
        </div>
    </div>
</template>
<script>
  import CurrencyCard from '../components/CurrencyCard.vue'
  import { mapState } from 'vuex'
  export default {
    components: {
      CurrencyCard
    },
    computed: {
      ...mapState(['tickers', 'currencies'])
    }
  }
</script>
<style>
    .live-content {
        display: flex;
        flex-wrap: wrap;
        padding: 60px 15px 15px;
        overflow-x: hidden;
        background: #f9fbfd;
    }
</style>