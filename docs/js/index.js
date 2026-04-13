/**
 * Spark.js 官网首页 - 完全使用 Spark.js 构建
 */

Spark.setting({ name: "docs", title: "Spark.js - 轻量级声明式 JavaScript UI 库" });

/* ==================== 工具函数 ==================== */

function codeBlock(code, label) {
  var header = Spark.Box({
    style: "display:flex;align-items:center;gap:8px;padding:14px 20px;background:rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.08);",
    child: [
      Spark.Box({ style: "width:12px;height:12px;border-radius:50%;background:#ff5f57;" }),
      Spark.Box({ style: "width:12px;height:12px;border-radius:50%;background:#ffbd2e;" }),
      Spark.Box({ style: "width:12px;height:12px;border-radius:50%;background:#28c841;" }),
      Spark.Text(label || "", { style: "margin-left:8px;font-size:12px;color:rgba(255,255,255,0.4);" }),
    ],
  });

  var pre = Spark.Box({
    tag: "pre",
    style: "padding:24px;overflow-x:auto;font-size:13px;line-height:1.7;margin:0;color:#e2e8f0;text-align:left;",
    child: [],
    init: function () {
      this.$el.innerHTML = '<code>' + code + '</code>';
    },
  });

  return Spark.Box({
    style: "background:#1e293b;border-radius:12px;overflow:hidden;box-shadow:0 12px 48px rgba(0,0,0,0.12);",
    child: [header, pre],
  });
}

function section(id, alt, children) {
  return Spark.Box({
    idName: id,
    style: "padding:100px 24px;" + (alt ? "background:#f8f9fc;" : ""),
    child: [
      Spark.Box({
        style: "max-width:1200px;margin:0 auto;",
        child: children,
      }),
    ],
  });
}

function sectionHeader(title, desc) {
  return Spark.Box({
    style: "text-align:center;margin-bottom:64px;animation:fadeInUp 0.6s ease;",
    child: [
      Spark.Text(title, { tag: "h2", style: "font-size:36px;font-weight:800;margin-bottom:16px;letter-spacing:-0.5px;" }),
      Spark.Text(desc, { style: "color:#64748b;font-size:17px;max-width:600px;margin:0 auto;" }),
    ],
  });
}

/* ==================== 导航栏 ==================== */

var navScrolled = false;
var nav = Spark.Box({
  style: "position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,0.92);" +
    "backdrop-filter:blur(12px);border-bottom:1px solid #e2e8f0;transition:box-shadow 0.3s;",
  child: [
    Spark.Box({
      style: "max-width:1200px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;",
      child: [
        Spark.Text("Spark.js", {
          tag: "a",
          style: "font-size:22px;font-weight:800;color:#4B95FF;text-decoration:none;letter-spacing:-0.5px;cursor:pointer;",
        }),
        Spark.Box({
          style: "display:flex;gap:32px;align-items:center;",
          child: [
            Spark.Link("特性", { href: "#features", style: "color:#64748b;font-size:14px;font-weight:500;" }),
            Spark.Link("快速开始", { href: "#quickstart", style: "color:#64748b;font-size:14px;font-weight:500;" }),
            Spark.Link("示例", { href: "#demo", style: "color:#64748b;font-size:14px;font-weight:500;" }),
            Spark.Link("组件文档", { href: "components.html", style: "color:#64748b;font-size:14px;font-weight:500;" }),
            Spark.Link("GitHub", {
              href: "https://github.com/nullno/spark",
              target: "_blank",
              style: "display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:#1a1a2e;color:#fff;" +
                "border-radius:8px;font-size:13px;font-weight:600;",
            }),
          ],
        }),
      ],
    }),
  ],
  init: function () {
    var _this = this;
    window.addEventListener("scroll", function () {
      _this.style = window.scrollY > 10 ? "box-shadow:0 4px 24px rgba(0,0,0,0.08);" : "box-shadow:none;";
    });
  },
});

/* ==================== Hero 区域 ==================== */

var heroCode =
  '<span class="cm">// 一个脚本标签，构建完整页面</span>\n' +
  '<span class="kw">var</span> hello = Spark.<span class="fn">Text</span>(<span class="str">\'Hello Spark!\'</span>, {\n' +
  '  style: <span class="str">\'font-size:48px;font-weight:bold;color:#4B95FF;\'</span>\n' +
  '});\n\n' +
  '<span class="kw">var</span> counter = <span class="num">0</span>;\n' +
  '<span class="kw">var</span> btn = Spark.<span class="fn">Button</span>(<span class="str">\'点击计数: 0\'</span>, {\n' +
  '  on: {\n' +
  '    <span class="fn">click</span>() {\n' +
  '      btn.text = <span class="str">\'点击计数: \'</span> + (++counter);\n' +
  '    }\n' +
  '  }\n' +
  '});\n\n' +
  'Spark.<span class="fn">Page</span>({\n' +
  '  link: { path: <span class="str">\'/\'</span> },\n' +
  '  child: [hello, btn]\n' +
  '});';

