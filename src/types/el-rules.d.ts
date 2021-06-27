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
  validator: (
    rule: unknown,
    value: unknown,
    callback: (error?: string) => void
  ) => void;
  trigger: "blur" | "change";
}

declare interface ErrorRuleMsg {
  field: string;
  message: string;
}

declare type FormRule = RequiredRole | EmptyRule | LengthRule | FuncFormRule;

/**表单验证 */
declare interface RulesValidate {
  validate: (
    callback?: (
      valid: boolean,
      fields?: unknown | null
    ) => boolean | Promise<boolean>
  ) => void | Promise<void>;
  validateField: (
    props: Array<string> | string,
    callback: (error: string) => void
  ) => void;
  resetFields: () => void;
  clearValidate: (props: Array<string> | string) => void;
}
