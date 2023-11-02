<template>
  <div class="touch" @click="onClick" @mousedown="onMouseDown" @mousemove="onMouseMove">
    <Map ref="mapRef" :mapData="mapData"></Map>
  </div>
  <h2>编辑区</h2>
  <input type="number" placeholder="行数" v-model="row" />
  <input type="number" placeholder="列数" v-model="col" />
  <EditElement />
  <button @click="complete" class="btn">完成</button>
</template>
<script setup lang="ts">
import Map from "@/components/map/map.vue";
import EditElement from "./editElement.vue";
import { ToggleRunner } from "./utils.ts";
import useMap from "./map";
import { debounce } from "@/utils/index.ts";
import { currentSelectedEditElement } from "./editElement.ts";

const router = useRouter();

onMounted(() => {
  window.addEventListener("resize", getMapRect);
});

onUnmounted(() => {
  window.removeEventListener("resize", getMapRect);
});

const mapClientRect = ref(null);
const mapRef = ref();

const { col, row, mapData, updateMapData } = useMap(mapClientRect);

watch(
  [() => col.value, () => row.value],
  () => {
    nextTick(() => {
      getMapRect();
    });
  },
  { immediate: true }
);

const getMapRect = debounce(function () {
  if (mapRef.value) {
    mapClientRect.value = mapRef.value.getMapClientRect();
  }
});

function onClick(event: MouseEvent) {
  updateMapData(event);
}

const toggleRunner = new ToggleRunner();

const onMouseMove = (event: MouseEvent) => {
  toggleRunner.run(() => {
    if (currentSelectedEditElement.value?.max) {
      return;
    }
    updateMapData(event);
  });
};

const onMouseDown = () => {
  toggleRunner.start();
  document.addEventListener("mouseup", onMouseUp);
};

const onMouseUp = () => {
  toggleRunner.stop();
  document.removeEventListener("mouseup", onMouseUp);
};

function complete() {
  // console.log(JSON.stringify(toRaw(mapData.value)));
  router.push({ name: "game", query: { map: JSON.stringify(toRaw(mapData.value)) } });
}
</script>
<style lang="scss" scoped>
.touch {
  border: pink 1px solid;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.btn {
  width: 100px;
  height: 40px;
  margin-top: 10px;
}
</style>
