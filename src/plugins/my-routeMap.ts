import menuList, { MenuItem } from "@/config/menu-data";

export interface RouteMapInfo {
  title: string;
  to?: string;
}
/**
 * 递归遍历菜单,搜索路径描述信息
 * @param path 路径
 * @param data 待遍历的数据
 */
function findMenu(path: string, data: MenuItem[]): RouteMapInfo[] | undefined {
  for (const currenItem of data) {
    if (currenItem.children) {
      const res = findMenu(path, currenItem.children);
      if (res) {
        res?.unshift({ title: currenItem.title, to: currenItem.index });
        return res;
      }
    } else {
      if (currenItem.index === path) {
        return [{ title: currenItem.title, to: currenItem.index }];
      }
    }
  }
  return undefined;
}

/**
 * 获取路径信息
 * @param path 路径
 * @param exclude 排除的路径
 */
export function getRoutePath(
  path: string,
  exclude: string[] = []
): RouteMapInfo[] | undefined {
  if (exclude.indexOf(path) < 0) {
    return findMenu(path, menuList);
  }
  return undefined;
}

export default {};
