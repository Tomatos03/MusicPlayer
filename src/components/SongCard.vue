<template>
    <div
        :class="['song-card', { 'song-card--selected': isHovered }]"
        ref="songCardRef"
        @mouseover="isHovered = true"
        @mouseout="isHovered = false">
        <div class="song-card__img">
            <img :src="props.song.al.picUrl" alt="img" />
            <i class="iconfont icon-play"></i>
        </div>

        <div class="song-card__info">
            <div class="song-card__name">{{ props.song.name }}</div>
            <div class="song-card__authors">
                {{ getAuthorsString(props.song.ar) }}
            </div>
        </div>

        <div class="song-card__group">
            <i class="iconfont icon-download"></i>
            <i class="iconfont icon-love0"></i>
            <i class="iconfont icon-more"></i>
        </div>
    </div>
</template>
<script setup>
    import { getAuthorsString } from "@/utils/utils";
    import { defineProps, ref } from "vue";
    const props = defineProps({
        song: {
            type: [Object, Array],
            required: true,
        },
    });
    const songCardRef = ref(null);
    const isHovered = ref(false);
</script>
<style lang="scss" scoped>
    @include b("song-card") {
        height: 80px;
        width: 400px;
        padding: 5px;
        display: flex;
        border-radius: 10px;

        &:hover {
            cursor: pointer;
            background-color: white;
            box-shadow: 0px 0px 10px 0px rgba(142, 139, 139, 0.1);
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

            @include e("group") {
                display: flex;
            }
        }

        @include e("img") {
            position: relative;
            img {
                width: 70px;
                height: 70px;
                object-fit: cover;
                border-radius: 10px;
            }

            i {
                position: absolute;
                font-size: 32px;
                color: white;
                opacity: 0;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                transition: opacity 0.5s ease;
            }
        }

        @include e("info") {
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
        @include e("name") {
            overflow: hidden;
            font-size: 1.1em;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        @include e("authors") {
            color: #8c8c8c;
            font-size: 0.9em;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        @include e("group") {
            display: none;
            padding: 5px;
            flex: 1;
            gap: 5px;
            justify-content: end;
            align-items: center;

            i {
                font-size: 25px;
            }
        }
    }
</style>
