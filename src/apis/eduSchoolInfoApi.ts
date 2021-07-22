import { ApiBase } from "./apiBase";

class EduSchoolInfoApi extends ApiBase {
  public baseUrl = "/api/edu/SchoolInfo";

  public QueryOption(
    input: OptionFilterInput
  ): Promise<PageOutput<OptionItem>> {
    const url = this.mergeUrl("QueryOption");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
}

export const apiEduSchoolInfo = new EduSchoolInfoApi();
