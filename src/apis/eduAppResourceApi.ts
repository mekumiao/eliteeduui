import { ApiBase } from "./apiBase";

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
/**绘本资源输出模型 */
export interface PaintingInfoOutput extends PublicWithKeyOutput {
  Name: string;
  Remark: string;
  SourcePath: string;
  PreviewPhoto: string;
  Sort: number;
  PaintingClassityName: string;
  PaintingClassityPid: string;
}
/**绘本输入模型 */
export interface PaintingInfoInput {
  Name: string;
  Remark: string;
  SourcePath: string;
  PreviewPhoto: string;
  Sort: number;
  PaintingClassityPid: string;
}
/**绘本修改模型 */
export interface PaintingInfoUpdInput {
  Name?: string;
  Remark?: string;
  SourcePath?: string;
  PreviewPhoto?: string;
  Sort?: number;
  PaintingClassityPid?: string;
}
/**课程输出模型 */
export interface CourseInfoOutput extends PublicWithKeyOutput {
  Name: string;
  Remark: string;
  CoverPhoto: string;
  CourseClassifyPid: string;
  CourseClassifyName: string;
  IsPart: boolean;
  IsTheEnd: boolean;
  LastPublish: Date;
  CourseDetails: CourseDetailOutput[];
}
/**课程明细输出模型 */
export interface CourseDetailOutput extends PublicWithKeyOutput {
  Remark: string;
  PreviewPhoto: string;
  CourseInfoPid: string;
  ResourcePath: string;
  Sort: number;
}
/**课程输入模型 */
export interface CourseInfoInput {
  Name: string;
  Remark: string;
  CoverPhoto: string;
  CourseClassifyPid: string;
  CourseClassifyName: string;
  IsPart: boolean;
  IsTheEnd: boolean;
  LastPublish: Date;
  CourseDetails: CourseDetailInput[];
}
/**课程明细输入模型 */
export interface CourseDetailInput {
  Remark: string;
  PreviewPhoto: string;
  ResourcePath: string;
  Sort: number;
}
/**课程修改模型 */
export interface CourseInfoUpdInput {
  Name?: string;
  Remark?: string;
  CoverPhoto?: string;
  CourseClassifyPid?: string;
  CourseClassifyName?: string;
  IsPart?: boolean;
  IsTheEnd?: boolean;
  LastPublish?: Date;
  CourseDetails?: CourseDetailUpdInput[];
}
/**课程明细修改模型 */
export interface CourseDetailUpdInput extends WithKeyInput {
  Remark?: string;
  PreviewPhoto?: string;
  ResourcePath?: string;
  Sort?: number;
}
/**app资源管理api */
class AppResourceApi extends ApiBase {
  /**基本url */
  public readonly baseUrl: string = "/api/edu/AppResource";
  /**查询下拉值选项 */
  public QueryOption(
    input: OptionFilterInput
  ): Promise<PageOutput<OptionOutput>> {
    const url = this.mergeUrl("QueryOption");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**查询爱利特儿歌 */
  public QueryPageEliteSong(
    input: ObjFilterInput<EliteSongOutput>
  ): Promise<PageOutput<EliteSongOutput>> {
    const url = this.mergeUrl("QueryPageEliteSong");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**创建爱利特儿歌 */
  public CreateEliteSong(input: EliteSongInput): Promise<PidKeyItem> {
    const url = this.mergeUrl("CreateEliteSong");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**修改爱利特儿歌 */
  public UpdateEliteSong(
    id: string,
    timestamp: string,
    input: EliteSongUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UpdateEliteSong", id, timestamp);
    return this.tryCatchCall(() => this.ajax.put(url, input));
  }
  /**删除爱利特儿歌 */
  public DeleteEliteSong(id: string, timestamp: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("DeleteEliteSong", id, timestamp);
    return this.tryCatchCall(() => this.ajax.delete(url));
  }
  /**查询绘本 */
  public QueryPagePaintingInfo(
    input: ObjFilterInput<PaintingInfoOutput>
  ): Promise<PageOutput<PaintingInfoOutput>> {
    const url = this.mergeUrl("QueryPagePaintingInfo");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**创建绘本 */
  public CreatePaintingInfo(input: PaintingInfoInput): Promise<PidKeyItem> {
    const url = this.mergeUrl("CreatePaintingInfo");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**修改绘本 */
  public UpdatePaintingInfo(
    id: string,
    timestamp: string,
    input: PaintingInfoUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UpdatePaintingInfo", id, timestamp);
    return this.tryCatchCall(() => this.ajax.put(url, input));
  }
  /**删除绘本 */
  public DeletePaintingInfo(id: string, timestamp: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("DeletePaintingInfo", id, timestamp);
    return this.tryCatchCall(() => this.ajax.delete(url));
  }
  /**查询课程 */
  public QueryPageCourseInfo(
    input: ObjFilterInput<CourseInfoOutput>
  ): Promise<PageOutput<CourseInfoOutput>> {
    const url = this.mergeUrl("QueryPageCourseInfo");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**创建课程 */
  public CreateCourseInfo(input: CourseInfoInput): Promise<PidKeyItem> {
    const url = this.mergeUrl("CreateCourseInfo");
    return this.tryCatchCall(() => this.ajax.post(url, input));
  }
  /**修改课程 */
  public UpdateCourseInfo(
    id: string,
    timestamp: string,
    input: CourseInfoUpdInput
  ): Promise<MsgOutput> {
    const url = this.mergeUrlParame("UpdateCourseInfo", id, timestamp);
    return this.tryCatchCall(() => this.ajax.put(url, input));
  }
  /**删除课程 */
  public DeleteCourseInfo(id: string, timestamp: string): Promise<MsgOutput> {
    const url = this.mergeUrlParame("DeleteCourseInfo", id, timestamp);
    return this.tryCatchCall(() => this.ajax.delete(url));
  }
}
/**app资源管理api */
export const apiEduAppResource = new AppResourceApi();
