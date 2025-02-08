<template>
    <div class="headerbar">
        <div class="headerbar__left">
            <el-icon class="headerbar__arrow" @click="$router.go(-1)">
                <ArrowLeft />
            </el-icon>
            <div class="search">
                <el-input
                    clearable
                    v-model="currentSearchContent"
                    class="search__input"
                    prefix-icon="Search"
                    @focus="showSearchSuggest = true"
                    @keyup.enter="handlePressEnter"
                    @blur="hideSearchSuggest" />
                <!-- 聚焦后的菜单 -->
                <el-scrollbar v-if="showSearchSuggest" class="search__suggest">
                    <div class="search__history" v-if="userHistorys.length > 0">
                        <div class="search__history-title">
                            <p>搜索历史</p>
                            <i
                                class="iconfont icon-delete"
                                @click="clearInputHistory"></i>
                        </div>
                        <div
                            class="search__history-items"
                            :ref="userHistorysRef">
                            <span
                                class="search__history-item"
                                v-for="history in userHistorys"
                                @click="submissionSearchContent(history)">
                                {{ history }}
                            </span>
                        </div>
                    </div>
                    <div class="search__hot-list">
                        <p class="search__hot-title">热搜榜</p>
                        <p
                            @click="handleHotSearchListClick"
                            class="search__hot-item"
                            v-for="(item, index) in hotSearchList"
                            :key="index">
                            <span
                                :style="{
                                    color: index < 3 ? '#FF3727' : '#C3C3C3',
                                    fontWeight: 'bold',
                                }">
                                <!-- 处理数位长度不一致问题 -->
                                {{
                                    index + 1 < 10
                                        ? index + 1 + "&nbsp"
                                        : index + 1
                                }}
                            </span>
                            {{ item.searchWord }}
                        </p>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="headerbar__right">
            <div class="login">
                <el-popover
                    v-if="!accountDetail"
                    :width="300"
                    trigger="click"
                    @hide="attemptLogin = false"
                    @show="attemptLogin = true">
                    <!-- #reference定义触发Popover的DOM -->
                    <template #reference>
                        <div class="login__user-container">
                            <el-avatar
                                icon="UserFilled"
                                :size="40"
                                fit="cover" />
                            <div>未登录</div>
                        </div>
                    </template>
                    <!-- 触发后展示的内容 -->
                    <Login
                        v-if="attemptLogin"
                        @loginSuccess="getCurrentAccountDetail" />
                </el-popover>
                <template v-else>
                    <el-avatar
                        :size="40"
                        @click="goToCurrentAccountDetail"
                        :src="accountDetail.avatarUrl"
                        fit="cover" />
                    <div>{{ accountDetail.nickname }}</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import Login from "./Login/Login.vue";
    import { request } from "@/network/request";
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";
    import { getTimeStamp } from "@/utils/utils";
    const store = useStore();
    const attemptLogin = ref(false);
    const accountDetail = ref(null);
    const hotSearchList = ref(null);
    const showSearchSuggest = ref(false);
    const currentSearchContent = ref("");
    const userHistorysRef = ref(null);
    const userHistorys = ref([]);
    const getInputHistory = async () => {
        const res = localStorage.getItem("userInputHistory");
        if (res) {
            userHistorys.value = JSON.parse(res);
        }
    };
    const pushSearchToHistory = (searchContent) => {
        if (!userHistorys.value.includes(searchContent)) {
            userHistorys.value.push(searchContent);
        }
    };
    const handleHotSearchListClick = (clickedItem) => {
        const hotSearchContent = getHotSearchContent(clickedItem);
        currentSearchContent.value = hotSearchContent;
        submissionSearchContent(hotSearchContent);
        pushSearchToHistory(currentSearchContent.value);
        saveInputHistory();
    };
    const handlePressEnter = () => {
        submissionSearchContent(currentSearchContent.value);
        pushSearchToHistory(currentSearchContent.value);
        saveInputHistory();
    };
    const saveInputHistory = () => {
        localStorage.setItem(
            "userInputHistory",
            JSON.stringify(userHistorys.value),
        );
    };
    const clearInputHistory = () => {
        userHistorys.value = [];
        localStorage.removeItem("userInputHistory");
    };
    const hideSearchSuggest = () => {
        setTimeout(() => {
            showSearchSuggest.value = false;
        }, 150);
    };
    const getHotSearchContent = (clckedItem) => {
        // console.log(item.target.textContent);
        // 由于换行多产生了一个空格，从第4个字符起为空格
        return clckedItem.target.textContent.substring(3).trim();
    };
    const router = useRouter();
    const submissionSearchContent = (searchContent) => {
        if (!searchContent) return;
        currentSearchContent.value = searchContent;
        router.push({
            name: "searchResult",
            params: { content: searchContent },
        });
    };
    const goToCurrentAccountDetail = () => {
        const uid = localStorage.getItem("uid");
        router.push({ name: "accountDetail", params: { uid: uid } });
    };
    const getHotSearch = async () => {
        const res = await request("/search/hot/detail");
        // console.log("热搜列表: ", res);
        hotSearchList.value = res.data.data;
    };
    const getCurrentAccountDetail = async () => {
        const res = await request("/user/account", {
            timestamp: getTimeStamp(),
        });
        // console.log(res);
        if (res.data.profile != null) {
            accountDetail.value = res.data.profile;
            store.commit("updateLoginState", true);
            localStorage.setItem("uid", res.data.profile.userId);
        } else {
            store.commit("updateLoginState", false);
            localStorage.removeItem("userId");
        }
    };
    getInputHistory();
    getCurrentAccountDetail();
    getHotSearch();
</script>

<style lang="scss" scoped>
    @include b("headerbar") {
        padding-left: 25px;
        padding-right: 130px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include e(("left", "right")) {
            flex: 1;
            height: 100%;
            min-width: 300px;
            display: flex;
        }

        @include e("left") {
            align-items: center;
            gap: 20px;
        }
        @include e("right") {
            justify-content: end;
        }
        @include e("arrow") {
            cursor: pointer;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            min-height: 40px;
            background-color: #f7f9fc;
            border-radius: 5px;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rga(0, 0, 0, 0.3);
        }
    }
    @include b("search") {
        position: relative;
        @include e("hot-item") {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: left;
            gap: 10px;
            font-size: 0.9em;
            padding: var(--padding);
        }
        &__hot-item:hover {
            background-color: rgba(162, 158, 158, 0.1);
        }
        @include e("hot-title") {
            padding-left: var(--padding);
            margin-bottom: 10px;
        }
        @include e("history-items") {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
            padding-top: 10px;
            margin-bottom: 10px;
        }
        @include e("history-item") {
            cursor: pointer;
            background-color: #f1f1f1;
            border-radius: 5px;
            font-size: 0.9em;
            padding: 10px;
        }
        &__history-item:hover {
            filter: brightness(95%);
        }
        @include e("history-title") {
            position: relative;
            color: #999;

            i {
                cursor: pointer;
                font-size: 20px;
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        @include e("history") {
            display: flex;
            flex-direction: column;
            padding: 0 var(--padding);
        }
        @include e("input") {
            height: 40px;
            width: 300px;
        }
        @include e("suggest") {
            --padding: 15px;
            position: absolute;
            z-index: 99;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: white;
            border-radius: 10px;
            margin-top: 10px;
            padding-top: 20px;
            box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.2);
            height: 400px;
        }
    }
    @include b("login") {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;

        @include e("user-container") {
            display: flex;
            align-items: center;
            gap: 5px;
        }
    }
</style>
