export class DialogElementLayer {
  private _className: string;
  private _index?: number;

  constructor(className: string) {
    this._className = className;
  }

  public Show(): number {
    return this.Open();
  }

  public Close(): void {
    if (this._index) {
      layer.close(this._index);
    }
  }

  private Open(): number {
    const dom = document.getElementsByClassName(this._className)[0].innerHTML;
    this._index = layer.confirm(dom, {
      type: 1,
      btn: ["确认", "取消"],
      shadeClose: true
    });
    return this._index;
  }
}
