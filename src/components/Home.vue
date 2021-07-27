<template>
    <div v-if="allEpisodeList.length" id="container">
        <div id="channelInfo">
            <a id="channelImg" :href="channel.image.link">
                <img :src="channel.image.url"/>
            </a>
            <div class="channel-content">
                <h1>{{channel.title}}</h1>
                <h3>{{channel.description}}</h3>
            </div>
        </div>
        <div id="episodeList">
            <div v-for="episode in allEpisodeList" class="episode-info">
                <a class="episode-img">
                    <img :src="episode.itunes.image">
                </a>
                <div class="episode-content">
                    <router-link
                        :to="{name: 'episode', params: {episodeGuid: episode.guid}}"
                    >
                        {{episode.title}}
                    </router-link>
                    <div v-html="episode.content"></div>
                    <div class="episode-time">
                        <font-awesome-icon icon="calendar-alt"/>
                        {{new Date(episode.isoDate).toLocaleDateString('zh-TW')}}
                        <font-awesome-icon icon="clock"/>
                        {{Math.floor(parseInt(episode.itunes.duration)/60) + ':' + parseInt(episode.itunes.duration)%60}}
                    </div>
                </div>
                <a class="episode-play" @click="play(episode)">
                    <font-awesome-icon icon="play-circle" size="3x"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['allEpisodeList', 'channel'],
    data () {
        return {
            desc: true
        }
    },
    computed:{
    },
    methods: {
        toggleSort(){
            this.desc = !this.desc;
        },
        play(episode){
            this.$emit("on-play-episode", episode)
        }
    }
}
</script>

<style>
#container{
    width: 80%;  
    margin: auto;
}
#channelInfo{
    display: flex;
    padding: 40px;
    background-color: #74B3CE;
    color: white;
    border-radius: 10px;
    margin-top: 15px;
}
#channelImg{
    flex: 1;
}
#channelImg img{
    width: 100%;  
}
.channel-content{
    margin: auto 20px;
    flex: 3;
    white-space: pre-wrap;
}
#episodeList{
    margin-top: 25px;
    height: 800px;
    overflow: scroll;
    margin-bottom: 120px;
}
.episode-info{
    display: flex;
    padding: 20px;
    border-radius: 8px;
    background-color: #c6dde7;
    margin-top: 15px;
}
.episode-img{
    flex: 3;
}
.episode-img img{
    width: 100%;
}
.episode-content{
    flex: 15;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.episode-content > a{
    font-size: 1.3em;
}
.episode-content > div{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.episode-time{
    margin-top: 15px;
    color: gray;
}
.episode-play{
    flex: 2;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #69A3BB;
}
.episode-play > svg:hover{
    cursor: pointer;
    color: #a4d7eb;
}
</style>
