import { ref } from "vue";

export class Timer {
  public Total = ref<number>(0);
  protected intervalNumber: NodeJS.Timeout | undefined;

  public Start(total: number): Timer {
    debugger;
    this.Total.value = total;
    this.intervalNumber = setInterval(() => {
      this.Total.value--;
      if (this.Total.value <= 0) {
        this.Stop();
      }
    }, 1000);
    return this;
  }

  public Stop(): void {
    this.intervalNumber && clearTimeout(this.intervalNumber);
  }
}

export default {};
