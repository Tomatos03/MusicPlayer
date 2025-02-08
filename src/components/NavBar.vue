<template>
    <div class="navbar">
        <div
            v-for="(item, index) in navItems"
            :class="[
                'navbar__item',
                activeIndex == index && 'navbar__item--selected',
            ]"
            :key="index"
            @click="navBarClickItem(index, item.path)">
            {{ item.name }}
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useRoute } from "vue-router";
    const props = defineProps({
        navItems: {
            type: Array,
            required: true,
        },
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
        if (newIndex == activeIndex.value) {
            return;
        }
        // console.log(newIndex, path);
        activeIndex.value = newIndex;
        emit("navBarClickItem", path);
    };
</script>

<style lang="scss" scoped>
    $navbar-item-normal-color: #a0a0a0;

    @include b("navbar") {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;

        @include e("item") {
            color: $navbar-item-normal-color;
            font-weight: bold;
            height: 100%;
            min-width: 120px;
            display: flex;
            font-size: 1.2em;
            cursor: pointer;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            @include m("selected") {
                color: #444;

                &::after {
                    content: "";
                    width: 20px;
                    height: 2px;
                    background-color: $theme-color;
                    border-radius: 1px;
                }
            }
        }
    }
</style>
