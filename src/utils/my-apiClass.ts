/**
 * 分页输出模型
 */
export class MyPageOutput<T> implements PageOutput<T> {
  public Total: number;
  public Index: number;
  public Size: number;
  public DataList: T[] = [];

  public constructor() {
    this.Total = 0;
    this.Index = 1;
    this.Size = 20;
  }
}
/**
 * 分页输入模型
 */
export class MyPageInput<T> implements PageInput<T> {
  public Index: number;
  public Size: number;
  public Sorts: SortInput<T>[];

  public constructor(index?: number, size?: number, sorts?: SortInput<T>[]) {
    this.Index = index ?? 1;
    this.Size = size ?? 10;
    this.Sorts = sorts ?? [];
  }
  /**
   * 尝试添加排序列
   * @param order 排序字段
   * @param desc 降序
   */
  public TryAddSort(order: keyof T, desc = false): void {
    if (!this.Sorts) {
      this.Sorts = [];
    }
    const array = this.Sorts.filter((x) => x.Orderby === order);
    if (array.length <= 0) {
      this.Sorts.push({ Orderby: order, Desc: desc });
    }
  }
  /**
   * 尝试修改排序列
   * @param order 排序字段
   * @param desc 降序
   */
  public TryUpdSort(order: keyof T, desc = false): void {
    if (!this.Sorts) {
      this.Sorts = [];
    }
    const array = this.Sorts.filter((x) => x.Orderby === order);
    if (array.length > 0) {
      array.forEach((item) => (item.Desc = desc));
    }
  }
}
/**
 * 选项查询模型
 */
export class MyOptionFilterInput implements OptionFilterInput {
  public Tag: string;
  public Match?: string;
  public Cascade?: string;
  public Page?: PageInput<OptionOutput>;

  public constructor(tag: string) {
    this.Tag = tag;
    this.Match = "";
    this.Cascade = "";
    this.Page = new MyPageInput<OptionOutput>(1, 50);
  }
}
/**
 * 对象形式的查询条件模型
 */
export class MyObjFilterInput<T> implements ObjFilterInput<T> {
  public Condition?: GroupInput<T>;
  public Page: PageInput<T>;

  public constructor(page: PageInput<T>) {
    this.Page = page;
  }
}

export default {};
