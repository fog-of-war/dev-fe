import { userId } from "./NoticeNotifications";

export function getUserId(currentUserString: any) {
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    userId = currentUser["user_id"];
  } else {
    userId = "";
  }
}
