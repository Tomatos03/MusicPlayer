<template>
  <div class="adaptive-container" ref="adaptiveContainerRef">
    <slot name="content"></slot>
  </div>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount, defineProps} from 'vue'
    const {itemMinWidth} = defineProps({
      itemMinWidth: {
        type: Number,
        required: true
      }
    });
    const adaptiveContainerRef = ref(null)

    let resizeObserver = null
    const updateDispayItems = () => {
      if (!adaptiveContainerRef.value || !adaptiveContainerRef.value.children) return;

      // 获取容器总宽度
      const totalWidth = adaptiveContainerRef.value.offsetWidth;
      const items = adaptiveContainerRef.value.children;

      // const originDisplay = itemStyle.display;

      // 计算可以展示的元素数量
      let displayCount = Math.floor(totalWidth / (itemMinWidth + 20));
      // 至少展示一项
      displayCount = Math.max(1, displayCount);

      // 确保 displayCount 不超过 items 的数量
      Array.from(items).forEach((item, index) => {
        if (index < displayCount) {
          item.style.display = ""; // 显示元素
        } else {
          item.style.display = 'none'; // 隐藏元素
        }
      });
      // console.log(`Item Width: ${itemWidth}, Total Width: ${totalWidth}, Display Count: ${displayCount}`);
    }

    // 初始化观察器
    const initObserver = () => {
        resizeObserver = new ResizeObserver(() => updateDispayItems())
    }

    // 生命周期处理
    onMounted(() => {
      initObserver();
      resizeObserver.observe(adaptiveContainerRef.value);
    })

    onBeforeUnmount(() => {
        if (resizeObserver) {
            resizeObserver.disconnect();
        }
    })
</script>

<style scoped>
  .adaptive-container{
    display: flex;
    gap: 20px;
    flex-wrap: nowrap;
    overflow: hidden;
    padding: 10px 0;
  }
</style>