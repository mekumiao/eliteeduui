import {
  ApiBase,
  ObjFilterInput,
  PageOutput,
  PublicWithKeyOutput
} from "./apiBase";
import ajax from "./apiVipBase";

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
  public QueryPageCourseware(
    input: ObjFilterInput<CoursewareOutput>
  ): Promise<PageOutput<CoursewareOutput>> {
    const url = this.mergeUrl("QueryPageCourseware");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
}

export const apiVipCourseware = new CoursewareApi();