var hero = Spark.Box({
  style: "min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;" +
    "padding:120px 24px 80px;background:linear-gradient(160deg,#f0f4ff 0%,#ffffff 40%,#faf5ff 100%);" +
    "position:relative;overflow:hidden;",
  child: [
    Spark.Box({
      style: "position:relative;max-width:800px;",
      child: [
        Spark.Box({
          style: "display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:28px;",
          child: [
            Spark.Text("v1.0.0", {
              style: "display:inline-block;padding:5px 12px;background:rgba(75,149,255,0.1);color:#4B95FF;" +
                "border-radius:20px;font-size:13px;font-weight:600;",
            }),
            Spark.Text("124 KB min · 32 KB gzip", {
              style: "display:inline-block;padding:5px 12px;background:rgba(34,197,94,0.1);color:#22c55e;" +
                "border-radius:20px;font-size:13px;font-weight:600;",
            }),
            Spark.Text("零依赖", {
              style: "display:inline-block;padding:5px 12px;background:rgba(251,191,36,0.1);color:#f59e0b;" +
                "border-radius:20px;font-size:13px;font-weight:600;",
            }),
          ],
        }),
        Spark.Box({
          tag: "h1",
          style: "font-size:clamp(36px,6vw,64px);font-weight:800;line-height:1.15;margin-bottom:20px;letter-spacing:-1px;",
          child: [
            Spark.Text("用纯 JavaScript", { tag: "span", style: "display:block;" }),
            Spark.Text("构建整个 Web 页面", {
              tag: "span",
              style: "background:linear-gradient(135deg,#4B95FF,#7566F9);-webkit-background-clip:text;" +
                "-webkit-text-fill-color:transparent;background-clip:text;",
            }),
          ],
        }),
        Spark.Text("Spark.js 是一个轻量级声明式 JavaScript UI 库，内置 63 个组件、SPA 路由、响应式系统和 HTTP 工具。无需 HTML 模板、无需打包工具、无需 CSS 类名 —— 引入一个脚本即刻开始。", {
          style: "font-size:18px;color:#64748b;max-width:640px;margin:0 auto 40px;line-height:1.7;",
        }),
        Spark.Box({
          style: "display:flex;gap:12px;justify-content:center;flex-wrap:wrap;",
          child: [
            Spark.Link("快速开始", {
              href: "#quickstart",
              style: "display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:10px;font-size:15px;font-weight:600;" +
                "background:linear-gradient(135deg,#4B95FF,#7566F9);color:#fff;box-shadow:0 4px 16px rgba(75,149,255,0.3);",
            }),
            Spark.Link("组件文档", {
              href: "components.html",
              style: "display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:10px;font-size:15px;font-weight:600;" +
                "background:#fff;color:#1a1a2e;border:1.5px solid #e2e8f0;",
            }),
            Spark.Link("GitHub", {
              href: "https://github.com/nullno/spark",
              target: "_blank",
              style: "display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:10px;font-size:15px;font-weight:600;" +
                "background:#1a1a2e;color:#fff;border-radius:10px;",
            }),
          ],
        }),
        Spark.Box({
          style: "margin-top:60px;max-width:700px;margin-left:auto;margin-right:auto;",
          child: [codeBlock(heroCode, "app.js")],
        }),
      ],
    }),
  ],
});

/* ==================== 核心数据统计 ==================== */

function statItem(num, label) {
  return Spark.Box({
    style: "text-align:center;flex:1;min-width:140px;",
    child: [
      Spark.Text(num, { tag: "h3", style: "font-size:36px;font-weight:800;color:#4B95FF;margin-bottom:4px;" }),
      Spark.Text(label, { style: "font-size:14px;color:#64748b;" }),
    ],
  });
}

var statsSection = Spark.Box({
  style: "padding:60px 24px;background:#f8f9fc;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;",
  child: [
    Spark.Box({
      style: "max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:32px;justify-content:center;",
      child: [
        statItem("63", "内置组件"),
        statItem("124 KB", "压缩体积 (min)"),
        statItem("32 KB", "传输体积 (gzip)"),
        statItem("0", "外部依赖"),
        statItem("MIT", "开源协议"),
      ],
    }),
  ],
});

