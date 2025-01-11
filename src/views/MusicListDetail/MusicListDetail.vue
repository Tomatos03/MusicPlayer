<template>
    <div class="music-detail" v-if="musiclistDetail">
        <div class="musiclist-info">
            <img :src="musiclistDetail.coverImgUrl" alt="" class="musiclist-img">
            <div class="profile">
                <h2>{{ musiclistDetail.name }}</h2>
                <p class="description"> {{ musiclistDetail.description ? musiclistDetail.descriptiop : "暂无简介"}} </p>
                <div class="author-info">
                    <img :src="musiclistDetail.creator.avatarUrl" alt="avatar" class="author-avatar">
                    <span>{{ musiclistDetail.creator.nickname }}</span>
                    <span style="color: #D1D3D8;">{{ showDate(musiclistDetail.createTime) }}</span>
                </div>
                <div class="btns">
                    <el-button color="#FC3D49" size="large" type="primary" :icon="'CaretRight'">播放全部</el-button>
                    <el-button color="#D9D9D9" size="large" type="primary" :icon="'CollectionTag'">收藏</el-button>
                    <el-button color="#D9D9D9" size="large" type="primary" :icon="'Download'">下载</el-button>
                    <el-button color="#D9D9D9" size="large" type="primary" :icon="'MoreFilled'"></el-button>
                </div>
            </div>
        </div>
        <el-tabs class="musiclist">
            <el-tab-pane label="歌曲">
                <el-table 
                    :data="songs" 
                    stripe 
                    highlight-current-row
                    style="width: 100%"
                >
                    <el-table-column type="index" width="50"  label="#"/>
                    <el-table-column prop="name" label="标题" min-width="230"/>
                    <el-table-column prop="ar[0].name" label="作者" min-width="230" />
                    <el-table-column prop="al.name" label="专辑" min-width="230" />
                    <el-table-column prop="dt" label="时长" min-width="200" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="评论">
            </el-tab-pane>
            <el-tab-pane label="收藏者">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
    import { request } from '@/network/request'
    import { useRoute } from 'vue-router'
    import { ref } from 'vue';
    import { formatDate } from '@/utils/utils';
    import { handleMusicTime } from '@/utils/utils';

    const musiclistDetail = ref(null);
    const songs = ref(null);
    const route = useRoute()
    const showDate = (time) => {
        // console.log(time)
        const date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
    }

    const getMusicListDetail = async () => {
        const res = await request('/playlist/detail', {
            id: route.params.id
        });
        musiclistDetail.value = res.data.playlist;
        // console.log(musiclistDetail.value)
    }

    const getMusicListAllSong = async () => {
        const res = await request("/playlist/track/all", {
            id: route.params.id
        })
        songs.value = res.data.songs;
        songs.value.forEach((item, index) => {
            songs.value[index].dt = handleMusicTime(item.dt);
        });
        console.log(songs.value)
    }

    getMusicListDetail()
    getMusicListAllSong()
</script>

<style scoped>
    .music-detail{
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 100%;
        overflow: auto;
        padding: 0 25px;
    }
    .musiclist-info{
        height: 250px;
        min-height: 250px;
        display: flex;
        gap: 20px;
    }
    .musiclist-info .musiclist-img{
        width: 20%;
        min-width: 200px;
        height: 100%;
        border-radius: 15px;
        object-fit: cover;
    }
    .author-info .author-avatar{
        height: 30px;
        width: 30px;
        border-radius: 50%;
    }
    .musiclist-info .profile{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .profile .author-info{
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .musiclist-info .profile .btns{
        flex-grow: 1;
        display: flex;
        align-items: end;
    }
</style>