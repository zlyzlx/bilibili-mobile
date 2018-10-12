import { login, logout, getInfo ,register,message,getPhone,realName,realNameSuccess,redBag,bankCard,newRegister,newRegisterRed} from '@/api/login';
import { getToken, setToken, removeToken } from '@/fetch/auth';

const user = {
  state: {
    token: getToken(),
    login: '',
    //userInfo:[],
    userInfo:{
    },
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_LOGIN: (state,login) => {
      state.login = login;
    },
    SET_USER_INFO: (state,userInfo) => {
      state.userInfo = userInfo;
    }

  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {

      return new Promise((resolve, reject) => {
        login(userInfo.phoneNumber,userInfo.passWord,userInfo.catpcha,userInfo.loginFlag).then(response => {
          const data = response;
          if(response.code !=-1){
            setToken(data.data);
          }

          resolve(response);
        }).catch(error => {
          reject(error);

        });
      });
    },

    //短信验证
    message({ commit },query){
      return new Promise((resolve, reject) => {
        message(query.messageSituation,query.phoneNumber).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);

        });
      });
    },

    //注册
    register({ commit },userInfo){
      return new Promise((resolve, reject) => {
        register(userInfo.phoneNumber, userInfo.passWord,userInfo.captch).then(response => {
          const data = response;
          if(response.code !=-1){
            setToken(data.msg);
          }
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    newRegister({ commit },userInfo){
      return new Promise((resolve, reject) => {
        newRegister(userInfo.phoneNumber,userInfo.captch).then(response => {
          const data = response;
          if(response.code !=-1){
            setToken(data.msg);
          }
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    //判断手机号是否注册
    getPhone({ commit },phoneNumber){
      return new Promise((resolve, reject) => {
        getPhone(phoneNumber).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_USER_INFO', data);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_USER_INFO', []);
          commit('SET_TOKEN', '');
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER_INFO', []);
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },

    //实名注册-短信
    realName({ commit },query){
      return new Promise((resolve, reject) => {
        realName(query.accNo,query.idCard,query.idHolder).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);

        });
      });
    },
    //实名注册-绑卡
    realNameSuccess({ commit },param){
      return new Promise((resolve, reject) => {
        realNameSuccess(param).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);

        });
      });
    },
    //实名绑卡—获取红包
    redBag({ commit },type){
      return new Promise((resolve, reject) => {
        redBag(type).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);

        });
      });
    },
    //实名绑卡—获取红包
    bankCard({ commit },query){
      return new Promise((resolve, reject) => {
        bankCard(query.cardNo).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);

        });
      });
    },



    //新注册红包
    newRegisterRed({ commit },type){
      return new Promise((resolve, reject) => {
        newRegisterRed(type).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);

        });
      });
    },
  }
};

export default user;