/* ==================== 特性区域 ==================== */

var features = [
  { icon: "⚡", bg: "rgba(75,149,255,0.1)", color: "#4B95FF", title: "零配置启动", desc: "引入一个 <script> 标签即可开始。无需 Node.js、无需 npm install、无需 webpack 配置。CDN 或本地引入，直接在浏览器中运行。" },
  { icon: "🎯", bg: "rgba(117,102,249,0.1)", color: "#7566F9", title: "声明式组件", desc: "Flutter/Dart 风格的声明式写法，每个 UI 元素都是 JavaScript 对象，通过 child 嵌套构建组件树。代码即是设计，所见即所得。" },
  { icon: "🔄", bg: "rgba(34,197,94,0.1)", color: "#22c55e", title: "响应式更新", desc: "基于 Object.defineProperty 的属性观测系统。修改 text、style、show、value 等属性，DOM 自动同步更新，支持 watch 回调和条件渲染 (vif)。" },
  { icon: "🗺️", bg: "rgba(251,191,36,0.1)", color: "#f59e0b", title: "内置 SPA 路由", desc: "Hash 模式单页应用路由，支持动态参数 (/user/:id)、通配符 404、编程式导航、滚动位置记忆、页面 keepalive 缓存和 meta 配置。" },
  { icon: "📦", bg: "rgba(239,68,68,0.1)", color: "#ef4444", title: "63 个内置组件", desc: "21 个基础组件 (Text、Box、Button、Input、List 等) + 42 个高级扩展 (Table、Modal、Carousel、Calendar、Form、Tree 等)，覆盖完整 UI 需求。" },
  { icon: "🪶", bg: "rgba(6,182,212,0.1)", color: "#06b6d4", title: "124 KB · 零依赖", desc: "压缩后仅 124 KB (gzip 32 KB)，运行时零外部依赖。内置 HTTP 请求工具 (基于 fetch)、CSS 管理器、自动浏览器前缀等，无需额外安装任何包。" },
];

var featureCards = features.map(function (f) {
  return Spark.Box({
    style: "padding:32px;background:#fff;border-radius:12px;border:1px solid #e2e8f0;transition:all 0.3s;",
    shover: { "border-color": "#4B95FF", "box-shadow": "0 4px 24px rgba(0,0,0,0.08)", transform: "translateY(-4px)" },
    child: [
      Spark.Box({
        style: "width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;" +
          "font-size:22px;margin-bottom:20px;background:" + f.bg + ";color:" + f.color + ";",
        child: [Spark.Text(f.icon, { style: "font-size:22px;" })],
      }),
      Spark.Text(f.title, { tag: "h3", style: "font-size:18px;font-weight:700;margin-bottom:10px;" }),
      Spark.Text(f.desc, { style: "color:#64748b;font-size:14px;line-height:1.7;" }),
    ],
  });
});

var featuresSection = section("features", false, [
  sectionHeader("为什么选择 Spark.js？", "专为快速原型开发和轻量级 Web 应用打造"),
  Spark.Box({
    style: "display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;",
    child: featureCards,
  }),
]);

/* ==================== 快速开始 ==================== */

var cdnCode =
  '<span class="cm">&lt;!-- 方式一：直接引入（推荐）--&gt;</span>\n' +
  '&lt;<span class="kw">script</span> src=<span class="str">"https://unpkg.com/@weijundong/spark-js/release/spark.min.js"</span>&gt;&lt;/<span class="kw">script</span>&gt;\n\n' +
  '<span class="cm">&lt;!-- 方式二：npm 安装 --&gt;</span>\n' +
  '<span class="cm">npm install @weijundong/spark-js</span>';

var startCode =
  '<span class="cm">// 1. 基本设置</span>\n' +
  'Spark.<span class="fn">setting</span>({ name: <span class="str">\'my-app\'</span>, title: <span class="str">\'我的应用\'</span> });\n\n' +
  '<span class="cm">// 2. 创建组件</span>\n' +
  '<span class="kw">var</span> hello = Spark.<span class="fn">Text</span>(<span class="str">\'Hello World\'</span>, {\n' +
  '  style: <span class="str">\'font-size:32px;color:#4B95FF;\'</span>\n' +
  '});\n\n' +
  '<span class="kw">var</span> btn = Spark.<span class="fn">Button</span>(<span class="str">\'点击我\'</span>, {\n' +
  '  on: { <span class="fn">click</span>() { Spark.<span class="fn">Message</span>({ content: <span class="str">\'Hi!\'</span> }); } }\n' +
  '});\n\n' +
  '<span class="cm">// 3. 挂载到页面</span>\n' +
  'Spark.<span class="fn">Page</span>({\n' +
  '  link: { name: <span class="str">\'home\'</span>, path: <span class="str">\'/\'</span> },\n' +
  '  child: [hello, btn]\n' +
  '});';

