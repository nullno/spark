<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  <img src="https://img.shields.io/badge/size-~30KB-orange.svg" alt="size">
</p>

# Spark.js

**轻量级声明式 JavaScript UI 库** — 用纯 JavaScript 构建完整 Web 页面，无需 HTML 模板、无需打包工具、无需 CSS 类名。

<font color=red>Spark.js</font> 是一个轻量级的 JavaScript 库，采用 dart 编写风格，它是一个三无产品：无需打包、无需思考 className、无需编写 html，你只需要专注于编写 js 脚本创建页面，内置数据绑定，事件监听，路由管理，网络请求等功能，未来会丰富更多组件功能；

---

## 特性

- **三无理念**：无需写 HTML、无需打包、无需管理 CSS 类名
- **声明式组件**：Dart/Flutter 风格的组件声明方式
- **响应式数据绑定**：修改属性自动更新 DOM
- **内置路由系统**：Hash 模式 SPA 路由，支持参数路由、查询参数
- **丰富的内置组件**：40+ 组件，含基础组件（Text、Box、Button、Input 等）和扩展组件（Card、Tabs、Modal、Drawer、Message 等）
- **事件系统**：click、press、move、hover 等，自动适配移动端
- **CSS 自动前缀**：内置 autoprefixer
- **可扩展架构**：插件系统支持自定义组件
- **生命周期钩子**：init → created → activated → deactivated
- **零依赖运行**（仅可选依赖 axios）

---

## 快速开始

### CDN 引入

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello Spark</title>
</head>
<body>
  <script src="https://unpkg.com/spark-widget/release/spark.min.js"></script>
  <script>
    // 应用配置
    Spark.setting({ name: 'myapp', title: 'My First Spark App' });

    // 创建文本组件
    var hello = Spark.Text('Hello Spark!', {
      style: 'font-size:48px;font-weight:bold;color:#4B95FF;text-align:center;margin-top:200px;'
    });

    // 创建页面（路由绑定）
    Spark.Page({
      link: { name: 'home', path: '/' },
      style: 'width:100%;min-height:100vh;',
      child: [hello]
    });
  </script>
</body>
</html>
```

### NPM 安装

```bash
npm install spark-widget
```

```javascript
import Spark from 'spark-widget';

Spark.setting({ name: 'myapp', title: 'My App' });

var page = Spark.Page({
  link: { name: 'home', path: '/' },
  child: [
    Spark.Text('Hello World!', { style: 'font-size:32px;' })
  ]
});
```

---

## 核心概念

### 组件（Widget）

Spark 中一切皆组件。每个组件由工厂函数创建，返回一个响应式对象。

```javascript
// 文本组件
var title = Spark.Text('标题文字', {
  style: 'font-size:24px;color:#333;'
});

