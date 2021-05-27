/**弹出框实体模型 */
export declare interface DialogData<T extends Record<string, unknown>> {
  show: boolean;
  formData: T;
}
/**弹出框修改模型 */
export declare interface DialogEditData<
  T extends Record<string, unknown>,
  O extends Record<string, unknown>
> extends DialogData<T> {
  oldData: O;
}
