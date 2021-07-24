import { ApiBillBase } from "./apiBase";

export interface TeacherInfoInput {
  Name: string;
  UserInfoPid: string;
  SchoolInfoPid: string;
}

export interface TeacherInfoUpdInput {
  Name?: string;
  SchoolInfoPid?: string;
}

export interface TeacherInfoOutput extends PublicWithKeyOutput {
  Name: string;
  Age: number;
  UserInfoPid: string;
  Gender: number;
  Portrait: string;
  Account: string;
  SchoolInfoPid: string;
  SchoolInfoName: string;
}

/**教师信息API */
class EduTeacherInfoApi extends ApiBillBase<
  TeacherInfoInput,
  TeacherInfoUpdInput,
  TeacherInfoOutput
> {
  public readonly baseUrl = "/api/edu/TeacherInfo";
}

export const apiEduTeacherInfo = new EduTeacherInfoApi();
