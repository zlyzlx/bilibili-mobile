/*扩展的全局函数插件*/
exports.install = function (Vue, options) {
  //贝赛尔曲线对象
  Vue.prototype.UnitBezier=function(p1x,p1y,p2x,p2y) {
    this.cx = 3.0 * p1x;
    this.bx = 3.0 * (p2x - p1x) - this.cx;
    this.ax = 1.0 - this.cx -this.bx;
    this.cy = 3.0 * p1y;
    this.by = 3.0 * (p2y - p1y) - this.cy;
    this.ay = 1.0 - this.cy - this.by;
  }
  Vue.prototype.UnitBezier.prototype = {
    sampleCurveX : function(t) { //贝赛尔曲线t时刻的坐标点的X坐标
      return ((this.ax * t + this.bx) * t + this.cx) * t;
    },
    sampleCurveY : function(t) {  //贝赛尔曲线t时刻的坐标点的y坐标
      return ((this.ay * t + this.by) * t + this.cy) * t;
    },
    solve:function(t){
      return this.sampleCurveY(this.sampleCurveX(t))
     }
  }

  //判断是否app
  Vue.prototype.isApp=function(){
    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      return true;
    } else {
      return true;
    }
  }

  //判断手机系统
  Vue.prototype.phoneSystem =()=>{
    var system = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(system)) {
      return 'iphone'
    } else if (/android/ .test(system)) {
      return 'android'
    }
  }
};
