/**返回消息模型 */
declare interface MsgOutput {
  Code: number;
  Title: string;
  MsgDetail: string[];
}
/**参数格式错误输出模型 */
declare interface InputError {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Record<string, unknown>;
}
/**选项输出模型 */
declare interface OptionOutput {
  Label: string;
  Value: unknown;
  Disabled?: boolean;
}
/**
 * 排序模型
 */
declare interface SortInput<T> {
  Orderby: keyof T;
  Desc?: boolean;
}
/**
 * 查询条件分组模型
 */
declare interface GroupInput<T> {
  Logic: "and" | "or";
  Items?: ItemInput<T>[];
  Groups?: GroupInput<T>[];
}
/**
 * 查询条件项模型
 */
declare interface ItemInput<T> {
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
/**下拉框选项 */
declare interface OptionItem {
  Label: string;
  Value: string | number | boolean;
  Disabled: boolean;
}
/**级联下拉框选项 */
declare interface CascaderOptionOutput extends OptionItem {
  Children: OptionItem[];
}
/**
 * 键模型
 */
declare interface KeyItem<T> {
  KeyValue: T;
}
/**
 * Pid键模型
 */
declare interface PidKeyItem extends KeyItem<string> {
  KeyValue: string;
}
/**
 * 公用视图模型
 */
declare interface PublicView {
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
declare interface ViewEntity extends PublicView {
  /**唯一标识 */
  pid: string;
}
/**
 * 公开实体模型
 */
declare interface PublicOutput {
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
declare interface PublicWithKeyOutput extends PublicOutput {
  Pid: string;
}
/**有键实体模型 */
declare interface WithKeyOutput {
  Pid: string;
}
/**值模型 */
declare interface ValueItem<T> {
  Value?: T;
}
/**分页输出模型 */
declare interface PageOutput<T> {
  Total: number;
  Index: number;
  Size: number;
  DataList: T[];
}
/**分页输入模型 */
declare interface PageInput<T> {
  Index: number;
  Size: number;
  Sorts: SortInput<T>[];
  /**
   * 尝试添加排序列
   * @param order 排序字段
   * @param desc 降序
   */
  TryAddSort(order: keyof T, desc = false): void;
  /**
   * 尝试修改排序列
   * @param order 排序字段
   * @param desc 降序
   */
  TryUpdSort(order: keyof T, desc = false): void;
}
/**
 * 选项查询模型
 */
declare interface OptionFilterInput {
  Tag: string;
  Match?: string;
  Cascade?: string;
  Page?: PageInput<OptionOutput> | undefined;
}
/**
 * 对象形式的查询条件模型
 */
declare interface ObjFilterInput<T> {
  Condition?: GroupInput<T>;
  Page: PageInput<T>;
}
