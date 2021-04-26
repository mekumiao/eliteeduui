declare type Content = string | HTMLElement | Array<string | HTMLElement>;
declare type DilogType = "dialog" | "page" | "iframe" | "loading" | "tips";
declare type IconOption = 0 | 1 | 2 | 3 | 4 | 5 | 6;
declare type YesCallBack = (index: number) => void;
declare type CancelCallBack = (index: number, layero: HTMLElement) => void;
declare type EndCallBack = () => void;

export declare interface Options {
  type?: number;
  title?: string;
  content?: Content;
  skin?: string;
  area?: string | Array<string>;
  offset?: string | Array<string>;
  icon?: IconOption;
  btn?: string | Array<string>;
  time?: number;
  shade?: string | boolean | Array<number, string>;
}

export declare interface Layer {
  ready(callback: () => void): void;
  open(options: Options): number;
  alert(
    content: Content,
    options?: Options | YesCallBack,
    yes?: YesCallBack
  ): number;
  confirm(
    content: Content,
    options: Options | YesCallBack,
    yes?: YesCallBack,
    cancel?: CancelCallBack
  ): number;
  msg(
    content: Content,
    options?: Options | EndCallBack,
    end?: EndCallBack
  ): void;
  load(icon?: 0 | 1 | 2, options?: Options): number;
  close(index: number): void;
  closeAll(type?: DilogType): void;
}
