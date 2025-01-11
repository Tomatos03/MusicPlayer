import { createStore } from "vuex";


const store = createStore({
    state: {
        isLogin: false,
    },
    mutations: {
        updateLoginState(state, flag) {
            state.isLogin = flag;
        },
    }
})

export default store;