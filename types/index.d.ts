import { NotificationsType } from "./notifications";
import Vue from "vue";
import { IconButtonProps } from "./iconButton";
import { FileUploaderProps } from "./fileUploader";
export interface InstallationOptions {
  locale: any;
  i18n: any;
  size: string;
}
export function install(vue: typeof Vue, options: InstallationOptions): void;

/** Dialog Component */
export class VccNotifications extends NotificationsType {}
export class VccIconButton extends IconButtonProps {}
export class VccFileUploader extends FileUploaderProps {}
