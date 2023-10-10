<template>
  <div class="game">
    <Map :mapData="mapData"></Map>
  </div>
</template>
<script setup lang="ts">
import Map from "@/components/map/map.vue";
import useMove from './move.ts'

const arr = [[1,1,0,1,1,1],[1,0,0,0,0,1],[1,2,4,0,0,1],[1,0,0,3,0,1],[1,0,0,0,0,1],[1,0,1,1,1,1]]
const mapData = ref(arr);

const { moveUp,moveDown,moveLeft,moveRight } = useMove(mapData)

onMounted(() => {
  document.onkeyup = function (event) {
    const { key } = event;
    switch (key) {
      case "w":
      case "ArrowUp":
        moveUp()
        break;
      case "a":
      case "ArrowLeft":
        moveLeft()
        break;
      case "d":
      case "ArrowRight":
        moveRight()
        break;
      case "s":
      case "ArrowDown":
        moveDown()
        break;
      default:
        break;
    }
  };
});
</script>
<style lang="scss" scoped>
.game {
  background-color: skyblue;
}
</style>
