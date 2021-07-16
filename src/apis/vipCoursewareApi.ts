import { ApiBase } from "./apiBase";

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
/**VIP课件访问Api */
class CoursewareApi extends ApiBase {
  /**基本路径 */
  public baseUrl = "/api/vip/Courseware";
  /**
   * 查询课件列表
   * @param input 查询模型
   * @returns 分页输出模型
   */
  public QueryPage(
    input: ObjFilterInput<CoursewareOutput>
  ): Promise<PageOutput<CoursewareOutput>> {
    const url = this.mergeUrl("QueryPage");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
}

export const apiVipCourseware = new CoursewareApi();
