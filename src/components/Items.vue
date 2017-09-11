<template>
<div class="template">
  <!--<div class="item" v-for= "item in list" v-bind:key="'q'" v-on:scroll="scroll">-->
    <!--<h1>{{item.title}}</h1>
    <img v-bind:src="item.image">
    <p v-for="i in 5">{{item.description}}</p>-->
    <!--<span>{{item}}</span>-->
    <div class="item">
      <div class="hacker-news-header">
        <a target="_blank" href="http://www.ycombinator.com/">
          <img src="https://news.ycombinator.com/y18.gif">
        </a>
        <span>Hacker News</span>
      </div>
      <div class="hacker-news-item" v-for="(item, key) in list">
        <span class="num" v-text="key + 1"></span>
        <p>
          <a target="_blank" :href="item.url" v-text="item.title"></a>
        </p>
        <p>
          <small>
            <span v-text="item.points"></span>
            points by
            <a target="_blank" :href="'https://news.ycombinator.com/user?id=' + item.author"
              v-text="item.author"></a>
            |
            <a target="_blank" :href="'https://news.ycombinator.com/item?id=' + item.objectID"
              v-text="item.num_comments + ' comments'"></a>
          </small>
        </p>
      </div>
      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner="spiral"></infinite-loading>
    </div>
 </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';
const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';
// const api = 'http://admin.j-town.net/mt/mt-data-api.cgi/v2/sites/2/entries';

export default {
  name: 'Items',
  data() {
    return {
      list:[],
      // items: [
      //   {
      //     image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/5689/sunset.jpg",
      //     title: "「近くで使徒が死んでる」 第3新東京市にいるような光景",
      //     description: "これは投稿者が撮影した、大人気アニメ「新世紀エヴァンゲリオン」で描かれている「使徒が死亡した際に見られるシチュエーション」とよく似た風景を撮影したものだ。エヴァンゲリオンでは、使徒が死亡するシチュエーションといえば「十字架系の爆発」が描かれている事が多いようで、それとよく似た模様が空に浮かび上がっているのが分かる。他にも「青空の広がる背景」や「車からの視点」など、類似点が多いことから「こりゃ、奇跡的ですなｗ」「すげえw使徒だw」「すっごーい！！」と驚きの声が続出している。"
      //   },
      //   {
      //     image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/5689/sunset.jpg",
      //     title: "「近くで使徒が死んでる」 第3新東京市にいるような光景",
      //     description: "これは投稿者が撮影した、大人気アニメ「新世紀エヴァンゲリオン」で描かれている「使徒が死亡した際に見られるシチュエーション」とよく似た風景を撮影したものだ。エヴァンゲリオンでは、使徒が死亡するシチュエーションといえば「十字架系の爆発」が描かれている事が多いようで、それとよく似た模様が空に浮かび上がっているのが分かる。他にも「青空の広がる背景」や「車からの視点」など、類似点が多いことから「こりゃ、奇跡的ですなｗ」「すげえw使徒だw」「すっごーい！！」と驚きの声が続出している。"
      //   },
      //   {
      //     image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/5689/sunset.jpg",
      //     title: "「近くで使徒が死んでる」 第3新東京市にいるような光景",
      //     description: "これは投稿者が撮影した、大人気アニメ「新世紀エヴァンゲリオン」で描かれている「使徒が死亡した際に見られるシチュエーション」とよく似た風景を撮影したものだ。エヴァンゲリオンでは、使徒が死亡するシチュエーションといえば「十字架系の爆発」が描かれている事が多いようで、それとよく似た模様が空に浮かび上がっているのが分かる。他にも「青空の広がる背景」や「車からの視点」など、類似点が多いことから「こりゃ、奇跡的ですなｗ」「すげえw使徒だw」「すっごーい！！」と驚きの声が続出している。"
      //   }
      // ]
    }
  },

  components: {
    InfiniteLoading,
  },


  mounted () {
    

  },

  destroyed () {
    
  },

  methods: {
    // scroll: function (e) {
    //   console.log('scroll!!!!');
    //   if ((e.target.scrollTop + e.target.offsetHeight) >= e.target.scrollHeight) {
    //     console.info('下端までスクロールされたよ');
    //   }
    // },


     onInfinite() {
      axios.get(api, {
        params: {
          page: this.list.length / 20 + 1,
        },
      }).then((res) => {
        if (res.data.hits.length) {
          this.list = this.list.concat(res.data.hits);
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          if (this.list.length / 20 === 10) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        } else {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        }
      });
    },
  },

  computed: {
  }

};

</script>

<style lang="" scoped>
.template {
  width: 100%;
}
.item {
  width: 640px;
  margin: 0 auto;
}

/*img {
  width: 100%;
}*/
</style>