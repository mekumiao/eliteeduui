import { ApiBillBase } from "./apiBase";

/**课件输出模型 */
export interface CoursewareOutput extends PublicWithKeyOutput {
  Name: string;
  Remark: string;
  Group: string;
  Sort: number;
  SourcePath: string;
  ResourceType: number;
  ResourceTypeName: string;
  PreviewPhoto: string;
}
/**课件输入模型 */
export interface CoursewareInput {
  Name: string;
  Remark: string;
  Group: string;
  Sort: number;
  SourcePath: string;
  ResourceType: number;
  PreviewPhoto: string;
}
/**课件修改输入模型 */
export interface CoursewareUpdInput {
  Name?: string;
  Remark?: string;
  Group?: string;
  Sort: number;
  SourcePath?: string;
  ResourceType?: number;
  PreviewPhoto?: string;
}
/**课件接口 */
class CoursewareApi extends ApiBillBase<
  CoursewareInput,
  CoursewareUpdInput,
  CoursewareOutput
> {
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
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
}

export const apiEduCourseware = new CoursewareApi();
