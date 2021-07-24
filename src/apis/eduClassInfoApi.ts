import { ApiBase } from "./apiBase";

/**班级信息 */
class EduClassInfoApi extends ApiBase {
  public readonly baseUrl = "/api/edu/ClassInfo";

  public QueryOption<TOption>(
    input: OptionFilterInput
  ): Promise<PageOutput<TOption>> {
    const url = this.mergeUrl("QueryOption");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
}

export const apiEduClassInfo = new EduClassInfoApi();