// 容器组件
var container = Spark.Box({
  style: 'padding:20px;background:#f5f5f5;border-radius:8px;',
  child: [title]
});
```

### 可用组件

#### 基础组件

| 组件 | 说明 | 示例 |
|------|------|------|
| `Spark.Page(p)` | 页面组件，绑定路由 | `Spark.Page({ link: { path: '/' }, child: [...] })` |
| `Spark.Text(str, p)` | 文本组件 | `Spark.Text('Hello', { style: '...' })` |
| `Spark.Box(p)` | 通用容器 | `Spark.Box({ child: [...], style: '...' })` |
| `Spark.Image(src, p)` | 图片组件 | `Spark.Image('logo.png', { style: '...' })` |
| `Spark.List(p)` | 列表组件 | `Spark.List({ data: [...], item: fn })` |
| `Spark.Input(p)` | 输入框 | `Spark.Input({ placeholder: '请输入...', value: '' })` |
| `Spark.Button(str, p)` | 按钮组件 | `Spark.Button('点击', { onClick: fn })` |
| `Spark.Switch(p)` | 开关组件 | `Spark.Switch({ checked: false, onChange: fn })` |
| `Spark.Checkbox(str, p)` | 复选框 | `Spark.Checkbox('记住密码', { onChange: fn })` |
| `Spark.Radio(str, p)` | 单选按钮 | `Spark.Radio('选项A', { checked: true })` |
| `Spark.RadioGroup(p)` | 单选组 | `Spark.RadioGroup({ options: [...], onChange: fn })` |
| `Spark.Link(str, p)` | 链接组件 | `Spark.Link('链接', { href: '...' })` |
| `Spark.Divider(str, p)` | 分割线 | `Spark.Divider('标题')` |
| `Spark.Row(p)` | 栅格行容器 | `Spark.Row({ gutter: 16, child: [...] })` |
| `Spark.Col(p)` | 栅格列 | `Spark.Col({ span: 12, child: [...] })` |
| `Spark.Space(p)` | 间距容器 | `Spark.Space({ size: 8, child: [...] })` |
| `Spark.Drag(p)` | 可拖拽容器 | `Spark.Drag({ child: [...] })` |
| `Spark.Stack(p)` | 相对定位容器 | `Spark.Stack({ child: [...] })` |
| `Spark.Position(p)` | 绝对定位容器 | `Spark.Position({ style: 'top:10px;' })` |
| `Spark.Fixed(p)` | 固定定位容器 | `Spark.Fixed({ style: 'bottom:20px;' })` |
| `Spark.Css(p)` | 可复用样式类 | `Spark.Css('color:red;')` |

#### 扩展组件

| 组件 | 说明 | 示例 |
|------|------|------|
| `Spark.Alert(p)` | 警告提示框 | `Spark.Alert({ type: 'success', message: '操作成功' })` |
| `Spark.Avatar(p)` | 头像 | `Spark.Avatar({ src: 'url' })` 或 `Spark.Avatar({ text: '李' })` |
| `Spark.BackTop(p)` | 回到顶部 | `Spark.BackTop()` |
| `Spark.Badge(p)` | 徽标数 | `Spark.Badge({ count: 5, child: widget })` |
| `Spark.Breadcrumb(p)` | 面包屑 | `Spark.Breadcrumb({ items: [{title:'首页'},...] })` |
| `Spark.Card(p)` | 卡片容器 | `Spark.Card({ title: '标题', child: [...] })` |
| `Spark.Collapse(p)` | 折叠面板 | `Spark.Collapse({ items: [...] })` |
| `Spark.Drawer(p)` | 抽屉 | `Spark.Drawer({ title: '标题', child: [...] })` |
| `Spark.Dropdown(p)` | 下拉菜单 | `Spark.Dropdown({ child: btn, items: [...] })` |
| `Spark.Empty(p)` | 空状态 | `Spark.Empty({ description: '暂无数据' })` |
| `Spark.Message` | 全局提示 | `Spark.Message.success('操作成功')` |
| `Spark.Modal(p)` | 模态框 | `Spark.Modal({ child: [...] })` |
| `Spark.Notification` | 通知提醒 | `Spark.Notification.success({ message: '成功' })` |
| `Spark.Progress(p)` | 进度条 | `Spark.Progress({ percent: 70 })` |
| `Spark.Rate(p)` | 星级评分 | `Spark.Rate({ value: 3, onChange: fn })` |
| `Spark.Skeleton(p)` | 骨架屏 | `Spark.Skeleton({ avatar: true })` |
| `Spark.Slider(p)` | 滑动输入条 | `Spark.Slider({ min: 0, max: 100, value: 30 })` |
| `Spark.Steps(p)` | 步骤条 | `Spark.Steps({ current: 1, items: [...] })` |
| `Spark.Tabs(p)` | 标签页 | `Spark.Tabs({ items: [...], onChange: fn })` |
| `Spark.Tag(p)` | 标签 | `Spark.Tag({ text: '标签', color: 'blue' })` |
| `Spark.Tooltip(p)` | 文字提示 | `Spark.Tooltip({ title: '提示', child: widget })` |
| `Spark.Anchor(p)` | 锚点导航 | `Spark.Anchor({ items: [{title:'章节1',href:'#s1'}] })` |
| `Spark.Calendar(p)` | 日历 | `Spark.Calendar({ onChange: fn })` |
| `Spark.Carousel(p)` | 轮播 | `Spark.Carousel({ child: [...], autoPlay: true })` |
| `Spark.ColorPicker(p)` | 颜色选择器 | `Spark.ColorPicker({ value: '#4B95FF', onChange: fn })` |
| `Spark.DateRangePicker(p)` | 日期范围选择 | `Spark.DateRangePicker({ onChange: fn })` |
| `Spark.FloatButton(p)` | 悬浮按钮 | `Spark.FloatButton({ icon: '✚' })` |
| `Spark.Form(p)` | 表单 | `Spark.Form({ items: [...], onSubmit: fn })` |
| `Spark.InputNumber(p)` | 数字输入框 | `Spark.InputNumber({ min: 0, max: 100, value: 1 })` |
| `Spark.Pagination(p)` | 分页 | `Spark.Pagination({ total: 100, pageSize: 10 })` |
| `Spark.Popconfirm(p)` | 气泡确认框 | `Spark.Popconfirm({ title: '确定删除?', child: btn })` |
| `Spark.Popover(p)` | 气泡卡片 | `Spark.Popover({ title: '标题', content: '内容', child: btn })` |
| `Spark.Result(p)` | 结果反馈 | `Spark.Result({ status: 'success', title: '操作成功' })` |
| `Spark.Select(p)` | 选择器 | `Spark.Select({ options: [...], onChange: fn })` |
| `Spark.Spin(p)` | 加载中 | `Spark.Spin({ child: widget })` |
| `Spark.Statistic(p)` | 统计数值 | `Spark.Statistic({ title: '销售额', value: 12345 })` |
| `Spark.Table(p)` | 表格 | `Spark.Table({ columns: [...], data: [...] })` |
| `Spark.Textarea(p)` | 多行文本框 | `Spark.Textarea({ rows: 4, placeholder: '请输入' })` |
| `Spark.Timeline(p)` | 时间轴 | `Spark.Timeline({ items: [...] })` |
| `Spark.Transfer(p)` | 穿梭框 | `Spark.Transfer({ data: [...], onChange: fn })` |
| `Spark.Tree(p)` | 树形控件 | `Spark.Tree({ data: [...], onSelect: fn })` |

### 响应式数据绑定

修改组件属性会自动更新 DOM：

```javascript
var counter = Spark.Text('0', {
  style: 'font-size:48px;font-weight:bold;text-align:center;'
});

