<template>
    <div
        :class="['user-card', { 'user-card--selected': isHovered }]"
        ref="userCardRef"
        @mouseover="isHovered = true"
        @mouseout="isHovered = false">
        <div class="user-card__avatar">
            <img :src="props.user.img1v1Url || props.user.avatarUrl" />
            <i class="iconfont icon-play"></i>
        </div>
        <h4 class="user-card__name">
            {{ props.user.name || props.user.nickname }}
        </h4>
        <p v-if="props.user.albumSize"> 专辑数量：{{ props.user.albumSize }}</p>
        <p v-else-if="props.user.signature">{{ props.user.signature }}</p>
    </div>
</template>
<script setup>
    import { ref, defineProps } from "vue";
    const props = defineProps({
        user: {
            type: [Object, Array],
            required: true,
        },
    });
    const userCardRef = ref([]);
    const isHovered = ref(false);
</script>
<style lang="scss" scoped>
    @include b("user-card") {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        max-width: 200px;
        min-width: 140px;
        flex: 1;
        padding: 20px;

        p {
            width: 120px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 0.9em;
            text-align: center;
        }
        img {
            width: 100%;
            aspect-ratio: 1;
            border-radius: 50%;
        }
        @include m("selected") {
            background-color: white;
            box-shadow: 0px 0px 15px 0px rgba(142, 139, 139, 0.1);

            @include e("avatar") {
                i {
                    opacity: 0.8;
                }

                i:hover {
                    transition: none;
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.1);
                }
                img {
                    filter: brightness(70%);
                }
            }
        }
        @include e("avatar") {
            width: 100%;
            position: relative;

            i {
                position: absolute;
                font-size: 40px;
                color: white;
                opacity: 0;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                transition: opacity 0.5s ease;
            }
        }
    }
</style>
