<template>
    <el-scrollbar>
        <div class="account" v-if="accountDetail">
            <div class="account__header">
                <img
                    class="account__avatar"
                    :src="accountDetail.profile.avatarUrl" />
                <div class="account__info">
                    <h1 class="account__name">
                        {{ accountDetail.profile.nickname }}
                        <i
                            v-if="currentUid == myUid"
                            @click="goToEditAccount"
                            class="iconfont icon-edit"></i>
                    </h1>
                    <div class="account__icons">
                        <span class="account__level"
                            >LV.{{ accountDetail.level }}</span
                        >
                        <i
                            :class="[
                                'iconfont',
                                accountDetail.profile.gender == 1
                                    ? 'icon-man'
                                    : 'icon-woman',
                            ]"></i>
                    </div>
                    <div class="account__follow">
                        <span>关注 {{ accountDetail.profile.follows }}</span>
                        <span class="account__divide-line"> </span>
                        <span>粉丝 {{ accountDetail.profile.followeds }}</span>
                    </div>
                    <div
                        class="account__signature"
                        v-if="accountDetail.profile.signature">
                        简介： {{ accountDetail.profile.signature }}
                    </div>
                    <div class="account__location">
                        地区：
                        {{
                            convertProvinceCodeToName(
                                accountDetail.profile.province,
                            )
                        }}
                        {{ convertCityCodeToName(accountDetail.profile.city) }}
                    </div>
                </div>
            </div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="创建的歌单" lazy>
                    <ListCard
                        v-if="userCreatedPlayList.length > 0"
                        :listCardData="userCreatedPlayList" />
                    <div v-else class="account__no-content">
                        <h1>暂时没有内容</h1>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="收藏的歌单" lazy>
                    <ListCard
                        v-if="userCollectedPlayList.length > 0"
                        :listCardData="userCollectedPlayList" />
                    <div v-else class="account__no-content">
                        <h1>暂时没有内容</h1>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-scrollbar>
</template>
<script setup>
    import ListCard from "@/components/ListCard.vue";
    import { request } from "@/network/request";
    import {
        convertProvinceCodeToName,
        convertCityCodeToName,
    } from "@/utils/utils";
    import { ref } from "vue";
    import { useRoute, useRouter } from "vue-router";
    const accountDetail = ref(null);
    const userCreatedPlayList = ref([]);
    const userCollectedPlayList = ref([]);
    const route = useRoute();
    const currentUid = route.params.uid;
    const myUid = localStorage.getItem("uid");
    const getAccountById = async (id) => {
        const res = await request("/user/detail", {
            uid: id,
        });
        accountDetail.value = res.data;
        console.log(accountDetail);
    };
    const router = useRouter();
    const goToEditAccount = () => {
        router.push({ name: "editAccount" });
    };
    const getUserPlayListById = async (currentUid) => {
        const res = await request("/user/playlist", {
            uid: currentUid,
        });
        res.data.playlist.forEach((playList) => {
            if (playList.creator.userId == currentUid) {
                userCreatedPlayList.value.push(playList);
            } else {
                userCollectedPlayList.value.push(playList);
            }
        });
        // console.log(userCollectedPlayList);
        // console.log(userCreatedPlayList);
    };
    getUserPlayListById(currentUid);
    getAccountById(currentUid);
</script>
<style lang="scss" scoped>
    @include b("account") {
        height: 100%;
        width: 100%;
        $avator-size: 150px;

        @include e("avatar") {
            height: $avator-size;
            width: $avator-size;
            border-radius: 100%;
        }
        @include e("header") {
            display: flex;
            gap: 20px;
            margin-bottom: 10px;
        }
        @include e("info") {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 5px;
        }
        @include e("no-content") {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 400px;
        }
        @include e("level") {
            font-size: 0.9em;
            background-color: #f1f1f1;
            padding: 5px;
            border-radius: 5px;
        }
        @include e("icons") {
            display: flex;
            align-items: center;
            gap: 5px;

            .icon-man,
            .icon-woman {
                font-size: 25px;
            }
            .icon-man {
                color: #05b6f7;
            }
            .icon-woman {
                color: #f60574;
            }
        }
        @include e("follow") {
            display: flex;
            align-items: center;
        }
        @include e("divide-line") {
            display: inline-block;
            background-color: #fcfcfc;
            width: 1px;
            height: 100%;
            margin: 0 5px;
        }
        @include e("name") {
            font-size: 1.3em;

            .icon-edit {
                cursor: pointer;
                color: #ccc;
                font-size: 20px;
            }
        }
    }
</style>
