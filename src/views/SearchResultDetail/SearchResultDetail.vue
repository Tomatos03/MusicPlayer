<template>
    <div class="search-result-detail">
        <h1 style="font-size: 1.5em;">
            {{ searchContent }} 
            <span style="color: #c3c3c3; font-size: 0.7em; font-weight: normal;">的搜索结果如下：</span>
        </h1>
        <!-- <el-tabs v-model="activeTab">
            <el-tab-pane label="综合">
                <div class="song-container">
                    <h3 class="title">
                        单曲
                        <ArrowRightBold style="width: 20px; height: 20px;"/>
                    </h3>
                    <div class="song-card-container" v-if="searchResult">
                        <SongCard v-for="song in searchResult.song.songs" 
                                    :song="song"/>
                    </div>
                </div>

                <div class="mv-container" v-if="mvSearchResult">
                    <h3 @click="goToMVDetail" class="title">
                        MV
                        <ArrowRightBold style="width: 20px; height: 20px;"/>
                    </h3>
                    <div class="mv-card-container">
                        <MVCard v-for="mv in mvSearchResult.mvs"
                                    :mv="mv"/>
                    </div>
                </div>

                <div class="singer-container" v-if="searchResult">
                    <h3 class="title">
                        歌手
                        <ArrowRightBold style="width: 20px; height: 20px;"/>
                    </h3>
                    <div class="singer-card-container">
                        <SingerCard v-for="user in searchResult.artist.artists"
                                        :user="user"/>
                    </div>
                </div>

                <div class="album-container">
                    <h3 class="title">
                        专辑
                        <ArrowRightBold style="width: 20px; height: 20px;"/>
                    </h3>
                    <div class="album-card-container" v-if="searchResult">
                        <AlbumCard v-for="album in searchResult.album.albums"
                                    :album="album"/>
                    </div>
                </div>

                <div class="user-container" v-if="searchResult">
                    <h3 class="title">
                        用户
                        <ArrowRightBold style="width: 20px; height: 20px;"/>
                    </h3>
                    <div class="user-card-container">
                        <UserCard v-for="user in searchResult.user.users"
                                        :user="user"/>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="单曲">
            </el-tab-pane>
            <el-tab-pane label="歌手">
                <div class="singer-card-container" v-if="searchResult">
                    <SingerCard v-for="user in searchResult.artist.artists"
                                    :user="user"/>
                </div>
            </el-tab-pane>
            <el-tab-pane label="声音">
            </el-tab-pane>
            <el-tab-pane label="播客">
            </el-tab-pane>
            <el-tab-pane label="歌词">
            </el-tab-pane>
            <el-tab-pane label="专辑">
            </el-tab-pane>
            <el-tab-pane label="MV">
            </el-tab-pane>
            <el-tab-pane label="用户">
            </el-tab-pane>
        </el-tabs> -->
        <el-tabs v-model="activeTab">
            <el-tab-pane v-for="tab in tabs"
                            :label="tab.label">
                <template v-for="component in tab.components">
                    <div class="title" v-if="component.title"> 
                        {{ component.title }} 
                        <ArrowRightBold style="width: 20px; height: 20px;"/>
                    </div>
                    <div :class="component.parrentContainer" v-if="component.root">
                        <component :is="component.name"
                            v-for="(data, index) in parseDataSource(component.dataSource, component.root)"
                                :key="index"
                                :[component.propName]="data"/>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
    import { request } from '@/network/request';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import UserCard from '@/components/UserCard.vue';
    import SingerCard from '@/components/UserCard.vue';
    import MVCard from '@/components/MVCard.vue';
    import AlbumCard from '@/components/AlbumCard.vue';
    import SongCard from '@/components/SongCard.vue';
    const searchResult = ref(null);
    const mvSearchResult = ref(null);
    const tabs = [
        {
            label: "综合",
            components: [
                {
                    title: "单曲",
                    name: SongCard,
                    parrentContainer: "song-card-container",
                    dataSource: "song.songs",
                    propName: "song",
                    root: searchResult
                },
                {
                    title: "MV",
                    name: MVCard,
                    parrentContainer: "mv-card-container",
                    dataSource: "mvs",
                    propName: "mv",
                    root: mvSearchResult
                },
                {
                    title: "歌手",
                    name: SingerCard,
                    parrentContainer: "singer-card-container",
                    dataSource: "artist.artists",
                    propName: "user",
                    root: searchResult
                },
                {
                    title: "专辑",
                    name: AlbumCard,
                    parrentContainer: "album-card-container",
                    dataSource: "album.albums",
                    propName: "album",
                    root: searchResult
                },
                {
                    title: "用户",
                    name: UserCard,
                    parrentContainer: "user-card-container",
                    dataSource: "user.users",
                    propName: "user",
                    root: searchResult
                }
            ],
        },
        {
            label: "歌手",
            components:[
                {
                    title: null,
                    name: SingerCard,
                    parrentContainer: "singer-card-container",
                    dataSource: "artist.artists",
                    propName: "user",
                    root: searchResult
                },
            ]
        },
        {
            label: "专辑",
            components: [{
                title: null,
                name: AlbumCard,
                parrentContainer: "album-card-container",
                dataSource: "album.albums",
                propName: "album",
                root: searchResult
            }]
        },
        {
            label: "MV",
            components: [{
                title: null,
                name: MVCard,
                parrentContainer: "mv-card-container",
                dataSource: "mvs",
                propName: "mv",
                root: mvSearchResult
            }]
        }
    ];

    const route = useRoute();
    const searchContent = route.params.content;
    const activeTab = ref('0'); 

    // 根据字符串路径访问对应实际数据对象
    const parseDataSource = (path, root) => {
        const res = path.split('.').reduce((obj, key) => obj?.[key], root.value);
        // console.log(res);
        return res;
    };
    // const goToMVDetail = () => {
    //     activeTab.value = '7';
    // };
    const getSearchResult = async () => {
        const res = await request('/search', { 
            keywords: searchContent,
            type: 1018
        });
        searchResult.value = res.data.result;
        // console.log("搜索结果: ", searchResult);
    };
    const getMVSearchResult = async () => {
        const res = await request('/search', { 
            keywords: searchContent,
            type: 1004
        });
        mvSearchResult.value = res.data.result;
        console.log("MV搜索结果", mvSearchResult);
    }
    getSearchResult();
    getMVSearchResult();
</script>

<style scoped>
    .title{
        font-size: 1.2em;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    
    .user-card-container,
    .album-card-container,
    .singer-card-container,
    .mv-card-container{
        display: flex;
        gap: 25px;
        /* flex-wrap: wrap; */
        overflow: hidden;
        padding: 10px 0;
    }

    .song-card-container{
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        padding: 10px 0;
    }

    .search-result-detail{
        padding: 25px;
        width: 100%;
        height: 100%;
        background-color: #F7F9FC;
        overflow-y: auto;
    }
</style>