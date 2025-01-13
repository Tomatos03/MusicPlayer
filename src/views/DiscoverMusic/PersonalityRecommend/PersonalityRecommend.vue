<template>
    <div>
        <div class="carousel-container">
            <el-carousel :interval="3000" type="card" height="230px">
                <el-carousel-item v-for="(item, index) in carouselData" :key="index">
                    <img :src="item.imageUrl" alt="" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="recommendMusicList">
            <h2 style="display: flex; align-items: center; margin-bottom: 15px;">
                推荐歌单
                <ArrowRightBold style="width: 25px; height: 25px;"/>
            </h2>
            <ListCard :listCardData="musicList" @clickListCard="handleClickListCard"/>
        </div>
    </div>
</template>


<script setup>
    import ListCard from '@/components/ListCard.vue'
    import { request } from '@/network/request'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';

    const carouselData = ref([]);
    const musicList = ref([]);
    const router = useRouter();
    
    const handleClickListCard = (id) => {
        // console.log(id);
        router.push({ name: 'musicListDetail', params: { id } });
    }

    const getCarouselData = async () => {
        const res = await request('/banner');
        carouselData.value = res.data.banners;
        //console.log(carouselData.value);
    }

    const getMusicListData = async () => {
        const res = await request('/personalized', { limit:10 });
        // console.log(res.data);
        musicList.value = res.data.result;
    }

    getCarouselData();
    getMusicListData();
</script>

<style scoped>
    img{
        border-radius: 10px;
        height: 100%;
        width: 100%;
        object-fit: fill;
    }
</style>