
export function debounce(func: () => void, delay: number = 200, immediate: boolean = false) {
  let timeoutId: any = null;
  return function(...args: []) {

    const callLater = function (this: any) {
      func.apply(this, args);
    };

    if (immediate && !timeoutId) {
      callLater();
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(callLater, delay);
  };
}