<template>
    <div class="recommend">
        <SliderCard :sliders="sliders" />
        <div>
            <h2 class="recommend__title">
                推荐歌单
                <ArrowRightBold class="recommend__title-icon" />
            </h2>
            <ListCard :listCardData="musicList" />
        </div>
    </div>
</template>

<script setup>
    import ListCard from "@/components/ListCard.vue";
    import SliderCard from "@/components/SliderCard.vue";
    import { request } from "@/network/request";
    import { ref } from "vue";

    const sliders = ref([]);
    const musicList = ref([]);

    const getCarouselData = async () => {
        const res = await request("/banner");
        sliders.value = res.data.banners;
        //console.log(carouselData.value);
    };

    const getMusicListData = async () => {
        const res = await request("/personalized", { limit: 10 });
        // console.log(res.data);
        musicList.value = res.data.result;
    };
    getCarouselData();
    getMusicListData();
</script>

<style lang="scss" scoped>
    @include b("recommend") {
        $title-icon-size: 25px;
        @include e("title") {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        @include e("title-icon") {
            height: $title-icon-size;
            width: $title-icon-size;
        }
    }
</style>