var count = 0;

var btn = Spark.Button('点击 +1', {
  style: 'display:block;margin:20px auto;',
  on: {
    click: function() {
      count++;
      counter.text = count.toString();
    }
  }
});
```

**响应式属性一览：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `text` | String | 更新文本内容 |
| `style` | String | 合并更新样式 |
| `show` | Boolean | 显示/隐藏（保留DOM） |
| `vif` | Boolean | 条件渲染（移除/添加DOM） |
| `className` | String/Object | 修改CSS类名 |
| `value` | String | Input组件的值 |
| `enable` | Boolean | Input组件启用/禁用 |

### 事件系统

```javascript
Spark.Box({
  style: 'width:100px;height:100px;background:#4B95FF;',
  on: {
    click: function(e) { console.log('clicked'); },
    press: function(e) { console.log('pressed'); },
    up: function(e) { console.log('released'); },
    move: function(e) { console.log('moving'); },
    hover: function(e) { console.log('hovering'); },
    enter: function(e) { console.log('mouse enter'); },
    leave: function(e) { console.log('mouse leave'); },
  }
});
```

### 路由系统

```javascript
// 定义页面
var homePage = Spark.Page({
  link: { name: 'home', path: '/' },
  style: 'width:100%;min-height:100vh;',
  child: [Spark.Text('首页')]
});

var aboutPage = Spark.Page({
  link: { name: 'about', path: '/about' },
  style: 'width:100%;min-height:100vh;',
  child: [Spark.Text('关于')]
});

// 带参数的路由
var detailPage = Spark.Page({
  link: { name: 'detail', path: '/detail/:id' },
  style: 'width:100%;min-height:100vh;',
  child: [],
  created: function() {
    console.log('参数:', Spark.route.params);
  }
});

// 404 路由
var notFound = Spark.Page({
  link: { name: '404', path: '*' },
  child: [Spark.Text('页面未找到')]
});

// 编程式导航
Spark.router.push('/about');
Spark.router.push({ name: 'detail', params: { id: '123' } });
Spark.router.push({ path: '/search', query: { keyword: 'spark' } });
Spark.router.replace('/');
Spark.router.back();
Spark.router.forward();
```

### 列表渲染

```javascript
var todoList = Spark.List({
  data: ['学习 Spark', '写一个 Demo', '分享给朋友'],
  item: function(item, index) {
    return Spark.Text((index + 1) + '. ' + item, {
      style: 'padding:10px;border-bottom:1px solid #eee;',
    });
  }
});

