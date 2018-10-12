import VeeValidate, { Validator } from 'vee-validate';
import messages from 'assets/js/zh_CN';
Validator.updateDictionary({
  zh_CN: {
    messages
  }
});
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true,
  errors: [
    {
      "field": "email",
      "msg": " email 必须是有效的邮箱.",
      "rule": "email",
      "scope": "__global__"
    }
  ]


};
Vue.use(VeeValidate,config);


