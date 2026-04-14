<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  <img src="https://img.shields.io/badge/size-32KB%20gzip-orange.svg" alt="size">
</p>

<h1 align="center">Spark.js</h1>
<p align="center">
  Declarative JavaScript UI Library — no HTML templates, no bundler, no CSS class names<br>
  纯 JavaScript 声明式 UI 库 — 无 HTML 模板，无打包工具，无 CSS 类名
</p>

---

## Overview / 概览

Spark.js brings Flutter-style declarative UI to the browser. Build full web applications in pure JavaScript with reactive bindings, SPA routing, an event system, and 63 ready-to-use components — zero build steps required.

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

## Installation / 安装

**CDN**

```html
<script src="https://unpkg.com/@weijundong/spark-js/release/spark.min.js"></script>
```

**NPM**

```bash
npm install @weijundong/spark-js
```

```javascript
import Spark from '@weijundong/spark-js';
```

---

## Features / 核心特性

| Feature | Description / 说明 |
|---------|---------------------|
| Zero build | No Webpack / Vite needed · 直接引入即用 |
| Reactive | Property assignment auto-syncs DOM · 属性赋值自动同步 DOM |
| Built-in router | Hash-mode SPA, dynamic params & query · 支持动态参数与查询串 |
| Rich components | 21 base + 42 extended · 21 个基础 + 42 个扩展组件 |
| Event adaption | click / press / move / hover, mobile-ready · 自动兼容移动端 |
| Lifecycle | `init` → `created` → `activated` → `deactivated` |
| Extensible | `Spark.component()` for custom components · 支持自定义组件 |

---

## Components / 组件

### Base Components / 基础组件

| Component | Description / 说明 |
|-----------|---------------------|
| `Spark.Page(p)` | Page container with route binding · 页面容器，绑定路由 |
| `Spark.Box(p)` | Generic container · 通用容器 |
| `Spark.Text(str, p)` | Text node · 文本 |
| `Spark.Image(src, p)` | Image · 图片 |
| `Spark.Button(str, p)` | Button · 按钮 |
| `Spark.Input(p)` | Text input · 输入框 |
| `Spark.Textarea(p)` | Multi-line input · 多行文本框 |
| `Spark.Switch(p)` | Toggle switch · 开关 |
| `Spark.Checkbox(str, p)` | Checkbox · 复选框 |
| `Spark.Radio(str, p)` / `RadioGroup(p)` | Radio button · 单选 |
| `Spark.List(p)` | List renderer · 列表渲染 |
| `Spark.Link(str, p)` | Hyperlink · 链接 |
| `Spark.Divider(str, p)` | Divider · 分割线 |
| `Spark.Row(p)` / `Col(p)` | Grid layout · 栅格布局 |
| `Spark.Space(p)` | Spacing container · 间距容器 |
| `Spark.Stack(p)` / `Position(p)` / `Fixed(p)` | Positioning containers · 定位容器 |
| `Spark.Drag(p)` | Draggable container · 可拖拽容器 |
| `Spark.Css(str)` | Reusable style class · 可复用样式类 |

### Extended Components / 扩展组件

`Alert` · `Avatar` · `BackTop` · `Badge` · `Breadcrumb` · `Calendar` · `Card` · `Carousel` · `Collapse` · `ColorPicker` · `DateRangePicker` · `Drawer` · `Dropdown` · `Empty` · `FloatButton` · `Form` · `InputNumber` · `Message` · `Modal` · `Notification` · `Pagination` · `Popconfirm` · `Popover` · `Progress` · `Rate` · `Result` · `Select` · `Skeleton` · `Slider` · `Spin` · `Statistic` · `Steps` · `Table` · `Tabs` · `Tag` · `Timeline` · `Tooltip` · `Transfer` · `Tree` · `Anchor`

---

## Examples / 用法示例

### Reactive Binding / 响应式绑定

