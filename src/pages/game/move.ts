import { targetCount, showNext } from "./game.ts";
import { watchEffect } from "vue";
import { BLOCK_TYPE } from '@/config/block.ts'
interface Position {
  x: number;
  y: number;
}

// 0: 地板 1：墙 2: 玩家 3：目标 4：箱子
export default function useMove(mapData: any) {
  let playerPos: Position = { x: -1, y: -1 };
  let perPlayerType = BLOCK_TYPE.FLOOR;
  let perBoxTypeMap = new Map()

  watchEffect(()=>{
    if(mapData.value){
      // console.log('----->清空缓存');
      perPlayerType = BLOCK_TYPE.FLOOR;
      perBoxTypeMap.clear()
    }
  })

  function getPlayerPos(): Position {
    let x = -1, y = -1;
    for (let index = 0; index < mapData.value.length; index++) {
      const element = mapData.value[index];
      y = index;
      const res = element.findIndex((v: any) => v === BLOCK_TYPE.PLAYER);
      if (res !== -1) {
        x = res;
        break;
      }
    }
    playerPos = { x, y };
    return playerPos;
  }

  function setPlayerPos(position: Position, type: number) {
    // 恢复原位置
    mapData.value[playerPos.y][playerPos.x] = perPlayerType;
    // 修改到新位置
    mapData.value[position.y][position.x] = BLOCK_TYPE.PLAYER;
    // 保存原位置type
    perPlayerType = type;
  }

  function pushBox(oldPos: Position, newPos: Position) {
    // console.log('pushBox',oldPos,newPos,type);
    const newBoxNextPosType = getTypeByPos(newPos);
    // 是否能前进
    if (newBoxNextPosType !== BLOCK_TYPE.FLOOR && newBoxNextPosType !== BLOCK_TYPE.TARGET) return;
    // 获取新位置上type
    const oldType = getTypeByPos(newPos);
    // 恢复原位置上
    mapData.value[oldPos.y][oldPos.x] = perBoxTypeMap.get(JSON.stringify(oldPos))
    // 修改箱子新位置
    mapData.value[newPos.y][newPos.x] = oldType === BLOCK_TYPE.TARGET ? BLOCK_TYPE.BOX_ON_TARGET : BLOCK_TYPE.BOX
    // 修改玩家新位置
    setPlayerPos(oldPos, perBoxTypeMap.get(JSON.stringify(oldPos)) || BLOCK_TYPE.FLOOR);
    // 保存新位置上type
    perBoxTypeMap.set(JSON.stringify(newPos),oldType)
    // console.log('---perBoxTypeMap',perBoxTypeMap);
    // 判断游戏是否结束
    let achievableTarget = 0;
    mapData.value.forEach((e:any) => {
        const count = e.filter((i:any) => i == BLOCK_TYPE.BOX_ON_TARGET).length
        achievableTarget += count
    });
    if(targetCount === achievableTarget){
      // console.log('---game over');
      showNext.value = true
    }else{
      showNext.value = false
    }
  }

  function getTypeByPos(position: Position): number {
    return mapData.value[position.y][position.x];
  }

  function move(movePos: Position) {
    // 获取人物当前位置
    try {
      const { x: _x, y: _y } = getPlayerPos();
      const x = _x + movePos.x;
      const y = _y + movePos.y;
      const type = getTypeByPos({ x, y });
      switch (type) {
        case BLOCK_TYPE.FLOOR:
        case BLOCK_TYPE.TARGET:
          setPlayerPos({ x, y }, type);
          break;
        case BLOCK_TYPE.BOX:
        case BLOCK_TYPE.BOX_ON_TARGET:
          const boxNextX = x + movePos.x;
          const boxNextY = y + movePos.y;
          const pos = { x: boxNextX, y: boxNextY };
          pushBox({ x, y }, pos);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function moveUp() {
    move({ x: 0, y: -1 });
  }

  function moveDown() {
    move({ x: 0, y: 1 });
  }

  function moveLeft() {
    move({ x: -1, y: 0 });
  }

  function moveRight() {
    move({ x: 1, y: 0 });
  }

  return {
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
  };
}
