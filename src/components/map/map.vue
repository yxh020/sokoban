<template>
    <div ref="containerRef" class="map">
        <div v-for="(v,i) in mapData" :key="i">
        <div class="col">
            <Block v-for="(x,y) in v" :type="x" :key="y"></Block>
        </div>
    </div>
    </div>
</template>
<script setup lang='ts'>
import Block from "../block/block.vue";

defineProps(['mapData'])

const containerRef = ref<HTMLDivElement>()

function getMapClientRect(){
    return containerRef.value!.getBoundingClientRect()
}

defineExpose({ getMapClientRect })
</script>

<style lang="scss" scoped>
.map{
    display: inline-block;
}
</style>