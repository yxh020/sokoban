import { ref } from "vue";
import { currentSelectedEditElement } from "./editElement.ts";
import { blockList } from "@/config/block.ts";

export default function useMap(mapClientRect: Ref<DOMRect | null>) {
  const mapData = ref();
  const col = ref(6);
  const row = ref(6);

  watchEffect(() => {
    mapData.value = createMap(col.value, row.value);
  });

  function createMap(col: number, row: number) {
    return new Array(col).fill(null).map(() => new Array(row).fill(0));
  }

  function getNumberByType(type: number) {
    let count = 0;
    mapData.value.forEach((v: any) => {
      v.forEach((i: any) => {
        i === type && count++;
      });
    });
    return count;
  }

  function removePrevByType(type: number) {
    let x, y;
    for (let index = 0; index < mapData.value.length; index++) {
      const element = mapData.value[index];
      y = index;
      const res = element.findIndex((v: any) => v === type);
      if (res !== -1) {
        x = res;
        mapData.value[y][x] = blockList[0].type;
        return;
      }
    }
  }

  function updateMapData(event: MouseEvent) {
    if (!currentSelectedEditElement.value) {
      return;
    }
    const { pageX, pageY } = event;
    const { left, top, width, height } = mapClientRect.value as DOMRect;
    // 判断是否在地图区域内
    if (
      left <= pageX &&
      top <= pageY &&
      pageY <= top + height &&
      pageX <= left + width
    ) {
      // 计算坐标
      const _x = Math.floor((pageX - left) / 50);
      const _y = Math.floor((pageY - top) / 50);

      const x = _x <= row.value ? _x : row.value;
      const y = _y <= col.value ? _y : col.value;

      // console.log("--onMouseMove", x, y);
      if (currentSelectedEditElement.value.max) {
        const typeCount = getNumberByType(currentSelectedEditElement.value.type) + 1;
        // console.log(typeCount);
        if (typeCount > currentSelectedEditElement.value.max) {
          // 清除之前的一个坐标
          removePrevByType(currentSelectedEditElement.value.type);
        }
      }
      mapData.value[y][x] = currentSelectedEditElement.value.type;
    }
  }

  return {
    col,
    row,
    mapData,
    updateMapData,
  };
}
