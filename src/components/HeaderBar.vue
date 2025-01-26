<template>
    <div class="headerbar">
        <div class="headerbar-left">
            <el-icon class="arrow-left" @click="$router.go(-1)">
                <ArrowLeft />
            </el-icon>
            <div class="search-container">
                <el-input 
                    clearable
                    v-model="searchContent"
                    class="search" 
                    style="height: 40px; width: 300px;"
                    prefix-icon="Search"
                    @focus="showSearchSuggest = true"
                    @keyup.enter="submissionSearchContent"
                    @blur="hideSearchSuggest"/>
                <el-scrollbar height="400px" v-if="showSearchSuggest" class="search-suggest">
                    <div class="hot-search-list">
                        <p style="color: #C3C3C3; font-size: 1.1em; padding-left: 15px;">热搜榜</p>
                        <p 
                            @click="clickHotSearchItem"
                            class="hot-search-item"
                            v-for="(item, index) in hotSearchList"
                            :key="index">
                                <span :style="{color: index < 3 ? '#FF3727' : '#C3C3C3', fontWeight: 'bold'}">
                                    <!-- 处理数位长度不一致问题 -->
                                    {{ index + 1 < 10 ? index + 1 + '&nbsp' : index + 1}}
                                </span>
                                {{ item.searchWord }}
                        </p>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="headerbar-right">
            <div @click="userLogin" class="login-container">
                <el-popover 
                    v-if="!userInfo"
                    :width="300" 
                    trigger="click"
                    @hide="attemptLogin = false"
                    @show="attemptLogin = true"
                >
                    <template #reference>
                        <Avatar class="avatar" />
                    </template>
                    <Login v-if="attemptLogin" @loginSuccess="handleLoginSucess"/>
                </el-popover>
                <template v-if="userInfo">
                    <img :src="userInfo.avatarUrl" class="avatar"/>
                    <div>{{ userInfo.nickname }}</div>
                </template>
                <div v-else>未登录</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Login from './Login/Login.vue';
    import { request } from '@/network/request';
    import { useRouter } from 'vue-router';
    const attemptLogin = ref(false);
    const userInfo = ref(null);
    const hotSearchList = ref(null);
    const showSearchSuggest = ref(false);
    const searchContent = ref('');
    const hideSearchSuggest = () => {
        setTimeout(() => {
            showSearchSuggest.value = false;
        }, 150);
    };
    const handleLoginSucess = (userProfile) => {
        console.log("HeaderBar", userProfile);
        userInfo.value = userProfile;
    }
    const clickHotSearchItem = (item) => {
        // console.log(item.target.textContent);
        // 由于换行多产生了一个空格，从第4个字符起为空格
        searchContent.value = item.target.textContent.substring(3).trim();
        submissionSearchContent();
    }
    const router = useRouter();
    const submissionSearchContent = () => {
        if(!searchContent.value) return;
        router.push({name: "searchResult", params: { content: searchContent.value }});
    }
    const getHotSearch = async () => {
        const res = await request('/search/hot/detail');
        // console.log("热搜列表: ", res);
        hotSearchList.value = res.data.data;
    }
    getHotSearch();
</script>

<style scoped>
    .hot-search-item{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: left;
        padding: 15px;
        gap: 10px;
    }
    .hot-search-item:hover{
        background-color: rgba(162, 158, 158, 0.1);
    }
    .search-container{
        position: relative;
    }
    .search-suggest{
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: white;
        z-index: 3;
        border-radius: 10px;
        margin-top: 10px;
        box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.2);
        height: 400px;
    }
    
    .avatar{
        width: 40px;
        height: 40px;
        padding: 3px;
        color: #454645;
        right: 10px;
        background-color: white;
        border-radius: 50%;
    }

    .arrow-left {
        cursor: pointer;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: #F7F9FC;
        border-radius: 5px;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rga(0, 0, 0, 0.3);
    }

    .headerbar {
        box-sizing: border-box;
        padding-left: 25px;
        padding-right: 100px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .headerbar-left {
        flex: 1;
        height: 100%;
        min-width: 300px;
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .headerbar-right {
        flex: 1;
        height: 100%;
        min-width: 300px;
        display: flex;
        justify-content: end;
    }

    .login-container{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
    }
</style>