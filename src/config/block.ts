export const enum BLOCK_TYPE {
  FLOOR = 0,
  WALL = 1,
  PLAYER = 2,
  TARGET = 3,
  BOX = 4,
  BOX_ON_TARGET = 5,
}
export interface Block {
  type: number;
  name: string;
  icon: string;
  max?: number;
  hide?: boolean;
}

export const blockList: Block[] = [
  {
    type: BLOCK_TYPE.FLOOR,
    name: "地板",
    icon: new URL("/src/assets/dm.png",import.meta.url).href
  },
  {
    type: BLOCK_TYPE.WALL,
    name: "墙",
    icon: new URL("/src/assets/qt.png",import.meta.url).href
  },
  {
    type: BLOCK_TYPE.PLAYER,
    name: "玩家",
    icon: new URL("/src/assets/rw.png",import.meta.url).href,
    max: 1,
  },
  {
    type: BLOCK_TYPE.TARGET,
    name: "目标点",
    icon: new URL("/src/assets/zd.png",import.meta.url).href,
    max: 3,
  },
  {
    type: BLOCK_TYPE.BOX,
    name: "箱子",
    icon: new URL("/src/assets/xz.png",import.meta.url).href,
    max: 3,
  },
  {
    type: BLOCK_TYPE.BOX_ON_TARGET,
    name: "目标点上的箱子",
    icon: new URL("/src/assets/xz2.png",import.meta.url).href,
    hide: true
  },
];
