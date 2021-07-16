const setting = {
  systemName: "爱利特教务系统",
  authData: {
    account: "admin",
    passWord: "123123"
  },
  homeMenuOpenWidth: 250,
  homeMenuShrinkWidth: 70,
  defaultSourceHost: "http://file.elitereadinglibrary.com/files/",
  defaultUploadHost: "http://file.elitereadinglibrary.com/upload/",
  apiTimeout: process.env.NODE_ENV === "production" ? 20000 : undefined,
  apiBaseURL:
    process.env.NODE_ENV === "production"
      ? "http://http://www.elitereadinglibrary.com/"
      : "http://localhost:8080/"
};

// setting.apiBaseURL = "http://http://www.elitereadinglibrary.com/";
// setting.apiBaseURL = "http://localhost:8080/";

export default setting;
