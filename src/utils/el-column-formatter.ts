export interface ElCol {
  property: string;
}
/**日期格式化 */
export const dateFormatter = (
  _row: Record<string, unknown>,
  _col: ElCol,
  cellValue: unknown
): string => {
  if (cellValue) {
    if (typeof cellValue === "string") {
      const date = new Date(cellValue);
      return date.format("yyyy-MM-dd");
    } else if (cellValue instanceof Date) {
      const date = cellValue as Date;
      return date.format("yyyy-MM-dd");
    }
  }
  return "--";
};
export const dateTimeFormatter = (
  _row: Record<string, unknown>,
  _col: ElCol,
  cellValue: unknown
): string => {
  if (cellValue) {
    if (typeof cellValue === "string") {
      const date = new Date(cellValue);
      return date.format("yyyy-MM-dd hh:mm:ss");
    } else if (cellValue instanceof Date) {
      const date = cellValue as Date;
      return date.format("yyyy-MM-dd hh:mm:ss");
    }
  }
  return "--";
};
/**空值处理 */
export const emptyFormatter = (
  _row: Record<string, unknown>,
  _col: ElCol,
  cellValue: unknown
): string => {
  if (cellValue) {
    return `${cellValue}`;
  } else {
    return "--";
  }
};

export default {
  dateFormatter,
  dateTimeFormatter,
  emptyFormatter
};
