<template>
    <div class="box">
        <div class="row no-gutters coin-info">
            <div class="col-7">
                <div class="ico-name text">Bitcoin</div>
                <div class="row no-gutters" style="margin-top: 5px;">
                    <div class="box-icon">
                        <span class="icon-image" style="background-image: url('https://www.cryptocompare.com/media/19633/btc.png');"></span>
                    </div>
                    <div class="box-content col" style="text-align: left">
                        <div class="ico-symbol">BCT/USDT</div>
                        <div class="ico-price">${{ d.price }}</div>
                    </div>
                </div>
            </div>
            <div style="text-align: right" :class="[(d.P < 0)?'down':'up', 'col-5']">
                <div class="ico-per"><span class="indicator"></span><span>{{ d.P }}%</span></div>
                <div class="ico-chg">${{ d.p }} </div>
                <div class="ico-vol"><span style="color: #aaa">Vol:</span> {{ d.vol }}</div>
            </div>
        </div>
        <div class="chart" style="height: 94px">
            <Sparkline :cdata="chartdata" :width="380" :height="90"></Sparkline>
        </div>
    </div>
</template>
<script>
  import Sparkline from 'Sparkline.vue'
  export default {
    components: {
      Sparkline
    }
  }
</script>
<style>
    .text-right {

    }
    .text
    .coin-info {
        height: 106px;
        padding: 10px 15px 5px 15px
    }

    .chart {
        height: 94px
    }
</style>