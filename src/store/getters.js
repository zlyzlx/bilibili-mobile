const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  login: state => state.user.login,
  userInfo: state => state.user.userInfo,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  aboutRouters: state => state.permission.aboutRouters,
  menu: state => state.permission.menu,
};
export default getters
