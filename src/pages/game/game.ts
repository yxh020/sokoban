import { ref } from "vue";
import { gameLevel } from '@/config/index.ts'
import { BLOCK_TYPE } from '@/config/block.ts'

export const showNext = ref(false)
export const level = ref(0)
export let targetCount = 0; //目标数量

export function initGame(map:any){
    init()
    map.forEach((e:any) => {
        const count = e.filter((i:any) => i == BLOCK_TYPE.TARGET).length
        targetCount += count
    });
    console.log('----targetCount',targetCount);
}

export function init() {
    targetCount = 0
    showNext.value = false
}  

export function nextLevel() {
    console.log(gameLevel.length,level.value);
    if(gameLevel.length > level.value + 1){
        level.value++
    }else{
        alert('恭喜通关啦！')
    }
}