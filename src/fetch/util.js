//扩展Number方法以及Date方法，使其支持格式化金额以及格式化日期
Number.prototype.formatMoney = function (places, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

Date.prototype.Format = function (fmt) {
  let l = ["日","一","二","三","四","五","六"];

  var o = {
  "M+": this.getMonth() + 1, //月份
  "d+": this.getDate(), //日
  "h+": this.getHours(), //小时
  "m+": this.getMinutes(), //分
  "s+": this.getSeconds(), //秒
  "q+": Math.floor((this.getMonth() + 3) / 3), //季度
  "S+": this.getMilliseconds(), //毫秒
  "w":l[this.getDay()]
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
//判断是否app
export function isApp() {
  if(navigator.platform.indexOf('core')==-1 && navigator.platform.indexOf('mobileweb')==-1) {
    return false;
  } else {
    return true;
  }
}
