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
}

export const blockList: Block[] = [
  {
    type: BLOCK_TYPE.FLOOR,
    name: "地板",
    icon: "/src/assets/dm.png"
  },
  {
    type: BLOCK_TYPE.WALL,
    name: "墙",
    icon: "/src/assets/qt.png",
  },
  {
    type: BLOCK_TYPE.PLAYER,
    name: "玩家",
    icon: "/src/assets/rw.png",
    max: 1,
  },
  {
    type: BLOCK_TYPE.TARGET,
    name: "目标点",
    icon: "/src/assets/zd.png",
    max: 3,
  },
  {
    type: BLOCK_TYPE.BOX,
    name: "箱子",
    icon: "/src/assets/xz.png",
    max: 3,
  },
  {
    type: BLOCK_TYPE.BOX_ON_TARGET,
    name: "目标点上的箱子",
    icon: "/src/assets/xz2.png",
    max: 1,
  },
];
