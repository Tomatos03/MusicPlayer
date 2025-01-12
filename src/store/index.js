import { createStore } from "vuex";


const store = createStore({
    state: {
        isLogin: false,
        attemptLogin: false,
    },
    mutations: {
        updateLoginState(state, flag) {
            state.isLogin = flag;
        },
        updateAttemptLoginState(state, flag) {
            state.attemptLogin = flag;
        },
    }
})

export default store;