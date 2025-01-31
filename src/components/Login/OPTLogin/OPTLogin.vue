<template>
    <div class="opt-login">
        <el-form 
            :rules="rule" 
            :model="loginForm">
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input style="flex: 1;" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
                <el-button 
                    @click="getCode"
                    style="margin-left: 5px; padding: 5px;" 
                    type="primary">
                    获取验证码
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%;" type="primary" @click="verityLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
    import { request } from '@/network/request';
    import { ref } from 'vue';
    import { ElMessage } from 'element-plus';
    import { useStore } from 'vuex';
    const loginForm = ref({
        phone: '',
        code: ''
    });
    const rule = {
        phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
    }
    const emit = defineEmits()
    const store = useStore()
    const getCode = async () => {
        const res = await request('/captcha/sent', { phone: loginForm.value.phone });
        // console.log(res);
    }
    const verityLogin = async () => {
        const res = await request('/captcha/verify', { phone: loginForm.value.phone, captcha: loginForm.value.code });
        if (res.data.code == 200) {
            store.commit('updateLoginState', true);
            emit('loginSuccess');
        }
    }

</script>
<style scoped>
</style>