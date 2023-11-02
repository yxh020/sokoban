<template>
  <div v-if='!!mapData' class="game">
    <Map :mapData="mapData"></Map>
  </div>
  <p v-if="localGames">当前关卡{{ level + 1 }}</p>
  <button @click="edit">编辑关卡</button>
  <button @click='reset'>重置</button>
  <button v-if="!localGames" @click='game'>回到游戏</button>
  <button v-if="showNext && localGames" @click='nextLevel'>下一关</button>
  <button v-if="showNext && !localGames" @click='complete'>完成</button>
</template>
<script setup lang="ts">
import Map from "@/components/map/map.vue";
import useMove from './move.ts'
import { level, nextLevel, showNext, initGame } from './game.ts'
import { gameLevel } from '@/config/index.ts'

const router = useRouter()
const mapData = ref();
const localGames = ref(true)

watch(mapData,(m) => {
  initGame(m)
})

watch(level,(l)=>{
  console.log('----level',l);
  mapData.value = JSON.parse(JSON.stringify(gameLevel[level.value].data))
})

const { moveUp, moveDown, moveLeft, moveRight } = useMove(mapData)

onMounted(() => {
  reset()
  start()
});

function complete() {
  alert('过关了！')
}

function game(){
  router.replace({ name: "game" });
  localGames.value = true
  setTimeout(reset)
}

function reset() {
  const { map } = router.currentRoute.value.query
  if(map){
    mapData.value = JSON.parse(map.toString())
    initGame(mapData.value)
    localGames.value = false
  }else{
    mapData.value = JSON.parse(JSON.stringify(gameLevel[level.value].data))
  }
}

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
  background-color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
}
button{
  height: 40px;
  padding: 0 20px;
  margin-right: 10px;
  margin-top: 10px;
}
</style>
