<template>
    <div class="discover-container" ref="containerRef">
        <div class="navbar-container" ref="navBarRef">
            <NavBar :navItems="navItems" @navBarClickItem="handleNavBarClickItem" />
        </div>
        <el-scrollbar :height="scrollBarHeight">
            <RouterView class="discover-music" />
        </el-scrollbar>
    </div>
</template>

<script setup>
    import NavBar from "@/components/NavBar.vue";
    import { RouterView, useRouter } from "vue-router";
    import { onMounted, ref } from "vue";

    const navItems = ref([
        { name: "个性推荐", path: "/discoverMusic/personalityRecommend" },
        { name: "歌单", path: "/discoverMusic/playList" },
        { name: "排行榜", path: "/discoverMusic/musicRank" },
        { name: "歌手", path: "/discoverMusic/singer" },
    ]);
    const router = useRouter();
    const containerRef = ref(null);
    const navBarRef = ref(null);
    const scrollBarHeight = ref(0);

    const handleNavBarClickItem = (path) => {
        // console.log(path);
        router.push(path);
    };
    const calculateScrollBarHeight = () => {
        const totalHeight = containerRef.value.offsetHeight;
        const navBarHeight = navBarRef.value.offsetHeight;
        scrollBarHeight.value = totalHeight - navBarHeight;
        // console.log(totalHeight);
        // console.log(scrollBarHeight.value);
    };
    onMounted(() => {
        calculateScrollBarHeight();
    });
</script>

<style scoped>
    .discover-container {
        width: 100%;
        height: 100%;
    }
    .discover-music {
        margin-bottom: 10px;
    }
    .navbar-container {
        width: 100%;
        height: 50px;
    }
</style>
