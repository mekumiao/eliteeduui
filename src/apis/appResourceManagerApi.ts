import ajax, {
  ApiBase,
  PageOutput,
  ObjFilterInput,
  PidKeyItem,
  MsgOutput
} from "@/apis/apiBase";

/**爱利特儿歌输出模型 */
export interface EliteSongOutput {
  Pid: string;
  Name: string;
  Remark: string;
  VideoPath: string;
  PrviewPhoto: string;
  EliteSongClassify: number;
  EliteSongClassifyName: string;
  CreateTime: Date;
  UpdateTime: Date;
  CreateUserId: string;
  UpdateUserId: string;
  CreateUserName: string;
  UpdateUserName: string;
  Timestamp: string;
}
/**爱利特儿歌输入模型 */
export interface EliteSongInput {
  Name: string;
  Remark: string;
  VideoPath: string;
  PrviewPhoto: string;
  EliteSongClassify: number;
}
/**爱利特儿歌修改模型 */
export interface EliteSongUpdInput {
  Name?: string;
  Remark?: string;
  VideoPath?: string;
  PrviewPhoto?: string;
  EliteSongClassify?: number;
}

/**app资源管理api */
class appResourceManager extends ApiBase {
  /**基本url */
  public readonly baseUrl: string = "/api/edu/AppResourcesManager";
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
    input: EliteSongUpdInput,
    id: string,
    timestamp: string
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UpdateEliteSong", id, timestamp);
    return this.tryCatchCall(() => ajax.put(url, input));
  }
}
/**app资源管理api */
export const apiAppResourceManagerApi = new appResourceManager();
