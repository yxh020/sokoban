export class ToggleRunner {
  private trigger = false;

  start() {
    this.trigger = true;
  }

  stop() {
    this.trigger = false;
  }

  run(fn: () => void) {
    if (!this.trigger) return;
    fn && fn();
  }
}