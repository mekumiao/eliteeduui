const setting = {
  systemName: "爱利特教务系统",
  authData: {
    account: "admin",
    passWord: "123123"
  },
  homeMenuOpenWidth: 250,
  homeMenuShrinkWidth: 70,
  defaultSourceHost: "https://file.elitereadinglibrary.com/files/",
  defaultUploadHost: "https://file.elitereadinglibrary.com/upload/",
  apiTimeout: process.env.NODE_ENV === "production" ? 20000 : undefined,
  apiBaseURL:
    process.env.NODE_ENV === "production"
      ? "https://an.elitereadinglibrary.com/"
      : "http://localhost:8080/"
};

// setting.apiBaseURL = "http://an.elitereadinglibrary.com/";
// setting.apiBaseURL = "http://localhost:8080/";

export default setting;
