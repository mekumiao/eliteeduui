/**
 * 返回消息模型
 */
export interface MsgOutput {
  Code: number;
  Title: string;
  MsgDetail: string[];
}
/**
 * 参数格式错误输出模型
 */
export interface InputError {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Record<string, unknown>;
}
/**
 * 选项输出模型
 */
export interface OptionOutput {
  Label: string;
  Value: unknown;
  Disabled?: boolean;
}
/**
 * 分页输出模型
 */
export class PageOutput<T> {
  public Total = 0;
  public Index = 0;
  public Size = 0;
  public DataList: T[] = [];
}
/**
 * 分页输入模型
 */
export class PageInput<T> {
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
export class OptionFilterInput {
  public Tag: string;
  public Match?: string;
  public Cascade?: string;
  public Page?: PageInput<OptionOutput>;

  public constructor(tag: string) {
    this.Tag = tag;
    this.Match = "";
    this.Cascade = "";
    this.Page = new PageInput(1, 50);
  }
}
/**
 * 排序模型
 */
export interface SortInput<T> {
  Orderby: keyof T;
  Desc?: boolean;
}
/**
 * 查询条件分组模型
 */
export interface GroupInput<T> {
  Logic: "and" | "or";
  Items?: ItemInput<T>[];
  Groups?: GroupInput<T>[];
}
/**
 * 查询条件项模型
 */
export interface ItemInput<T> {
  Field: keyof T;
  Value: string;
  Compare:
    | "equal"
    | "notequal"
    | "less"
    | "greater"
    | "lesseq"
    | "greatereq"
    | "startswith"
    | "endswith"
    | "contains"
    | "notcontains";
}
/**
 * 对象形式的查询条件模型
 */
export class ObjFilterInput<T> {
  public Condition?: GroupInput<T>;
  public Page: PageInput<T>;

  public constructor(page: PageInput<T>) {
    this.Page = page;
  }
}

///通用实体模型

/**下拉框选项 */
export interface OptionItem {
  Label: string;
  Value: string | number | boolean;
  Disabled: boolean;
}
/**级联下拉框选项 */
export interface CascaderOptionOutput extends OptionItem {
  Children: OptionItem[];
}
/**
 * 键模型
 */
export interface KeyItem<T> {
  KeyValue: T;
}
/**
 * Pid键模型
 */
export interface PidKeyItem extends KeyItem<string> {
  KeyValue: string;
}
/**
 * 公用视图模型
 */
export interface PublicView {
  /**创建人ID */
  createuserid?: string;
  /**修改人ID */
  updateuserid?: string;
  createusername?: string;
  updateusername?: string;
  createtime?: Date;
  updatetime?: Date;
  timestamp: string;
}
/**
 * 有键视图模型
 */
export interface ViewEntity extends PublicView {
  /**唯一标识 */
  pid: string;
}
/**
 * 公开实体模型
 */
export interface PublicOutput {
  CreateUserId?: string;
  UpdateUserId?: string;
  CreateUserName?: string;
  UpdateUserName?: string;
  CreateTime?: Date;
  UpdateTime?: Date;
  Timestamp: string;
}
/**
 * 有键的公开实体模型
 */
export interface PublicWithKeyOutput extends PublicOutput {
  Pid: string;
}
/**有键实体模型 */
export interface WithKeyOutput {
  Pid: string;
}
/**值模型 */
export interface ValueItem<T> {
  Value?: T;
}

export default {};
