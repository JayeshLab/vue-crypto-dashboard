<template>
    <div class="container-fluid symbol-view">
        <div class="row symbol-panel">
            <div class="col">
                <div class="row"></div>
                <div class="row">
                    <candle-stick></candle-stick>
                </div>
            </div>
            <div class="col-auto news-section">
                <crypto-news></crypto-news>
            </div>
        </div>
    </div>
</template>
<script>
    import CryptoNews from '../components/CryptoNews.vue'
    import CandleStick from '../components/CandleStick.vue'
  export default {
    props:['symbol'],
    data() {
      return {

      };
    },
    components: {
      CryptoNews,
      CandleStick
    },
    methods: {

    }
  }
</script>
<style lang="scss">
    .symbol-view{
        height: calc(100% - 50px)
    }
.symbol-panel {
    border-radius: 6px;
    border: 1px solid;
}
    .news-section{
        width: 500px;
    }
</style>