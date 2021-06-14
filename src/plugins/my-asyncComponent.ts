// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const echartsAsync = () =>
  import(/* webpackChunkName: "echarts" */ "echarts");

export default {};
