import fetch from '@/fetch/fetch';


/*账号密码*/
export function login(phoneNumber,passWord,catpcha,loginFlag) {
  return fetch({
    url: '/goldexchange-user/i/signin',
    method: 'post',
    data:{ phoneNumber,passWord,catpcha,loginFlag}
  });
}

/*注册*/
export function register(phoneNumber,passWord,captch){

  return fetch({
    url: '/goldexchange-user/i/signup',
    method: 'post',
    data:{
      phoneNumber,
      passWord,
      captch
    }
  });
}

export function newRegister(phoneNumber,captch){

  return fetch({
    url: '/goldexchange-user/i/signup',
    method: 'post',
    data:{
      phoneNumber,
      captch
    }
  });
}

/*短信验证*/
export function message(messageSituation,phoneNumber){
  return fetch({
    url: '/goldexchange-user/i/captcha',
    method: 'get',
    params:{
      messageSituation,
      phoneNumber
    }
  });
}

/*判断手机号是否注册*/
export function getPhone(phoneNumber){
  return fetch({
    url: '/goldexchange-user/i/isexited/'+phoneNumber+'',
    method: 'get'

  });
}

/*实名注册-短信*/
export function realName(accNo,idCard,idHolder){
  return fetch({
    url: '/paymentCenter-payment/v1/payment/authbind/pre',
    method: 'post',
    data:{
      accNo,
      idCard,
      idHolder
    }

  });
}

/*实名注册-绑卡*/
export function realNameSuccess(param){
  return fetch({
    url: '/paymentCenter-payment/v1/payment/authbind/confirm',
    method: 'post',
    data:{
      param
    }
  });
}

/*获取红包*/
export function redBag(type){
  return fetch({
    url: '/goldexchange-marketing-center/user/giftBag/info/type/'+type,
    method: 'get',
  });
}

/*获取银行卡信息*/
export function bankCard(cardNo){
  return fetch({
    url: '/paymentCenter-payment/v1/payment/bankcard/info',
    method: 'get',
    params:{cardNo:cardNo}
  });
}



export function getInfo() {
  return fetch({
    url: '/goldexchange-user/u/getuser/token',
    method: 'get',
    params: {}
  });
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  });
}

//新注册红包
export function newRegisterRed(type) {
  return fetch({
    url: '/goldexchange-marketing-center/user/giftBag/price/'+type,
    method: 'get'
  });
}



