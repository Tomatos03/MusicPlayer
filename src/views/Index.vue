<template>
    <el-container class="index">
        <el-aside>
            <div class="logo">
                <ElementPlus style="width: 60px; height: 60px; color: red;"/>
                <span style="font: 1.2em bold;">MusicPlayer</span>
            </div>
            <el-menu @select="handleSelect" 
                :router="true"
                :default-active="activeIndex" 
                :show-timeout="300"
                :hide-timeout="300">
                <el-menu-item v-for="(item, index) in asideListItem"
                                :key="index"
                                :index="item.path">
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
    <MusicControler componentHeight="13vh"/>
</template>

<script setup>
    import HeaderBar from '@/components/HeaderBar.vue';
    import { RouterView, useRoute, useRouter } from 'vue-router';
    import { ref } from 'vue';
    import MusicControler from '@/components/MusicControler.vue';
    const asideListItem = ref([
        {
            name: "发现音乐", 
            path: "/discoverMusic", 
            class: "iconfont icon-find"
        },
        { 
            name: "视频", 
            path: "/video", 
            class: "iconfont icon-vedio"
        },
        { 
            name: "收藏", 
            path: "/collect", 
            class: "iconfont icon-collect"
        },
        { 
            name: "每日推荐", 
            path: "/dailyRecommend", 
            class: "iconfont icon-daliy"
        },
    ]);
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
    const route = useRoute();
    // 修正因为刷新导致的选中项重置
    const amendSelectedItem = () => {
        asideListItem.value.forEach((item) => {
            if(item.path == route.path) {
                activeIndex.value = item.path;
                return;
            }
        })
    }
    amendSelectedItem();
</script>

<style scoped>
    .index{
        height: 87vh;
        width: 100vw;
    }
    .el-aside .logo{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px;
    }
    .el-menu-item:hover {
        background-color: rgba(195, 195, 195, 0.3);
    }
    .el-menu-item i{
        font-size: 25px;
        vertical-align: middle;
    }
    .el-menu-item span{
        vertical-align: middle;
    }
    .el-menu-item{
        font-size: 1em;
        color: #787F8D;
        margin: 5px 20px;
        border-radius: 10px;
    }
    .el-menu-item.is-active{
        background-color: #FC3D49;
        color: #ffffff;
        font-weight: bold
    }
    .el-menu {
        background-color: transparent;
        --el-menu-active-color: #ffffff;
    }
    .el-aside{
        background-color: #F0F3F6;
        max-width: 300px;
        min-width: 230px;
        width: 20vw;
    }
    .el-header {
        padding: 0;
        height: 100px;
    }
    .el-header,
    .el-main {
        width: 80vw;
        min-width: 700px;
        background-color: #F7F9FC;
        padding-bottom: 0; /* 覆盖element自带的padding */ 
        padding-top: 0;
    }
    .el-main{
        overflow: hidden;
    }
</style>