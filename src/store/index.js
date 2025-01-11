import { createStore } from "vuex";


const store = createStore({
    state: {
        isLogin: false,
    },
    mutations: {
        updateLoginState(state, flag = false) {
            state.isLogin = flag;
        },
    }
})

export default store;