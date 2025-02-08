<template>
    <div class="login">
        <el-tabs stretch @tab-click="handleTabClick">
            <el-tab-pane label="验证码登录">
                <CaptchaLogin
                    :activeIndex="activeIndex"
                    @loginSuccess="transferLoginSuccess" />
            </el-tab-pane>
            <el-tab-pane label="手机号登录">
                <OPTLogin @loginSuccess="transferLoginSuccess" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
    import CaptchaLogin from "./CaptchaLogin/CaptchaLogin.vue";
    import OPTLogin from "./OPTLogin/OPTLogin.vue";
    import { ref } from "vue";
    const emit = defineEmits();
    const activeIndex = ref(0);
    const transferLoginSuccess = () => {
        emit("loginSuccess");
        console.log("登录成功");
    };
    const handleTabClick = (e) => {
        // console.log(e.index);
        activeIndex.value = e.index;
    };
</script>
