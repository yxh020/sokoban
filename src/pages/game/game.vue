<template>
  <div v-if='!!mapData' class="game">
    <Map :mapData="mapData"></Map>
  </div>
  <!-- <p>当前关卡{{ level }}</p>
  <button @click='nextLevel' v-show='gameStatus === 2'>下一关</button> -->
</template>
<script setup lang="ts">
import Map from "@/components/map/map.vue";
import useMove from './move.ts'
// import { gameStatus, level, nextLevel } from './game.ts'
// import { gameLevel } from '@/config/index.ts'

const router = useRouter()
const mapData = ref(null);

// watchEffect(() => {
//   mapData.value = gameLevel[level.value].data
//   console.log(mapData.value);
// })

const { moveUp, moveDown, moveLeft, moveRight } = useMove(mapData)

onMounted(() => {
  const { map } = router.currentRoute.value.query
  map && (mapData.value = JSON.parse(map.toString()))
  start()
});

function start() {
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
}
</script>
<style lang="scss" scoped>
.game {
  background-color: skyblue;
  display: flex;
  justify-content: center;
}
</style>
