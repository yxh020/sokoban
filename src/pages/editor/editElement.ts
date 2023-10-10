import { type Block } from '@/config/block.ts'

export const currentSelectedEditElement = ref<Block>();

export function setCurrentSelectedElement(element: Block) {
  currentSelectedEditElement.value = element;
}