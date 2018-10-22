<template>
    <div class="coin-box" @dblclick.stop="openDetails">
        <div class="row no-gutters coin-info" v-if="ticker.price">
            <div class="col-7">
                <div class="font-weight-bold">{{info.name}}</div>
                <div class="row no-gutters mt-1">
                    <div class="box-icon">
                        <span :style="{ backgroundImage : 'url('+ iconbase +')' }"></span>
                    </div>
                    <div class="col text-left">
                        <div><b>{{info.base}}</b>/{{info.quote}}</div>
                        <div class="coin-price"><span v-if="info.quote==='USDT'">$</span>{{ticker.price }}<span v-if="info.quote !=='USDT'" style="font-size: x-small; font-weight: 700">{{info.quote}}</span></div>
                    </div>
                </div>
            </div>
            <div :class="[(ticker.percent < 0)?'down':'up', 'col-5','text-right']">
                <div class="coin-per"><span class="indicator"></span><span>{{ ticker.percent }}%</span></div>
                <div class="coin-chg">{{parseFloat(ticker.chg).toFixed((info.quote === 'USDT') ? 3 : 8)}} </div>
                <div><span class="text-secondary">Vol:</span> <span class="text-dark">{{ ticker.vol }}</span></div>
            </div>
            <div class="dd-container" :class="[{'show': showDropDown}]" v-click-outside="closeDropDown">
                    <span role="button" class="menu-btn" @click.stop="onDropDown">
                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </span>
                <div class="dd-menu" v-if="showDropDown">
                    <span class="dd-item" @click="openDetails">Open</span>
                    <span class="dd-item" @click="removeCard">Delete</span>
                </div>
            </div>
        </div>
        <div class="sparkline-chart">
            <Sparkline :cdata="ticker.price" :width="380" :height="90"></Sparkline>
        </div>
    </div>
</template>
<script>
  import Sparkline from './Sparkline.vue'
  import {unSubscribeSymbol} from '../services/binance'
  export default {
    props: ['ticker', 'info'],
    data() {
      return {
        showDropDown: false,
        iconbase: 'https://raw.githubusercontent.com/rainner/binance-watch/master/public/images/icons/' + this.info.base.toLowerCase() + '_.png'
      }
    },
    methods: {
      onDropDown() {
        this.showDropDown = true;
      },
      removeCard() {
        this.showDropDown = false;
        unSubscribeSymbol(this.info.symbol);
        this.$store.commit('REMOVE_COIN_PAIR', this.info.symbol)
      },
      openDetails() {
        this.showDropDown = false;
        this.$router.push({name: 'infoview', params: { 'symbol': this.info.symbol }})
      },
      closeDropDown() {
        this.showDropDown = false;
      }
    },
    components: {
      Sparkline
    }
  }
</script>