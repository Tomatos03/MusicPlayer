<template>
    <div class="optlogin">
        <div class="optlogin__title">
            <ElementPlus style="width: 80px; height: 80px; color: red" />
            <h1>Login</h1>
        </div>
        <el-form
            :model="loginForm"
            :rules="loginRule"
            status-icon
            label-width="auto">
            <el-form-item
                label="手机号"
                class="optlogin__form-item"
                size="large"
                prop="phone">
                <el-input type="username" autocomplete="off" />
            </el-form-item>

            <el-form-item
                label="验证码"
                prop="code"
                size="large"
                class="optlogin__form-item">
                <el-input
                    style="flex: 1"
                    v-model="loginForm.code"
                    placeholder="请输入验证码"></el-input>
                <el-button
                    @click="getCode"
                    class="optlogin__getcode-button"
                    style="margin-left: 5px; padding: 5px"
                    type="primary">
                    获取验证码
                </el-button>
            </el-form-item>

            <div class="optlogin__submit">
                <el-button
                    class="optlogin__submit-button"
                    type="primary"
                    @click="verityLogin">
                    登录
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup>
    import { request } from "@/network/request";
    import { ref } from "vue";
    import { useStore } from "vuex";
    const loginForm = ref({
        phone: "",
        code: "",
    });
    const loginRule = {
        phone: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            {
                min: 11,
                max: 11,
                message: "请输入正确的手机号",
                trigger: "blur",
            },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    };
    const emit = defineEmits();
    const store = useStore();
    const getCode = async () => {
        const res = await request("/captcha/sent", {
            phone: loginForm.value.phone,
        });
        // console.log(res);
    };
    const verityLogin = async () => {
        const res = await request("/captcha/verify", {
            phone: loginForm.value.phone,
            captcha: loginForm.value.code,
        });
        if (res.data.code == 200) {
            store.commit("updateLoginState", true);
            emit("loginSuccess");
        }
    };
</script>
<style lang="scss" scoped>
    @include b("optlogin") {
        padding: 50px;

        @include e("title") {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            margin-bottom: 35px;
            font-size: 1.5em;
        }
        @include e("submit") {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        @include e("getcode-button" "submit-button") {
            background-color: $theme-color;
            border-radius: 5px;
            border: none;
            color: white;
            height: 40px;
        }
        @include e("submit-button") {
            width: 100%;
        }
        @include e("form-item") {
            margin-bottom: 35px;
            font-size: 1.2em;
        }
    }
</style>
