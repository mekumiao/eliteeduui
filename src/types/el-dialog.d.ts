/**弹出框实体模型 */
export declare interface DialogData<T extends Record<string, unknown>> {
  show: boolean;
  formData: T;
}
