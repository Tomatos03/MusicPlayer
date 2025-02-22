<template>
    <div class="search-result">
        <h1 class="search-result__title">
            {{ searchContent }}
            <span class="search-result__title-inner">的搜索结果如下：</span>
        </h1>
        <el-tabs v-model="activeTab">
            <el-tab-pane v-for="tab in tabs" :label="tab.label">
                <template v-for="component in tab.components">
                    <template
                        v-if="
                            parseDataSource(
                                component.dataSource,
                                component.root,
                            )
                        ">
                        <div
                            class="search-result__panel-title"
                            v-if="component.title">
                            {{ component.title }}
                            <ArrowRightBold style="width: 20px; height: 20px" />
                        </div>
                        <AdaptiveContainer
                            :class="
                                'search-result__' + component.parrentContainer
                            "
                            :itemMinWidth="250">
                            <template #content>
                                <component
                                    :is="component.name"
                                    v-for="(data, index) in parseDataSource(
                                        component.dataSource,
                                        component.root,
                                    )"
                                    :key="index"
                                    :[component.propName]="data" />
                            </template>
                        </AdaptiveContainer>
                    </template>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
    import { request } from "@/network/request";
    import { ref } from "vue";
    import { useRoute } from "vue-router";
    import UserCard from "@/components/UserCard.vue";
    import SingerCard from "@/components/UserCard.vue";
    import MVCard from "@/components/MVCard.vue";
    import AlbumCard from "@/components/AlbumCard.vue";
    import SongCard from "@/components/SongCard.vue";
    import AdaptiveContainer from "@/components/AdaptiveContainer.vue";
    import { getSearchResultByWord } from "@/services/api";
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
                    root: searchResult,
                },
                {
                    title: "MV",
                    name: MVCard,
                    parrentContainer: "mv-card-container",
                    dataSource: "mvs",
                    propName: "mv",
                    root: mvSearchResult,
                },
                {
                    title: "歌手",
                    name: SingerCard,
                    parrentContainer: "singer-card-container",
                    dataSource: "artist.artists",
                    propName: "user",
                    root: searchResult,
                },
                {
                    title: "专辑",
                    name: AlbumCard,
                    parrentContainer: "album-card-container",
                    dataSource: "album.albums",
                    propName: "album",
                    root: searchResult,
                },
                {
                    title: "用户",
                    name: UserCard,
                    parrentContainer: "user-card-container",
                    dataSource: "user.users",
                    propName: "user",
                    root: searchResult,
                },
            ],
        },
        {
            label: "歌手",
            components: [
                {
                    title: null,
                    name: SingerCard,
                    parrentContainer: "singer-card-container",
                    dataSource: "artist.artists",
                    propName: "user",
                    root: searchResult,
                },
            ],
        },
        {
            label: "专辑",
            components: [
                {
                    title: null,
                    name: AlbumCard,
                    parrentContainer: "album-card-container",
                    dataSource: "album.albums",
                    propName: "album",
                    root: searchResult,
                },
            ],
        },
        {
            label: "MV",
            components: [
                {
                    title: null,
                    name: MVCard,
                    parrentContainer: "mv-card-container",
                    dataSource: "mvs",
                    propName: "mv",
                    root: mvSearchResult,
                },
            ],
        },
    ];

    const route = useRoute();
    const searchContent = route.params.content;
    const activeTab = ref("0");

    // 根据字符串路径访问对应实际数据对象
    const parseDataSource = (path, root) => {
        const res = path
            .split(".")
            .reduce((obj, key) => obj?.[key], root.value);
        // console.log(res);
        return res;
    };
    // const goToMVDetail = () => {
    //     activeTab.value = '7';
    // };
    const getSearchResult = async () => {
        searchResult.value = await getSearchResultByWord(searchContent, 1018);
        // console.log("搜索结果: ", searchResult);
    };
    const getMVSearchResult = async () => {
        mvSearchResult.value = await getSearchResultByWord(searchContent, 1004);
        // console.log("MV搜索结果", mvSearchResult);
    };
    getSearchResult();
    getMVSearchResult();
</script>

<style lang="scss" scoped>
    @include b("search-result") {
        padding: 0 25px 25px 25px;
        width: 100%;
        height: 100%;
        background-color: #f7f9fc;
        overflow-y: auto;

        @include e("title") {
            font-size: 1.5em;
        }
        @include e("title-inner") {
            font-size: 0.7em;
            color: #999999;
        }
        @include e("panel-title") {
            font-size: 1.2em;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
        }
        @include e(
            (
                "user-card-container",
                "album-card-container",
                "singer-card-container",
                "mv-card-container"
            )
        ) {
            display: flex;
            gap: 20px;
            flex-wrap: nowrap;
            overflow: hidden;
            padding: 10px 0;
        }
        @include e("song-card-container") {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
            padding: 10px 0;
        }
    }
</style>
