<template>
    <el-container class="index">
        <el-aside>
            <div class="logo">
                <ElementPlus style="width: 60px; height: 60px; color: red" />
                <span style="font: 1.2em bold">MusicPlayer</span>
            </div>
            <el-menu
                @select="handleSelect"
                :router="true"
                :default-active="activeIndex"
                :show-timeout="300"
                :hide-timeout="300">
                <el-menu-item-group title="个性推荐">
                    <template v-for="item in asideListItem">
                        <el-menu-item :index="item.path" v-if="item.isShow">
                            <i :class="item.class"></i>
                            <span style="margin-left: 5px">{{
                                item.name
                            }}</span>
                        </el-menu-item>
                    </template>
                </el-menu-item-group>
                <el-menu-item-group title="我创建的歌单">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
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
    <MusicControler componentHeight="13vh" />
</template>

<script setup>
    import HeaderBar from "@/components/HeaderBar.vue";
    import { RouterView, useRoute, useRouter } from "vue-router";
    import { ref } from "vue";
    import MusicControler from "@/components/MusicControler.vue";
    import { useStore } from "vuex";
    import { getUserPlayListById } from "@/services/api";
    const uid = JSON.parse(localStorage.getItem("uid")) || -1;
    const store = useStore();
    const asideListItem = ref([
        {
            name: "发现音乐",
            path: "/discoverMusic",
            class: "iconfont icon-find",
            isShow: true,
        },
        {
            name: "视频",
            path: "/video",
            class: "iconfont icon-vedio",
            isShow: true,
        },
        {
            name: "收藏",
            path: "/collect",
            class: "iconfont icon-collect",
            isShow: true,
        },
        {
            name: "每日推荐",
            path: "/dailyRecommend",
            class: "iconfont icon-daliy",
            isShow: true,
        },
        {
            name: "我喜欢的音乐",
            path: "/loveMusic",
            class: "iconfont icon-love",
            isShow: store.state.userLoveMusics != undefined,
        },
    ]);
    const activeIndex = ref("/discoverMusic");
    const router = useRouter();

    const handleSelect = (newIndex) => {
        if (newIndex == activeIndex.value) {
            return;
        }
        console.log(newIndex);
        activeIndex.value = newIndex;
        if (newIndex == "/loveMusic") {
            const playlistId = store.state.userLoveMusics.id;
            router.push({
                name: "musicListDetail",
                params: { id: playlistId },
            });
        } else {
            router.push(newIndex);
        }
    };
    const classifyUserPlayList = async () => {
        if (uid == -1) return;

        const userPlaylists = await getUserPlayListById(uid);
        store.state.userCreatedPlayList = userPlaylists.filter(
            (playlist) => playlist.creator.userId == uid,
        );

        store.state.userLoveMusics = store.state.userCreatedPlayList[0];

        store.state.userCollectedPlayList = userPlaylists.filter(
            (playlist) => playlist.creator.userId != uid,
        );
        // console.log(store.state.userCollectedPlayList);
        // console.log(store.state.userCreatedPlayList);
        // console.log(store.state.userLoveMusics);
    };
    const route = useRoute();

    // 修正因为刷新导致的选中项重置
    const amendSelectedItem = () => {
        asideListItem.value.forEach((item) => {
            if (item.path == route.path) {
                activeIndex.value = item.path;
                return;
            }
        });
    };
    classifyUserPlayList();
    amendSelectedItem();
</script>

<style scoped>
    .index {
        height: 87vh;
        width: 100vw;
    }
    .el-aside .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px;
    }
    .el-menu-item:hover {
        background-color: rgba(195, 195, 195, 0.3);
    }
    .el-menu-item i {
        font-size: 25px;
    }
    .el-menu-item {
        font-size: 1em;
        color: #787f8d;
        margin: 5px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
    }
    .el-menu-item.is-active {
        background-color: #fc3d49;
        color: #ffffff;
        font-weight: bold;
    }
    .el-menu {
        background-color: transparent;
        --el-menu-active-color: #ffffff;
    }
    .el-aside {
        background-color: #f0f3f6;
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
        min-width: 700px;
        background-color: #f7f9fc;
        padding-bottom: 0; /* 覆盖element自带的padding */
        padding-top: 0;
    }
    .el-main {
        overflow: hidden;
    }
</style>
