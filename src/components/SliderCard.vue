<template>
    <el-carousel :interval="3000" type="card" height="230px">
        <el-carousel-item v-for="(slider, index) in sliders" 
                            :key="index">
            <img :src="slider.imageUrl"/>
        </el-carousel-item>
    </el-carousel>
</template>
<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        sliders: {
            type: [Object, Array],
            requered: true
        }
    });
</script>
<style scoped>
    .el-carousel__item {
        border-radius: 10px;
    }
    .el-carousel__item img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>