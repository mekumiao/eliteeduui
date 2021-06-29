/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const echartsAsync = () => import(/* webpackChunkName: "echarts" */ "echarts");

export const getEchartsAsync = async () => await echartsAsync();

export default {};
