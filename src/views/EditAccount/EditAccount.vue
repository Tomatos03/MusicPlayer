<template>
    <div class="edit-account">
        <h1 class="edit-account__title">编辑个人信息</h1>
        <div class="edit-account__container">
            <el-form :model="accountFrom" class="edit-account__from">
                <el-form-item label="昵称：">
                    <el-input v-model="accountFrom.name" clearable />
                </el-form-item>
                <el-form-item label="简介：">
                    <el-input v-model="accountFrom.signature" clearable />
                </el-form-item>
                <el-form-item label="性别：">
                    <el-radio-group v-model="accountFrom.sex">
                        <el-radio value="1" size="large">男</el-radio>
                        <el-radio value="2" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生日：">
                    <el-select
                        size="large"
                        v-for="(select, index) in accountFrom.birthday"
                        v-model="select.value"
                        style="width: 150px"
                        :key="index">
                        <el-option
                            v-for="num in select.range"
                            :key="num"
                            :value="num"
                            :label="num" />
                    </el-select>
                </el-form-item>
                <el-form-item label="地区：">
                    <el-select
                        v-for="location in accountFrom.location"
                        v-model="location.value"
                        size="large">
                        <el-option
                            v-for="info in location.data"
                            :key="info.name"
                            :value="0"
                            :label="info.name" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button type="primary" @click="onSubmit">取消</el-button>
                </el-form-item>
            </el-form>
            <img class="edit-account__avatar" src="" />
        </div>
    </div>
</template>
<script setup>
    import provinceData from "@/assets/json/province.json";
    import { ref, watch } from "vue";
    const getAbleSelectDays = (currentYear, currentMonth) => {
        // 参数0表示currentMonth上一个月最后一天
        return new Date(currentYear, currentMonth, 0).getDate();
    };
    const getAbleSelectMonths = () => {
        return Array.from({ length: 12 }, (v, k) => k + 1);
    };
    const getAbleSelectYears = () => {
        const maxYear = new Date().getFullYear();
        const minYear = 1920;
        const yearGap = maxYear - minYear + 1;
        return Array.from({ length: yearGap }, (v, k) => k + minYear);
    };
    const accountFrom = ref({
        name: "",
        signature: "",
        sex: 0,
        birthday: {
            year: {
                value: 1920,
                range: getAbleSelectYears(),
            },
            month: {
                value: 1,
                range: getAbleSelectMonths(),
            },
            day: {
                value: 1,
                range: getAbleSelectDays(1920, 1),
            },
        },
        location: {
            province: {
                value: "直辖市",
                data: provinceData,
            },
            city: {
                value: "北京",
                data: provinceData[0].cityList,
            },
        },
    });
    watch(
        () => accountFrom.value.birthday.year.value,
        (newYear, oldYear) => {
            accountFrom.value.birthday.day.range = getAbleSelectDays(
                newYear,
                accountFrom.value.birthday.month.value,
            );
        },
    );

    watch(
        () => accountFrom.value.birthday.month.value,
        (newMonth, oldMonth) => {
            accountFrom.value.birthday.day.range = getAbleSelectDays(
                accountFrom.value.birthday.year.value,
                newMonth,
            );
        },
    );
</script>
<style lang="scss" scoped>
    .el-select {
        padding-right: 10px;
    }

    @include b("edit-account") {
        $avatar-size: 150px;

        height: 100%;
        width: 100%;

        @include e("avatar") {
            height: $avatar-size;
            width: $avatar-size;
            border-radius: 100%;
            object-fit: cover;
        }
        @include e("title") {
            font-size: 1.5em;
        }
        @include e("container") {
            display: flex;
        }
    }
</style>
