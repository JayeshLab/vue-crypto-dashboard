<template>
    <section class="news">
        <header class="news-header">Latest News</header>
        <div class="news-block">
            <div class="news-item" v-for="article in news" :key="article.id">
                <div class="thumb-img">
                    <a :href="article.url" target="_blank">
                        <img :src="article.imageurl">
                    </a>
                </div>
                <div>
                    <h6 class="news-title"><a :href="article.url" target="_blank">{{ article.title }}</a></h6>
                    <p v-html="truncateText(article.body)"></p>
                    <div class="news-data">
                        <div class="news-source">{{ article.source_info.name }}</div>
                        <div class="news-date">{{ time_since(article.published_on) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
  import { ago } from '@/util/Utility'
  export default {
    created() {
      this.getNews();
      this.interval = setInterval(function() {
        this.getNews();
      }.bind(this), 120000)
    },
    beforeDestroy(){
      clearInterval(this.interval);
    },
    data() {
      return {
        news:[],
        interval: null
      };
    },
    methods: {
      truncateText(value) {
        if(value.length > 135) {
          const substr = value.substring(0, 135);
          return  substr.substring(0, substr.lastIndexOf(' '))+ ' ...';
        }
        else {
          return value;
        }

      },
      async getNews() {
        let response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        if (response.ok) {
          let json = await response.json();
          this.news = json["Data"];
          console.log(json);
        }
        else {
          console.log('Fetch Error :-S', response.status);
        }
      },
      time_since(val) {
        if(val) {
          return ago(val);
        } else {
          return '';
        }
      }
    },
    filters: {
      tags: function(value){
        if(!value) return '';
        return value.split('|').join(', ')
      }
    }
  }
</script>
