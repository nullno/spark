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

  this.isback = false;

  this.changeState = 1;

  this.run = false;
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
  var linkstate = Object.assign({}, this.Outed);
  if (!this.isback) {
    if (this.changeState) {
      this.hashStack.push(linkstate);
    } else {
      this.hashStack.splice(this.hashStack.length - 1, 1, linkstate);
    }
    this.hashStackIndex = this.hashStack.length - 1;
  }
  this.isback = false;
  delete linkstate._origin;
  window.history.replaceState(linkstate, "", "");
};

//路由跳转
Router.prototype.Render = function (link) {
  var _this = this;
  this.setOuted(link);
  CreateDomTree(link.address, D.body, true, "", function () {
    _this.run = false;
  });
};

//进栈
Router.prototype.read = function (pagename) {
  if (!this.hash()) {
    this.GoPage("/");
    return;
  }
  const W = GetAddressData(pagename);

  if (D.getElementsByClassName(W.name).length >= 1) {
    W.remove();
  }

  W.link.address = pagename;
  this.change(W.link);
};

//  Cache.PageCache 读取到当前路径页面
Router.prototype.readPage = function () {
  var _this = this;
  SparkUtil.traverse(Cache.PageCache, function (item) {
    _this.read(item);
  });
};

Router.prototype.change = function (link) {
  var _this = this;
  const path_hash = this.hash().replace(/\?.*$/, "");
  const link_path = link.path.replace(/\?.*$/, "");
  const query = this.query();
  link.query = query;
  //普通匹配
  if (link_path === path_hash) {
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
  this.call(myrouter, p, 1);
};

Router.prototype.operate.replace = function (p) {
  this.call(myrouter, p, 0);
};

Router.prototype.operate.go = function (p) {
  if (myrouter.run) return;

  myrouter.isback = true;

  myrouter.run = true;

  var hashStack = myrouter.hashStack;

  myrouter.hashStackIndex += p;

  myrouter.Outed.end = myrouter.Outed.start = false;

  if (myrouter.hashStackIndex >= hashStack.length - 1) {
    myrouter.hashStackIndex = hashStack.length - 1;
    myrouter.Outed.end = true;
  }
  if (myrouter.hashStackIndex <= 0) {
    myrouter.hashStackIndex = 0;
    myrouter.Outed.start = true;
  }

  myrouter.GoPage(hashStack[myrouter.hashStackIndex].path);
};

const myrouter = new Router();

window.addEventListener(
  "hashchange",
  function (event) {
    myrouter.Outed._origin = event;
    myrouter.readPage(event);
  },
  false
);

window.addEventListener(
  "popstate",
  function (event) {
    if (event.state) {
      myrouter.isback = true;
      // location.reload();
    }
  },
  false
);

export default myrouter;
