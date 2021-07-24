declare interface TabPane {
  index: string;
  loaded: string;
  isClosable: boolean;
  active: boolean;
  paneName: string;
  shouldBeRender: boolean;
}

declare interface SortTableColumn {
  prop: string;
  order: "ascending" | "descending";
}

declare interface RequiredRole {
  required: boolean;
  message: string;
  trigger: "blur" | "change";
}

declare interface EmptyRule {
  required: boolean;
  message: string;
  type?: "date" | "array" | null;
  trigger: "blur" | "change";
}

declare interface LengthRule {
  min: number;
  max: number;
  message: string;
  trigger: "blur" | "change";
}

declare interface FuncFormRule {
  /**验证规则 */
  validator: (
    rule: unknown,
    value: unknown,
    callback: (error?: string) => void
  ) => void;
  /**触发方式 */
  trigger: "blur" | "change";
}

declare interface ErrorRuleMsg {
  /**字段 */
  field: string;
  /**消息 */
  message: string;
}

declare type FormRule = RequiredRole | EmptyRule | LengthRule | FuncFormRule;

/**表单验证 */
declare interface RulesValidate {
  /**验证整个表单 */
  validate: (
    callback?: (
      valid: boolean,
      fields?: unknown | null
    ) => boolean | Promise<boolean>
  ) => void | Promise<void>;
  /**验证指定字段 */
  validateField: (
    props: Array<string> | string,
    callback: (error: string) => void
  ) => void;
  /**重置指定字段的验证 */
  resetFields: () => void;
  /**清除整个表单验证 */
  clearValidate: (props: Array<string> | string) => void;
}
