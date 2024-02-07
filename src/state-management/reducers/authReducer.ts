interface LogoutAction {
  type: "LOGOUT";
}

interface LoginAction {
  type: "LOGIN";
  username: string;
}

type AuthAction = LoginAction | LogoutAction;

const authReducer = (user: string, action: AuthAction): string => {
  if (action.type === "LOGOUT") return "";
  if (action.type === "LOGIN") return action.username;
  return user;
};

export default authReducer;
