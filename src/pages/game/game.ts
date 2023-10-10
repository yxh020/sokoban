import { ref } from "vue";

export const gameStatus = ref(0) //0: 未开始 1：已开始 2：完成

export function play() {
    gameStatus.value = 1
}

export function end() {
    gameStatus.value = 2
}

export function init() {
    gameStatus.value = 0
}