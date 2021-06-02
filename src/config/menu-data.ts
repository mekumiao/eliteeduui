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
        title: "系统参数",
        icon: "el-icon-document",
        index: "/systemManager/systemconfig"
      },
      {
        title: "校区管理",
        icon: "el-icon-document",
        index: "/systemManager/school"
      },
      {
        title: "角色管理",
        icon: "el-icon-document",
        index: "/systemManager/role"
      },
      {
        title: "教师管理",
        icon: "el-icon-document",
        index: "/systemManager/teacher"
      },
      {
        title: "机构人员",
        icon: "el-icon-document",
        index: "/systemManager/employee"
      },
      {
        title: "VIP用户",
        icon: "el-icon-document",
        index: "/systemManager/visitorUserInfo"
      }
    ]
  },
  {
    title: "资源管理",
    icon: "el-icon-document",
    index: "sourceManager",
    children: [
      {
        title: "App课件",
        icon: "el-icon-document",
        index: "/sourceManager/appManager",
        children: [
          {
            title: "爱丽特儿歌",
            icon: "el-icon-document",
            index: "/sourceManager/appManager/appEliteSong"
          }
        ]
      },
      {
        title: "教学资源",
        icon: "el-icon-document",
        index: "/sourceManager/teaching"
      },
      {
        title: "题库系统",
        icon: "el-icon-document",
        index: "/sourceManager/question"
      },
      {
        title: "试卷维护",
        icon: "el-icon-document",
        index: "/sourceManager/paper"
      },
      {
        title: "备课资源",
        icon: "el-icon-document",
        index: "/sourceManager/prepareLessons"
      },
      {
        title: "课件管理",
        icon: "el-icon-document",
        index: "/sourceManager/courseware"
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
