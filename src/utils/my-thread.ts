/**
 * @param {number} ms 休眠时间(单位毫秒).默认200
 * @returns {Promise<void>}
 */
export const sleep = (ms?: number): Promise<void> => {
  ms = ms || 300;
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