var routerCode =
  '<span class="cm">// 多页面 SPA 路由</span>\n' +
  'Spark.<span class="fn">Page</span>({\n' +
  '  link: { name: <span class="str">\'home\'</span>, path: <span class="str">\'/\'</span> },\n' +
  '  child: [Spark.<span class="fn">Text</span>(<span class="str">\'首页\'</span>)]\n' +
  '});\n\n' +
  'Spark.<span class="fn">Page</span>({\n' +
  '  link: {\n' +
  '    name: <span class="str">\'user\'</span>,\n' +
  '    path: <span class="str">\'/user/:id\'</span>,\n' +
  '    meta: { title: <span class="str">\'用户详情\'</span> }\n' +
  '  },\n' +
  '  child: [Spark.<span class="fn">Text</span>(<span class="str">\'用户页\'</span>)]\n' +
  '});\n\n' +
  '<span class="cm">// 编程式导航</span>\n' +
  'Spark.<span class="fn">router</span>(<span class="str">\'/user/123?tab=info\'</span>);';

var quickStartSection = section("quickstart", true, [
  sectionHeader("快速开始", "只需两步，立刻构建你的第一个应用"),
  Spark.Box({
    style: "display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:40px;",
    child: [
      Spark.Box({
        child: [
          Spark.Text("① 引入", { tag: "h3", style: "font-size:16px;font-weight:700;margin-bottom:16px;color:#4B95FF;" }),
          codeBlock(cdnCode, "index.html"),
        ],
      }),
      Spark.Box({
        child: [
          Spark.Text("② 编写", { tag: "h3", style: "font-size:16px;font-weight:700;margin-bottom:16px;color:#4B95FF;" }),
          codeBlock(startCode, "app.js"),
        ],
      }),
    ],
  }),
  Spark.Text("路由示例", { tag: "h3", style: "font-size:16px;font-weight:700;margin-bottom:16px;color:#7566F9;text-align:center;" }),
  Spark.Box({
    style: "max-width:600px;margin:0 auto;",
    child: [codeBlock(routerCode, "router.js")],
  }),
]);

/* ==================== 组件展示 ==================== */

var componentList = [
  // 基础组件
  { name: "Text", desc: "文本组件", cat: "基础" },
  { name: "Box", desc: "通用容器", cat: "基础" },
  { name: "Button", desc: "按钮组件", cat: "基础" },
  { name: "Input", desc: "输入框", cat: "基础" },
  { name: "Image", desc: "图片元素", cat: "基础" },
  { name: "Link", desc: "超链接", cat: "基础" },
  { name: "Divider", desc: "分割线", cat: "基础" },
  { name: "Space", desc: "间距", cat: "基础" },
  { name: "Row", desc: "Flex 行", cat: "布局" },
  { name: "Col", desc: "24 栅格列", cat: "布局" },
  { name: "List", desc: "列表渲染", cat: "基础" },
  { name: "Stack", desc: "堆叠容器", cat: "布局" },
  { name: "Drag", desc: "可拖拽容器", cat: "布局" },
  // 表单组件
  { name: "Switch", desc: "开关切换", cat: "表单" },
  { name: "Checkbox", desc: "复选框", cat: "表单" },
  { name: "Radio", desc: "单选框", cat: "表单" },
  { name: "RadioGroup", desc: "单选组", cat: "表单" },
  { name: "Select", desc: "选择器", cat: "表单" },
  { name: "InputNumber", desc: "数字输入", cat: "表单" },
  { name: "Textarea", desc: "多行输入", cat: "表单" },
  { name: "Slider", desc: "滑动条", cat: "表单" },
  { name: "Rate", desc: "评分", cat: "表单" },
  { name: "ColorPicker", desc: "颜色选择", cat: "表单" },
  { name: "DateRangePicker", desc: "日期范围", cat: "表单" },
  { name: "Transfer", desc: "穿梭框", cat: "表单" },
  { name: "Form", desc: "表单容器", cat: "表单" },
  // 数据展示
  { name: "Table", desc: "数据表格", cat: "数据" },
  { name: "Card", desc: "卡片", cat: "数据" },
  { name: "Tabs", desc: "标签页", cat: "数据" },
  { name: "Carousel", desc: "轮播图", cat: "数据" },
  { name: "Collapse", desc: "折叠面板", cat: "数据" },
  { name: "Tree", desc: "树形控件", cat: "数据" },
  { name: "Calendar", desc: "日历", cat: "数据" },
  { name: "Timeline", desc: "时间线", cat: "数据" },
  { name: "Tag", desc: "标签", cat: "数据" },
  { name: "Badge", desc: "徽标", cat: "数据" },
  { name: "Avatar", desc: "头像", cat: "数据" },
  { name: "Statistic", desc: "统计数值", cat: "数据" },
  { name: "Empty", desc: "空状态", cat: "数据" },
  { name: "Skeleton", desc: "骨架屏", cat: "数据" },
  // 反馈
  { name: "Modal", desc: "模态框", cat: "反馈" },
  { name: "Drawer", desc: "抽屉", cat: "反馈" },
  { name: "Message", desc: "消息提示", cat: "反馈" },
  { name: "Notification", desc: "通知", cat: "反馈" },
  { name: "Alert", desc: "警告框", cat: "反馈" },
  { name: "Popconfirm", desc: "确认气泡", cat: "反馈" },
  { name: "Spin", desc: "加载动画", cat: "反馈" },
  { name: "Result", desc: "结果页", cat: "反馈" },
  { name: "Progress", desc: "进度条", cat: "反馈" },
  // 导航
  { name: "Breadcrumb", desc: "面包屑", cat: "导航" },
  { name: "Pagination", desc: "分页", cat: "导航" },
  { name: "Steps", desc: "步骤条", cat: "导航" },
  { name: "Dropdown", desc: "下拉菜单", cat: "导航" },
  { name: "Anchor", desc: "锚点", cat: "导航" },
  { name: "BackTop", desc: "回到顶部", cat: "导航" },
  { name: "FloatButton", desc: "悬浮按钮", cat: "导航" },
  // 工具
  { name: "Tooltip", desc: "文字提示", cat: "覆盖" },
  { name: "Popover", desc: "气泡卡片", cat: "覆盖" },
];

