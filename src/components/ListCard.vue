<template>
    <div class="listcard">
        <div class="card"
            @click="clickListCard(item.id)"
            v-for="(item, index) in listCardData"
                :key="index"
        >
            <img :src="item.picUrl" alt="">
            <p>{{ item.name }}</p>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        listCardData: {
            type: Array,
            required: true
        }
    });

    const emit = defineEmits();
    const clickListCard = (id) => {
        emit('clickListCard', id);
    }
</script>

<style scoped>
    .listcard{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
    .listcard .card {
        flex: 1 1 18%;
        cursor: pointer;
    }
    .listcard .card img{
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 10px;
    }
    .listcard .card p{
        margin-top: 5px;
    }
</style>