<template>
    <div
        :class="['album-card', { 'album-card--selected': isCardHovered }]"
        @mouseover="isCardHovered = true"
        @mouseout="isCardHovered = false">
        <div
            class="album-card__img"
            @mouseover="isImgHovered = true"
            @mouseout="isImgHovered = false">
            <img
                :class="[
                    'album-card__img-inner',
                    { 'album-card__img-inner--selected': isImgHovered },
                ]"
                :src="props.album.picUrl" />
            <i class="iconfont icon-play"></i>
        </div>

        <p class="album-card__name">{{ props.album.name }}</p>
    </div>
</template>

<script setup>
    import { ref } from "vue";

    const props = defineProps({
        album: {
            type: Object,
            required: true,
        },
    });

    const isCardHovered = ref(false); // 控制 album-card 的 hover
    const isImgHovered = ref(false); // 控制 album-card__img 的 hover
</script>

<style lang="scss" scoped>
    @include b("album-card") {
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

        @include m("selected") {
            @include e("img") {
                i {
                    opacity: 1;
                }
            }
        }
        @include e("img-inner") {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 10px;
            @include m("selected") {
                filter: brightness(70%);
            }
        }
        @include e("img") {
            position: relative;
            width: 100%;

            i {
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

            i:hover {
                filter: brightness(90%);
                transform: scale(1.1);
            }
        }
        @include e("name") {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
            text-align: center;
        }
    }
</style>