var catColors = { "基础": "#4B95FF", "布局": "#7566F9", "表单": "#22c55e", "数据": "#f59e0b", "反馈": "#ef4444", "导航": "#06b6d4", "覆盖": "#ec4899" };

var componentCards = componentList.map(function (c) {
  return Spark.Link("", {
    href: "components.html#comp-" + c.name.toLowerCase(),
    style: "padding:20px 16px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;text-align:center;" +
      "cursor:pointer;transition:all 0.25s;display:block;text-decoration:none;",
    shover: { "border-color": "#4B95FF", "box-shadow": "0 4px 24px rgba(0,0,0,0.08)", transform: "translateY(-3px)" },
    child: [
      Spark.Text(c.cat, {
        style: "display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;margin-bottom:8px;" +
          "background:" + (catColors[c.cat] || "#999") + "18;color:" + (catColors[c.cat] || "#999") + ";",
      }),
      Spark.Text(c.name, {
        tag: "code",
        style: "display:block;font-size:14px;font-weight:700;color:#1a1a2e;margin-bottom:6px;",
      }),
      Spark.Text(c.desc, { style: "font-size:12px;color:#64748b;" }),
    ],
  });
});

var componentsSection = section("components", false, [
  sectionHeader("63 个内置组件", "基础组件 · 表单组件 · 数据展示 · 反馈 · 导航 · 覆盖层"),
  Spark.Box({
    style: "display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;",
    child: componentCards,
  }),
]);

/* ==================== 交互式 Demo 区域 ==================== */

// 计数器 Demo（真实可交互）
var counterVal = 0;
var counterDisplay = Spark.Text("0", {
  style: "font-size:64px;font-weight:800;color:#4B95FF;text-align:center;display:block;margin-bottom:16px;",
});
var counterBtn = Spark.Button("点击 +1", {
  style: "display:block;margin:0 auto;padding:12px 32px;font-size:15px;",
  on: {
    click: function () {
      counterDisplay.text = String(++counterVal);
    },
  },
});
var counterDemo = Spark.Box({
  style: "text-align:center;padding:40px 0;",
  child: [counterDisplay, counterBtn],
});

var counterCode =
  '<span class="kw">var</span> count = <span class="num">0</span>;\n\n' +
  '<span class="kw">var</span> display = Spark.<span class="fn">Text</span>(<span class="str">\'0\'</span>, {\n' +
  '  style: <span class="str">\'font-size:64px;font-weight:800;color:#4B95FF;\'</span>\n' +
  '});\n\n' +
  '<span class="kw">var</span> btn = Spark.<span class="fn">Button</span>(<span class="str">\'点击 +1\'</span>, {\n' +
  '  on: {\n' +
  '    <span class="fn">click</span>() {\n' +
  '      display.text = String(++count);\n' +
  '    }\n' +
  '  }\n' +
  '});';

