<template>
    <div class="music-detail" v-if="musiclistDetail">
        <div class="musiclist-info">
            <img
                :src="musiclistDetail.coverImgUrl"
                alt=""
                class="musiclist-img" />
            <div class="profile">
                <h2>{{ musiclistDetail.name }}</h2>
                <p class="description">
                    {{
                        musiclistDetail.description
                            ? musiclistDetail.description
                            : "暂无简介"
                    }}
                </p>
                <p>
                    标签:
                    <template v-if="musiclistDetail.tags.length > 0">
                        <span
                            style="color: #00b2ff"
                            v-for="tag in musiclistDetail.tags">
                            {{ tag + " " }}
                        </span>
                    </template>
                    <span v-else>暂无标签</span>
                </p>
                <div class="author-info">
                    <div
                        class="wrapper"
                        @click="
                            goToAccountDetailById(
                                musiclistDetail.creator.userId,
                            )
                        ">
                        <img
                            :src="musiclistDetail.creator.avatarUrl"
                            alt="avatar"
                            class="avatar" />
                        <span>{{ musiclistDetail.creator.nickname }}</span>
                    </div>
                    <span style="color: #949494"
                        >{{ showDate(musiclistDetail.createTime) }} 创建</span
                    >
                </div>
                <div class="btns">
                    <el-button
                        color="#FC3D49"
                        size="large"
                        type="primary"
                        :icon="'CaretRight'"
                        >播放全部</el-button
                    >
                    <el-button
                        color="#D9D9D9"
                        size="large"
                        type="primary"
                        :icon="'CollectionTag'"
                        >收藏</el-button
                    >
                    <el-button
                        color="#D9D9D9"
                        size="large"
                        type="primary"
                        :icon="'Download'"
                        >下载</el-button
                    >
                    <el-button
                        color="#D9D9D9"
                        size="large"
                        type="primary"
                        :icon="'MoreFilled'"></el-button>
                </div>
            </div>
        </div>
        <el-tabs class="musiclist">
            <el-tab-pane label="歌曲">
                <el-table
                    :data="songs"
                    stripe
                    highlight-current-row
                    :row-key="(row) => row.id"
                    style="width: 100%"
                    @row-dblclick="playMusic">
                    <el-table-column type="index" width="50" label="#" />
                    <el-table-column prop="name" label="标题" min-width="230" />
                    <el-table-column
                        prop="ar[0].name"
                        label="作者"
                        min-width="230" />
                    <el-table-column
                        prop="al.name"
                        label="专辑"
                        min-width="230" />
                    <el-table-column prop="dt" label="时长" min-width="200" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="评论"> </el-tab-pane>
            <el-tab-pane label="收藏者"> </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
    import { request } from "@/network/request";
    import { useRoute, useRouter } from "vue-router";
    import { ref } from "vue";
    import { formatDate } from "@/utils/utils";
    import { handleMusicTime } from "@/utils/utils";
    import { useStore } from "vuex";
    const store = useStore();
    const musiclistDetail = ref(null);
    const songs = ref(null);
    const route = useRoute();
    const router = useRouter();
    const showDate = (time) => {
        // console.log(time)
        const date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
    };
    const goToAccountDetailById = (id) => {
        router.push({
            name: "accountDetail",
            params: { uid: id },
        });
    };

    // 根据歌单id获取歌单详情信息
    const getMusicListDetail = async () => {
        const res = await request("/playlist/detail", {
            id: route.params.id,
        });
        musiclistDetail.value = res.data.playlist;
        console.log(musiclistDetail.value);
    };

    // 根据歌单id获取歌单中全部歌曲的信息
    const getMusicListAllSong = async () => {
        const res = await request("/playlist/track/all", {
            id: route.params.id,
        });
        songs.value = res.data.songs;
        songs.value.forEach((item, index) => {
            songs.value[index].dt = handleMusicTime(item.dt);
        });
        // console.log(songs.value)
    };

    const playMusic = async (rowItem) => {
        console.log(rowItem);
        try {
            const res = await request("/song/url", { id: rowItem.id });
            // console.log(res.data.data[0]);
            const newSong = {
                id: rowItem.id,
                name: rowItem.name,
                authors: rowItem.ar,
                url: res.data.data[0].url,
                cover: rowItem.al.picUrl,
            };
            store.dispatch("updateCurrentPlaySong", newSong);
        } catch (error) {
            console.error("获取音频 URL 出错:", error);
        }
    };

    getMusicListDetail();
    getMusicListAllSong();
</script>

<style scoped>
    :deep(.el-tabs__item) {
        font-size: 1em;
        font-weight: bold;
    }
    .music-detail {
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 100%;
        overflow: auto;
        padding: 0 25px;
    }
    .musiclist-info {
        display: flex;
        min-height: 250px;
        gap: 20px;
    }
    .musiclist-info .musiclist-img {
        width: 20%;
        min-width: 200px;
        height: 100%;
        border-radius: 15px;
        object-fit: cover;
    }
    .author-info .avatar {
        height: 30px;
        width: 30px;
        border-radius: 50%;
    }
    .author-info .wrapper {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .musiclist-info .profile {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .profile .author-info {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .profile .description {
        display: -webkit-box;
        -webkit-line-clamp: 3; /* 设置显示的行数 */
        -webkit-box-orient: vertical; /* 设置布局方向 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 溢出的文本显示省略号 */
        max-height: 120px; /* 设置最大高度 */
    }
    .musiclist-info .profile .btns {
        flex-grow: 1;
        display: flex;
        align-items: end;
    }
</style>
