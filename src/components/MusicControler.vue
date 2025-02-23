<template>
    <div class="music-controller" :style="{ height: componentHeight }">
        <div class="music-controller__left">
            <div
                :class="[
                    'music-controller__disc',
                    'music-controller__disc--rotate',
                    isPausePlay && 'music-controller__disc--pause',
                ]">
                <img
                    :src="
                        currentSongIndex != -1
                            ? songs[currentSongIndex].cover
                            : '/src/assets/images/disc-default.png'
                    " />
                <img
                    src="/src/assets/images/disc.png"
                    class="music-controller__disc-img" />
            </div>
            <div class="music-controller__info">
                <p class="music-controller__song-name">
                    {{
                        currentSongIndex != -1
                            ? songs[currentSongIndex].name
                            : "暂无音乐播放"
                    }}
                </p>
                <div
                    v-if="currentSongIndex != -1"
                    class="music-controller__authors">
                    {{ getAuthorsString(songs[currentSongIndex].authors) }}
                </div>
                <div class="btns"></div>
            </div>
        </div>
        <div class="music-controller__middle">
            <div class="music-controller__control">
                <i
                    :class="[
                        'iconfont',
                        currentSongIndex != -1 &&
                        state.userLoveMusics.includes(
                            songs[currentSongIndex].id,
                        )
                            ? 'icon-love1'
                            : 'icon-love0',
                    ]"
                    @click="handleLoveMusic(songs[currentSongIndex].id)"></i>
                <i @click="playPrevSong" class="iconfont icon-previous"></i>
                <i
                    @click="togglePlayPause"
                    :class="[
                        'iconfont',
                        isPausePlay ? 'icon-play' : 'icon-pause',
                    ]"></i>
                <i @click="playNextSong" class="iconfont icon-next"></i>
                <i class="iconfont icon-order"></i>
            </div>
            <div class="music-controller__progress">
                <audio
                    ref="audioPlayerRef"
                    :src="
                        currentSongIndex != -1
                            ? `${songs[currentSongIndex].url}?id=${songs[currentSongIndex].id}.mp3`
                            : ''
                    "
                    preload="auto"
                    @play="isPausePlay = false"
                    @pause="isPausePlay = true"
                    @loadeddata="updateDuration"
                    @canplaythrough="playMusic"
                    @ended="playNextSong"></audio>
                <div class="music-controller__time">
                    {{ handleMusicTime(playedTime) }}
                </div>
                <input
                    @input="syncProgressWithPlayedTime"
                    ref="songProgressRef"
                    type="range"
                    min="0"
                    :max="duration"
                    v-model="playedTime" />
                <div class="music-controller__time">{{
                    handleMusicTime(duration)
                }}</div>
            </div>
        </div>
        <div class="music-controller__right">
            <el-popover placement="top" trigger="hover" :width="50">
                <template #reference>
                    <!-- <i class="iconfont icon-volum2"></i> -->
                    <i
                        :class="[
                            'iconfont',
                            `icon-volume${Math.floor(volume * 2)}`,
                        ]"></i>
                </template>
                <template #default>
                    <div class="music-controller__volum-wrapper">
                        <input
                            type="range"
                            v-model="volume"
                            min="0"
                            max="1"
                            step="0.01"
                            @input="adjustVolume" />
                        <span>{{ Math.floor(volume * 100) }}%</span>
                    </div>
                </template>
            </el-popover>
            <i
                class="iconfont icon-playlist"
                @click="showPlayList = !showPlayList"></i>
            <!-- 展示播放列表 -->
            <PlayList :isShow="showPlayList"></PlayList>
        </div>
    </div>
