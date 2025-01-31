<template>
    <div class="music-controler" :style="{ height: componentHeight }">
        <div class="left">
            <div class="music-disc">
                <img
                    src="https://p2.music.126.net/6pIcF4ZAL5euujMUNSt8PQ==/109951164124479906.jpg"
                />
                <img src="/src/assets/images/disc.png" class="disc" />
            </div>
            <div class="music-info">
                <p>歌曲名称</p>
                <div class="btns"></div>
            </div>
        </div>
        <div class="middle">
            <div class="btns"></div>
            <div class="progress">
                <div class="current-time">0:00</div>
                <div class="bar">
                    <div class="no-active"></div>
                    <div class="active"></div>
                </div>
                <div class="end-time">5:00</div>
            </div>
        </div>
        <div class="right"></div>
        <!-- <div class="progress-container">
    </div>
    <div class="progress-time">
    </div>
    <div class="volume-container">
      <div class="volume-slider">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          :value="volume"
          @input="handleVolume"
          class="volume-control"
        />
      </div>
    </div> -->
    </div>
</template>
<script setup>
    import { ref, onMounted, onUnmounted } from "vue"
    const props = defineProps({
        audioSrc: {
            type: String,
            required: true,
        },
        componentHeight: {
            type: String,
            default: "200px",
        },
    })

    const emit = defineEmits(["play", "pause"])

    const audio = ref(null)
    const isPlaying = ref(false)
    const volume = ref(1)
    const progress = ref(0)
    const currentTime = ref("0:00")
    const duration = ref("0:00")

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
    }

    const play = () => {
        if (audio.value && !isPlaying.value) {
            audio.value.play()
            isPlaying.value = true
            emit("play")
        }
    }

    const pause = () => {
        if (audio.value && isPlaying.value) {
            audio.value.pause()
            isPlaying.value = false
            emit("pause")
        }
    }

    const handleProgress = (e) => {
        if (!audio.value) return
        const percentage = parseInt(e.target.value)
        const time = (audio.value.duration || 0) * (percentage / 100)
        audio.value.currentTime = time
        progress.value = percentage
        currentTime.value = formatTime(time)
    }

    const handleVolume = (e) => {
        if (!audio.value) return
        volume.value = parseFloat(e.target.value)
        audio.value.volume = volume.value
    }

    const onCanplay = () => {
        if (audio.value) {
            audio.value.addEventListener("loadedmetadata", () => {
                duration.value = formatTime(audio.value.duration)
            })
        }
    }

    const onTimeupdate = () => {
        if (audio.value) {
            const percentage = (audio.value.currentTime / audio.value.duration) * 100
            progress.value = percentage
            currentTime.value = formatTime(audio.value.currentTime)
        }
    }

    const onPlay = () => {
        isPlaying.value = true
    }

    const onPause = () => {
        isPlaying.value = false
    }

    onMounted(() => {
        if (audio.value) {
            audio.value.volume = volume.value
        }
    })

    onUnmounted(() => {
        if (audio.value) {
            audio.value.pause()
        }
    })
</script>

<style lang="scss" scoped>
    .music-controler {
        background-color: #fff;
        border-top: 1px solid rgba(195, 195, 195, 0.5);
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-height: 100px;
        display: flex;

        .left .middle,
        .right {
            flex: 1;
            display: flex;
        }

        .left {
            align-items: center;

            .music-info {
                display: flex;
                flex-direction: column;
            }

            .music-disc {
                --side: 75px;
                padding: 10px;
                height: var(--side);
                width: var(--side);
                min-height: var(--side);
                min-width: var(--side);
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
        }
        // .right {

        // }
    }
</style>
