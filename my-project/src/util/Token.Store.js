export const SetAccessToken = (token) => {
  localStorage.setItem("serverToken", token);
};

export const GetAccessToken = () => {
  return localStorage.getItem("serverToken");
};

export const RemoveAccessToken = () => {
  localStorage.removeItem("serverToken");
};

export const SetRefreshToken = (token) => {
  localStorage.setItem("server_RefreshToken", token);
};

export const GetRefreshToken = () => {
  return localStorage.getItem("server_RefreshToken");
};
