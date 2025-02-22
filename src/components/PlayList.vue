<template>
    <el-drawer v-model="isShow" title="音乐播放列表">
        <div class="playlist">
            <el-table
                :data="songs"
                highlight-current-row
                :row-key="(row) => row.id"
                style="width: 100%"
                @row-dblclick="playMusic">
                <el-table-column type="index" width="50" />
                <el-table-column prop="name" />
                <el-table-column prop="authors[0].name" />
                <el-table-column prop="duration" />
            </el-table>
        </div>
    </el-drawer>
</template>

<script setup>
    import { computed, toRef } from "vue";
    import { useStore } from "vuex";
    const props = defineProps({
        isShow: {
            type: Boolean,
            required: true,
        },
    });
    const store = useStore();
    const songs = computed(() => store.state.songs.slice().reverse());
    const isShow = toRef(props, "isShow");
    const playMusic = (rowItem) => {
        store.dispatch("updateCurrentPlaySong", rowItem);
    };
</script>

<style lang="scss" scoped>
    @include b("playlist") {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
