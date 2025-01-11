<template>
    <el-container style="height: 100vh">
        <el-aside width="250px">
            <el-menu @select="handleSelect" 
                :router="true"
                :default-active="activeIndex" 
                :show-timeout="300"
                :hide-timeout="250">
                <el-menu-item class="aside-list-item"
                    v-for="(item, index) in asideListItem"
                        :key="index"
                        :index="item.path"
                >
                    <i :class="item.class"></i>
                    <span style="margin-left: 5px;">{{ item.name }}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <HeaderBar />
            </el-header>
            <el-main>
                <RouterView :key="$route.fullPath" />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
    import HeaderBar from '@/components/HeaderBar.vue';
    import { RouterView, useRouter } from 'vue-router';
    import { ref } from 'vue';
    const asideListItem = ref([
        {name: "发现音乐", path: "/discoverMusic", class: "iconfont icon-yinle"},
        {name: "视频", path: "/video", class: "iconfont icon-shipin"},
        {name: "收藏", path: "/collect", class: "iconfont icon-wodeshoucang"},
        {name: "每日推荐", path: "/dailyRecommend", class: "iconfont icon-good"},
    ])
    const activeIndex = ref("/discoverMusic");
    const router = useRouter();

    const handleSelect = (newIndex) => {
        if(newIndex == activeIndex.value){
            return;
        }
        // console.log(newIndex);
        activeIndex.value = newIndex;
        router.push(newIndex);
    };
    // const getLikeMusicList = async () => {

    // }
</script>

<style>
    /*#787F8D*/
    .aside-list-item{
        font-size: 1em;
        color: #787F8D;
    }
    .aside-list-item.is-active {
        background-color: #FC3D49;
        color: #ffffff;
        font-weight: bold
    }
    .el-menu {
        height: 100vh;
        --el-menu-bg-color: #F0F3F6;
        --el-menu-active-color: #ffffff;
    }
    .el-header {
        padding: 0 !important;
        height: 100px;
    }
    .el-header,
    .el-main {
        background-color: #F7F9FC;
    }
    .el-main{
        padding: 0;
        overflow-y: hidden;
    }
</style>