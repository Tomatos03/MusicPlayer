<template>
    <div class="listcard">
        <div
            v-for="(item, index) in listCardData"
            class="listcard__item"
            :key="index"
            @click="handleClickListCard(item.id)">
            <img :src="item.picUrl || item.coverImgUrl" />
            <p>{{ item.name }}</p>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from "vue-router";

    const props = defineProps({
        listCardData: {
            type: [Object, Array],
            required: true,
        },
    });
    const router = useRouter();
    const handleClickListCard = (id) => {
        // console.log(id);
        router.push({ name: "musicListDetail", params: { id } });
    };
</script>

<style lang="scss" scoped>
    @include b("listcard") {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        overflow: auto;
        margin-bottom: 15px;

        @include e("item") {
            flex: 1 0 18%;
            min-width: 180px;
            max-width: 18%;
            cursor: pointer;
            img {
                width: 100%;
                height: 230px;
                object-fit: cover;
                border-radius: 10px;
            }
            p {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-top: 5px;
                text-align: center;
            }
        }
    }
</style>
