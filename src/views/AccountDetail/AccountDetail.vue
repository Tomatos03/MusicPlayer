<template>
    <el-scrollbar>
        <div class="account-detail" v-if="accountDetail">
            <div class="account-info">
                <img :src="accountDetail.profile.avatarUrl" />
                <div class="info">
                    <h1 class="username">
                        {{ accountDetail.profile.nickname }}
                        <i
                            v-if="currentUid == myUid"
                            @click="goToEditAccount"
                            class="iconfont icon-edit"
                        ></i>
                    </h1>
                    <div class="level-and-gender">
                        <span class="level">LV.{{ accountDetail.level }}</span>
                        <i
                            :class="[
                                'iconfont',
                                accountDetail.profile.gender == 1 ? 'icon-man' : 'icon-woman',
                            ]"
                        ></i>
                    </div>
                    <div class="follow">
                        <span>关注 {{ accountDetail.profile.follows }}</span>
                        <span class="line"> </span>
                        <span>粉丝 {{ accountDetail.profile.followeds }}</span>
                    </div>
                    <div class="signature" v-if="accountDetail.profile.signature">
                        简介： {{ accountDetail.profile.signature }}
                    </div>
                    <div class="location">
                        地区： {{ convertProvinceCodeToName(accountDetail.profile.province) }}
                        {{ convertCityCodeToName(accountDetail.profile.city) }}
                    </div>
                </div>
            </div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="创建的歌单" lazy>
                    <ListCard
                        v-if="userCreatedPlayList.length > 0"
                        :listCardData="userCreatedPlayList"
                    />
                    <div v-else class="no-content">
                        <h1>暂时没有内容</h1>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="收藏的歌单" lazy>
                    <ListCard
                        v-if="userCollectedPlayList.length > 0"
                        :listCardData="userCollectedPlayList"
                    />
                    <div v-else class="no-content">
                        <h1>暂时没有内容</h1>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-scrollbar>
</template>
<script setup>
import ListCard from '@/components/ListCard.vue'
import { request } from '@/network/request'
import { convertProvinceCodeToName, convertCityCodeToName } from '@/utils/utils'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const accountDetail = ref(null)
const userCreatedPlayList = ref([])
const userCollectedPlayList = ref([])
const route = useRoute()
const currentUid = route.params.uid
const myUid = localStorage.getItem('uid')
const getAccountById = async (id) => {
    const res = await request('/user/detail', {
        uid: id,
    })
    accountDetail.value = res.data
    console.log(accountDetail)
}
const router = useRouter()
const goToEditAccount = () => {
    router.push({ name: 'editAccount' })
}
const getUserPlayListById = async (currentUid) => {
    const res = await request('/user/playlist', {
        uid: currentUid,
    })
    res.data.playlist.forEach((playList) => {
        if (playList.creator.userId == currentUid) {
            userCreatedPlayList.value.push(playList)
        } else {
            userCollectedPlayList.value.push(playList)
        }
    })
    // console.log(userCollectedPlayList);
    // console.log(userCreatedPlayList);
}
getUserPlayListById(currentUid)
getAccountById(currentUid)
</script>
<style scoped>
.no-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
}
.level-and-gender {
    display: flex;
    align-items: center;
    gap: 5px;
}
.icon-edit {
    cursor: pointer;
    color: #ccc;
    font-size: 20px;
}
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
.account-detail {
    height: 100%;
    width: 100%;
}
.account-info {
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
}
.account-info img {
    --side: 150px;
    width: var(--side);
    height: var(--side);
    border-radius: 100%;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.level {
    font-size: 0.9em;
    background-color: #f1f1f1;
    padding: 5px;
    border-radius: 5px;
}
.follow {
    display: flex;
    align-items: center;
}
.line {
    display: inline-block;
    background-color: #fcfcfc;
    width: 1px;
    height: 100%;
    margin: 0 5px;
}
.username {
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>
