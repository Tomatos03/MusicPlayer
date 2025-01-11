<template>
    <div class="headerbar">
        <div class="headerbar-left">
            <el-icon class="arrow-left" @click="$router.go(-1)">
                <ArrowLeft />
            </el-icon>
            <el-input class="search" style="height: 40px;" />
        </div>
        <div class="headerbar-right">
            <div @click="userLogin" class="login-container">
                <el-popover 
                    :width="300" 
                    trigger="click"
                    @hide="attemptLogin = false"
                    @show="attemptLogin = true"
                    v-if="!userInfo"
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
    const userInfo = ref(null);
    const attemptLogin = ref(false);
    const handleLoginSucess = (userProfile) => {
        console.log("HeaderBar", userProfile);
        userInfo.value = userProfile;
    }
</script>

<style>

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