export interface MenuItem {
  title: string;
  icon: string;
  index: string;
  children?: MenuItem[];
}

const menuList: MenuItem[] = [
  {
    title: "回到首页",
    icon: "el-icon-s-home",
    index: "/home/welcome"
  },
  {
    title: "系统管理",
    icon: "el-icon-document",
    index: "systemManager",
    children: [
      {
        title: "系统配置",
        icon: "el-icon-document",
        index: "/systemManager/systemconfig"
      }
    ]
  },
  {
    title: "校区管理",
    icon: "el-icon-document",
    index: "imageManage",
    children: [
      {
        title: "新增校区",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      }
    ]
  },
  {
    title: "角色管理",
    icon: "el-icon-document",
    index: "imageManage",
    children: [
      {
        title: "新增校区",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      }
    ]
  },
  {
    title: "作业管理",
    icon: "el-icon-document",
    index: "imageManage",
    children: [
      {
        title: "题库系统",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      },
      {
        title: "作业批改",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      },
      {
        title: "作业发布",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      }
    ]
  },
  {
    title: "作业管理",
    icon: "el-icon-document",
    index: "imageManage",
    children: [
      {
        title: "题库系统",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      },
      {
        title: "作业批改",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      },
      {
        title: "作业发布",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      }
    ]
  },
  {
    title: "作业管理",
    icon: "el-icon-document",
    index: "imageManage",
    children: [
      {
        title: "题库系统",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      },
      {
        title: "作业批改",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      },
      {
        title: "作业发布",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      }
    ]
  },
  {
    title: "作业管理",
    icon: "el-icon-document",
    index: "imageManage",
    children: [
      {
        title: "题库系统",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      },
      {
        title: "作业批改",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      },
      {
        title: "作业发布",
        icon: "el-icon-document",
        index: "/imageManage/imageinfo"
      }
    ]
  }
];

const exceptionPage = {
  title: "异常页面",
  icon: "el-icon-error",
  index: "exception",
  children: [
    {
      title: "403",
      icon: "el-icon-document",
      index: "/exception/403"
    },
    {
      title: "404",
      icon: "el-icon-document",
      index: "/exception/404"
    },
    {
      title: "500",
      icon: "el-icon-document",
      index: "/exception/500"
    }
  ]
};

const testPage = {
  title: "测试页面",
  icon: "el-icon-open",
  index: "testPage",
  children: [
    {
      title: "测试1",
      icon: "el-icon-document",
      index: "/testPage/test1"
    },
    {
      title: "测试2",
      icon: "el-icon-document",
      index: "/testPage/test2"
    }
  ]
};

if (process.env.NODE_ENV === "development") {
  menuList.push(exceptionPage);
  menuList.push(testPage);
}

export default menuList;
