<template>
    <div id="bottomPlayer">
        <span>{{playingEpisode.title}}</span>
        <div>
            <audio id="podcastPlayer" @ended="end" controls :src="playingEpisode.enclosure.url" @loadeddata="playPodcast"></audio>
        </div>
    </div>
</template>
<script>
    export default{
        props:['playingEpisode', 'allEpisodeList'],
        data(){
            return {
                player: null,
                episodeNum: null,
            }
        },
        mounted(){
            this.player = document.getElementById('podcastPlayer');
            this.episodeNum = parseInt(this.playingEpisode.itunes.episode);
        },
        watch:{
            playingEpisode(val){
                this.episodeNum = parseInt(val.itunes.episode);
            }
        },
        methods:{
            end(){
                
                let nextEpisodeNum = this.episodeNum + 1;
                let nextEpisode = this.allEpisodeList.find(ele => ele.itunes.episode == (nextEpisodeNum).toString())
                if(nextEpisode){
                    this.$emit("move-to-next", nextEpisode);
                }
            },
            playPodcast(){
                this.player.play();
            }
        }
    }
</script>
<style>
    #bottomPlayer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 99%;
        background-color: #003166;
        text-align: center;
        padding: 15px;
        display: flex;
        align-items: center;
        color: white;
    }
    #bottomPlayer span{
        flex: 1;
    }
    #bottomPlayer div{
        flex: 4;
    }
    #bottomPlayer div audio{
        width: 90%;
    }

</style>