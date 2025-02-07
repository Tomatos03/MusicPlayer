<template>
    <div class="music-controler" :style="{ height: componentHeight }">
        <div class="left">
            <div
                :class="[
                    'music-disc',
                    'rotate',
                    isPausePlay ? 'stop-rotate' : '',
                ]">
                <img
                    :src="
                        songs[currentSongIndex]
                            ? songs[currentSongIndex].cover
                            : '/src/assets/images/disc-default.png'
                    " />
                <img src="/src/assets/images/disc.png" class="disc" />
            </div>
            <div class="music-info">
                <p class="song-name">
                    {{
                        currentSongIndex != -1
                            ? songs[currentSongIndex].name
                            : "暂无音乐播放"
                    }}
                </p>
                <div v-if="currentSongIndex != -1" class="song-authors">
                    {{ getAuthorsString(songs[currentSongIndex].authors) }}
                </div>
                <div class="btns"></div>
            </div>
        </div>
        <div class="middle">
            <div class="btns">
                <i class="iconfont icon-love0"></i>
                <i @click="playNextSong" class="iconfont icon-previous"></i>
                <i
                    @click="togglePlayPause"
                    :class="[
                        'iconfont',
                        isPausePlay ? 'icon-play' : 'icon-pause',
                    ]"></i>
                <i @click="playPrevSong" class="iconfont icon-next"></i>
                <i class="iconfont icon-order"></i>
            </div>
            <div class="progress">
                <audio
                    ref="audioPlayerRef"
                    :src="
                        currentSongIndex != -1
                            ? songs[currentSongIndex].url
                            : ''
                    "
                    preload="auto"
                    @play="isPausePlay = false"
                    @pause="isPausePlay = true"
                    @loadeddata="updateDuration"
                    @canplaythrough="playMusic"
                    @ended="playNextSong"></audio>
                <div class="current-time">
                    {{ handleMusicTime(playedTime) }}
                </div>
                <input
                    @input="syncProgressWithPlayedTime"
                    ref="songProgressRef"
                    type="range"
                    min="0"
                    :max="duration"
                    v-model="playedTime" />
                <div class="end-time">{{ handleMusicTime(duration) }}</div>
            </div>
        </div>
        <div class="right">
            <i class="iconfont icon-volum2"></i>
            <i class="iconfont icon-playlist"></i>
        </div>
    </div>
</template>
<script setup>
    import { getAuthorsString, handleMusicTime } from "@/utils/utils";
    import { computed, ref, onBeforeUnmount } from "vue";
    import { useStore } from "vuex";
    const props = defineProps({
        componentHeight: {
            type: String,
            default: "200px",
        },
    });
    const store = useStore();
    const songs = store.state.songs;
    const playedTime = ref(0);
    const currentSongIndex = computed(() => store.state.currentSongIndex);
    const audioPlayerRef = ref(null);
    const songProgressRef = ref(null);
    const duration = ref(0);
    const isPausePlay = ref(true);
    let animationFrameId = null;
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
        store.commit("playNextSong");
        audioPlayerRef.value.load();
    };
    const playPrevSong = () => {
        if (currentSongIndex.value == -1) return;
        store.commit("playPrevSong");
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

<style lang="scss" scoped>
    $disc-size: 80px;
    $play-btn-size: 55px;
    $btn-size: 40px;
    $btn-font-size: 35px;
    $playbar-width: 200px;
    $playbar-height: 3px;
    $theme-background-color: #fc3d49;
    $theme-font-color: #787f8d;

    .music-controler {
        background-color: #fff;
        border-top: 1px solid rgba(195, 195, 195, 0.5);
        overflow: hidden;
        display: flex;
        width: 100%;
        min-height: 100px;
        display: flex;
        padding: 0 30px;

        .left,
        .middle,
        .right {
            flex: 1;
            display: flex;
        }

        .left {
            align-items: center;
            gap: 10px;

            .music-info {
                display: flex;
                flex-direction: column;

                .song-name {
                    font-size: 1.1em;
                }
                .song-authors {
                    color: #999999;
                    font-size: 0.8em;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }

            .music-disc {
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

                .disc {
                    position: absolute;
                    object-fit: contain;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .middle {
            flex-direction: column;
            justify-content: center;
            gap: 10px;

            .btns,
            .progress {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }

            .progress {
                gap: 10px;

                .end-time,
                .current-time {
                    color: $theme-font-color;
                }

                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 8px;
                    min-width: 300px;
                    width: 100%;
                    background: linear-gradient(
                        to right,
                        #fc3d49 0%,
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

            .btns {
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
                    background-color: $theme-background-color;
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
        }

        .right {
            align-items: center;
            justify-content: end;

            i {
                font-size: $btn-font-size;
                width: $btn-size;
                width: $btn-size;
            }
        }
    }

    .rotate {
        animation: rotate 15s linear infinite;
    }
    .stop-rotate {
        animation-play-state: paused;
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
