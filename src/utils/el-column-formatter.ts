interface ElCol {
  property: string;
}

/**日期格式化 */
export const dateFormatter = (
  row: Record<string, unknown>,
  col: ElCol,
  formate = "yyyy-MM-dd",
  defaultValue = "--"
): string => {
  const msg = row[col.property];
  if (msg) {
    if (typeof msg === "string") {
      const date = new Date(msg);
      return date.format(formate);
    } else if (msg instanceof Date) {
      const date = msg as Date;
      return date.format(formate);
    }
  }
  return defaultValue;
};
/**空值处理 */
export const emptyFormatter = (
  row: Record<string, unknown>,
  col: ElCol,
  defaultValue = "--"
): string => {
  const msg = row[col.property];
  return `${msg}` || defaultValue;
};

export default {
  dateFormatter,
  emptyFormatter
};
