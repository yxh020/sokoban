interface Position {
  x: number;
  y: number;
}

// 0: 地板 1：墙 2: 玩家 3：目标 4：箱子
export default function useMove(mapData: any) {
  let masterPos: Position = { x: -1, y: -1 };
  let perMasterType = 0;
  let perBoxType = 0;

  function getMasterPos(): Position {
    let x = -1,
      y = -1;
    for (let index = 0; index < mapData.value.length; index++) {
      const element = mapData.value[index];
      y = index;
      const res = element.findIndex((v: any) => v === 2);
      if (res !== -1) {
        x = res;
        break;
      }
    }
    masterPos = { x, y };
    return masterPos;
  }

  function setMasterPos(position: Position, type: number) {
    // 恢复原位置
    mapData.value[masterPos.y][masterPos.x] = perMasterType;
    // 修改到新位置
    mapData.value[position.y][position.x] = 2;
    // 保存原位置type
    perMasterType = type;
  }

  function pushBox(oldPos: Position, newPos: Position) {
    // console.log('pushBox',oldPos,newPos,type);
    const newBoxNextPosType = getTypeByPos(newPos);
    // 撞墙了
    if (newBoxNextPosType === 1) return;
    // 获取新位置上type
    const oldType = getTypeByPos(newPos);
    // 恢复原位置上
    mapData.value[oldPos.y][oldPos.x] = perBoxType;
    // 修改箱子新位置
    mapData.value[newPos.y][newPos.x] = 4;
    // 修改玩家新位置
    setMasterPos(oldPos, perBoxType);
    // 保存新位置上type
    perBoxType = oldType;
  }

  function getTypeByPos(position: Position): number {
    return mapData.value[position.y][position.x];
  }

  function move(movePos: Position) {
    // 获取人物当前位置
    try {
      const { x: _x, y: _y } = getMasterPos();
      const x = _x + movePos.x;
      const y = _y + movePos.y;
      const type = getTypeByPos({ x, y });
      //   console.log(_x, _y);
      //   console.log(x, y);
      //   console.log(type);
      switch (type) {
        case 0:
        case 3:
          setMasterPos({ x, y }, type);
          break;
        case 4:
          const boxNextX = x + movePos.x;
          const boxNextY = y + movePos.y;
          const pos = { x: boxNextX, y: boxNextY };
          pushBox({ x, y }, pos);
          break;
        default:
          break;
      }
    } catch (error) {}
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