```javascript
var count = 0;
var label = Spark.Text('0', { style: 'font-size:48px;text-align:center;' });

Spark.Button('+1', {
  on: { click: function() { label.text = String(++count); } }
});
```

Reactive props / 响应式属性：`text` · `style` · `show` · `vif` · `className` · `value` · `enable`

### Routing / 路由

```javascript
Spark.Page({ link: { name: 'home', path: '/' }, child: [...] });
Spark.Page({
  link: { name: 'detail', path: '/detail/:id' },
  child: [...],
  created: function() { console.log(Spark.route.params.id); }
});

Spark.router.push('/about');
Spark.router.push({ name: 'detail', params: { id: '123' } });
Spark.router.back();
```

### List / 列表

```javascript
var list = Spark.List({
  data: ['item A', 'item B', 'item C'],
  item: function(item, i) { return Spark.Text(i + '. ' + item); }
});

list.insertLast('item D');  // append / 追加
list.delete(0, 1);          // remove / 删除
list.update(0, 'updated');  // update / 更新
list.clear();               // clear / 清空
```

### Custom Component / 自定义组件

```javascript
Spark.component('MyCard', function(p) {
  return Spark.Box({
    style: 'padding:20px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.1);',
    child: [Spark.Text(p.title, { style: 'font-weight:bold;' })]
  });
});

Spark.MyCard({ title: 'Hello' });
```

### Lifecycle / 生命周期

```javascript
Spark.Page({
  link: { name: 'home', path: '/' },
  child: [],
  init:        function() { /* first render / 首次渲染完成 */ },
  created:     function() { /* created / 创建完成 */ },
  activated:   function() { /* route enter / 路由进入 */ },
  deactivated: function() { /* route leave / 路由离开 */ }
});
```

---

## API

### Global Methods / 全局方法

| Method | Description / 说明 |
|--------|---------------------|
| `Spark.setting(options)` | App config: name / title / scene / gray |
| `Spark.component(name, fn)` | Register custom component(s) · 注册自定义组件 |
| `Spark.getWidget(name)` | Get widget instance by name · 按名称获取实例 |
| `Spark.append(target, widget)` | Append child · 追加子组件 |
| `Spark.prepend(target, widget)` | Prepend child · 前置子组件 |
| `Spark.remove(target, widget)` | Remove child · 移除子组件 |
| `Spark.scrollTop(target, time)` | Smooth scroll · 平滑滚动 |
| `Spark.onReady(callback)` | DOM-ready callback · 就绪回调 |
| `Spark.destroy()` | Destroy all instances · 销毁全部实例 |

### Global Properties / 全局属性

| Property | Description / 说明 |
|----------|---------------------|
| `Spark.version` | Version string · 版本号 |
| `Spark.env` | Environment flags: isMobile / isIOS / isChrome … |
| `Spark.screen` | Screen size & scroll position · 屏幕尺寸与滚动位置 |
| `Spark.route` | Current route info · 当前路由信息 |
| `Spark.router` | Router: push / replace / back / forward |
| `Spark.axios` | Built-in HTTP client · 内置 HTTP 客户端 |

### Configuration / 全局配置

```javascript
Spark.setting({
  name: 'myapp',
  title: 'My App',        // page title / 页面标题
  scene: 'pc',            // pc | mobile
  gray: false,            // grayscale mode / 灰色模式
  devTool: false,         // mobile debug tool / 移动端调试工具
  resetCss: '',           // custom reset CSS
});
```

---

## Browser Support / 浏览器兼容性

Chrome 49+ · Firefox 45+ · Safari 10+ · Edge 14+

---

## Development / 开发

```bash
npm install
npm run dev    # dev server on port 3000 / 开发服务器，端口 3000
npm run build  # production build / 生产构建
```

---

## License

[MIT](LICENSE)

---

<p align="center"><b>Spark.js</b> — Ignite your ideas, build without limits · 绽放思想的火花，智造无限可能</p>