// Switch Demo（真实可交互）
var switchStatus = Spark.Text("OFF", { style: "font-size:18px;color:#999;margin-left:12px;font-weight:600;" });
var switchDemo = Spark.Box({
  style: "display:flex;align-items:center;justify-content:center;padding:40px 0;gap:16px;flex-wrap:wrap;",
  child: [
    Spark.Switch({
      value: false,
      onChange: function (val) {
        switchStatus.text = val ? "ON" : "OFF";
        switchStatus.style = "color:" + (val ? "#4B95FF" : "#999") + ";";
      },
    }),
    switchStatus,
    Spark.Box({ style: "width:100%;" }),
    Spark.Checkbox("同意协议", { onChange: function () {} }),
    Spark.Box({ style: "width:16px;" }),
    Spark.RadioGroup({
      options: [
        { label: "选项A", value: "a" },
        { label: "选项B", value: "b" },
      ],
      value: "a",
    }),
  ],
});

var switchCode =
  '<span class="kw">var</span> sw = Spark.<span class="fn">Switch</span>({\n' +
  '  value: <span class="kw">false</span>,\n' +
  '  <span class="fn">onChange</span>(val) {\n' +
  '    label.text = val ? <span class="str">\'ON\'</span> : <span class="str">\'OFF\'</span>;\n' +
  '  }\n' +
  '});\n\n' +
  '<span class="kw">var</span> cb = Spark.<span class="fn">Checkbox</span>(<span class="str">\'同意协议\'</span>, {\n' +
  '  <span class="fn">onChange</span>(checked) { <span class="cm">/* ... */</span> }\n' +
  '});\n\n' +
  '<span class="kw">var</span> radio = Spark.<span class="fn">RadioGroup</span>({\n' +
  '  options: [{label: <span class="str">\'A\'</span>, value: <span class="str">\'a\'</span>}],\n' +
  '  value: <span class="str">\'a\'</span>\n' +
  '});';

// Modal Demo
var modalDemo = Spark.Box({
  style: "text-align:center;padding:40px 0;",
  child: [
    Spark.Button("打开模态框", {
      on: {
        click: function () {
          Spark.Message({ type: "success", content: "这是一个来自 Spark.Message 的提示！" });
        },
      },
    }),
    Spark.Box({ style: "height:16px;" }),
    Spark.Alert({ type: "info", message: "Spark.Alert 提示信息组件", showIcon: true }),
  ],
});

var modalCode =
  '<span class="cm">// 全局消息提示</span>\n' +
  'Spark.<span class="fn">Message</span>({\n' +
  '  type: <span class="str">\'success\'</span>,\n' +
  '  content: <span class="str">\'操作成功!\'</span>\n' +
  '});\n\n' +
  '<span class="cm">// 警告提示框</span>\n' +
  'Spark.<span class="fn">Alert</span>({\n' +
  '  type: <span class="str">\'info\'</span>,\n' +
  '  message: <span class="str">\'提示信息\'</span>,\n' +
  '  showIcon: <span class="kw">true</span>\n' +
  '});';

// Tabs Demo
var tabsDemo = Spark.Tabs({
  items: [
    {
      key: "1", label: "标签一",
      children: [Spark.Text("标签一的内容区域", { style: "color:#666;" })],
    },
    {
      key: "2", label: "标签二",
      children: [Spark.Text("标签二的内容区域", { style: "color:#666;" })],
    },
    {
      key: "3", label: "标签三",
      children: [Spark.Text("标签三的内容区域", { style: "color:#666;" })],
    },
  ],
  style: "padding:20px 0;",
});

var tabsCode =
  'Spark.<span class="fn">Tabs</span>({\n' +
  '  items: [\n' +
  '    { key: <span class="str">\'1\'</span>, label: <span class="str">\'标签一\'</span>,\n' +
  '      children: [Spark.<span class="fn">Text</span>(<span class="str">\'内容区域\'</span>)] },\n' +
  '    { key: <span class="str">\'2\'</span>, label: <span class="str">\'标签二\'</span>,\n' +
  '      children: [Spark.<span class="fn">Text</span>(<span class="str">\'内容区域\'</span>)] },\n' +
  '  ]\n' +
  '});';

// Demo data
var demoData = [
  { key: "counter", label: "计数器", code: counterCode, preview: counterDemo },
  { key: "switch", label: "表单组件", code: switchCode, preview: switchDemo },
  { key: "modal", label: "消息提示", code: modalCode, preview: modalDemo },
  { key: "tabs", label: "标签页", code: tabsCode, preview: tabsDemo },
];

