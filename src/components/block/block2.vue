<template>
    <component :is="getElementComponent(type)"></component>
</template>
<script setup lang='ts'>
import { type Component } from 'vue';
import Ground from './ground.vue'
import Wall from './wall.vue'
import Box from './box.vue'
import Master from './master.vue'
import Target from './target.vue';

defineProps(['type'])

const mapElement: Record<number, Component> = {
    0: Ground,
    1: Wall,
    2: Master,
    3: Target,
    4: Box,
};

function getElementComponent(type: number) {
    return mapElement[type];
}
</script>
<style lang='scss' scoped></style>