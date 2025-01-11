<template>
    <div class="headerbar">
        <div class="headerbar-left">
            <el-icon class="arrow-left" @click="$router.go(-1)">
                <ArrowLeft/>
            </el-icon>
            <el-input class="search" />
        </div>
        <div class="headerbar-right">
            <el-icon class="avatar">
                <Avatar />
            </el-icon>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
.search {
    height: 40px;
}

.avatar{
    font-size: 30px;
    width: 40px;
    height: 40px;
    color: #454645;
    position: absolute;
    right: 10px;
    top: 50%;
    border: 2px solid #ccc;
    border-radius: 50%;
    transform: translateY(-50%);
}

.arrow-left {
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #F7F9FC;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rga(0, 0, 0, 0.3);
}

.headerbar {
    box-sizing: border-box;
    padding: 0 25px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.headerbar-left {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
}

.headerbar-right {
    flex: 1;
    height: 100%;
    position: relative;
}
</style>