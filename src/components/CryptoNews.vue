<template>
    <section class="news">
        <header class="news-header">Latest News</header>
        <div class="news-block">
            <div class="news-item" v-for="(article, index) in news" :key="index">
                <div class="thumb-img">
                    <a :href="article.url" target="_blank">
                        <img :src="article.imageurl">
                    </a>
                </div>
                <div>
                    <h6 class="news-title"><a :href="article.url" target="_blank">{{article.title}}</a></h6>
                    <p v-html="truncateText(article.body)"></p>
                    <div class="news-data">
                        <div class="news-source">{{article.source_info.name}}</div>
                        <div class="news-date">{{ article.published_on | time }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
  import timeago from 'timeago.js';
  export default {
    created() {
      console.log('created');
      this.getNews();
      this.interval = setInterval(function() {
        this.getNews();
      }.bind(this), 120000)
    },
    beforeDestroy(){
      console.log('beforeDestroy');
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
      getNews() {
        const context = this;
        fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN').then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            response.json().then(function(data) {
              context.news = data.Data;
            });
          }.bind(this)
        ).catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      }
    },
    filters: {
      time: function (value) {
        if (!value) return '';
        return timeago().format(value * 1000)
      },
      tags: function(value){
        if(!value) return '';
        return value.split('|').join(', ')
      }
    }
  }
</script>