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
    import { getBanners, getRecommendPlayList } from "@/services/api";
    import { ref } from "vue";

    const sliders = ref([]);
    const musicList = ref([]);

    const getCarouselData = async () => {
        sliders.value = await getBanners();
    };

    const getMusicListData = async () => {
        musicList.value = await getRecommendPlayList(10);
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
