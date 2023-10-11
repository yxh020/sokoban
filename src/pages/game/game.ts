import { ref } from "vue";
import { gameLevel } from '@/config/index.ts'

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

export const level = ref(0)

export function nextLevel() {
    if(gameLevel.length > level.value){
        level.value++
        init()
    }
}