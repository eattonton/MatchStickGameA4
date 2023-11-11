// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"res/1.png":[function(require,module,exports) {
module.exports = "/1.ca67be02.png";
},{}],"res/qr.png":[function(require,module,exports) {
module.exports = "/qr.e27f5bba.png";
},{}],"js/twloader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TW_APP_VERSION = void 0;
exports.TW_AddLoadEvent = TW_AddLoadEvent;
exports.TW_LoadScriptFromVersion = TW_LoadScriptFromVersion;
exports.TW_SeriesLoadScripts = TW_SeriesLoadScripts;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var TW_APP_VERSION = exports.TW_APP_VERSION = null;
function TW_LoadScriptFromVersion(script, scripts, callback) {
  TW_SeriesLoadScripts([script], function () {
    exports.TW_APP_VERSION = TW_APP_VERSION = APP_VERSION;
    TW_SeriesLoadScripts(scripts, function () {
      if (typeof callback == "function") callback();
    });
  });
}
function TW_SeriesLoadScripts(scripts, callback) {
  if (_typeof(scripts) != "object") var scripts = [scripts];
  if (Array.isArray(scripts) && scripts.length == 0) {
    if (typeof callback == "function") callback();
    return;
  }
  var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
  var s = new Array(),
    last = scripts.length - 1,
    recursiveLoad = function recursiveLoad(i) {
      s[i] = document.createElement("script");
      s[i].setAttribute("type", "text/javascript");
      s[i].onload = s[i].onreadystatechange = function () {
        if (! /*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
          this.onload = this.onreadystatechange = null;
          this.parentNode.removeChild(this);
          if (i != last) recursiveLoad(i + 1);else if (typeof callback == "function") callback();
        }
      };
      if (scripts[i].indexOf('?') > -1) {
        s[i].setAttribute("src", scripts[i] + '&timestamp=' + (TW_APP_VERSION || Math.random()));
      } else {
        s[i].setAttribute("src", scripts[i] + '?timestamp=' + (TW_APP_VERSION || Math.random()));
      }
      HEAD.appendChild(s[i]);
    };
  recursiveLoad(0);
}
function TW_AddLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    };
  }
}
},{}],"js/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetRandQueue = GetRandQueue;
exports.GetRandQueueInRange = GetRandQueueInRange;
exports.RandomInt = RandomInt;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
//生成随机值
function RandomInt(min, max) {
  var span = max - min + 1;
  var result = Math.floor(Math.random() * span + min);
  return result;
}

//在范围内，生成一定数量不重复的随机数
function GetRandQueueInRange(n, min, max) {
  var arr = [];
  // 在此处补全代码
  for (var i = 0; i < n; i++) {
    var num1 = RandomInt(min, max);
    if (arr.indexOf(num1) == -1) {
      //去除重复项
      arr.push(num1);
    } else {
      i--;
    }
  }
  return arr;
}

//生成随机队列
function GetRandQueue(array, size) {
  if (!array) {
    array = new Array();
    for (var i = 0; i < size; i++) {
      array[i] = i;
    }
  }
  var res = [],
    random1;
  var array2 = _toConsumableArray(array);
  while (array2.length > 0 && res.length <= size) {
    random1 = Math.floor(Math.random() * array2.length);
    res.push(array2[random1]);
    array2.splice(random1, 1);
  }
  return res;
}
},{}],"js/ttui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIBase = exports.Toast = exports.TextBox = exports.ImagePanel = exports.Dialog = exports.Button = void 0;
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var UIBase = exports.UIBase = /*#__PURE__*/function () {
  function UIBase(params) {
    _classCallCheck(this, UIBase);
    this.divBg = null;
    this.htmlObj = null;
    this.params = params || {
      text: '...'
    };
  }
  _createClass(UIBase, [{
    key: "Show",
    value: function Show() {
      //1.创建div节点
      this.divBg = $T.Create();
      //遮罩
      $T.Attribute(this.divBg, "id", "divBg");
      $T.ClassN(this.divBg, 'graybg');
      $T.Add(this.divBg);
    }
  }, {
    key: "Close",
    value: function Close() {
      $T.Del(this.divBg);
    }
  }]);
  return UIBase;
}(); //create
UIBase.prototype.Create = function (tagname) {
  return document.createElement(tagname || "div");
};

//append
UIBase.prototype.Add = function (el, parent) {
  parent = parent || document.body;
  if (el instanceof UIBase) {
    parent.append(el.htmlObj);
  } else {
    parent.append(el);
  }
};

//Attribute
UIBase.prototype.Attribute = function (e, k, v) {
  e.setAttribute(k, v);
};

//className
UIBase.prototype.ClassN = function (el, classname) {
  if (el instanceof UIBase) {
    el.htmlObj.className += classname + " ";
  } else {
    el.className += classname + " ";
  }
};

//delete
UIBase.prototype.Del = function (el) {
  if (el) {
    var parent1 = el.parentNode; //获取父对象
    parent1.removeChild(el); //通过父对象把它删除
  }
};

UIBase.prototype.Html = function (e, txt) {
  e.innerHTML = txt;
};
UIBase.prototype.Click = function (e, that, cb) {
  e.addEventListener("click", function (ev) {
    ev.preventDefault();
    if (typeof cb == "function") {
      cb.bind(that)();
    } else if (typeof cb == "string") {
      that[cb]();
    }
  }, false);
};
var $T = new UIBase();

//TextBox
var TextBox = exports.TextBox = /*#__PURE__*/function (_UIBase) {
  _inherits(TextBox, _UIBase);
  var _super = _createSuper(TextBox);
  function TextBox(params) {
    var _this;
    _classCallCheck(this, TextBox);
    _this = _super.call(this, params);
    _this.Create();
    return _this;
  }

  //创建按钮
  _createClass(TextBox, [{
    key: "Create",
    value: function Create() {
      //button
      this.htmlObj = $T.Create();
      $T.ClassN(this.htmlObj, "textbox");
      $T.Html(this.htmlObj, this.params["text"] || "...");
    }
  }]);
  return TextBox;
}(UIBase); //按钮
var Button = exports.Button = /*#__PURE__*/function (_UIBase2) {
  _inherits(Button, _UIBase2);
  var _super2 = _createSuper(Button);
  function Button(params) {
    var _this2;
    _classCallCheck(this, Button);
    _this2 = _super2.call(this, params);
    _this2.Create();
    return _this2;
  }

  //创建按钮
  _createClass(Button, [{
    key: "Create",
    value: function Create() {
      //button
      this.htmlObj = $T.Create();
      $T.ClassN(this.htmlObj, "button");
      $T.Html(this.htmlObj, this.params["text"] || "but");
      $T.Click(this.htmlObj, this, this.params["click"] || this.btnRun);
    }
  }, {
    key: "btnRun",
    value: function btnRun() {
      console.log("ui button");
    }
  }]);
  return Button;
}(UIBase); //画布 image panel
var ImagePanel = exports.ImagePanel = /*#__PURE__*/function (_UIBase3) {
  _inherits(ImagePanel, _UIBase3);
  var _super3 = _createSuper(ImagePanel);
  function ImagePanel(params) {
    var _this3;
    _classCallCheck(this, ImagePanel);
    _this3 = _super3.call(this, params);
    _this3.canvas = null;
    _this3.ctx = null;
    _this3.width = _this3.params["width"] || 300;
    _this3.height = _this3.params["height"] || 100;
    //创建
    _this3.Create();
    return _this3;
  }
  _createClass(ImagePanel, [{
    key: "Create",
    value: function Create() {
      this.htmlObj = $T.Create("canvas");
      this.canvas = this.htmlObj;
      $T.ClassN(this.canvas, "imagepanel");
      // this.canvas.width = this.width;
      //this.canvas.height = this.height;
      this.ctx = this.canvas.getContext("2d");

      //this.DrawL();
    }

    //测试绘制直线
  }, {
    key: "DrawL",
    value: function DrawL() {
      this.ctx.save(); //保存状态
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "red";
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      this.ctx.stroke();
      this.ctx.restore(); //恢复画布状态
    }
    //绘制图片
  }, {
    key: "DrawImage",
    value: function DrawImage(img0) {
      var that = this;
      var imgObj = new Image();
      imgObj.src = img0;
      imgObj.onload = function () {
        that.ctx.drawImage(imgObj, 0, 0);
      };
    }
    //复制来自其它canvas.ctx的区域
  }, {
    key: "DrawImageData",
    value: function DrawImageData(imgData0) {
      //putImageData用于将图像数据重写至Canvas画布
      this.ctx.putImageData(imgData0, 0, 0);
    }
  }, {
    key: "GetPNG",
    value: function GetPNG() {
      return this.canvas.toDataURL("image/png");
    }
  }]);
  return ImagePanel;
}(UIBase); //对话框
var Dialog = exports.Dialog = /*#__PURE__*/function (_UIBase4) {
  _inherits(Dialog, _UIBase4);
  var _super4 = _createSuper(Dialog);
  function Dialog(params) {
    var _this4;
    _classCallCheck(this, Dialog);
    _this4 = _super4.call(this, params);
    _this4.divForm = null;
    return _this4;
  }

  //创建对话框
  _createClass(Dialog, [{
    key: "Show",
    value: function Show() {
      var _this5 = this;
      _get(_getPrototypeOf(Dialog.prototype), "Show", this).call(this);
      //2.创建对话框
      this.divForm = $T.Create();
      //对话框
      $T.Attribute(this.divForm, "id", 'dlgForm');
      $T.ClassN(this.divForm, 'ttform');
      //title
      var divTitle = $T.Create();
      $T.ClassN(divTitle, "title");
      $T.Html(divTitle, this.params['title'] || "标题");
      $T.Add(divTitle, this.divForm);
      //关闭按钮
      var btnClose = $T.Create();
      $T.ClassN(btnClose, 'close');
      $T.Html(btnClose, 'X');
      $T.Click(btnClose, this, "Close");
      $T.Add(btnClose, divTitle);
      //content
      if (this.params['content'] instanceof UIBase) {
        $T.ClassN(this.params['content'], "content");
        $T.Add(this.params['content'], this.divForm);
      } else {
        var tb1 = new TextBox({
          text: this.params['text'] || "上传中..."
        });
        $T.ClassN(tb1, "content");
        $T.Add(tb1, this.divForm);
      }
      // let panel1 = new ImagePanel();
      // $T.ClassN(panel1,"content");
      // $T.Add(panel1, this.divForm);

      //buttons
      var divButtons = $T.Create();
      $T.ClassN(divButtons, "buttons");
      $T.Add(divButtons, this.divForm);
      //ok button
      var butOk = new Button({
        text: 'Ok',
        click: function click(e) {
          //闭包的作用 传递 this
          _this5.btnOk();
        }
      });
      $T.Add(butOk, divButtons);
      //cancel button
      var butCancel = new Button({
        text: 'Cancel',
        click: function click(e) {
          _this5.btnCancel();
        }
      });
      $T.Add(butCancel, divButtons);
      //添加
      $T.Add(this.divForm);
    }
  }, {
    key: "Close",
    value: function Close() {
      _get(_getPrototypeOf(Dialog.prototype), "Close", this).call(this);
      $T.Del(this.divForm);
    }
  }, {
    key: "btnOk",
    value: function btnOk() {
      this.Close();
    }
  }, {
    key: "btnCancel",
    value: function btnCancel() {
      this.Close();
    }
  }]);
  return Dialog;
}(UIBase); //提示
var Toast = exports.Toast = /*#__PURE__*/function (_UIBase5) {
  _inherits(Toast, _UIBase5);
  var _super5 = _createSuper(Toast);
  function Toast(params) {
    var _this6;
    _classCallCheck(this, Toast);
    _this6 = _super5.call(this, params);
    _this6.divForm = null;
    return _this6;
  }

  //创建对话框
  _createClass(Toast, [{
    key: "Show",
    value: function Show() {
      _get(_getPrototypeOf(Toast.prototype), "Show", this).call(this);
      //2.创建对话框
      this.divForm = $T.Create('div');
      //对话框
      $T.Attribute(this.divForm, "id", 'dlgForm');
      $T.ClassN(this.divForm, 'ttform');
      $T.Html(this.divForm, this.params['text']);
      this.divForm.style.height = "100px";
      this.divForm.style.width = "200px";
      //添加
      $T.Add(this.divForm);
    }
  }, {
    key: "Close",
    value: function Close() {
      _get(_getPrototypeOf(Toast.prototype), "Close", this).call(this);
      $T.Del(this.divForm);
    }
  }]);
  return Toast;
}(UIBase);
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("./res/1.png"));
var _qr = _interopRequireDefault(require("./res/qr.png"));
var _twloader = require("./js/twloader");
var _math = require("./js/math");
var _ttui = require("./js/ttui");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var TT = {};
window.game = TT;
(0, _twloader.TW_AddLoadEvent)(Start);

//游戏规则
//全局参数
<<<<<<< HEAD
=======
var m_DictNumber = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '+',
  11: '-',
  12: '='
};
>>>>>>> 32a1e2e3c30820c07d8fb2e261184417253c68c7
//移1根：=0
var m_DictSelf = {
  0: [6, 9],
  2: [3],
  3: [2, 5],
  5: [3],
  6: [9, 0],
  9: [6, 0]
};
//加1根：=1
var m_DictPlus = {
  0: [8],
  1: [7],
  3: [9],
  5: [6, 9],
  6: [8],
  9: [8]
};
//减1根：=2
var m_DictMinus = {
  6: [5],
  7: [1],
  8: [9, 6, 0],
  9: [5, 3],
  10: [11]
};

//每个数字所能操作的对照表
var m_DictOptr = {
  0: [0, 1],
  1: [1],
  2: [0],
  3: [0, 1],
  4: [],
  5: [0, 1],
  6: [0, 1, 2],
  7: [2],
  8: [2],
  9: [0, 1, 2],
  10: [2],
  11: [],
  12: []
};

//////////////////////
//程序入口
////////////////////
function Start() {
  TT.canvas = document.getElementById("board");
  TT.ctx = TT.canvas.getContext("2d");
  TT.width = TT.canvas.width;
  TT.height = TT.canvas.height;

  //添加事件
  SetupBtnClick('btn1', function () {
    CreateA4(1);
  });
  SetupBtnClick('btn2', function () {
    CreateA4(2);
  });
  SetupBtnClick('btn3', function () {
    CreateA4(1, 2);
  });
  SetupBtnClick('btn4', function () {
    CreateA4(1, 1, 2);
  });
  SetupBtnClick('btn5', function () {
    CreateA4(2, 1, 2);
  });
  SetupBtnClick('btn6', function () {
    CreateA4(1, 2, 2);
  });
}
function SetupCanvas(canvas) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}
function SetupBtnClick(btnName, cb) {
  document.getElementById(btnName).addEventListener('click', cb);
  ;
}

//成行显示
function WriteTextsH(arr1, x, y, hei, scale) {
  var tbWid = 0;
  var x2 = x;
  var arr2 = [];
  for (var i = 0; i < arr1.length; ++i) {
    x2 = x2 + tbWid;
    var oTxt = WriteText(arr1[i], x2, y, hei, scale);
    //计算宽度
    tbWid = arr1[i].length * hei * 0.8;
    arr2.push(oTxt);
  }
  return arr2;
}

//绘制题目
function WriteText(str1, x, y, hei, scale) {
  scale = scale || 60;
  var fontHei = hei * scale + "px";
  TT.ctx.font = "normal " + fontHei + " Arial";
  TT.ctx.fillStyle = "#000000";
  TT.ctx.fillText(str1, x * scale, y * scale);
  return {
    txt: str1,
    x: x,
    y: y,
    h: hei,
    s: scale
  };
}
var m_hard = 1;
var m_mode = 1;
var m_move = 1; //移动次数
//生成题目
function CreateA4(hard, mode, move) {
  m_hard = hard;
  m_mode = mode || 1;
  m_move = move || 1;
  var toastDlg = new _ttui.Toast({
    text: "生成中"
  });
  toastDlg.Show();
  TT.ctx.fillStyle = "white";
  TT.ctx.fillRect(0, 0, TT.width, TT.height);
  //1.title
  WriteText("移动火柴棒", 7.5, 1.5, 1.0);
  //2.sub-title
  WriteTextsH(["班级________", "姓名________", "用时________", "得分________"], 2.5, 3.5, 0.5);

  //生成题目
  for (var i = 0; i < 4; i++) {
<<<<<<< HEAD
    DrawOneLine(i);
=======
    if (!DrawOneLine(i)) {
      --i;
    }
>>>>>>> 32a1e2e3c30820c07d8fb2e261184417253c68c7
  }

  //显示
  //二维码
  DrawImage(_qr.default, function () {
    toastDlg.Close();
    ShowImageDlg();
  });
}
function DrawOneLine(idx) {
  var arrOut = [];
  if (m_mode == 1) {
    arrOut = GenerationFormulaA();
  } else if (m_mode == 2) {
    arrOut = GenerationFormulaTwo();
  }
<<<<<<< HEAD
=======

  //移动火柴棒
  var arrNew = _toConsumableArray(arrOut);
  CreateAfterFormula(arrNew);
  //检查是否有效
  if (CheckEqual(arrNew)) return false;
>>>>>>> 32a1e2e3c30820c07d8fb2e261184417253c68c7
  var x0 = 4.5 - (arrOut.length - 5) * 0.3;
  var y0 = 6 + idx * 6;
  WriteText("题目 " + (idx + 1) + "：移动（ " + m_move + "）根火柴棒使下面的算式成立：", 2.5, y0 - 1.0, 0.5);

  //绘制正确公式
  // DrawFormula(arrOut, x0, y0);
<<<<<<< HEAD
  //移动火柴棒
  var arrNew = _toConsumableArray(arrOut);
  CreateAfterFormula(arrNew);
  var hei = 1.6;
  if (arrNew.length >= 9) hei = 1.4;
  DrawFormula(arrNew, x0, y0, 1.6);
=======
  var hei = 1.6;
  if (arrNew.length >= 9) hei = 1.4;
  DrawFormula(arrNew, x0, y0, 1.6);
  return true;
>>>>>>> 32a1e2e3c30820c07d8fb2e261184417253c68c7
}
function GenerationFormulaA() {
  var numMax = 9;
  if (m_hard == 2) {
    numMax = 99;
  }
  var numA = (0, _math.RandomInt)(0, numMax);
  var numAA = SplitNumber(numA);
  var numB = (0, _math.RandomInt)(numA, numMax);
  var numBB = SplitNumber(numB);
  var numC = numA + numB;
  var numCC = SplitNumber(numC);
  var oper = (0, _math.RandomInt)(0, 1);
  var arrOut = [];
  if (oper == 0) {
    //加法
    arrOut = [].concat(_toConsumableArray(numAA), [10], _toConsumableArray(numBB), [12], _toConsumableArray(numCC));
  } else {
    //减法
    arrOut = [].concat(_toConsumableArray(numCC), [11], _toConsumableArray(numBB), [12], _toConsumableArray(numAA));
  }
  return arrOut;
}
function GenerationFormulaTwo() {
  var numMax = 9;
  if (m_hard == 2) {
    numMax = 99;
  }
  var numA = (0, _math.RandomInt)(1, numMax - 1);
  var numAA = SplitNumber(numA);
  var numB = (0, _math.RandomInt)(numA, numMax);
  var numBB = SplitNumber(numB);
  var numC = numA + numB;
  var numCC = SplitNumber(numC);
  var oper = (0, _math.RandomInt)(0, 3);
  var arrOut = [];
  if (oper == 0) {
    var numD = (0, _math.RandomInt)(0, numC);
    var numDD = SplitNumber(numD);
    var numE = numC - numD;
    var numEE = SplitNumber(numE);
    //加法 = 加法
    arrOut = [].concat(_toConsumableArray(numAA), [10], _toConsumableArray(numBB), [12], _toConsumableArray(numDD), [10], _toConsumableArray(numEE));
  } else if (oper == 1) {
    var _numD = (0, _math.RandomInt)(0, numA);
    var _numDD = SplitNumber(_numD);
    var _numE = numA - _numD;
    var _numEE = SplitNumber(_numE);
    //减法 = 加法
    arrOut = [].concat(_toConsumableArray(numCC), [11], _toConsumableArray(numBB), [12], _toConsumableArray(_numDD), [10], _toConsumableArray(_numEE));
  } else if (oper == 2) {
    var _numD2 = (0, _math.RandomInt)(numC, numC + 10);
    var _numDD2 = SplitNumber(_numD2);
    var _numE2 = _numD2 - numC;
    var _numEE2 = SplitNumber(_numE2);
    //加法 = 减法
    arrOut = [].concat(_toConsumableArray(numAA), [10], _toConsumableArray(numBB), [12], _toConsumableArray(_numDD2), [11], _toConsumableArray(_numEE2));
  } else if (oper == 3) {
    var _numD3 = (0, _math.RandomInt)(numA, numA + 10);
    var _numDD3 = SplitNumber(_numD3);
    var _numE3 = _numD3 - numA;
    var _numEE3 = SplitNumber(_numE3);
    //减法 = 减法
    arrOut = [].concat(_toConsumableArray(numCC), [11], _toConsumableArray(numBB), [12], _toConsumableArray(_numDD3), [11], _toConsumableArray(_numEE3));
  }
  return arrOut;
}
function SplitNumber(numA) {
  var numAA = [];
  var numAAS = Array.from(numA.toString());
  numAAS.forEach(function (item) {
    numAA.push(parseInt(item));
  });
  return numAA;
}
function CreateAfterFormula(theArr) {
<<<<<<< HEAD
  for (var i = 0; i < 10000; i++) {
=======
  for (var i = 0; i < 1000; i++) {
>>>>>>> 32a1e2e3c30820c07d8fb2e261184417253c68c7
    var arrIdx = (0, _math.GetRandQueueInRange)(m_move * 2, 0, theArr.length - 1);
    var flag = true;
    for (var j = 0; j < m_move; j++) {
      flag = MoveOneMatchStick(theArr, [arrIdx[m_move * j], arrIdx[m_move * j + 1]]);
      if (flag == false) {
        break;
      }
    }
    if (flag) {
      break;
    }
  }
}
function MoveOneMatchStick(theArr, arrIdx) {
  //移动一根
  var numA = theArr[arrIdx[0]];
  var iModes = m_DictOptr[numA]; //0 本身移动  1:增加   2:减少
  if (iModes.length == 0) return false;
  //获得 单个元素 所能支持的 变化
  var idx2 = (0, _math.RandomInt)(0, iModes.length - 1);
  var iMode = iModes[idx2];
  if (iMode == 0) {
    //支持自身移动
    theArr[arrIdx[0]] = (0, _math.GetRandQueue)(m_DictSelf[numA], 1)[0];
    return true;
  } else if (iMode == 1) {
    //支持增加
    //第二个需要支持减少
    var numB = theArr[arrIdx[1]];
    var iModes2 = m_DictOptr[numB];
    if (iModes2.includes(2) == false) {
      //不含增加 就是无效
      return false;
    }
    theArr[arrIdx[0]] = (0, _math.GetRandQueue)(m_DictPlus[numA], 1)[0];
    theArr[arrIdx[1]] = (0, _math.GetRandQueue)(m_DictMinus[numB], 1)[0];
    return true;
  } else if (iMode == 2) {
    //支持减少
    //第二个需要支持增加
    var _numB = theArr[arrIdx[1]];
    var _iModes = m_DictOptr[_numB];
    if (_iModes.includes(1) == false) {
      //不含增加 就是无效
      return false;
    }
    theArr[arrIdx[0]] = (0, _math.GetRandQueue)(m_DictMinus[numA], 1)[0];
    theArr[arrIdx[1]] = (0, _math.GetRandQueue)(m_DictPlus[_numB], 1)[0];
    return true;
  }
  return false;
}

//绘制火柴棒算式
function DrawFormula(iNums, DrawX, DrawY, Width, scale) {
  scale = scale || 60;
  DrawX = DrawX * scale;
  DrawY = DrawY * scale;
  var DrawWidth = Width * scale;
  var DrawHeight = 100 / 60 * DrawWidth;
  iNums.forEach(function (iNum) {
    if (iNum < 0) iNum = -iNum;
    var _GetPngPosition = GetPngPosition(iNum),
      _GetPngPosition2 = _slicedToArray(_GetPngPosition, 2),
      iPosX1 = _GetPngPosition2[0],
      iWidth1 = _GetPngPosition2[1];
    DrawFormulaImage(_.default, [iPosX1, 0, iWidth1, 100, DrawX, DrawY, DrawWidth, DrawHeight], null);
    DrawX += DrawWidth;
  });
}
function GetPngPosition(iNum) {
  var iStep = 14.7;
  var iWidth = 61;
  var iPosX = iWidth * iNum + iStep * iNum;
  return [iPosX, iWidth];
}

//绘制图片
function DrawFormulaImage(img0, params, cb) {
  var imgObj = new Image();
  imgObj.src = img0;
  imgObj.onload = function () {
    var _TT$ctx;
    (_TT$ctx = TT.ctx).drawImage.apply(_TT$ctx, [imgObj].concat(_toConsumableArray(params)));
    if (typeof cb == "function") {
      cb();
    }
  };
}

//绘制图片
function DrawImage(img0, cb) {
  var imgObj = new Image();
  imgObj.src = img0;
  imgObj.onload = function () {
    TT.ctx.drawImage(imgObj, 10, 10, 150, 150);
    if (typeof cb == "function") {
      cb();
    }
  };
}

//显示生成的题目图片，长按保存
function ShowImageDlg() {
  var strImg = "<img ";
  strImg += "src=" + TT.canvas.toDataURL('png', 1.0);
  strImg += " style='width:350px;height:500px;'></img>";
  var dlg1 = new _ttui.Dialog({
    title: "长按图片，保存下载",
    text: strImg
  });
  dlg1.Show();
}
<<<<<<< HEAD
=======

//判断等式是否成立
function CheckEqual(arr1) {
  var strLeft = "";
  var strRight = "";
  var flagR = false;
  for (var i = 0; i < arr1.length; i++) {
    var c1 = m_DictNumber[arr1[i]];
    if (c1 == "=") {
      flagR = true;
      continue;
    }
    if (!flagR) {
      strLeft += c1;
    } else {
      strRight += c1;
    }
  }
  if (eval(strLeft) == eval(strRight)) {
    return true;
  }
  return false;
}
>>>>>>> 32a1e2e3c30820c07d8fb2e261184417253c68c7
},{"./res/1.png":"res/1.png","./res/qr.png":"res/qr.png","./js/twloader":"js/twloader.js","./js/math":"js/math.js","./js/ttui":"js/ttui.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
<<<<<<< HEAD
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "11154" + '/');
=======
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "8805" + '/');
>>>>>>> 32a1e2e3c30820c07d8fb2e261184417253c68c7
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map