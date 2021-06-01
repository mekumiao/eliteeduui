export declare interface TabPane {
  index: string;
  loaded: string;
  isClosable: boolean;
  active: boolean;
  paneName: string;
  shouldBeRender: boolean;
}

export declare interface SortTableColumn {
  prop: string;
  order: "ascending" | "descending";
}

export declare interface RequiredRole {
  required: boolean;
  message: string;
  trigger: "blur" | "change";
}

export declare interface EmptyRule {
  required: boolean;
  message: string;
  type?: "date" | "array" | null;
  trigger: "blur" | "change";
}

export declare interface LengthRule {
  min: number;
  max: number;
  message: string;
  trigger: "blur" | "change";
}

export declare interface FuncFormRule {
  validator: (
    rule: unknown,
    value: unknown,
    callback: (error?: string) => void
  ) => void;
  trigger: "blur" | "change";
}

export declare interface ErrorRuleMsg {
  field: string;
  message: string;
}

export declare type FormRule =
  | RequiredRole
  | EmptyRule
  | LengthRule
  | FuncFormRule;

/**表单验证 */
export declare interface Rules {
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
