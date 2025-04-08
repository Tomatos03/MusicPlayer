<template>
    <div class="captcha-login" v-if="captchaImageUrl">
        <img @click="updateCaptcha" :src="captchaImageUrl" />
        <div class="tip">请使用网易云音乐app扫码登录</div>
    </div>
</template>

<!--
    获取二维码流程：
    发送请求从服务器获取二维码key
    将key作为参数发送新请求从服务器获取二维码图片

    通过key检查登录状态
-->
<script setup>
    import { request } from "@/network/request";
    import { getTimeStamp } from "@/utils/utils";
    import { onBeforeUnmount, ref, watch } from "vue";
    import { useStore } from "vuex";
    const props = defineProps({
        activeIndex: {
            type: Number,
            required: true,
        },
    });

    const activeIndexGetter = () => props.activeIndex;

    // Interval for checking the captcha status, set to 2000ms (2 seconds).
    // This duration was chosen to balance responsiveness for the user and reduce server load.
    // A shorter interval might improve responsiveness but could increase server requests,
    // while a longer interval might reduce server load but delay updates for the user.
    // This value can be adjusted if needed to optimize user experience or server performance.

    const CHECK_CAPTCHA_INTERVAL = 2000;
    const CaptchaState = Object.freeze({
        EXPIRED: 800, // 二维码过期
        WAITING_SCAN: 801, // 等待扫码
        WAITING_CONFIRM: 802, // 待确认
        SUCCESS: 803, // 授权登录成功
    });

    const emitEvent = defineEmits();
    const store = useStore();
    const captchaImageUrl = ref(null);
    const captchaKey = ref(null);
    const isCaptchaLogin = ref(false);
    let checkCaptchaStatus = null;
    const getCaptchaKey = async () => {
        const res = await request("/login/qr/key", {
            timestamp: getTimeStamp(),
        });
        captchaKey.value = res.data.data.unikey;
    };
    const getCaptcha = async () => {
        const res = await request("/login/qr/create", {
            key: captchaKey.value,
            qrimg: true,
            timestamp: getTimeStamp(),
        });
        captchaImageUrl.value = res.data.data.qrimg;
    };
    const getCaptchaStateCode = async () => {
        const res = await request("/login/qr/check", {
            key: captchaKey.value,
            timestamp: getTimeStamp(),
        });
        return res.data.code;
    };
    const updateCaptcha = async () => {
        const key = await getCaptchaKey();
        getCaptcha(key);
    };

    const startCaptchaLogin = async () => {
        if (isCaptchaLogin.value) return;
        updateCaptcha();
        isCaptchaLogin.value = true;

        // activeIndex = 0 -> 手机号, 1 -> 二维码
        checkCaptchaStatus = setInterval(async () => {
            if (store.state.isLogin || activeIndexGetter() != 1) {
                clearInterval(checkCaptchaStatus);
                isCaptchaLogin.value = false;
                return;
            }

            const stateCode = await getCaptchaStateCode();
            if (stateCode === CaptchaState.EXPIRED) {
                clearInterval(checkCaptchaStatus);
                updateCaptcha();
                isCaptchaLogin.value = false;
                return;
            }

            if (stateCode === CaptchaState.SUCCESS) {
                clearInterval(checkCaptchaStatus);
                store.commit("updateLoginState", true);
                emitEvent("loginSuccess");
                console.log("登录成功");
                isCaptchaLogin.value = false;
                return;
            }
        }, CHECK_CAPTCHA_INTERVAL);
    };

    if (!isCaptchaLogin.value) {
        startCaptchaLogin();
    }

    // 解构props不能直接提供给watch，需要使用getter方法间接提供
    // 因为解构后的props会丢失其响应性，而watch需要一个响应式引用来跟踪变化
    watch(activeIndexGetter, () => {
        if (activeIndexGetter() == 1) {
            startCaptchaLogin();
        }
    });
    onBeforeUnmount(() => {
        if (checkCaptchaStatus) {
            clearInterval(checkCaptchaStatus);
        }
    });
</script>

<style lang="scss" scoped>
    @include b("captcha-login") {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        @include e("img") {
            width: 200px;
            height: 200px;
            margin-bottom: 20px;
        }

        @include e("tip") {
            font-size: 1em;
            color: #575252;
        }
    }
</style>
