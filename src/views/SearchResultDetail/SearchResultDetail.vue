<template>
    <div class="search-result-detail">
        <h1 style="font-size: 1.5em;">
            {{ searchContent }} 
            <span style="color: #c3c3c3; font-size: 0.7em; font-weight: normal;">的搜索结果如下：</span>
        </h1>
        <el-tabs>
            <el-tab-pane label="综合">
                <h3 style="display: flex; align-items: center; margin-bottom: 15px;">
                    单曲
                    <ArrowRightBold style="width: 20px; height: 20px;"/>
                </h3>
                <div class="single" v-if="searchResult">
                    <div 
                        class="single-item"
                        v-for="(single, index) in searchResult.song.songs"
                            :key="index">
                            <div class="left">
                                <img :src="single.al.picUrl" alt="img">
                            </div>
                            <div class="middle">
                                <h3> {{ single.name }} </h3>
                                <p>
                                    <span v-for="(item, index) in single.ar">
                                        {{ item.name }} {{ index === single.ar.length - 1 ? '' : '/' }}
                                    </span>
                                </p>
                            </div>
                            <div class="right">
                            </div>
                    </div>
                </div>

                <h3 style="display: flex; align-items: center; margin-bottom: 15px;">
                    歌单
                    <ArrowRightBold style="width: 20px; height: 20px;"/>
                </h3>

                <h3 style="display: flex; align-items: center; margin-bottom: 15px;">
                    MV
                    <ArrowRightBold style="width: 20px; height: 20px;"/>
                </h3>

                <h3 style="display: flex; align-items: center; margin-bottom: 15px;">
                    播单
                    <ArrowRightBold style="width: 20px; height: 20px;"/>
                </h3>

                <h3 style="display: flex; align-items: center; margin-bottom: 15px;">
                    歌手
                    <ArrowRightBold style="width: 20px; height: 20px;"/>
                </h3>

                <h3 style="display: flex; align-items: center; margin-bottom: 15px;">
                    专辑
                    <ArrowRightBold style="width: 20px; height: 20px;"/>
                </h3>

                <h3 style="display: flex; align-items: center; margin-bottom: 15px;">
                    声音
                    <ArrowRightBold style="width: 20px; height: 20px;"/>
                </h3>

                <h3 style="display: flex; align-items: center; margin-bottom: 15px;">
                    用户
                    <ArrowRightBold style="width: 20px; height: 20px;"/>
                </h3>
            </el-tab-pane>

            <el-tab-pane label="单曲">

            </el-tab-pane label="歌手">

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
        </el-tabs>
    </div>
</template>
<script setup>
    import { request } from '@/network/request';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const searchContent = route.params.content;
    const searchResult = ref(null);
    const getSearchResult = async () => {
        const res = await request('/search', { 
            keywords: searchContent,
            type: 1018
        });
        // console.log("搜索结果: ", res);
        searchResult.value = res.data.result;
        console.log(searchResult);
    };
    getSearchResult();
</script>
<style scoped>
    :deep(.el-tabs__content){
        padding: 0 20px;
    }
    .single {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    .single-item:hover{
        background-color: white;
        box-shadow: 5px 5px 20px 0px rgba(142, 139, 139, 0.1);
    }

    .single-item {
        cursor: pointer;
        display: flex;
        min-width: 45%;
        flex-basis: 400px;
        border-radius: 10px;
        padding: 10px;
        gap: 5px;
    }
    .single-item .left {
        width: 70px;
        height: 70px;
    }
    .single-item .left img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
    .single-item .middle{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
    }
    .single-item .middle p{
        flex: 1;
        color: #c3c3c3;
    }
    .single-item .right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .search-result-detail{
        width: 100%;
        height: 100%;
        background-color: #F7F9FC;
    }
</style>