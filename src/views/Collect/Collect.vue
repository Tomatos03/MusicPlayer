<template>
    <div class="collect">
        <el-tabs >
            <el-tab-pane label="专辑" class="album">
                <template v-if="albumCount > 0">
                    <div class="card-container"
                        ref="albumCardRef"
                        @mouseover="mouseoverAlbumCard"
                        @mouseout="mouseoutAlbumCard"
                        v-for="(item, index) in favoriteAlbumList"
                            :key="index"
                        >
                            <div class="album-card">
                                <img :src="item.picUrl">
                                <p>{{ item.name }}</p>
                            </div>
                            <i class="iconfont icon-bofang"></i>
                    </div>
                </template>
                <h3 v-else>暂无收藏专辑</h3>
            </el-tab-pane>
            <el-tab-pane label="MV" class="mv">
                <template v-if="mvCount > 0">
                    <div class="card-container"
                        ref="mvCardRef"
                        @mouseover="mouseoverMVCard"
                        @mouseout="mouseoutMVCard"
                        v-for="(item, index) in favoriteMVList"
                            :key="index"
                    >
                        <div class="mv-card">
                            <img :src="item.coverUrl">
                            <p>{{ item.title }}</p>
                        </div>
                        <i class="iconfont icon-bofang"></i>
                    </div>
                </template>
                <h3 v-else>暂无收藏MV</h3>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script setup>
    import { request } from '@/network/request';
    import { getTimeStamp } from '@/utils/utils';
    import { ref } from 'vue';
    const favoriteAlbumList = ref(null);
    const favoriteMVList = ref(null);
    const albumCount = ref(0);
    const mvCount = ref(0);
    const albumCardRef = ref(null);
    const mouseoverAlbumCard = () => {
        albumCardRef.value[0].querySelector("i").classList.add("active");
        albumCardRef.value[0].querySelector(".album-card").classList.add("active");
    }
    const mouseoutAlbumCard = () => {
        albumCardRef.value[0].querySelector("i").classList.remove("active");
        albumCardRef.value[0].querySelector(".album-card").classList.remove("active");
    }
    const mvCardRef = ref(null);
    const mouseoverMVCard = () => {
        mvCardRef.value[0].querySelector("i").classList.add("active");
        mvCardRef.value[0].querySelector(".mv-card").classList.add("active");
    }
    const mouseoutMVCard = () => {
        mvCardRef.value[0].querySelector("i").classList.remove("active");
        mvCardRef.value[0].querySelector(".mv-card").classList.remove("active");
    }
    const getFavoriteAlbumList = async () =>{
        const res = await request("/album/sublist", {
            limit: 1000,
            getTimeStamp,
        });
        // console.log("收藏专辑详情: ", res);
        favoriteAlbumList.value = res.data.data;
        albumCount.value = res.data.count;
    }
    const getFavoriteMVList = async () =>{
        const res = await request("/mv/sublist", {
            getTimeStamp,
        });
        // console.log("收藏MV详情: ", res);
        favoriteMVList.value = res.data.data;
        mvCount.value = res.data.count;
    }
    getFavoriteMVList();
    getFavoriteAlbumList();
</script>

<style scoped>
    .collect{
        min-height: 100vh;
        width: 100%;
        padding: 0 25px;
    }

    .album,
    .mv{
        display: flex;
    }

    .album-card,
    .mv-card{
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    .album-card.active,
    .mv-card.active{
        filter: brightness(50%);
    }
    .album-card img{
        width: 200px;
        height: 250px;
        object-fit: cover;
        border-radius: 10px;
    } 
    .mv-card img{
        width: 280px;
        height: 200px;
        object-fit: fill;
        border-radius: 10px;
    }
    .card-container{
        position: relative;
    }
    .card-container i {
        z-index: 2;
        cursor: pointer;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        border-radius: 50%;
    }
    .album-card + i{
        width: 50px;
        height: 50px;
        transition: opacity 0.8s ease;
        background-color: white;
        top: 250px;
        right: 20px;
        transform: translateY(-120%);
    }
    .album-card + i.active{
        opacity: 1;
    }
    .album-card + i.active:hover{
        filter: brightness(90%);
        transform: translateY(-120%) scale(1.1);
    }
    .mv-card + i{
        font-size: 30px;
        opacity: 0;
        top: 100px;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
    }
    .mv-card + i.active{
        opacity: 0.8;
    }
    .mv-card + i.active:hover{
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
    }
</style>