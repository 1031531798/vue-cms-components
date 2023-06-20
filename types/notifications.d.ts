export declare class NotificationsType {
  tabList: NotificationTab[]
  list: Object[]
  messageProps: {
    date: string
    message: string
    userName: string
    avatar: string
  }
}

// header tab type
type NotificationTab = {
  title: string,
  name: string,
}