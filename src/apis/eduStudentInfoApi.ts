import { ApiBillBase } from "./apiBase";

export interface StudentInfoInput {
  Name: string;
  UserInfoPid: string;
  ClassInfoPid: string;
}

export interface StudentInfoUpdInput {
  Name?: string;
  ClassInfoPid?: string;
}

export interface StudentInfoOutput extends PublicWithKeyOutput {
  Name: string;
  UserInfoPid: string;
  Gender: number;
  Age: number;
  Portrait: string;
  Account: string;
  ClassInfoPid: string;
  ClassInfoWithGradeName: string;
  SchoolInfoPid: string;
  SchoolInfoName: string;
}

/**学生信息API */
class EduStudentInfoApi extends ApiBillBase<
  StudentInfoInput,
  StudentInfoUpdInput,
  StudentInfoOutput
> {
  public readonly baseUrl = "/api/edu/StudentInfo";
}

export const apiEduStudentInfo = new EduStudentInfoApi();
