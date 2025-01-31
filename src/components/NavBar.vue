<template>
    <div class="navbar">
        <div v-for="(item, index) in navItems"
                class="navbar-item" 
                :class="index === activeIndex ? 'active' : ''"
                :key="index"
                @click="navBarClickItem(index, item.path)">
            {{item.name}}
        </div>
    </div>
</template>


<script setup>
    import {ref} from 'vue'
    import { useRoute } from 'vue-router';
    const props = defineProps({
        navItems: {
            type: Array,
            required: true
        }
    });

    const emit = defineEmits();
    const activeIndex = ref(0);
    const route = useRoute();
    props.navItems.forEach((item, index) => {
        if (decodeURI(route.path).search(item.path) != -1) {
            activeIndex.value = index;
        }
    });

    const navBarClickItem = (newIndex, path) => {
        if(newIndex == activeIndex.value){
            return;
        } 
        // console.log(newIndex, path);
        activeIndex.value = newIndex;
        emit('navBarClickItem', path);
    }
</script>

<style scoped>
    .navbar {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .navbar-item{
        color: #c4bdbd;
        font-weight: bold;
        height: 100%;
        min-width: 120px;
        display: flex;
        font-size: 1.2em;
        cursor: pointer;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .active{
        color: black;
    }
    .active::after{
        content: '';
        width: 20px;
        height: 2px;
        background-color: red;
        border-radius: 1px;
    }
</style>