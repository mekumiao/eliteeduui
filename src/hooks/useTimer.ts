import { Ref, ref } from "vue";

export class TimerDown {
  protected total: Ref<number> | undefined;
  protected intervalNumber: NodeJS.Timeout | undefined;
  public get Total(): Ref<number> {
    return this.total || ref(60);
  }

  public Start(total: number): TimerDown {
    this.total = ref(total);
    this.intervalNumber = setInterval(() => {
      if (this.total) {
        this.total.value--;
        if (this.Total.value <= 0) {
          this.Stop();
        }
      } else {
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