</template>
<script setup>
    import { getAuthorsString, handleMusicTime } from "@/utils/utils";
    import { computed, ref, onBeforeUnmount, isShallow } from "vue";
    import { useStore } from "vuex";
    import PlayList from "./PlayList.vue";
    import { loveMusic } from "@/services/api";

    const props = defineProps({
        componentHeight: {
            type: String,
            default: "200px",
        },
    });
    const showPlayList = ref(false);
    const store = useStore();
    const state = store.state;
    const songs = computed(() => store.state.songs);
    const volume = ref(1.0);
    const playedTime = ref(0);
    const currentSongIndex = computed(() => store.state.currentSongIndex);
    const audioPlayerRef = ref(null);
    const songProgressRef = ref(null);
    const duration = ref(0);
    const isPausePlay = ref(true);
    let animationFrameId = null;
    const adjustVolume = () => {
        // volume 必须为float
        audioPlayerRef.value.volume = parseFloat(volume.value);
    };
    const handleLoveMusic = async (songId) => {
        if (currentSongIndex == -1) return;

        const currentSongId = songs.value[currentSongIndex.value].id;
        const isLoveMusic = state.userLoveMusics.includes(currentSongId);
        const resCode = await loveMusic(songId, !isLoveMusic);
        if (resCode == 200) {
            console.log("操作成功");
            if (isLoveMusic) {
                state.userLoveMusics = state.userLoveMusics.filter(
                    (id) => songId != id,
                );
            } else {
                state.userLoveMusics.push(currentSongId);
            }
        } else {
            console.log("操作失败");
        }
    };
    const togglePlayPause = () => {
        if (currentSongIndex.value == -1) return;

        if (audioPlayerRef.value.paused) {
            audioPlayerRef.value.play();
            isPausePlay.value = false;
        } else {
            audioPlayerRef.value.pause();
            isPausePlay.value = true;
        }
    };
    const updatePlayedTime = () => {
        if (!audioPlayerRef.value) return;

        const audioPlayer = audioPlayerRef.value;
        syncPlayedTimeWithProgress();
        if (audioPlayer.currentTime < audioPlayer.duration) {
            animationFrameId = requestAnimationFrame(updatePlayedTime);
        }
    };
    const playNextSong = () => {
        if (currentSongIndex.value == -1) return;
        store.dispatch("playNextSong");
        audioPlayerRef.value.load();
    };
    const playPrevSong = () => {
        if (currentSongIndex.value == -1) return;
        store.dispatch("playPrevSong");
        audioPlayerRef.value.load();
    };
    const syncProgressWithPlayedTime = () => {
        if (!songProgressRef.value) return;

        const songProgress = songProgressRef.value;
        const progress =
            ((songProgress.value - songProgress.min) /
                (songProgress.max - songProgress.min)) *
            100;
        songProgress.style.background = `linear-gradient(to right, #FC3D49 ${progress}%, #eee ${progress + 8}%)`;

        playedTime.value = songProgress.value;
        audioPlayerRef.value.currentTime = songProgress.value;
    };
    const syncPlayedTimeWithProgress = () => {
        const audioPlayer = audioPlayerRef.value;
        const songProgress = songProgressRef.value;
        playedTime.value = audioPlayer.currentTime;

        songProgress.value = audioPlayer.currentTime;
        const progress =
            ((songProgress.value - songProgress.min) /
                (songProgress.max - songProgress.min)) *
            100;
        songProgress.style.background = `linear-gradient(to right, #FC3D49 ${progress}%, #eee ${progress + 8}%)`;
        // songProgress.style.background = `linear-gradient(90deg, #840814 0%, #fc3d49 ${progress}%, #eeeeee 100%)`;
    };
    const updateDuration = () => {
        duration.value = audioPlayerRef.value.duration;
    };
    const playMusic = () => {
        updatePlayedTime();
        audioPlayerRef.value.play();
        isPausePlay.value = false;
    };
    onBeforeUnmount(() => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
</script>

<style lang="scss">
    $disc-size: 80px;
    $play-btn-size: 55px;
    $btn-size: 40px;
    $btn-font-size: 35px;
    $progress-height: 8px;
    $theme-font-color: #787f8d;

    @include b("music-controller") {
        background-color: #fff;
        border-top: 1px solid rgba(195, 195, 195, 0.5);
        overflow: hidden;
        display: flex;
        width: 100%;
        min-height: 100px;
        display: flex;
        padding: 0 30px;

        @include e("volum-wrapper") {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            input {
                writing-mode: vertical-lr;
                direction: rtl;
            }
        }

        @include e(("left", "middle", "right")) {
            flex: 1;
            display: flex;
        }
        @include e("left") {
            align-items: center;
            gap: 10px;
        }
        @include e("middle") {
            flex-direction: column;
            justify-content: center;
            gap: 10px;
        }
        @include e("right") {
            align-items: center;
            justify-content: end;

            i {
                font-size: $btn-font-size;
                width: $btn-size;
                width: $btn-size;
            }
        }
        @include e(("progress", "control")) {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        @include e("control") {
            i {
                cursor: pointer;
            }

            .icon-play,
            .icon-pause {
                width: $play-btn-size;
                height: $play-btn-size;
                font-size: $btn-font-size;
                color: #fff;
                border-radius: 100%;
                background-color: $theme-color;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .icon-love0,
            .icon-love1,
            .icon-order,
            .icon-next,
            .icon-previous {
                width: $btn-size;
                height: $btn-size;
                font-size: $btn-font-size;
            }
        }
        @include e("progress") {
            gap: 10px;

            input[type="range"] {
                -webkit-appearance: none;
                appearance: none;
                height: $progress-height;
                min-width: 300px;
                width: 100%;
                background: linear-gradient(
                    to right,
                    $theme-color 0%,
                    #eee 100%
                );
                transition: background 1s ease;
                border-radius: 10px;
                outline: none;
                cursor: pointer;
            }

            input[type="range"]::-webkit-slider-runnable-track {
                height: 10px;
                background: transparent;
                border-radius: 10px;
            }

            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 0px;
                height: 0px;
            }
        }
        @include e("time") {
            color: $theme-font-color;
        }
        @include e("info") {
            display: flex;
            flex-direction: column;
        }
        @include e("disc") {
            padding: 10px;
            height: $disc-size;
            width: $disc-size;
            min-height: $disc-size;
            min-width: $disc-size;
            position: relative;

            img {
                height: 100%;
                width: 100%;
                border-radius: 100%;
                object-fit: cover;
            }

            @include m(rotate) {
                animation: rotate 15s linear infinite;
            }
            @include m(pause) {
                animation-play-state: paused;
            }
        }
        @include e("disc-img") {
            position: absolute;
            object-fit: contain;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        @include e("song-name") {
            font-size: 1.1em;
        }
        @include e("authors") {
            color: #999999;
            font-size: 0.8em;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }

    .icon-love1 {
        color: $theme-color;
    }

    i {
        cursor: pointer;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