// 动态操作列表
todoList.insertLast('新的待办事项');    // 末尾添加
todoList.insertFirst('紧急任务');       // 开头添加
todoList.insert(2, '插入到第三行');      // 指定位置插入
todoList.delete(0, 1);                  // 删除第一项
todoList.update(0, '更新第一项');        // 更新指定项
todoList.clear();                        // 清空列表
```

### 模态框

```javascript
var modal = Spark.Modal({
  bgShow: true,
  bgClose: true,
  position: 'center',
  style: 'width:300px;padding:30px;background:#fff;border-radius:12px;text-align:center;',
  showAni: { ani: 'fadeIn 0.3s ease' },
  hideAni: { ani: 'fadeOut 0.3s ease', time: 300 },
  child: [
    Spark.Text('提示', { style: 'font-size:20px;font-weight:bold;margin-bottom:15px;' }),
    Spark.Text('这是一个模态框示例', { style: 'color:#666;margin-bottom:20px;' }),
    Spark.Button('关闭', {
      on: {
        click: function() {
          modal.close();
        }
      }
    })
  ],
});

// 打开/关闭
modal.open();
modal.close();

// 缓存模式（关闭后保留 DOM，不销毁）
var cachedModal = Spark.Modal({
  cache: true,
  child: [Spark.Text('我会被缓存')],
});
```

### 拖拽组件

```javascript
var draggable = Spark.Drag({
  style: 'width:100px;height:100px;background:#4B95FF;border-radius:8px;color:#fff;line-height:100px;text-align:center;',
  child: [Spark.Text('拖拽我')],
  bounded: { out: true },  // 限制在边界内
  on: {
    press: function() { this.style = 'opacity:0.8;'; },
    move: function() { console.log(this.position.x, this.position.y); },
    up: function() { this.style = 'opacity:1;'; }
  }
});
```

### 样式复用

```javascript
// 定义可复用样式
var cardStyle = Spark.Css('padding:20px;background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.1);margin:10px;');

// 应用到多个组件
var card1 = Spark.Box({ className: cardStyle, child: [Spark.Text('卡片1')] });
var card2 = Spark.Box({ className: cardStyle, child: [Spark.Text('卡片2')] });
```

### 动画

```javascript
var animatedBox = Spark.Box({
  style: 'width:100px;height:100px;background:#4B95FF;',
  showAni: { ani: 'fadeIn 0.5s ease' },
  hideAni: { ani: 'fadeOut 0.5s ease', time: 500 },
});

// 控制显隐
animatedBox.show = false;  // 带动画隐藏
animatedBox.show = true;   // 带动画显示
```

### 轮播组件

```javascript
var carousel = Spark.Carousel({
  autoPlay: 3000,
  loop: true,
  pagination: true,
  arrows: true,
  child: [
    Spark.Box({ style: 'height:300px;background:linear-gradient(135deg,#667eea,#764ba2);' }),
    Spark.Box({ style: 'height:300px;background:linear-gradient(135deg,#f093fb,#f5576c);' }),
    Spark.Box({ style: 'height:300px;background:linear-gradient(135deg,#4facfe,#00f2fe);' }),
  ],
  onChange: function(index) {
    console.log('当前幻灯片:', index);
  }
});

// 编程式控制
carousel.slideTo(2);     // 跳转到第3张
carousel.slideNext();    // 下一张
carousel.slidePrev();    // 上一张
carousel.destroy();      // 销毁
```

### 自定义组件

```javascript
// 注册单个自定义组件
Spark.component('CounterButton', function(p) {
  var count = 0;
  var text = Spark.Text('0', { style: 'font-size:24px;margin-right:10px;' });
  var btn = Spark.Button(p.label || '+1', {
    on: { click: function() { text.text = String(++count); } }
  });
  return Spark.Box({ style: p.style, child: [text, btn] });
});

// 使用
var counter = Spark.CounterButton({ label: '增加' });

