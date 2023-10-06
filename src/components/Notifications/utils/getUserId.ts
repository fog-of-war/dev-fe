export function getUserId(currentUserString: any) {
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    return currentUser["user_id"];
  } else {
    return "";
  }
}
