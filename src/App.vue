<template>
  <div id="app">
    <router-view :all-episode-list="allEpisodes" :channel="channel" @on-play-episode="episodePlay"></router-view>
    <Player v-if="playingEpisode" :playing-episode="playingEpisode" :all-episode-list="allEpisodes" @move-to-next="episodePlay"></Player>
  </div>
</template>
<script>
  import Player from './components/Player.vue'
  import Parser from 'rss-parser'
  export default{
    data(){
      return{
        feedUrl: "https://feeds.soundon.fm/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml",
        allEpisodes: [],
        currentEpisode: {},
        playingEpisode: null,
        channel: {}
      }  
    },
    components:{
      Player
    },
    created(){
      this.getAllEpisodes();
    },
    methods:{
        getAllEpisodes(){
            const parser = new Parser();
            parser.parseURL(this.feedUrl)
                .then(data => {
                    this.channel = data;
                    this.allEpisodes = data.items;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        episodePlay(episode){
          this.playingEpisode = episode;
        }
    }
  }
</script>
<style>
*{
  font-family: 'Noto Sans TC',"黑體-繁","微軟正黑體", sans-serif;
}
body{
  background-color: #e8eaeb;
}
body a{
  color: #003166;
  text-decoration: none;
  font-weight: bold;
}
</style>