// 批量注册
Spark.component({
  MyHeader: function(p) { return Spark.Box({ child: [Spark.Text(p.title)] }); },
  MyFooter: function(p) { return Spark.Text(p.text || '© 2025'); },
});
```

### Watch 监听

```javascript
var input = Spark.Input({
  placeholder: '搜索...',
  watch: {
    value: function(oldVal, newVal) {
      console.log('输入值变化:', oldVal, '->', newVal);
    }
  }
});
```

### 生命周期

```javascript
Spark.Page({
  link: { name: 'home', path: '/' },
  child: [],
  init: function() {
    // 组件首次渲染完成
    console.log('init');
  },
  created: function() {
    // 创建完成
    console.log('created');
  },
  activated: function() {
    // 组件激活（路由切回）
    console.log('activated');
  },
  deactivated: function() {
    // 组件停用（路由离开）
    console.log('deactivated');
  }
});
```

---

## API 参考

### 全局方法

| 方法 | 说明 |
|------|------|
| `Spark.setting(options)` | 全局配置 name/title/scene/gray 等 |
| `Spark.getWidget(name)` | 通过名称获取组件对象 |
| `Spark.append(target, widget)` | 向目标容器追加子组件 |
| `Spark.prepend(target, widget)` | 向目标容器前置子组件 |
| `Spark.remove(target, widget)` | 从目标容器移除子组件 |
| `Spark.Extend(widgetMap)` | 注册自定义扩展组件 |
| `Spark.component(name, factory)` | 注册自定义组件（支持单个或批量） |
| `Spark.scrollTop(target, time)` | 平滑滚动到指定位置 |
| `Spark.onReady(callback)` | DOM 就绪后回调 |
| `Spark.destroy()` | 销毁所有组件（测试用） |

### 全局属性

| 属性 | 说明 |
|------|------|
| `Spark.version` | 当前版本号 |
| `Spark.env` | 环境检测（isMobile/isIOS/isChrome 等） |
| `Spark.screen` | 屏幕信息（width()/height()/scrollTop()） |
| `Spark.route` | 当前路由信息 |
| `Spark.router` | 路由操作方法 |
| `Spark.axios` | HTTP 请求（axios 实例） |
| `Spark.vdom` | 所有组件缓存 |
| `Spark.vcss` | 所有样式缓存 |

---

## 全局配置

```javascript
Spark.setting({
  name: 'myapp',        // 应用名
  title: '我的应用',     // 页面标题
  scene: 'pc',          // 场景：pc/mobile
  gray: false,          // 灰色模式（哀悼日）
  devTool: false,       // 移动端调试工具
  resetCss: '',         // 自定义 reset css（空则使用内置默认值）
});
```

---

## 浏览器兼容性

| 浏览器 | 版本 |
|--------|------|
| Chrome | 49+ |
| Firefox | 45+ |
| Safari | 10+ |
| Edge | 14+ |
| IE | 不支持 |

---

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器（端口 3000）
npm run dev

# 生产构建
npm run build
```

---

## 项目结构

```
spark/
├── src/
│   ├── index.js              # 入口文件
│   ├── core/
│   │   ├── index.js           # 核心聚合模块
│   │   ├── common.js          # 基础工具函数
│   │   ├── Cache.js           # 全局缓存中心
│   │   ├── WidgetManager.js   # 组件工厂
│   │   ├── WidgetParse.js     # 组件解析器
│   │   ├── WidgetObserved.js  # 响应式属性处理
│   │   ├── WidgetOperate.js   # DOM 操作
│   │   ├── CreateDomTree.js   # DOM 树渲染引擎
│   │   ├── CreateWidgetName.js# 唯一名称生成器
│   │   ├── CSSManager.js      # CSS 引擎
│   │   ├── Router.js          # 路由系统
│   │   ├── AddWidgetEvent.js  # 事件注册
│   │   ├── DefaultSetting.js  # 默认配置
│   │   ├── SparkUtil.js       # 工具集
│   │   └── extend/            # 扩展组件
│   │       ├── Alert.js       # 警告提示
│   │       ├── Avatar.js      # 头像
│   │       ├── BackTop.js     # 回到顶部
│   │       ├── Badge.js       # 徽标数
│   │       ├── Breadcrumb.js  # 面包屑
│   │       ├── Card.js        # 卡片容器
│   │       ├── Collapse.js    # 折叠面板
│   │       ├── Drawer.js      # 抽屉
│   │       ├── Dropdown.js    # 下拉菜单
│   │       ├── Empty.js       # 空状态
│   │       ├── Message.js     # 全局提示
│   │       ├── Modal.js       # 模态框
│   │       ├── Notification.js# 通知提醒
│   │       ├── Progress.js    # 进度条
│   │       ├── Rate.js        # 评分
│   │       ├── Skeleton.js    # 骨架屏
│   │       ├── Slider.js      # 滑动条
│   │       ├── Steps.js       # 步骤条
│   │       ├── Tabs.js        # 标签页
│   │       ├── Tag.js         # 标签
│   │       ├── Tooltip.js     # 文字提示
│   │       ├── Carousel.js    # 轮播
│   │       ├── FloatButton.js # 悬浮按钮
│   │       ├── DateRangePicker.js # 日期范围选择
│   │       └── scrollTop.js   # 滚动工具
├── docs/                      # 文档站
├── release/                   # 构建产物
```

---

## License

[MIT](LICENSE)

---

**Spark.js** — 绽放思想的火花，去智造无限可能 ✨
