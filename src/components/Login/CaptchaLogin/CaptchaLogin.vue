<template>
    <div class="captcha-login" v-if="captchaUrl">
        <img @click="updateCaptcha" :src="captchaUrl" style="width: 200px; height: 200px;"/>
        <div class="tip">请使用网易云音乐app扫码登录</div>
    </div>
</template>

<!--
    获取二维码流程：
    发送请求从服务器获取二维码key
    将key作为参数发送新请求从服务器获取二维码图片
-->
<script setup>
    import { request } from '@/network/request';
    import { getTimeStamp } from '@/utils/utils';
    import { onBeforeUnmount, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    const { activeIndex } = defineProps({
        activeIndex: {
            type: Number,
            required: true
        }
    });
    const CHECK_CAPTCHA_INTERVAL = 2000;
    const CaptchaState = Object.freeze({
        EXPIRED: 800,        // 二维码过期
        WAITING_SCAN: 801,   // 等待扫码
        WAITING_CONFIRM: 802,// 待确认
        SUCCESS: 803      // 授权登录成功
    });
    const emit = defineEmits();
    const store = useStore();
    const captchaUrl = ref(null);
    const captchaKey = ref(null);
    let checkCaptchaStatus = null;
    const getCaptchaKey = async () => {
        const res = await request('/login/qr/key', { timestamp: getTimeStamp() });
        // console.log(res);
        captchaKey.value = res.data.data.unikey;
    }
    const getCaptcha = async () => {
        const res = await request('/login/qr/create', {
            key: captchaKey.value, 
            qrimg: true, 
            timestamp: getTimeStamp() 
        });
        // console.log(res);
        captchaUrl.value = res.data.data.qrimg
    }

    const getCaptchaStateCode = async () => {
        const res = await request('/login/qr/check', {
            key: captchaKey.value, 
            timestamp: getTimeStamp() 
        });
        // console.log(res);
        return res.data.code
    }

    const startCaptchaLogin = async () => {
        await getCaptchaKey();
        await getCaptcha();

        checkCaptchaStatus = setInterval(async () => {
            if(store.state.isLogin || activeIndex != 0) {
                clearInterval(checkCaptchaStatus);
                return;
            };

            const code = await getCaptchaStateCode();
            if(CaptchaState.SUCCESS === code){
                clearInterval(checkCaptchaStatus);
                store.commit('updateLoginState', true);
                emit('loginSuccess');
                console.log("登录成功");
            } else if(CaptchaState.EXPIRED === code){
                updateCaptcha();
            }
        }, CHECK_CAPTCHA_INTERVAL)
    }
    startCaptchaLogin();

    const updateCaptcha = () => {
        clearInterval(checkCaptchaStatus);
        startCaptchaLogin();
    }

    // 解构props不能直接提供给watch，需要使用getter方法间接提供
    watch(() => activeIndex, () => {
        if(activeIndex != 0) return;
        startCaptchaLogin();
    });

    onBeforeUnmount(async () => {
        clearInterval(checkCaptchaStatus);
    });
</script>
<style scoped>
    .captcha-login{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .tip{
        font-size: 1em;
        color: #575252;
    }
</style>