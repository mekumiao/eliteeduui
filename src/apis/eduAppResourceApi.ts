import ajax, {
  ApiBase,
  PageOutput,
  ObjFilterInput,
  PidKeyItem,
  MsgOutput,
  OptionFilterInput,
  OptionOutput,
  PublicWithKeyOutput
} from "./apiBase";

/**爱利特儿歌输出模型 */
export interface EliteSongOutput extends PublicWithKeyOutput {
  Name: string;
  Remark: string;
  VideoPath: string;
  PreviewPhoto: string;
  EliteSongClassify: number;
  EliteSongClassifyName: string;
}
/**爱利特儿歌输入模型 */
export interface EliteSongInput {
  Name: string;
  Remark: string;
  VideoPath: string;
  PreviewPhoto: string;
  EliteSongClassify: number;
}
/**爱利特儿歌修改模型 */
export interface EliteSongUpdInput {
  Name?: string;
  Remark?: string;
  VideoPath?: string;
  PreviewPhoto?: string;
  EliteSongClassify?: number;
}

/**app资源管理api */
class AppResourceApi extends ApiBase {
  /**基本url */
  public readonly baseUrl: string = "/api/edu/AppResource";
  /**查询爱利特儿歌 */
  public QueryPageEliteSong(
    input: ObjFilterInput<EliteSongOutput>
  ): Promise<PageOutput<EliteSongOutput>> {
    const url = this.mergeUrl("QueryPageEliteSong");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**创建爱利特儿歌 */
  public CreateEliteSong(input: EliteSongInput): Promise<PidKeyItem> {
    const url = this.mergeUrl("CreateEliteSong");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**修改爱利特儿歌 */
  public UpdateEliteSong(
    id: string,
    timestamp: string,
    input: EliteSongUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UpdateEliteSong", id, timestamp);
    return this.tryCatchCall(() => ajax.put(url, input));
  }
  /**查询下拉值选项 */
  public QueryOption(
    input: OptionFilterInput
  ): Promise<PageOutput<OptionOutput>> {
    const url = this.mergeUrl("QueryOption");
    return this.tryCatchCall(() => ajax.post(url, input));
  }
  /**删除爱利特儿歌 */
  public DeleteEliteSong(id: string, timestamp: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("DeleteEliteSong", id, timestamp);
    return this.tryCatchCall(() => ajax.delete(url));
  }
}
/**app资源管理api */
export const apiAppResource = new AppResourceApi();