// 用 show/hide 而非 empty/append，避免 clearWidget 删除 CSS 样式表导致二次切换后样式丢失
var demoCodePanels = demoData.map(function (d, i) {
  return Spark.Box({ show: i === 0, child: [codeBlock(d.code, "JavaScript")] });
});
var demoPrevPanels = demoData.map(function (d, i) {
  return Spark.Box({ show: i === 0, child: [d.preview] });
});

var demoCodeBox = Spark.Box({ style: "min-height:300px;", child: demoCodePanels });
var demoPrevBox = Spark.Box({ style: "min-height:300px;", child: demoPrevPanels });

var currentDemoIdx = 0;
var demoTabWidgets = [];

var demoTabs = demoData.map(function (d, i) {
  var isActive = i === 0;
  var tab = Spark.Button(d.label, {
    style: "padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;margin-right:8px;" +
      (isActive
        ? "background-color:#4B95FF;color:#fff;border:1.5px solid #4B95FF;"
        : "background-color:transparent;color:#64748b;border:1.5px solid #e2e8f0;"),
    on: {
      click: function () {
        currentDemoIdx = i;
        // 切换 tab 样式
        demoTabWidgets.forEach(function (tw, ti) {
          tw.style = "padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;margin-right:8px;" +
            (ti === i
              ? "background-color:#4B95FF;color:#fff;border:1.5px solid #4B95FF;"
              : "background-color:transparent;color:#64748b;border:1.5px solid #e2e8f0;");
        });
        // 切换内容：show/hide，不销毁节点，CSS 永不丢失
        demoCodePanels.forEach(function (p, pi) { p.show = pi === i; });
        demoPrevPanels.forEach(function (p, pi) { p.show = pi === i; });
      },
    },
  });
  demoTabWidgets.push(tab);
  return tab;
});

var demoSection = section("demo", false, [
  sectionHeader("代码示例", "简洁直观的 API，几行代码即可实现丰富交互"),
  Spark.Box({
    style: "display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap;animation:fadeInUp 0.6s ease;",
    child: demoTabs,
  }),
  Spark.Box({
    style: "display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start;",
    child: [
      demoCodeBox,
      Spark.Box({
        style: "background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:32px;min-height:300px;",
        child: [
          Spark.Text("效果预览", {
            style: "font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:20px;display:block;",
          }),
          demoPrevBox,
        ],
      }),
    ],
  }),
]);

/* ==================== 对比表格 ==================== */

var comparisonSection = section("comparison", true, [
  sectionHeader("框架对比", "了解 Spark.js 的适用场景"),
  Spark.Table({
    bordered: true,
    columns: [
      { title: "特性", dataIndex: "feature", width: "180px" },
      {
        title: "Spark.js", dataIndex: "spark",
        render: function (val) {
          return Spark.Text(val, {
            style: "font-weight:600;color:" + (val === "✓" ? "#22c55e" : val === "✗" ? "#ef4444" : "#4B95FF") + ";",
          });
        },
      },
      {
        title: "Vue.js", dataIndex: "vue",
        render: function (val) {
          var c = val === "✓" ? "#22c55e" : val === "✗" ? "#ef4444" : "#333";
          return Spark.Text(val, { style: "color:" + c + ";" });
        },
      },
      {
        title: "React", dataIndex: "react",
        render: function (val) {
          var c = val === "✓" ? "#22c55e" : val === "✗" ? "#ef4444" : "#333";
          return Spark.Text(val, { style: "color:" + c + ";" });
        },
      },
      {
        title: "jQuery", dataIndex: "jquery",
        render: function (val) {
          var c = val === "✓" ? "#22c55e" : val === "✗" ? "#ef4444" : "#333";
          return Spark.Text(val, { style: "color:" + c + ";" });
        },
      },
    ],
    dataSource: [
      { feature: "无需构建工具", spark: "✓", vue: "✓ (CDN)", react: "✗ (JSX需编译)", jquery: "✓" },
      { feature: "无需写 HTML", spark: "✓", vue: "✗", react: "✗ (JSX)", jquery: "✗" },
      { feature: "声明式组件", spark: "✓", vue: "✓", react: "✓", jquery: "✗" },
      { feature: "内置路由", spark: "✓", vue: "✗ (vue-router)", react: "✗ (react-router)", jquery: "✗" },
      { feature: "响应式更新", spark: "✓", vue: "✓", react: "✓", jquery: "✗" },
      { feature: "内置组件库", spark: "63 个", vue: "✗", react: "✗", jquery: "✗" },
      { feature: "内置 HTTP 工具", spark: "✓", vue: "✗", react: "✗", jquery: "✓ ($.ajax)" },
      { feature: "体积 (min)", spark: "124 KB", vue: "~63 KB", react: "~42 KB+", jquery: "~87 KB" },
      { feature: "体积 (gzip)", spark: "32 KB", vue: "~23 KB", react: "~14 KB+", jquery: "~30 KB" },
      { feature: "运行时依赖", spark: "0", vue: "0", react: "react-dom", jquery: "0" },
      { feature: "学习曲线", spark: "低", vue: "中", react: "高", jquery: "低" },
    ],
    style: "border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04);",
  }),
]);

