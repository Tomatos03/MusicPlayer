<template>
    <div class="navbar-container">
        <NavBar :navItems="navItems" @navBarClickItem="handleNavBarClickItem"/>
    </div>
    <RouterView/>
</template>


<script setup>
    import NavBar from '@/components/NavBar.vue';
    import { RouterView, useRouter } from 'vue-router';
    import {ref} from 'vue'

    const navItems = ref([
        { name: "个性推荐", path: "/discoverMusic/personalityRecommend" },
        { name: "歌单", path: "/discoverMusic/playList" },
        { name: "排行榜", path: "/discoverMusic/musicRank" },
        { name: "歌手", path: "/discoverMusic/singer" },
    ])
    const router = useRouter();
    
    const handleNavBarClickItem = (path) => {
        // console.log(path);
        router.push(path);
    }
</script>

<style scoped>
    .navbar-container{
        width: 100%;
        height: 50px;
    }
</style>