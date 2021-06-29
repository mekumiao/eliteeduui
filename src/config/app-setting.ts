const setting = {
  systemName: "爱利特教务系统",
  authData: {
    account: "admin",
    passWord: "123123"
  },
  homeMenuOpenWidth: 250,
  homeMenuShrinkWidth: 70,
  defaultSourceHost: "http://file.linshengweb.com/files/",
  defaultUploadHost: "http://file.linshengweb.com/upload/",
  apiTimeout: process.env.NODE_ENV === "production" ? 20000 : undefined,
  apiBaseURL:
    process.env.NODE_ENV === "production"
      ? "http://an.linshengweb.com:8188/"
      : "http://localhost:8080/"
};

// setting.apiBaseURL = "http://an.linshengweb.com:8188/";
// setting.apiBaseURL = "http://localhost:8080/";

export default setting;