/* ==================== 技术架构 ==================== */

var archItems = [
  { title: "渲染引擎", desc: "CreateDomTree 将声明式组件树递归转换为真实 DOM，支持 DocumentFragment 批量插入和 keepalive 缓存复用。" },
  { title: "响应式系统", desc: "WidgetObserved 通过 Object.defineProperty 劫持 text、style、show、child 等属性，修改即触发 DOM 同步更新，支持 watch 回调。" },
  { title: "CSS 管理器", desc: "CSSManager 动态创建 <style> 标签、CSS 字符串与对象互转，自动添加浏览器前缀 (autoprefixer)，内置 CSS Reset。" },
  { title: "Hash 路由", desc: "Router 模块实现 Hash SPA 路由，支持 /path/:param 动态参数、* 通配符、query 解析、history 栈和滚动位置记忆。" },
  { title: "组件缓存", desc: "三级缓存系统 — WidgetCache (组件)、CSSCache (样式)、PageCache (页面)，避免重复创建，提升渲染性能。" },
  { title: "HTTP 工具", desc: "基于原生 fetch 封装的轻量请求工具，支持 GET/POST/PUT/DELETE，自动 JSON 序列化/解析，零外部依赖。" },
];

var archCards = archItems.map(function (item) {
  return Spark.Box({
    style: "padding:28px;background:#fff;border-radius:12px;border:1px solid #e2e8f0;",
    child: [
      Spark.Text(item.title, { tag: "h4", style: "font-size:16px;font-weight:700;margin-bottom:8px;color:#4B95FF;" }),
      Spark.Text(item.desc, { style: "font-size:14px;color:#64748b;line-height:1.7;" }),
    ],
  });
});

var archSection = section("architecture", true, [
  sectionHeader("技术架构", "深入了解 Spark.js 核心模块"),
  Spark.Box({
    style: "display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;",
    child: archCards,
  }),
]);

/* ==================== CTA 区域 ==================== */

var cta = Spark.Box({
  style: "text-align:center;padding:100px 24px;background:linear-gradient(160deg,#4B95FF,#7566F9);color:#fff;",
  child: [
    Spark.Text("开始使用 Spark.js", {
      tag: "h2",
      style: "font-size:36px;font-weight:800;margin-bottom:16px;color:#fff;",
    }),
    Spark.Text("124 KB · 63 组件 · 零依赖 · 一个脚本标签开始构建", {
      style: "font-size:17px;opacity:0.9;max-width:500px;margin:0 auto 40px;color:#fff;",
    }),
    Spark.Box({
      style: "display:flex;gap:12px;justify-content:center;flex-wrap:wrap;",
      child: [
        Spark.Link("查看 GitHub", {
          href: "https://github.com/nullno/spark",
          target: "_blank",
          style: "display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:10px;font-size:15px;" +
            "font-weight:600;background:#fff;color:#4B95FF;box-shadow:0 4px 16px rgba(0,0,0,0.2);",
        }),
        Spark.Link("查看文档", {
          href: "components.html",
          style: "display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:10px;font-size:15px;" +
            "font-weight:600;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,0.3);",
        }),
      ],
    }),
  ],
});

/* ==================== Footer ==================== */

var footer = Spark.Box({
  style: "padding:48px 24px;text-align:center;border-top:1px solid #e2e8f0;",
  child: [
    Spark.Text("Spark.js © 2025 — MIT License", {
      style: "color:#64748b;font-size:14px;",
    }),
  ],
});

/* ==================== 页面组装 ==================== */

Spark.Page({
  link: { name: "home", path: "/" },
  style: "min-height:100vh;",
  child: [
    nav,
    hero,
    statsSection,
    featuresSection,
    quickStartSection,
    componentsSection,
    demoSection,
    archSection,
    comparisonSection,
    cta,
    footer,
  ],
});
