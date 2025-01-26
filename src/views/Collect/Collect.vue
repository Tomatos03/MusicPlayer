<template>
    <div class="collect">
        <el-tabs >
            <el-tab-pane label="专辑" class="album">
                <template v-if="albumCount > 0">
                    <AlbumCard v-for="album in favoriteAlbumList"
                                :album="album"/>
                </template>
                <h3 v-else>暂无收藏专辑</h3>
            </el-tab-pane>
            <el-tab-pane label="MV" class="mv">
                <template v-if="mvCount > 0">
                    <MVCard v-for="mv in favoriteMVList"
                                :mv="mv"/>
                </template>
                <h3 v-else>暂无收藏MV</h3>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script setup>
    import AlbumCard from '@/components/AlbumCard.vue';
    import MVCard from '@/components/MVCard.vue';
    import { request } from '@/network/request';
    import { getTimeStamp } from '@/utils/utils';
    import { ref } from 'vue';
    const favoriteAlbumList = ref(null);
    const favoriteMVList = ref(null);
    const albumCount = ref(0);
    const mvCount = ref(0);
    const getFavoriteAlbumList = async () =>{
        const res = await request("/album/sublist", {
            limit: 1000,
            getTimeStamp,
        });
        console.log("收藏专辑详情: ", res);
        favoriteAlbumList.value = res.data.data;
        albumCount.value = res.data.count;
    }
    const getFavoriteMVList = async () =>{
        const res = await request("/mv/sublist", {
            getTimeStamp,
        });
        console.log("收藏MV详情: ", res);
        favoriteMVList.value = res.data.data;
        mvCount.value = res.data.count;
    }
    getFavoriteMVList();
    getFavoriteAlbumList();
</script>

<style scoped>
    .collect{
        min-height: 100vh;
        width: 100%;
        padding: 0 25px;
    }

    .album,
    .mv{
        display: flex;
        gap: 20px;
    }
</style>