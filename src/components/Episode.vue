<template>
    <div v-if="currentEpisode" id="container">
        <div id="navigator">
            <a @click="goBack" id="goBack" href="javascript: void(0)">
                <font-awesome-icon icon="chevron-left"/> Go Back
            </a>
            <div>
                <a @click="goToPrevEp" id="goToPrev" href="javascript: void(0)">
                    <font-awesome-icon icon="chevron-left"/> Prev EP
                </a>
                |
                <a @click="goToNextEp" id="goToNext" href="javascript: void(0)">
                    Next EP <font-awesome-icon icon="chevron-right"/> 
                </a>
            </div>
        </div>
        <div id="episodeInfo">
            <div id="episodeImg">
                <img :src="currentEpisode.itunes.image">
            </div>
            <div id="episodeTitle">
                <h1>
                    {{currentEpisode.title}}
                </h1>
                <div>
                    <font-awesome-icon icon="calendar-alt"/>
                    {{new Date(currentEpisode.isoDate).toLocaleDateString('zh-TW')}}
                </div>
            </div>
            <div id="episodePlay" @click="play">
                <font-awesome-icon icon="play-circle" size="3x"/>
            </div>
        </div>
        <div id="episodeDesc" v-html="currentEpisode['content:encoded']">
        </div>
    </div>
</template>
<script>
export default {
    props:['episodeGuid','allEpisodeList'],
    data(){
        return{
            currentEpisode : null,
            episodeNum: null
        }
    },
    watch:{
        allEpisodeList(val){
            this.currentEpisode = val.find(ele => ele.guid == this.episodeGuid);
        },
        currentEpisode(val){
            this.episodeNum = parseInt(val.itunes.episode);
        }
    },
    mounted(){
        this.currentEpisode = this.allEpisodeList.find(ele => ele.guid == this.episodeGuid);
    },
    methods:{
        goBack(){
            window.history.length > 1 
                ? this.$router.go(-1) 
                : this.$router.push('/');
        },
        play(){
            this.$emit("on-play-episode", this.currentEpisode);
        },
        goToNextEp(){
            let nextEpisodeNum = this.episodeNum + 1;
            let nextEpisode = this.allEpisodeList.find(ele => ele.itunes.episode == (nextEpisodeNum).toString())
            if(nextEpisode){
                this.currentEpisode = nextEpisode;
            }
            else{
                alert('Latest Episode')
            }
        },
        goToPrevEp(){
            let prevEpisodeNum = this.episodeNum - 1;
            let prevEpisode = this.allEpisodeList.find(ele => ele.itunes.episode == (prevEpisodeNum).toString())
            if(prevEpisode){
                this.currentEpisode = prevEpisode
            }
            else{
                alert('First Episode')
            }
        }
    }
}
</script>
<style>
#container{
    width: 80%;  
    margin: auto;
}
#navigator{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}
#episodeInfo{
    display: flex;
    background-color: #74B3CE;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: 15px;
}
#episodeInfo > div{
    padding: 20px;
}
#episodeImg{
    flex: 1;
}
#episodeImg img{
    width: 100%;
}
#episodeTitle{
    flex: 8;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
#episodeTitle > div{
    width:105px;
}
#episodePlay{
    flex: 1;
    display: flex;
    align-items: center;
}
#episodePlay > svg:hover{
    cursor: pointer;
    color: #C6DDE7;
}
#episodeDesc{
    padding: 50px;
    margin-bottom: 120px;
    background-color: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>