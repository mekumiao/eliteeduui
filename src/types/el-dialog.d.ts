/**弹出框实体模型 */
export declare interface DialogData<T> {
  show: boolean;
  formData: T;
}
/**弹出框修改模型 */
export declare interface DialogEditData<T, O> extends DialogData<T> {
  oldData: O;
}
