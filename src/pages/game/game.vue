<template>
  <div v-if='!!mapData' class="game">
    <Map :mapData="mapData"></Map>
  </div>
  <p>当前关卡{{ level + 1 }}</p>
  <button v-show="showNext" @click='nextLevel' >下一关</button>
  <button @click="edit">编辑关卡</button>
</template>
<script setup lang="ts">
import Map from "@/components/map/map.vue";
import useMove from './move.ts'
import { level, nextLevel, showNext, initGame } from './game.ts'
import { gameLevel } from '@/config/index.ts'

const router = useRouter()
const mapData = ref();

watch(mapData,(m) => {
  initGame(m)
})

watch(level,(l)=>{
  console.log('----level',l);
  mapData.value = gameLevel[level.value].data
})

const { moveUp, moveDown, moveLeft, moveRight } = useMove(mapData)

onMounted(() => {
  const { map } = router.currentRoute.value.query
  if(map){
    mapData.value = JSON.parse(map.toString())
    initGame(mapData.value)
  }else{
    mapData.value = gameLevel[level.value].data
  }
  start()
});

function edit() {
  router.push({ name: "editor" });
}

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
