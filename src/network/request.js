import axios from 'axios';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

// 该项目所有请求均为 get请求
export function request(url, params) {
  // console.log(typeof url, url)
  const store = useStore();

  // 创建axios配置实例对象
  const instance = axios.create({
    baseURL: '/api',
    timeout: 30000,
    withCredentials: true,
  });

  // axios拦截
  // 响应拦截
  instance.interceptors.response.use(
    (config) => {
      const code = config.data.code;
      if (code !== 200 && !(code >= 800 && code <= 803))
        ElMessage.error(config.data.message || '未知错误, 请打开控制台查看');
      return config;
    },
    (err) => {
      console.log([err]);
      if (err.response.data.msg === '需要登录') {
        // 修改当前的登录状态
        store.state.isLogin = false;
      } else {
        ElMessage.error(err.response.data.message || '未知错误, 请打开控制台查看');
      }
    },
  );

  instance.defaults.withCredentials = true;

  if (params) {
    const query = { params };
    return instance.get(url, query);
  } else {
    return instance.get(url);
  }
}
