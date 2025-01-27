<template>
    <div class="user-card"
        ref="userCardRef"
        @mouseover="mouseoverSingerCard"
        @mouseout="mouseoutSingerCard">
        <div class="avatar">
            <img :src="props.user.img1v1Url || props.user.avatarUrl">
            <i class="iconfont icon-play"></i>
        </div>
        <h4 style="font-size: 1.1em;">{{ props.user.name || props.user.nickname}}</h4>
        <p v-if="props.user.albumSize"> 专辑数量：{{ props.user.albumSize }}</p>
        <p v-else-if="props.user.signature">{{ props.user.signature }}</p>
    </div>
</template>
<script setup>
    import { ref, defineProps } from 'vue';
    const props = defineProps({
        user: {
            type: [Object, Array],
            required: true
        }
    });
    const userCardRef = ref([]);
    const mouseoverSingerCard = () => {
        userCardRef.value.classList.add("active");
    }
    const mouseoutSingerCard = () => {
        userCardRef.value.classList.remove("active");
    }
    // console.log(props.singers);
</script>
<style scoped>
    .avatar{
        width: 100%;
        position: relative;
    }

    .avatar i{
        position: absolute;
        font-size: 40px;
        color: white;
        opacity: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 0.5s ease;
    }
    .user-card.active i{
        opacity: 0.8;
    }

    .user-card.active i:hover{
        transition: none;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
    }

    .user-card{
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
    }
    .user-card p{
        width: 120px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.9em;
        text-align: center;
    }
    .user-card.active{
        background-color: white;
        box-shadow: 0px 0px 15px 0px rgba(142, 139, 139, 0.1);
    }
    .user-card.active img{
        filter: brightness(70%);
    }
    .user-card img{
        width: 100%;
        aspect-ratio: 1;
        border-radius: 50%;
    }
</style>