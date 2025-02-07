import { createStore } from "vuex";

const store = createStore({
    state: {
        isLogin: false,
        currentSongIndex: -1,
        songs: [],
    },
    mutations: {
        updateLoginState(state, flag) {
            state.isLogin = flag;
        },
        addSong(state, newSong) {
            state.songs.push(newSong);
        },
        playNextSong(state) {
            const songs = state.songs;
            state.currentSongIndex =
                (state.currentSongIndex + 1) % songs.length;
        },
        playPrevSong(state) {
            const songs = state.songs;
            const n = songs.length;
            state.currentSongIndex = (state.currentSongIndex - 1 + n) % n;
        },
        updateCurrentPlaySongIndex(state, newIndex) {
            state.currentSongIndex = newIndex;
        },
    },
    actions: {
        updateCurrentPlaySong({ commit, state }, newSong) {
            let prevSongId = -1;
            state.songs.forEach((song, index) => {
                if (song.id == newSong.id) {
                    prevSongId = index;
                }
            });
            if (prevSongId == -1) {
                commit("addSong", newSong);
                commit("updateCurrentPlaySongIndex", state.songs.length - 1);
            } else {
                commit("updateCurrentPlaySongIndex", prevSongId);
            }
        },
    },
});

export default store;
