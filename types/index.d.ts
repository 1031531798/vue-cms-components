import { NotificationsType } from "./notifications";
import Vue from "vue";
export interface InstallationOptions {
  locale: any;
  i18n: any;
  size: string;
}
export function install(vue: typeof Vue, options: InstallationOptions): void;

/** Dialog Component */
export class VccNotifications extends NotificationsType {}