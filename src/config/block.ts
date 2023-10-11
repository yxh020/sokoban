export interface Block {
  type: number;
  name: string;
  icon: string;
  activeIcon: string;
  max?: number;
}

export const blockList: Block[] = [
  {
    type: 0,
    name: "地板",
    icon: "/src/assets/dm.png",
    activeIcon: "",
  },
  {
    type: 1,
    name: "墙",
    icon: "/src/assets/qt.png",
    activeIcon: "",
  },
  {
    type: 2,
    name: "玩家",
    icon: "/src/assets/rw.png",
    activeIcon: "",
    max: 1,
  },
  {
    type: 3,
    name: "目标点",
    icon: "/src/assets/zd.png",
    activeIcon: "",
    max: 3,
  },
  {
    type: 4,
    name: "箱子",
    icon: "/src/assets/xz.png",
    activeIcon: "/src/assets/xz2.png",
    max: 3,
  },
  {
    type: 5,
    name: "过关箱子",
    icon: "/src/assets/xz2.png",
    activeIcon: "",
    max: 1,
  },
];
