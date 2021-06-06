/**弹出框实体模型 */
export declare interface DialogData<T> {
  /**显示模态窗口 */
  show: boolean;
  /**模态窗口数据 */
  formData: T;
}
/**弹出框修改模型 */
export declare interface DialogEditData<T, O> extends DialogData<T> {
  /**修改前的值 */
  oldData: O;
}
