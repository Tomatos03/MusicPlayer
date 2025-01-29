<template>
    <div class="song-card"
        ref="songCardRef"
        @mouseover="mouseOverSongCard"
        @mouseout="mouseOutSongCard">
        <div class="song-img">
            <img :src="props.song.al.picUrl" alt="img">
            <i class="iconfont icon-play"></i>
        </div>
        <div class="song-info">
            <div class="song-name">{{ props.song.name }}</div>
            <div class="song-authors">{{ getAuthors(props.song.ar) }}</div>
        </div>
        <div class="song-btns">
            <i class="iconfont icon-download"></i>
            <i class="iconfont icon-love"></i>
            <i class="iconfont icon-more"></i>
        </div>
    </div>
</template>
<script setup>
    import { defineProps, ref } from 'vue';
    const props = defineProps({
        song: {
            type: [Object, Array],
            required: true
        }
    });
    const songCardRef = ref(null);
    const getAuthors = (authors) => {
        let authorsInfo = "";
        const n = authors.length;
        for(let i = 0; i < n; ++i) {
            authorsInfo += authors[i].name;
            if(i != n - 1) authorsInfo += '/';
        }
        return authorsInfo;
    };
    const mouseOverSongCard = () => {
        songCardRef.value.classList.add("active");
    }
    const mouseOutSongCard = () => {
        songCardRef.value.classList.remove("active");
    }
</script>
<style scoped>
    .song-btns{
        display: none;
        padding: 5px;
        flex: 1;
        gap: 5px;
        justify-content: end;
        align-items: center;
    }
    .song-btns i{
        font-size: 25px;
    }
    .song-card.active .song-btns{
        display: flex;
    }
    .song-card {
        height: 80px;
        width: 400px;
        padding: 5px;
        display: flex;
        border-radius: 10px;
    }
    .song-card:hover{
        cursor: pointer;
        background-color: white;
        box-shadow: 0px 0px 10px 0px rgba(142, 139, 139, 0.1);
    }
    .song-card.active img{
        filter: brightness(70%);
    }
    .song-img{
        position: relative;
    }
    .song-img img{
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 10px;
    }
    .song-img i{
        position: absolute;
        font-size: 32px;
        color: white;
        opacity: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 0.5s ease;
    }
    .song-card.active .song-img i{
        opacity: 0.8;
    }
    .song-card.active .song-img i:hover{
        transition: none;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
    }
    .song-info{
        flex: 1;
        min-width: 0;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .song-name{
        overflow: hidden;
        font-size: 1.1em;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .song-authors{
        color: #8c8c8c;
        font-size: 0.9em;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>