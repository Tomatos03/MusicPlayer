import { createStore } from "vuex";

const store = createStore({
    state: {
        isLogin: false,
        currentSongIndex:
            JSON.parse(localStorage.getItem("lastPlaySongIndex")) || -1,
        songs: JSON.parse(localStorage.getItem("songs")) || [],
        userLikePlayList: [],
        userCollectPlayList: [],
        userPlayList: [],
    },
    mutations: {
        updatePlayList(state, playList) {
            state.playList = playList;
        },
        updateUserCollectPlayList(state, playList) {
            state.userCollectPlayList = playList;
        },
        updateUserLikePlayList(state, playList) {
            state.userLikePlayList = playList;
        },
        updateLoginState(state, flag) {
            state.isLogin = flag;
        },
        addSong(state, newSong) {
            state.songs.push(newSong);
        },
        nextSongIndex(state) {
            const songs = state.songs;
            state.currentSongIndex =
                (state.currentSongIndex + 1) % songs.length;
        },
        prevSongIndex(state) {
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
            console.log(typeof state.songs, state.songs);
            state.songs = state.songs.filter((song) => newSong.id != song.id);

            commit("addSong", newSong);
            commit("updateCurrentPlaySongIndex", state.songs.length - 1);

            localStorage.setItem("songs", JSON.stringify(state.songs));
            localStorage.setItem(
                "lastPlaySongIndex",
                JSON.stringify(state.currentSongIndex),
            );
        },
        indexIsLegal(index) {
            const maxIndex = state.songs.length;
            return index < 0 || index >= maxIndex;
        },
        playNextSong({ commit, state }) {
            commit("nextSongIndex");
            localStorage.setItem(
                "lastPlaySongIndex",
                JSON.stringify(state.currentSongIndex),
            );
        },
        playPrevSong({ commit, state }) {
            commit("prevSongIndex");
            localStorage.setItem(
                "lastPlaySongIndex",
                JSON.stringify(state.currentSongIndex),
            );
        },
    },
});

export default store;
