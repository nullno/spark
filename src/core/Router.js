import { _typeof, D } from "./Common.js";

import SparkUtil from "./SparkUtil.js";

import GetAddressData from "./GetAddressData.js";

import CreateDomTree from "./CreateDomTree.js";

import Cache from "./Cache.js";

//构造路由
function Router() {
  this.Outed = {
    _origin: {},
    start: true,
    end: true,
  };
  this.hashStack = [];

  this.hashStackIndex = 0;

  this.isBack = false;

  this.changeState = 1;

  this.run = false;

  this.noPage = null;

  this.hitHash = false;

  this.timer = null;
}

//初始化
Router.prototype.test = function () {
  console.log("init router");
};

//hash模式
Router.prototype.hash = function () {
  return location.hash.slice(1);
};
//query参数
Router.prototype.query = function () {
  return SparkUtil.urlQuery();
};
Router.prototype.GoPage = function (p) {
  if (p && p != this.hash()) {
    location.hash = p;
  } else {
    this.run = false;
  }
};
//设置
Router.prototype.setting = function (params) {
  Object.assign(this, params);
};

Router.prototype.setOuted = function (link) {
  this.Outed = Object.assign(this.Outed, link);
  this.Outed.path = this.hash();
  var linkState = Object.assign({}, this.Outed);
  if (!this.isBack) {
    if (this.changeState) {
      this.hashStack.push(linkState);
    } else {
      link.scrollTop = 0;
      this.hashStack.splice(this.hashStack.length - 1, 1, linkState);
    }
    this.hashStackIndex = this.hashStack.length - 1;
  }
  this.isBack = false;
  delete linkState._origin;
  window.history.replaceState(linkState, "", "");
};

//路由跳转
Router.prototype.Render = function (link) {
  var _this = this;
  this.setOuted(link);
  if (link.meta && link.meta.title) {
    document.title = link.meta.title;
  }

  CreateDomTree(link.address, D.body, true, "", function () {
    _this.run = false;
    document.body.scrollTop = document.documentElement.scrollTop =
      link.recordLastPosition ? link.scrollTop || 0 : 0;
  });
};

//进栈
Router.prototype.read = function (pageName) {
  var _this = this;
  this.timer && clearTimeout(this.timer);
  if (!this.hash()) {
    this.hitHash = true;
    this.GoPage("/");
    return;
  }
  var W = GetAddressData(pageName);

  if (D.getElementsByClassName(W.name).length >= 1) {
    W.link.scrollTop = SparkUtil.screen.scrollTop();
    W.remove();
  }
  W.link.address = pageName;
  if (W.link.path === "*") {
    this.noPage = W.link;
  }
  !this.hitHash && this.change(W.link);
  // Event queuing last
  this.timer = setTimeout(function () {
    if (!_this.hitHash && _this.noPage) {
      _this.Render(_this.noPage);
    }
  });
};

//  Cache.PageCache 读取到当前路径页面
Router.prototype.readPage = function () {
  var _this = this;
  this.hitHash = false;
  SparkUtil.traverse(Cache.PageCache, function (item) {
    _this.read(item);
  });
};

Router.prototype.change = function (link) {
  const path_hash = this.hash().replace(/\?.*$/, "");
  const link_path = link.path.replace(/\?.*$/, "");
  const query = this.query();
  link.query = query;

  //普通匹配
  if (link_path === path_hash) {
    this.hitHash = true;
    this.Render(link);
    return;
  }

  //带参数匹配
  if (SparkUtil.includes(link.path, ":") && path_hash != "/") {
    // let prevpath = link_path.match(/(\S*):/)[1];

    const HArr = path_hash.split("/");
    const PArr = link_path.split("/");
    const index = link_path.indexOf(":");

    if (
      link_path.slice(0, index) === path_hash.slice(0, index) &&
      HArr.length == PArr.length
    ) {
      SparkUtil.traverse(PArr, function (item, index, end) {
        if (SparkUtil.includes(item, ":") && HArr[index] != "") {
          const name = item.slice(1);
          link.params[name] = HArr[index];
        }
      });
      this.hitHash = true;
      this.Render(link);
      return;
    }
  }
};

//路由操作
Router.prototype.operate = function (p, t) {
  if (!p || this.run) return;
  this.run = true;
  this.changeState = t;
  this.Outed.end = true;
  this.Outed.start = false;
  var newPath = "";
  if (_typeof(p, "String")) {
    newPath = p;
  }
  if (_typeof(p, "Object")) {
    if (p.path) {
      newPath = p.path;
    } else {
      p.name &&
        SparkUtil.traverse(Cache.PageCache, function (item, index, end) {
          const W = GetAddressData(item);
          if (W.link.name === p.name) {
            if (
              SparkUtil.includes(W.link.path, ":") &&
              _typeof(p.params, "Object")
            ) {
              var path = W.link.path;
              SparkUtil.traverse(p.params, function (k) {
                path = path.replace(":" + k, p.params[k]);
              });
              if (!SparkUtil.includes(path, ":")) {
                newPath = path;
              } else {
              }
            } else {
              newPath = W.link.path;
            }
            return;
          }
        });
    }
    if (p.query) {
      newPath += SparkUtil.objectToQueryString(p.query);
    }
  }

  this.GoPage(newPath);
};

Router.prototype.operate.push = function (p) {
  this.call(myRouter, p, 1);
};

Router.prototype.operate.replace = function (p) {
  this.call(myRouter, p, 0);
};
Router.prototype.operate.back = function () {
  window.history.back();
};
Router.prototype.operate.forward = function () {
  window.history.forward();
};
Router.prototype.operate.go = function (p) {
  window.history.go(p);
  // if (myRouter.run) return;

  // myRouter.isBack = true;

  // myRouter.run = true;

  // var hashStack = myRouter.hashStack;

  // myRouter.hashStackIndex += p;

  // myRouter.Outed.end = myRouter.Outed.start = false;

  // if (myRouter.hashStackIndex >= hashStack.length - 1) {
  //   myRouter.hashStackIndex = hashStack.length - 1;
  //   myRouter.Outed.end = true;
  // }
  // if (myRouter.hashStackIndex <= 0) {
  //   myRouter.hashStackIndex = 0;
  //   myRouter.Outed.start = true;
  // }

  // myRouter.GoPage(hashStack[myRouter.hashStackIndex].path);
};

const myRouter = new Router();

window.addEventListener(
  "hashchange",
  function (event) {
    myRouter.Outed._origin = event;
    myRouter.readPage(event);
  },
  false
);

window.addEventListener(
  "popstate",
  function (event) {
    if (event.state) {
      myRouter.isBack = true;
      // location.reload();
    }
  },
  false
);

export default myRouter;
