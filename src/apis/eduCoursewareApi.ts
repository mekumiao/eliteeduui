import ajax, {
  ApiBase,
  MsgOutput,
  ObjFilterInput,
  OptionFilterInput,
  OptionItem,
  PageOutput,
  PidKeyItem,
  PublicWithKeyOutput
} from "./apiBase";

/**课程输出模型 */
export interface CoursewareOutput extends PublicWithKeyOutput {
  Name: string;
  Remark: string;
  SourcePath: string;
  ResourceType: number;
  ResourceTypeName: string;
  PreviewPhoto: string;
}
/**课程输入模型 */
export interface CoursewareInput {
  Name: string;
  Remark: string;
  SourcePath: string;
  ResourceType: number;
  PreviewPhoto: string;
}
/**课件修改输入模型 */
export interface CoursewareUpdInput {
  Name?: string;
  Remark?: string;
  SourcePath?: string;
  ResourceType?: number;
  PreviewPhoto?: string;
}
/**课程接口 */
class EduCoursewareApi extends ApiBase {
  /**基本路径 */
  public baseUrl = "/api/edu/Courseware";
  /**
   * 查询下拉值选项
   * @param input 查询模型
   * @returns 下拉值选项
   */
  public QueryOption(
    input: OptionFilterInput
  ): Promise<PageOutput<OptionItem>> {
    const url = this.mergeUrl("QueryOption");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 查询课程列表
   * @param input 查询模型
   * @returns 分页输出模型
   */
  public QueryPageCourseware(
    input: ObjFilterInput<CoursewareOutput>
  ): Promise<PageOutput<CoursewareOutput>> {
    const url = this.mergeUrl("QueryPageCourseware");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 创建课件
   * @param input 课件输入模型
   * @returns 课件PID模型
   */
  public CreateCourseware(input: CoursewareInput): Promise<PidKeyItem> {
    const url = this.mergeUrl("CreateCourseware");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**
   * 修改课件
   * @param id ID
   * @param timestamp 时间戳
   * @param input 输入模型
   * @returns 结果消息
   */
  public UpdateCourseware(
    id: string,
    timestamp: string,
    input: CoursewareUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UpdateCourseware", id, timestamp);
    return this.tryCatchCall(() => ajax.put(url, input));
  }
  /**
   * 删除课件
   * @param id ID
   * @param timestamp 时间戳
   * @returns 结果消息
   */
  public DeleteCourseware(id: string, timestamp: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("DeleteCourseware", id, timestamp);
    return this.tryCatchCall(() => ajax.delete(url));
  }
}

export const apiEduCourseware = new EduCoursewareApi();
