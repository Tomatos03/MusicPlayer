<template>
    <div
        class="mv-card"
        ref="mvCardRef"
        @mouseover="mouseoverMVCard"
        @mouseout="mouseoutMVCard">
        <div class="mv-img">
            <img :src="props.mv.coverUrl || props.mv.cover" />
            <i class="iconfont icon-play"></i>
            <div class="watched-number">
                <i class="iconfont icon-play"></i>
                <span>
                    {{ handleNum(props.mv.playTime || props.mv.playCount) }}
                </span>
            </div>
            <span class="duration">
                {{ handleMusicTime(props.mv.durationms || props.mv.duration) }}
            </span>
        </div>
        <p class="title">{{ props.mv.title || props.mv.name }}</p>
    </div>
</template>

<script setup>
    import { handleMusicTime, handleNum } from "@/utils/utils";
    import { ref } from "vue";
    const props = defineProps({
        mv: {
            type: [Object, Array],
            required: true,
        },
    });
    const mvCardRef = ref(null);

    const mouseoverMVCard = () => {
        mvCardRef.value.classList.add("active");
    };
    const mouseoutMVCard = () => {
        mvCardRef.value.classList.remove("active");
    };
</script>

<style scoped>
    .mv-card .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 280px;
        text-align: center;
    }
    .mv-img .watched-number {
        position: absolute;
        right: 10px;
        top: 15px;
        color: white;
        font-weight: bold;
    }
    .mv-img .watched-number i {
        font-size: 20px;
        vertical-align: middle;
    }
    .mv-img .watched-number span {
        vertical-align: middle;
        margin-left: 2px;
    }
    .mv-img .duration {
        position: absolute;
        bottom: 10px;
        right: 10px;
        border-radius: 3px;
        padding: 2px;
        font-size: 0.9em;
        background-color: rgba(92, 67, 67, 0.8);
        color: white;
    }
    .mv-img {
        position: relative;
        width: 100%;
    }
    .mv-card {
        display: none;
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        min-width: 250px;
        max-width: 300px;
        flex: 1;
    }

    .mv-img > i {
        position: absolute;
        font-size: 40px;
        color: white;
        opacity: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 0.8s ease;
    }
    .mv-card.active .mv-img > i {
        opacity: 0.8;
    }
    .mv-card.active .mv-img > i:hover {
        transition: none;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
    }
    .mv-card img {
        width: 100%;
        height: 170px;
        object-fit: cover;
        border-radius: 10px;
    }
    .mv-card.active img {
        filter: brightness(70%);
    }
</style>
