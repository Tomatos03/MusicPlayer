<template>
    <div class="personality-recommend">
        <SliderCard :sliders="sliders"/>
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
    import SliderCard from '@/components/SliderCard.vue';
    import { request } from '@/network/request'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';

    const sliders = ref([]);
    const musicList = ref([]);
    const router = useRouter();
    
    const handleClickListCard = (id) => {
        // console.log(id);
        router.push({ name: 'musicListDetail', params: { id } });
    }

    const getCarouselData = async () => {
        const res = await request('/banner');
        sliders.value = res.data.banners;
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
    .personality-recommend{
        padding: 0 20px 20px 20px;
        height: calc(100vh - 160px); /* 视窗大小减掉navbar高度、el-header高度*/
        overflow: auto;
    }
</style>