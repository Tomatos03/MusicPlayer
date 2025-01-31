<template>
    <div class="album-card"
        @mouseover="mouseoverAlbumCard(index)"
        @mouseout="mouseoutAlbumCard(index)"
        ref='albumCardRef'>
        <div class="album-img">
            <img :src="props.album.picUrl">
            <i class="iconfont icon-play"></i>
        </div>
        <p>{{ props.album.name }}</p>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const props = defineProps({
        album: {
            type: [Object, Array],
            required: true
        }
    });
    const albumCardRef = ref();

    const mouseoverAlbumCard = () => {
        albumCardRef.value.querySelector("img").classList.add("active");
        albumCardRef.value.classList.add("active");
    }
    const mouseoutAlbumCard = () => {
        albumCardRef.value.querySelector("img").classList.remove("active");
        albumCardRef.value.classList.remove("active");
    }
</script>

<style scoped>
    .album-img{
        position: relative;
        width: 100%;
    }
    .album-card{
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        min-width: 180px;
        max-width: 210px;
        flex: 1;
    }
    .album-card p{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
    }
    .album-card img{
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 10px;
    }
    .album-card img.active{
        filter: brightness(70%);
    }
    .album-card i{
        font-size: 30px;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transition: opacity 0.8s ease;
        background-color: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
    .album-card.active i{
        opacity: 1;
    }
    .album-card i:hover{
        filter: brightness(90%);
        transform: scale(1.1);
    }
</style>