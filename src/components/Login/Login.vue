<template>
    <div class="login">
        <el-tabs stretch>
            <el-tab-pane label="验证码登录">
                <CaptchaLogin @loginSuccess="transferLoginSuccess"/>
            </el-tab-pane>
            <el-tab-pane label="手机号登录">
                <OPTLogin/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
    import CaptchaLogin from './CaptchaLogin/CaptchaLogin.vue';
    import OPTLogin from './OPTLogin/OPTLogin.vue';
    const emit = defineEmits()
    const transferLoginSuccess = (userProfile) => {
        console.log("Login",userProfile)
        emit('loginSuccess', userProfile)
    }
</script>
<style scoped>
</style>