export interface MenuItem {
  show?: boolean;
  title: string;
  icon: string;
  index: string;
  children?: MenuItem[];
}

const menuList: MenuItem[] = [
  {
    title: "工作台",
    icon: "el-icon-s-home",
    index: "/home/welcome"
  },
  {
    title: "系统管理",
    icon: "el-icon-document",
    index: "system",
    children: [
      {
        title: "系统参数",
        icon: "el-icon-document",
        index: "/system/systemconfig"
      },
      {
        title: "校区管理",
        icon: "el-icon-document",
        index: "/system/school"
      },
      {
        title: "角色管理",
        icon: "el-icon-document",
        index: "/system/role"
      },
      {
        title: "教师管理",
        icon: "el-icon-document",
        index: "/system/teacher"
      },
      {
        title: "机构人员",
        icon: "el-icon-document",
        index: "/system/employee"
      },
      {
        title: "VIP管理",
        icon: "el-icon-document",
        index: "/system/vipInfo"
      }
    ]
  },
  {
    title: "资源管理",
    icon: "el-icon-document",
    index: "resource",
    children: [
      {
        title: "App资源",
        icon: "el-icon-document",
        index: "/resource/appResource",
        children: [
          {
            title: "爱利特儿歌",
            icon: "el-icon-document",
            index: "/resource/appResource/appEliteSong"
          },
          {
            title: "绘本资源",
            icon: "el-icon-document",
            index: "/resource/appResource/appPaintingInfo"
          },
          {
            title: "课程资源",
            icon: "el-icon-document",
            index: "/resource/appResource/appCourseInfo"
          }
        ]
      },
      {
        title: "教学资源",
        icon: "el-icon-document",
        index: "/resource/teaching"
      },
      {
        title: "题库系统",
        icon: "el-icon-document",
        index: "/resource/question"
      },
      {
        title: "试卷维护",
        icon: "el-icon-document",
        index: "/resource/paper"
      },
      {
        title: "备课资源",
        icon: "el-icon-document",
        index: "/resource/prepareLessons"
      },
      {
        title: "课件管理",
        icon: "el-icon-document",
        index: "/resource/courseware"
      }
    ]
  },
  {
    title: "教学管理",
    icon: "el-icon-document",
    index: "teachingManager",
    children: [
      {
        title: "排课系统",
        icon: "el-icon-document",
        index: "/teachingManager/arranging",
        children: [
          {
            title: "参数设定",
            icon: "el-icon-document",
            index: "/teachingManager/arranging/argumentSetting"
          }
        ]
      },
      {
        title: "作业管理",
        icon: "el-icon-document",
        index: "homeworkManager",
        children: [
          {
            title: "课时设定",
            icon: "el-icon-document",
            index: "/homeworkManager/setting"
          },
          {
            title: "作业批改",
            icon: "el-icon-document",
            index: "/homeworkManager/correcting"
          },
          {
            title: "作业发布",
            icon: "el-icon-document",
            index: "/homeworkManager/publish"
          }
        ]
      },
      {
        title: "班级管理",
        icon: "el-icon-document",
        index: "/teachingManager/classinfo"
      },
      {
        title: "学生管理",
        icon: "el-icon-document",
        index: "/teachingManager/studentinfo"
      },
      {
        title: "成绩管理",
        icon: "el-icon-document",
        index: "/teachingManager/gradeinfo"
      },
      {
        title: "学生考勤",
        icon: "el-icon-document",
        index: "/teachingManager/attendance"
      },
      {
        title: "考试系统",
        icon: "el-icon-document",
        index: "teachingManager/examine"
      },
      {
        title: "在线课程",
        icon: "el-icon-document",
        index: "teachingManager/onlineCourses"
      },
      {
        title: "直播平台",
        icon: "el-icon-document",
        index: "teachingManager/live"
      }
    ]
  },
  {
    title: "招生运营",
    icon: "el-icon-document",
    index: "admissions"
  },
  {
    title: "爱利特商城",
    icon: "el-icon-document",
    index: "eliteShopping"
  },
  {
    title: "教师报名",
    icon: "el-icon-document",
    index: "applyTeacher"
  },
  {
    title: "教师考评",
    icon: "el-icon-document",
    index: "reviewTeacher"
  }
];

const exceptionPage: MenuItem = {
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

const testPage: MenuItem = {
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

const hidenPage: MenuItem = {
  show: false,
  title: "隐藏页面",
  icon: "el-icon-open",
  index: "hiden",
  children: [
    {
      show: false,
      title: "个人中心",
      icon: "el-icon-document",
      index: "/home/myInformation"
    },
    {
      show: false,
      title: "关于我们",
      icon: "el-icon-document",
      index: "/home/about"
    }
  ]
};

menuList.push(hidenPage);

if (process.env.NODE_ENV === "development") {
  menuList.push(exceptionPage);
  menuList.push(testPage);
}

export default menuList;
