<template>
    <img v-if="block" :src="block.icon" class="base">
</template>
<script setup lang='ts'>
import { blockList, type Block } from '@/config/block.ts'

const props = defineProps(['type'])

const block = ref<Block | null>(null)

function getElement(type: number) {
    const res = blockList.find(v => v.type === type)
    if (res) {
        block.value = res
    }
}

watch(() => props.type, (type) => {
    getElement(type)
}, { immediate: true })

</script>
<style lang='scss' scoped></style>