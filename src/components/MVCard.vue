<template>
    <div
        :class="['mv-card', { 'mv-card--selected': isHovered }]"
        ref="mvCardRef"
        @mouseover="isHovered = true"
        @mouseout="isHovered = false">
        <div class="mv-card__img">
            <img :src="props.mv.coverUrl || props.mv.cover" />
            <i class="iconfont icon-play"></i>
            <div class="mv-card__play-count">
                <i class="iconfont icon-play"></i>
                <span>
                    {{ handleNum(props.mv.playTime || props.mv.playCount) }}
                </span>
            </div>
            <span class="mv-card__duration">
                {{ handleMusicTime(props.mv.durationms || props.mv.duration) }}
            </span>
        </div>
        <p class="mv-card__title">{{ props.mv.title || props.mv.name }}</p>
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
    const isHovered = ref(false);
</script>

<style lang="scss" scoped>
    @include b("mv-card") {
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

        img {
            width: 100%;
            height: 170px;
            object-fit: cover;
            border-radius: 10px;
        }
        @include m("selected") {
            img {
                filter: brightness(70%);
            }
            @include e("img") {
                i {
                    opacity: 0.8;
                }

                i:hover {
                    transition: none;
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.1);
                }
            }
        }
        @include e("play-count") {
            position: absolute;
            right: 10px;
            top: 15px;
            color: white;
            font-weight: bold;

            i {
                font-size: 20px;
                vertical-align: middle;
            }

            span {
                vertical-align: middle;
                margin-left: 2px;
            }
        }
        @include e("duration") {
            position: absolute;
            bottom: 10px;
            right: 10px;
            border-radius: 3px;
            padding: 2px;
            font-size: 0.9em;
            background-color: rgba(92, 67, 67, 0.8);
            color: white;
        }

        @include e("img") {
            position: relative;
            width: 100%;

            > i {
                position: absolute;
                font-size: 40px;
                color: white;
                opacity: 0;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                transition: opacity 0.8s ease;
            }
        }
        @include e("title") {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 280px;
            text-align: center;
        }
    }
</style>
