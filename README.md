<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  <img src="https://img.shields.io/badge/size-32KB%20gzip-orange.svg" alt="size">
</p>

<h1 align="center">Spark.js</h1>
<p align="center">纯 JavaScript 声明式 UI 库 — 无 HTML 模板，无打包工具，无 CSS 类名</p>

---

## 概览

Spark.js 采用 Flutter 风格的组件声明方式，让你用纯 JS 构建完整的 Web 应用。内置响应式绑定、SPA 路由、事件系统与 63 个开箱即用的组件，无需任何构建步骤。

```javascript
Spark.setting({ name: 'myapp', title: 'My App' });

Spark.Page({
  link: { name: 'home', path: '/' },
  child: [
    Spark.Text('Hello Spark!', {
      style: 'font-size:48px;font-weight:bold;color:#4B95FF;text-align:center;'
    })
  ]
});
```

---

## 安装

**CDN**

```html
<script src="https://unpkg.com/@nullno/spark-js/release/spark.min.js"></script>
```

**NPM**

```bash
npm install @nullno/spark-js
```

```javascript
import Spark from '@nullno/spark-js';
```

---

## 核心特性

| 特性 | 说明 |
|------|------|
| 零构建 | 直接引入即用，无需 Webpack / Vite |
| 响应式 | 属性赋值自动同步 DOM |
| 内置路由 | Hash 模式 SPA，支持动态参数与查询串 |
| 丰富组件 | 21 个基础组件 + 42 个扩展组件 |
| 事件适配 | click / press / move / hover，自动兼容移动端 |
| 生命周期 | `init`  `created`  `activated`  `deactivated` |
| 可扩展 | `Spark.component()` 注册自定义组件 |

---

## 组件

### 基础组件

| 组件 | 说明 |
|------|------|
| `Spark.Page(p)` | 页面容器，绑定路由 |
| `Spark.Box(p)` | 通用容器 |
| `Spark.Text(str, p)` | 文本 |
| `Spark.Image(src, p)` | 图片 |
| `Spark.Button(str, p)` | 按钮 |
| `Spark.Input(p)` | 输入框 |
| `Spark.Textarea(p)` | 多行文本框 |
| `Spark.Switch(p)` | 开关 |
| `Spark.Checkbox(str, p)` | 复选框 |
| `Spark.Radio(str, p)` / `RadioGroup(p)` | 单选 |
| `Spark.List(p)` | 列表渲染 |
| `Spark.Link(str, p)` | 链接 |
| `Spark.Divider(str, p)` | 分割线 |
| `Spark.Row(p)` / `Col(p)` | 栅格布局 |
| `Spark.Space(p)` | 间距容器 |
| `Spark.Stack(p)` / `Position(p)` / `Fixed(p)` | 定位容器 |
| `Spark.Drag(p)` | 可拖拽容器 |
| `Spark.Css(str)` | 可复用样式类 |

### 扩展组件

`Alert` · `Avatar` · `BackTop` · `Badge` · `Breadcrumb` · `Calendar` · `Card` · `Carousel` · `Collapse` · `ColorPicker` · `DateRangePicker` · `Drawer` · `Dropdown` · `Empty` · `FloatButton` · `Form` · `InputNumber` · `Message` · `Modal` · `Notification` · `Pagination` · `Popconfirm` · `Popover` · `Progress` · `Rate` · `Result` · `Select` · `Skeleton` · `Slider` · `Spin` · `Statistic` · `Steps` · `Table` · `Tabs` · `Tag` · `Timeline` · `Tooltip` · `Transfer` · `Tree` · `Anchor`

---

## 用法示例

### 响应式绑定

```javascript
var count = 0;
var label = Spark.Text('0', { style: 'font-size:48px;text-align:center;' });

Spark.Button('+1', {
  on: { click: function() { label.text = String(++count); } }
});
```

响应式属性：`text` · `style` · `show` · `vif` · `className` · `value` · `enable`

### 路由

```javascript
Spark.Page({ link: { name: 'home', path: '/' }, child: [...] });
Spark.Page({ link: { name: 'detail', path: '/detail/:id' }, child: [...], created: function() {
  console.log(Spark.route.params.id);
}});

Spark.router.push('/about');
Spark.router.push({ name: 'detail', params: { id: '123' } });
Spark.router.back();
```

### 列表

```javascript
var list = Spark.List({
  data: ['item A', 'item B', 'item C'],
  item: function(item, i) { return Spark.Text(i + '. ' + item); }
});

list.insertLast('item D');
list.delete(0, 1);
list.update(0, 'updated');
list.clear();
```

### 自定义组件

```javascript
Spark.component('MyCard', function(p) {
  return Spark.Box({
    style: 'padding:20px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.1);',
    child: [Spark.Text(p.title, { style: 'font-weight:bold;' })]
  });
});

Spark.MyCard({ title: '示例卡片' });
```

### 生命周期

```javascript
Spark.Page({
  link: { name: 'home', path: '/' },
  child: [],
  init:        function() { /* 首次渲染完成 */ },
  created:     function() { /* 创建完成 */ },
  activated:   function() { /* 路由进入 */ },
  deactivated: function() { /* 路由离开 */ }
});
```

---

## API

### 全局方法

| 方法 | 说明 |
|------|------|
| `Spark.setting(options)` | 全局配置（name / title / scene / gray） |
| `Spark.component(name, fn)` | 注册自定义组件，支持批量 |
| `Spark.getWidget(name)` | 按名称获取组件实例 |
| `Spark.append(target, widget)` | 向容器追加子组件 |
| `Spark.prepend(target, widget)` | 向容器前置子组件 |
| `Spark.remove(target, widget)` | 从容器移除子组件 |
| `Spark.scrollTop(target, time)` | 平滑滚动 |
| `Spark.onReady(callback)` | DOM 就绪回调 |
| `Spark.destroy()` | 销毁全部实例 |

### 全局属性

| 属性 | 说明 |
|------|------|
| `Spark.version` | 版本号 |
| `Spark.env` | 环境检测（isMobile / isIOS / isChrome ） |
| `Spark.screen` | 屏幕尺寸与滚动位置 |
| `Spark.route` | 当前路由信息 |
| `Spark.router` | 路由操作（push / replace / back / forward） |
| `Spark.axios` | 内置 HTTP 客户端 |

### 全局配置

```javascript
Spark.setting({
  name: 'myapp',
  title: '我的应用',
  scene: 'pc',       // pc | mobile
  gray: false,       // 灰色模式
  devTool: false,    // 移动端调试工具
  resetCss: '',      // 自定义 reset CSS
});
```

---

## 兼容性

Chrome 49+ · Firefox 45+ · Safari 10+ · Edge 14+

---

## 开发

```bash
npm install
npm run dev    # 开发服务器，端口 3000
npm run build  # 生产构建
```

---

## License

[MIT](LICENSE)

---

<p align="center"><b>Spark.js</b> — 绽放思想的火花，智造无限可能</p>