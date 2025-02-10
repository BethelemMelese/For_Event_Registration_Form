export const userService = {
  get currentRole(): any {
    const role = localStorage.getItem("role");
    return role ? role : null;
  },

  get token(): any {
    const token = localStorage.getItem("token");
    return token ? token : null;
  },
};
