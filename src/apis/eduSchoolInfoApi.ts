import { ApiBase } from "./apiBase";

/**学校信息 */
class EduSchoolInfoApi extends ApiBase {
  public readonly baseUrl = "/api/edu/SchoolInfo";

  public QueryOption(
    input: OptionFilterInput
  ): Promise<PageOutput<OptionItem>> {
    const url = this.mergeUrl("QueryOption");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
}

export const apiEduSchoolInfo = new EduSchoolInfoApi();
