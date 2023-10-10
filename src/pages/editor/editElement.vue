<template>
    <h3>选定的元素：{{ currentSelectedEditElement?.name || 'null' }}</h3>
    <div class="list">
        <div @click='handleClick(item)' v-for="item in blockList" :key="item.type" class="item">
            <img :src="item.icon" alt="">
            <span>{{ item.name }}</span>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { blockList, type Block } from '@/config/block.ts'
import { currentSelectedEditElement, setCurrentSelectedElement } from './editElement.ts'

function handleClick(item: Block) {
    setCurrentSelectedElement(item)
}
</script>
<style lang='scss' scoped>
.list {
    margin-top: 10px;
    display: flex;

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;

        & > img {
            width: 50px;
            height: 50px;
        }

        & > span {
            margin-top: 5px;
        }
    }
}</style>