/**
 * Spark.js 组件文档页 - 完全使用 Spark.js 构建
 */

Spark.setting({ name: "compdoc", title: "组件文档 - Spark.js" });

/* ==================== 工具函数 ==================== */
function codeBlock(code, label) {
  var header = Spark.Box({
    style: "display:flex;align-items:center;gap:8px;padding:10px 16px;background:rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.08);",
    child: [
      Spark.Box({ style: "width:10px;height:10px;border-radius:50%;background:#ff5f57;" }),
      Spark.Box({ style: "width:10px;height:10px;border-radius:50%;background:#ffbd2e;" }),
      Spark.Box({ style: "width:10px;height:10px;border-radius:50%;background:#28c841;" }),
      Spark.Text(label || "", { style: "margin-left:8px;font-size:11px;color:rgba(255,255,255,0.4);" }),
    ],
  });
  var pre = Spark.Box({
    tag: "pre",
    style: "padding:16px;overflow-x:auto;font-size:12px;line-height:1.7;margin:0;color:#e2e8f0;",
    child: [],
    init: function () { this.$el.innerHTML = '<code>' + code + '</code>'; },
  });
  return Spark.Box({
    style: "background:#1e293b;border-radius:8px;overflow:hidden;",
    child: [header, pre],
  });
}

function propItem(name, type, def, desc) {
  return Spark.Box({
    style: "display:flex;align-items:flex-start;padding:12px 0;border-bottom:1px solid #f0f0f0;gap:12px;flex-wrap:wrap;",
    child: [
      Spark.Text(name, { tag: "code", style: "font-size:13px;font-weight:600;color:#4B95FF;background:#f0f4ff;padding:2px 8px;border-radius:4px;white-space:nowrap;" }),
      Spark.Text(type, { style: "font-size:12px;color:#7566F9;background:#f5f3ff;padding:2px 6px;border-radius:4px;white-space:nowrap;" }),
      Spark.Text(def, { style: "font-size:12px;color:#999;white-space:nowrap;" }),
      Spark.Text(desc, { style: "font-size:13px;color:#555;flex:1;min-width:200px;" }),
    ],
  });
}

function compSection(id, title, desc, demo, code, props) {
  var children = [
    Spark.Text(title, {
      idName: id,
      tag: "h2",
      style: "font-size:24px;font-weight:700;margin-bottom:8px;color:#1a1a2e;padding-top:80px;margin-top:-60px;",
    }),
    Spark.Text(desc, { style: "font-size:14px;color:#64748b;margin-bottom:24px;" }),
  ];

  // Demo area
  if (demo) {
    children.push(Spark.Box({
      style: "background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:24px;margin-bottom:16px;",
      child: Array.isArray(demo) ? demo : [demo],
    }));
  }

  // Code
  if (code) {
    children.push(Spark.Box({
      style: "margin-bottom:16px;",
      child: [codeBlock(code, "JavaScript")],
    }));
  }

  // Props
  if (props && props.length) {
    children.push(Spark.Text("API", { tag: "h3", style: "font-size:16px;font-weight:600;margin:16px 0 8px;color:#1a1a2e;" }));
    children.push(Spark.Box({
      style: "background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:4px 16px;",
      child: props,
    }));
  }

  children.push(Spark.Divider("", { style: "margin:32px 0;" }));

  return Spark.Box({ style: "", child: children });
}

/* ==================== 侧边导航数据 ==================== */
var navGroups = [
  {
    title: "基础组件",
    items: [
      { id: "comp-text", label: "Text 文本" },
      { id: "comp-box", label: "Box 容器" },
      { id: "comp-button", label: "Button 按钮" },
      { id: "comp-image", label: "Image 图片" },
      { id: "comp-link", label: "Link 链接" },
      { id: "comp-divider", label: "Divider 分割线" },
      { id: "comp-row", label: "Row/Col 栅格" },
      { id: "comp-space", label: "Space 间距" },
    ],
  },
  {
    title: "表单组件",
    items: [
      { id: "comp-input", label: "Input 输入框" },
      { id: "comp-switch", label: "Switch 开关" },
      { id: "comp-checkbox", label: "Checkbox 复选" },
      { id: "comp-radio", label: "Radio 单选" },
      { id: "comp-select", label: "Select 选择器" },
      { id: "comp-inputnumber", label: "InputNumber 数字" },
      { id: "comp-textarea", label: "Textarea 文本域" },
      { id: "comp-rate", label: "Rate 评分" },
      { id: "comp-slider", label: "Slider 滑块" },
      { id: "comp-colorpicker", label: "ColorPicker 颜色" },
      { id: "comp-calendar", label: "Calendar 日历" },
      { id: "comp-daterange", label: "DateRangePicker 日期范围" },
      { id: "comp-form", label: "Form 表单" },
    ],
  },
  {
    title: "数据展示",
    items: [
      { id: "comp-card", label: "Card 卡片" },
      { id: "comp-table", label: "Table 表格" },
      { id: "comp-tabs", label: "Tabs 标签页" },
      { id: "comp-collapse", label: "Collapse 折叠" },
      { id: "comp-tag", label: "Tag 标签" },
      { id: "comp-badge", label: "Badge 徽标" },
      { id: "comp-avatar", label: "Avatar 头像" },
      { id: "comp-list", label: "List 列表" },
      { id: "comp-tree", label: "Tree 树形" },
      { id: "comp-statistic", label: "Statistic 统计" },
      { id: "comp-timeline", label: "Timeline 时间线" },
      { id: "comp-progress", label: "Progress 进度条" },
      { id: "comp-steps", label: "Steps 步骤条" },
    ],
  },
  {
    title: "反馈组件",
    items: [
      { id: "comp-modal", label: "Modal 模态框" },
      { id: "comp-drawer", label: "Drawer 抽屉" },
      { id: "comp-message", label: "Message 消息" },
      { id: "comp-notification", label: "Notification 通知" },
      { id: "comp-alert", label: "Alert 警告" },
      { id: "comp-popover", label: "Popover 气泡" },
      { id: "comp-popconfirm", label: "Popconfirm 确认" },
      { id: "comp-tooltip", label: "Tooltip 提示" },
      { id: "comp-result", label: "Result 结果" },
      { id: "comp-spin", label: "Spin 加载" },
      { id: "comp-skeleton", label: "Skeleton 骨架" },
      { id: "comp-empty", label: "Empty 空状态" },
    ],
  },
  {
    title: "导航组件",
    items: [
      { id: "comp-breadcrumb", label: "Breadcrumb 面包屑" },
      { id: "comp-dropdown", label: "Dropdown 下拉" },
      { id: "comp-pagination", label: "Pagination 分页" },
      { id: "comp-backtop", label: "BackTop 回顶" },
      { id: "comp-floatbutton", label: "FloatButton 悬浮" },
      { id: "comp-anchor", label: "Anchor 锚点" },
      { id: "comp-carousel", label: "Carousel 轮播" },
    ],
  },
  {
    title: "扩展",
    items: [
      { id: "comp-custom", label: "自定义组件" },
      { id: "comp-http", label: "HTTP 请求" },
      { id: "comp-scrolltop", label: "scrollTop 滚动" },
    ],
  },
  {
    title: "工具方法",
    items: [
      { id: "util-screen", label: "Screen 屏幕信息" },
      { id: "util-env", label: "Env 环境检测" },
      { id: "util-debounce", label: "防抖 / 节流" },
      { id: "util-url", label: "URL 参数处理" },
      { id: "util-data", label: "数据操作" },
      { id: "util-script", label: "动态加载" },
      { id: "util-devtool", label: "DevTool 调试" },
    ],
  },
];

/* ==================== 侧边栏 ==================== */
var sidebarLinks = [];

var sidebarChildren = [];
navGroups.forEach(function (group) {
  sidebarChildren.push(Spark.Text(group.title, {
    style: "font-size:12px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:1px;padding:16px 16px 8px;",
  }));
  group.items.forEach(function (item) {
    var link = Spark.Text(item.label, {
      style: "display:block;padding:6px 16px;font-size:13px;color:#555;cursor:pointer;border-left:2px solid transparent;" +
        "transition:all 0.15s;text-decoration:none;",
      shover: { color: "#4B95FF", "background-color": "#f0f4ff" },
      on: {
        click: function () {
          var el = document.getElementById(item.id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          sidebarLinks.forEach(function (sl) {
            sl.widget.style = "color:#555;border-left-color:transparent;background-color:transparent;";
          });
          link.style = "color:#4B95FF;border-left-color:#4B95FF;background-color:#f0f4ff;";
        },
      },
    });
    sidebarLinks.push({ id: item.id, widget: link });
    sidebarChildren.push(link);
  });
});

var sidebar = Spark.Box({
  style: "width:220px;position:fixed;top:64px;left:0;bottom:0;overflow-y:auto;background:#fff;" +
    "border-right:1px solid #e2e8f0;padding:8px 0;z-index:100;",
  child: sidebarChildren,
});

/* ==================== 顶部导航 ==================== */
var topNav = Spark.Box({
  style: "position:fixed;top:0;left:0;right:0;z-index:1000;height:64px;background:rgba(255,255,255,0.95);" +
    "backdrop-filter:blur(12px);border-bottom:1px solid #e2e8f0;display:flex;align-items:center;padding:0 24px;",
  child: [
    Spark.Link("Spark.js", { href: "index.html", style: "font-size:20px;font-weight:800;color:#4B95FF;margin-right:32px;" }),
    Spark.Text("组件文档", { style: "font-size:15px;font-weight:600;color:#1a1a2e;flex:1;" }),
    Spark.Link("首页", { href: "index.html", style: "color:#64748b;font-size:14px;margin-right:24px;" }),
    Spark.Link("GitHub", { href: "https://github.com/nullno/spark", target: "_blank", style: "color:#64748b;font-size:14px;" }),
  ],
});

/* ==================== 组件文档内容 ==================== */

var docSections = [];

// ===== Text =====
docSections.push(compSection("comp-text", "Text 文本", "最基础的文本显示组件，支持响应式文本更新。",
  Spark.Box({
    style: "display:flex;gap:16px;align-items:baseline;flex-wrap:wrap;",
    child: [
      Spark.Text("默认文本", {}),
      Spark.Text("主色文本", { style: "color:#4B95FF;font-weight:600;" }),
      Spark.Text("大号标题", { style: "font-size:24px;font-weight:800;" }),
    ],
  }),
  '<span class="kw">var</span> t = Spark.<span class="fn">Text</span>(<span class="str">\'Hello\'</span>, {\n  style: <span class="str">\'color:#4B95FF;font-size:24px;\'</span>\n});\nt.text = <span class="str">\'World\'</span>; <span class="cm">// 响应式更新</span>',
  [propItem("text", "String", '""', "文本内容（第一个参数）"), propItem("style", "String", '""', "CSS 样式"), propItem("tag", "String", '"span"', "HTML 标签")]
));

// ===== Box =====
docSections.push(compSection("comp-box", "Box 容器", "最常用的布局容器组件，可嵌套任意子组件。",
  Spark.Box({
    style: "padding:20px;background:#f0f4ff;border-radius:8px;border:1px dashed #4B95FF;",
    child: [Spark.Text("Box 容器内容", { style: "color:#4B95FF;" })],
  }),
  '<span class="kw">var</span> box = Spark.<span class="fn">Box</span>({\n  style: <span class="str">\'padding:20px;background:#f0f4ff;\'</span>,\n  child: [Spark.<span class="fn">Text</span>(<span class="str">\'内容\'</span>)]\n});',
  [propItem("child", "Array", "[]", "子组件数组"), propItem("style", "String", '""', "CSS 样式"), propItem("show", "Boolean", "true", "显示/隐藏")]
));

// ===== Button =====
docSections.push(compSection("comp-button", "Button 按钮", "按钮组件，支持点击事件和自定义样式。",
  Spark.Box({
    style: "display:flex;gap:12px;flex-wrap:wrap;align-items:center;",
    child: [
      Spark.Button("默认按钮", {}),
      Spark.Button("成功", { style: "background-color:#52c41a;" }),
      Spark.Button("警告", { style: "background-color:#faad14;" }),
      Spark.Button("危险", { style: "background-color:#ff4d4f;" }),
      Spark.Button("禁用", { style: "background-color:#d9d9d9;cursor:not-allowed;" }),
    ],
  }),
  '<span class="kw">var</span> btn = Spark.<span class="fn">Button</span>(<span class="str">\'点击我\'</span>, {\n  on: {\n    <span class="fn">click</span>() { <span class="cm">/* 处理点击 */</span> }\n  }\n});',
  [propItem("text", "String", '""', "按钮文本（第一个参数）"), propItem("on.click", "Function", "null", "点击事件")]
));

// ===== Image =====
docSections.push(compSection("comp-image", "Image 图片", "图片展示组件。",
  Spark.Box({
    style: "display:flex;gap:16px;",
    child: [
      Spark.Box({ style: "width:80px;height:80px;background:#f0f4ff;border-radius:8px;display:flex;align-items:center;justify-content:center;", child: [Spark.Text("IMG", { style: "color:#4B95FF;font-weight:600;" })] }),
    ],
  }),
  '<span class="kw">var</span> img = Spark.<span class="fn">Image</span>(<span class="str">\'https://example.com/pic.jpg\'</span>, {\n  style: <span class="str">\'width:200px;border-radius:8px;\'</span>\n});',
  [propItem("src", "String", '""', "图片地址（第一个参数）"), propItem("style", "String", '""', "CSS 样式")]
));

// ===== Link =====
docSections.push(compSection("comp-link", "Link 链接", "超链接组件。",
  Spark.Box({
    style: "display:flex;gap:16px;",
    child: [
      Spark.Link("默认链接", { href: "#" }),
      Spark.Link("新窗口打开", { href: "#", target: "_blank" }),
    ],
  }),
  '<span class="kw">var</span> link = Spark.<span class="fn">Link</span>(<span class="str">\'链接文字\'</span>, {\n  href: <span class="str">\'https://example.com\'</span>,\n  target: <span class="str">\'_blank\'</span>\n});',
  [propItem("text", "String", '""', "链接文本（第一个参数）"), propItem("href", "String", '""', "链接地址"), propItem("target", "String", '""', "打开方式")]
));

// ===== Divider =====
docSections.push(compSection("comp-divider", "Divider 分割线", "区隔内容的分割线。",
  Spark.Box({
    style: "",
    child: [
      Spark.Text("上方内容", {}),
      Spark.Divider(""),
      Spark.Text("下方内容", {}),
      Spark.Divider("分割文字"),
      Spark.Text("更多内容", {}),
    ],
  }),
  'Spark.<span class="fn">Divider</span>(<span class="str">\'\'</span>);  <span class="cm">// 纯线</span>\nSpark.<span class="fn">Divider</span>(<span class="str">\'标题\'</span>); <span class="cm">// 带文字</span>',
  [propItem("text", "String", '""', "分割线文字"), propItem("dashed", "Boolean", "false", "虚线"), propItem("vertical", "Boolean", "false", "垂直方向")]
));

// ===== Row / Col =====
docSections.push(compSection("comp-row", "Row / Col 栅格", "24列 Flex 栅格布局系统。",
  Spark.Row({
    gutter: 16,
    child: [
      Spark.Col({ span: 8, gutter: 16, child: [Spark.Box({ style: "background:#4B95FF;color:#fff;padding:16px;text-align:center;border-radius:4px;", child: [Spark.Text("Col-8", {})] })] }),
      Spark.Col({ span: 8, gutter: 16, child: [Spark.Box({ style: "background:#7566F9;color:#fff;padding:16px;text-align:center;border-radius:4px;", child: [Spark.Text("Col-8", {})] })] }),
      Spark.Col({ span: 8, gutter: 16, child: [Spark.Box({ style: "background:#4B95FF;color:#fff;padding:16px;text-align:center;border-radius:4px;", child: [Spark.Text("Col-8", {})] })] }),
    ],
  }),
  'Spark.<span class="fn">Row</span>({ gutter: <span class="num">16</span>, child: [\n  Spark.<span class="fn">Col</span>({ span: <span class="num">8</span>, child: [...] }),\n  Spark.<span class="fn">Col</span>({ span: <span class="num">8</span>, child: [...] }),\n  Spark.<span class="fn">Col</span>({ span: <span class="num">8</span>, child: [...] }),\n] });',
  [propItem("gutter", "Number", "0", "栅格间距"), propItem("span", "Number", "24", "Col 占列数 (1-24)"), propItem("offset", "Number", "0", "Col 左偏移列数")]
));

// ===== Space =====
docSections.push(compSection("comp-space", "Space 间距", "设置组件间距的布局容器。",
  Spark.Space({
    size: 12,
    child: [
      Spark.Button("按钮1", {}),
      Spark.Button("按钮2", {}),
      Spark.Button("按钮3", {}),
    ],
  }),
  'Spark.<span class="fn">Space</span>({ size: <span class="num">12</span>, child: [\n  Spark.<span class="fn">Button</span>(<span class="str">\'A\'</span>),\n  Spark.<span class="fn">Button</span>(<span class="str">\'B\'</span>)\n] });',
  [propItem("size", "Number", "8", "间距大小(px)"), propItem("direction", "String", '"horizontal"', "排列方向")]
));

// ===== Input =====
docSections.push(compSection("comp-input", "Input 输入框", "基于 contenteditable 的文本输入组件。",
  Spark.Box({
    style: "max-width:400px;",
    child: [Spark.Input({ placeholder: "请输入内容...", value: "" })],
  }),
  '<span class="kw">var</span> input = Spark.<span class="fn">Input</span>({\n  placeholder: <span class="str">\'请输入...\'</span>,\n  value: <span class="str">\'\'</span>,\n  on: {\n    <span class="fn">inputing</span>(e) { console.log(<span class="kw">this</span>.value); },\n    <span class="fn">keyEnter</span>(e) { console.log(<span class="str">\'回车\'</span>); }\n  }\n});',
  [propItem("value", "String", '""', "输入值"), propItem("placeholder", "String", '""', "占位文字"), propItem("enable", "Boolean", "true", "是否可编辑"), propItem("multiline", "Boolean", "false", "多行输入")]
));

// ===== Switch =====
var switchDemo1 = Spark.Switch({ value: false, onChange: function () {} });
docSections.push(compSection("comp-switch", "Switch 开关", "开关选择器，支持响应式切换。",
  Spark.Box({ style: "display:flex;gap:16px;align-items:center;", child: [
    Spark.Switch({ value: false }),
    Spark.Switch({ value: true }),
    Spark.Switch({ value: false, activeColor: "#52c41a" }),
  ] }),
  '<span class="kw">var</span> sw = Spark.<span class="fn">Switch</span>({\n  value: <span class="kw">false</span>,\n  activeColor: <span class="str">\'#52c41a\'</span>,\n  <span class="fn">onChange</span>(val) { console.log(val); }\n});\nsw.value = <span class="kw">true</span>; <span class="cm">// 响应式切换</span>',
  [propItem("value", "Boolean", "false", "开关状态"), propItem("activeColor", "String", '"#4B95FF"', "激活颜色"), propItem("onChange", "Function", "null", "变化回调")]
));

// ===== Checkbox =====
docSections.push(compSection("comp-checkbox", "Checkbox 复选框", "复选框组件，支持选中状态切换。",
  Spark.Box({ style: "display:flex;gap:16px;flex-wrap:wrap;", child: [
    Spark.Checkbox("选项 A", { checked: false }),
    Spark.Checkbox("选项 B", { checked: true }),
    Spark.Checkbox("禁用", { checked: false, disabled: true }),
  ] }),
  'Spark.<span class="fn">Checkbox</span>(<span class="str">\'同意协议\'</span>, {\n  checked: <span class="kw">false</span>,\n  <span class="fn">onChange</span>(val) { console.log(val); }\n});',
  [propItem("text", "String", '""', "标签文字"), propItem("checked", "Boolean", "false", "初始选中"), propItem("disabled", "Boolean", "false", "禁用"), propItem("onChange", "Function", "null", "变化回调")]
));

// ===== Radio =====
docSections.push(compSection("comp-radio", "Radio 单选框", "单选框和单选组。",
  Spark.RadioGroup({
    options: [
      { label: "选项 A", value: "a" },
      { label: "选项 B", value: "b" },
      { label: "选项 C", value: "c" },
    ],
    value: "a",
  }),
  'Spark.<span class="fn">RadioGroup</span>({\n  options: [\n    { label: <span class="str">\'A\'</span>, value: <span class="str">\'a\'</span> },\n    { label: <span class="str">\'B\'</span>, value: <span class="str">\'b\'</span> }\n  ],\n  value: <span class="str">\'a\'</span>,\n  <span class="fn">onChange</span>(val) { console.log(val); }\n});',
  [propItem("options", "Array", "[]", "选项列表 [{label, value}]"), propItem("value", "Any", '""', "当前值"), propItem("onChange", "Function", "null", "变化回调")]
));

// ===== Select =====
docSections.push(compSection("comp-select", "Select 选择器", "下拉选择器组件。",
  Spark.Select({ options: [{ label: "苹果", value: "apple" }, { label: "香蕉", value: "banana" }, { label: "橙子", value: "orange" }], placeholder: "请选择水果", onChange: function () {} }),
  'Spark.<span class="fn">Select</span>({\n  placeholder: <span class="str">\'请选择\'</span>,\n  options: [\n    { label: <span class="str">\'苹果\'</span>, value: <span class="str">\'apple\'</span> },\n    { label: <span class="str">\'香蕉\'</span>, value: <span class="str">\'banana\'</span> }\n  ],\n  <span class="fn">onChange</span>(val) { console.log(val); }\n});',
  [propItem("options", "Array", "[]", "选项列表"), propItem("value", "Any", '""', "当前选中值"), propItem("placeholder", "String", '"请选择"', "占位文字"), propItem("onChange", "Function", "null", "变化回调")]
));

// ===== InputNumber =====
docSections.push(compSection("comp-inputnumber", "InputNumber 数字输入", "带加减按钮的数字输入框。",
  Spark.InputNumber({ value: 5, min: 0, max: 10, step: 1 }),
  'Spark.<span class="fn">InputNumber</span>({\n  value: <span class="num">5</span>,\n  min: <span class="num">0</span>, max: <span class="num">10</span>, step: <span class="num">1</span>,\n  <span class="fn">onChange</span>(val) { console.log(val); }\n});',
  [propItem("value", "Number", "0", "当前值"), propItem("min", "Number", "-Infinity", "最小值"), propItem("max", "Number", "Infinity", "最大值"), propItem("step", "Number", "1", "步长")]
));

// ===== Textarea =====
docSections.push(compSection("comp-textarea", "Textarea 文本域", "多行文本输入组件。",
  Spark.Box({ style: "max-width:400px;", child: [Spark.Textarea({ placeholder: "请输入多行文字...", rows: 3, showCount: true, maxLength: 100 })] }),
  'Spark.<span class="fn">Textarea</span>({\n  placeholder: <span class="str">\'请输入...\'</span>,\n  rows: <span class="num">3</span>,\n  showCount: <span class="kw">true</span>,\n  maxLength: <span class="num">100</span>\n});',
  [propItem("rows", "Number", "4", "行数"), propItem("maxLength", "Number", "null", "最大字数"), propItem("showCount", "Boolean", "false", "显示字数")]
));

// ===== Rate =====
docSections.push(compSection("comp-rate", "Rate 评分", "星级评分组件。",
  Spark.Rate({ value: 3, count: 5 }),
  'Spark.<span class="fn">Rate</span>({ value: <span class="num">3</span>, count: <span class="num">5</span> });',
  [propItem("value", "Number", "0", "当前评分"), propItem("count", "Number", "5", "星星总数"), propItem("onChange", "Function", "null", "变化回调")]
));

// ===== Slider =====
docSections.push(compSection("comp-slider", "Slider 滑块", "滑动输入条。",
  Spark.Box({ style: "max-width:400px;padding:0 10px;", child: [Spark.Slider({ value: 40 })] }),
  'Spark.<span class="fn">Slider</span>({ value: <span class="num">40</span>, min: <span class="num">0</span>, max: <span class="num">100</span> });',
  [propItem("value", "Number", "0", "当前值"), propItem("min", "Number", "0", "最小值"), propItem("max", "Number", "100", "最大值")]
));

// ===== ColorPicker =====
docSections.push(compSection("comp-colorpicker", "ColorPicker 颜色选择器", "预设颜色面板选择器。",
  Spark.ColorPicker({ value: "#4B95FF" }),
  'Spark.<span class="fn">ColorPicker</span>({ value: <span class="str">\'#4B95FF\'</span>, <span class="fn">onChange</span>(c) { console.log(c); } });',
  [propItem("value", "String", '"#4B95FF"', "当前颜色"), propItem("presetColors", "Array", "[...]", "预设颜色列表"), propItem("onChange", "Function", "null", "变化回调")]
));

// ===== Calendar =====
docSections.push(compSection("comp-calendar", "Calendar 日历", "日历日期选择器。",
  Spark.Calendar({ placeholder: "选择日期" }),
  'Spark.<span class="fn">Calendar</span>({\n  placeholder: <span class="str">\'选择日期\'</span>,\n  <span class="fn">onChange</span>(date) { console.log(date); }\n});',
  [propItem("value", "String", "null", "初始日期"), propItem("placeholder", "String", '"选择日期"', "占位文字"), propItem("onChange", "Function", "null", "变化回调")]
));

// ===== DateRangePicker =====
docSections.push(compSection("comp-daterange", "DateRangePicker 日期范围", "选择起止日期范围。",
  Spark.DateRangePicker({
    placeholder: ["开始日期", "结束日期"],
    onChange: function (start, end) { console.log("范围:", start, "~", end); },
  }),
  'Spark.<span class="fn">DateRangePicker</span>({\n  placeholder: [<span class="str">\'开始日期\'</span>, <span class="str">\'结束日期\'</span>],\n  <span class="fn">onChange</span>(start, end) {\n    console.log(start, <span class="str">\'~\'</span>, end);\n  }\n});',
  [propItem("placeholder", "Array", '["开始日期","结束日期"]', "占位文字数组"), propItem("startDate", "String", "null", "初始开始日期"), propItem("endDate", "String", "null", "初始结束日期"), propItem("onChange", "Function", "null", "范围选定回调(start, end)")]
));

// ===== Form =====
docSections.push(compSection("comp-form", "Form 表单", "表单容器，规范化布局。",
  Spark.Form({
    layout: "horizontal",
    labelWidth: "80px",
    fields: [
      { label: "名称", name: "name", required: true, children: Spark.Input({ placeholder: "请输入名称", style: "min-width:160px;min-height:32px;" }) },
      { label: "类型", name: "type", children: Spark.Select({ options: ["类型A", "类型B"], placeholder: "请选择" }) },
    ],
  }),
  'Spark.<span class="fn">Form</span>({\n  layout: <span class="str">\'horizontal\'</span>,\n  fields: [\n    { label: <span class="str">\'名称\'</span>, name: <span class="str">\'name\'</span>, children: Spark.<span class="fn">Input</span>({...}) },\n  ],\n  <span class="fn">onSubmit</span>(values) { console.log(values); }\n});',
  [propItem("layout", "String", '"horizontal"', "布局：horizontal | vertical | inline"), propItem("fields", "Array", "[]", "字段配置列表"), propItem("onSubmit", "Function", "null", "提交回调")]
));

// ===== Card =====
docSections.push(compSection("comp-card", "Card 卡片", "通用卡片容器。",
  Spark.Card({ title: "卡片标题", style: "max-width:360px;", child: [Spark.Text("这是卡片内容区域。", { style: "color:#666;" })] }),
  'Spark.<span class="fn">Card</span>({\n  title: <span class="str">\'卡片标题\'</span>,\n  child: [Spark.<span class="fn">Text</span>(<span class="str">\'内容\'</span>)]\n});',
  [propItem("title", "String", '""', "卡片标题"), propItem("child", "Array", "[]", "内容组件")]
));

// ===== Table =====
docSections.push(compSection("comp-table", "Table 表格", "数据表格组件。",
  Spark.Table({
    columns: [
      { title: "姓名", dataIndex: "name" },
      { title: "年龄", dataIndex: "age", align: "center" },
      { title: "城市", dataIndex: "city" },
    ],
    dataSource: [
      { name: "张三", age: 28, city: "北京" },
      { name: "李四", age: 32, city: "上海" },
      { name: "王五", age: 25, city: "广州" },
    ],
    bordered: true,
  }),
  'Spark.<span class="fn">Table</span>({\n  columns: [\n    { title: <span class="str">\'姓名\'</span>, dataIndex: <span class="str">\'name\'</span> },\n    { title: <span class="str">\'年龄\'</span>, dataIndex: <span class="str">\'age\'</span> },\n  ],\n  dataSource: [\n    { name: <span class="str">\'张三\'</span>, age: <span class="num">28</span> },\n  ],\n  bordered: <span class="kw">true</span>\n});',
  [propItem("columns", "Array", "[]", "列配置 [{title, dataIndex, render}]"), propItem("dataSource", "Array", "[]", "数据源"), propItem("bordered", "Boolean", "false", "显示边框")]
));

// ===== Tabs =====
docSections.push(compSection("comp-tabs", "Tabs 标签页", "选项卡切换组件。",
  Spark.Tabs({
    items: [
      { key: "1", label: "标签一", children: [Spark.Text("标签一的内容", { style: "color:#666;" })] },
      { key: "2", label: "标签二", children: [Spark.Text("标签二的内容", { style: "color:#666;" })] },
    ],
  }),
  'Spark.<span class="fn">Tabs</span>({\n  items: [\n    { key: <span class="str">\'1\'</span>, label: <span class="str">\'Tab 1\'</span>, children: [...] },\n    { key: <span class="str">\'2\'</span>, label: <span class="str">\'Tab 2\'</span>, children: [...] },\n  ]\n});',
  [propItem("items", "Array", "[]", "标签配置 [{key, label, children}]"), propItem("activeKey", "String", '""', "当前激活标签"), propItem("onChange", "Function", "null", "切换回调")]
));

// ===== Collapse =====
docSections.push(compSection("comp-collapse", "Collapse 折叠面板", "可折叠/展开的内容面板。",
  Spark.Collapse({
    items: [
      { key: "1", label: "面板一", children: [Spark.Text("面板一的内容", { style: "color:#666;" })] },
      { key: "2", label: "面板二", children: [Spark.Text("面板二的内容", { style: "color:#666;" })] },
    ],
    defaultActiveKey: ["1"],
  }),
  'Spark.<span class="fn">Collapse</span>({\n  items: [\n    { key: <span class="str">\'1\'</span>, label: <span class="str">\'面板一\'</span>, children: [...] }\n  ],\n  accordion: <span class="kw">true</span>\n});',
  [propItem("items", "Array", "[]", "面板配置"), propItem("accordion", "Boolean", "false", "手风琴模式"), propItem("defaultActiveKey", "Array", "[]", "默认展开")]
));

// ===== Tag =====
docSections.push(compSection("comp-tag", "Tag 标签", "进行标记和分类的小标签。",
  Spark.Box({ style: "display:flex;gap:8px;flex-wrap:wrap;", child: [
    Spark.Tag({ text: "默认" }),
    Spark.Tag({ text: "成功", color: "#52c41a" }),
    Spark.Tag({ text: "警告", color: "#faad14" }),
    Spark.Tag({ text: "错误", color: "#ff4d4f" }),
    Spark.Tag({ text: "可关闭", closable: true }),
  ] }),
  'Spark.<span class="fn">Tag</span>({ text: <span class="str">\'标签\'</span>, color: <span class="str">\'#52c41a\'</span>, closable: <span class="kw">true</span> });',
  [propItem("text", "String", '""', "标签文字"), propItem("color", "String", '""', "颜色"), propItem("closable", "Boolean", "false", "可关闭")]
));

// ===== Badge =====
docSections.push(compSection("comp-badge", "Badge 徽标数", "图标右上角的圆形徽标。",
  Spark.Box({ style: "display:flex;gap:32px;", child: [
    Spark.Badge({ count: 5, child: [Spark.Box({ style: "width:42px;height:42px;background:#f0f0f0;border-radius:6px;" })] }),
    Spark.Badge({ dot: true, child: [Spark.Box({ style: "width:42px;height:42px;background:#f0f0f0;border-radius:6px;" })] }),
  ] }),
  'Spark.<span class="fn">Badge</span>({ count: <span class="num">5</span>, child: [...] });\nSpark.<span class="fn">Badge</span>({ dot: <span class="kw">true</span>, child: [...] });',
  [propItem("count", "Number", "0", "显示数字"), propItem("dot", "Boolean", "false", "只显示红点"), propItem("overflowCount", "Number", "99", "最大显示数")]
));

// ===== Avatar =====
docSections.push(compSection("comp-avatar", "Avatar 头像", "头像展示组件。",
  Spark.Box({ style: "display:flex;gap:16px;align-items:center;", child: [
    Spark.Avatar({ text: "U", size: "large" }),
    Spark.Avatar({ text: "S", size: "default" }),
    Spark.Avatar({ text: "A", size: "small" }),
  ] }),
  'Spark.<span class="fn">Avatar</span>({ text: <span class="str">\'U\'</span>, size: <span class="str">\'large\'</span> });\nSpark.<span class="fn">Avatar</span>({ src: <span class="str">\'url\'</span> });',
  [propItem("text", "String", '""', "文字头像"), propItem("src", "String", '""', "图片地址"), propItem("size", "String", '"default"', "尺寸：small | default | large")]
));

// ===== List =====
docSections.push(compSection("comp-list", "List 列表", "通用列表，支持动态增删改。",
  Spark.List({
    data: ["项目 1", "项目 2", "项目 3"],
    item: function (text, i) {
      return Spark.Box({
        style: "padding:12px 16px;border-bottom:1px solid #f0f0f0;",
        child: [Spark.Text((i + 1) + ". " + text, { style: "font-size:14px;" })],
      });
    },
  }),
  'Spark.<span class="fn">List</span>({\n  data: [<span class="str">\'A\'</span>, <span class="str">\'B\'</span>, <span class="str">\'C\'</span>],\n  <span class="fn">item</span>(text, i) {\n    <span class="kw">return</span> Spark.<span class="fn">Box</span>({ child: [Spark.<span class="fn">Text</span>(text)] });\n  }\n});',
  [propItem("data", "Array", "[]", "数据源"), propItem("item", "Function", "null", "条目渲染函数 (data, index) => Widget")]
));

// ===== Tree =====
docSections.push(compSection("comp-tree", "Tree 树形控件", "展示树形数据结构。",
  Spark.Tree({
    defaultExpandAll: true,
    treeData: [
      { title: "父节点 1", key: "1", children: [
        { title: "子节点 1-1", key: "1-1" },
        { title: "子节点 1-2", key: "1-2" },
      ] },
      { title: "父节点 2", key: "2", children: [
        { title: "子节点 2-1", key: "2-1" },
      ] },
    ],
  }),
  'Spark.<span class="fn">Tree</span>({\n  defaultExpandAll: <span class="kw">true</span>,\n  treeData: [\n    { title: <span class="str">\'节点\'</span>, key: <span class="str">\'1\'</span>, children: [...] }\n  ]\n});',
  [propItem("treeData", "Array", "[]", "树数据"), propItem("defaultExpandAll", "Boolean", "false", "默认全部展开")]
));

// ===== Statistic =====
docSections.push(compSection("comp-statistic", "Statistic 统计数值", "数据统计展示。",
  Spark.Box({ style: "display:flex;gap:48px;", child: [
    Spark.Statistic({ title: "活跃用户", value: 112893, style: "" }),
    Spark.Statistic({ title: "成功率", value: 99.8, suffix: "%", precision: 1 }),
  ] }),
  'Spark.<span class="fn">Statistic</span>({ title: <span class="str">\'用户数\'</span>, value: <span class="num">112893</span> });\nSpark.<span class="fn">Statistic</span>({ title: <span class="str">\'成功率\'</span>, value: <span class="num">99.8</span>, suffix: <span class="str">\'%\'</span> });',
  [propItem("title", "String", '""', "标题"), propItem("value", "Number", "0", "数值"), propItem("prefix", "String", '""', "前缀"), propItem("suffix", "String", '""', "后缀")]
));

// ===== Timeline =====
docSections.push(compSection("comp-timeline", "Timeline 时间线", "垂直展示时间节点。",
  Spark.Timeline({
    items: [
      { label: "创建项目", time: "2024-01-01", children: "项目初始化" },
      { label: "开发完成", time: "2024-03-15", color: "#52c41a", children: "核心功能完成" },
      { label: "正式发布", time: "2024-06-01", color: "#4B95FF", children: "v1.0.0 发布" },
    ],
  }),
  'Spark.<span class="fn">Timeline</span>({\n  items: [\n    { label: <span class="str">\'创建\'</span>, time: <span class="str">\'2024-01-01\'</span>, children: <span class="str">\'描述\'</span> }\n  ]\n});',
  [propItem("items", "Array", "[]", "时间线项 [{label, time, children, color}]"), propItem("mode", "String", '"left"', "排列模式: left | right | alternate")]
));

// ===== Progress =====
docSections.push(compSection("comp-progress", "Progress 进度条", "进度条展示组件。",
  Spark.Box({ style: "max-width:400px;display:flex;flex-direction:column;gap:16px;", child: [
    Spark.Progress({ percent: 70 }),
    Spark.Progress({ percent: 100, status: "success" }),
    Spark.Progress({ percent: 50, status: "exception" }),
  ] }),
  'Spark.<span class="fn">Progress</span>({ percent: <span class="num">70</span> });\nSpark.<span class="fn">Progress</span>({ percent: <span class="num">100</span>, status: <span class="str">\'success\'</span> });',
  [propItem("percent", "Number", "0", "进度百分比"), propItem("status", "String", '""', "状态: success | exception")]
));

// ===== Steps =====
docSections.push(compSection("comp-steps", "Steps 步骤条", "引导用户按步骤完成任务。",
  Spark.Steps({
    current: 1,
    items: [
      { title: "注册", description: "创建账号" },
      { title: "验证", description: "邮箱验证" },
      { title: "完成", description: "开始使用" },
    ],
  }),
  'Spark.<span class="fn">Steps</span>({\n  current: <span class="num">1</span>,\n  items: [\n    { title: <span class="str">\'步骤1\'</span>, description: <span class="str">\'描述\'</span> }\n  ]\n});',
  [propItem("current", "Number", "0", "当前步骤"), propItem("items", "Array", "[]", "步骤配置 [{title, description}]")]
));

// ===== Modal =====
docSections.push(compSection("comp-modal", "Modal 模态框", "模态对话框，覆盖在页面之上。",
  Spark.Button("打开模态框", {
    on: { click: function () {
      var m = Spark.Modal({
        bgShow: true, bgClose: true, position: "center",
        style: "width:320px;padding:32px;background:#fff;border-radius:16px;text-align:center;",
        child: [
          Spark.Text("模态框", { style: "font-size:22px;font-weight:700;margin-bottom:8px;" }),
          Spark.Text("这是一个模态框示例", { style: "color:#666;margin-bottom:20px;" }),
          Spark.Button("关闭", { on: { click: function () { m.close(); } } }),
        ],
      });
      m.open();
    } },
  }),
  '<span class="kw">var</span> modal = Spark.<span class="fn">Modal</span>({\n  bgShow: <span class="kw">true</span>, bgClose: <span class="kw">true</span>,\n  child: [...]\n});\nmodal.<span class="fn">open</span>();  modal.<span class="fn">close</span>();',
  [propItem("bgShow", "Boolean", "true", "显示背景遮罩"), propItem("bgClose", "Boolean", "false", "点击背景关闭"), propItem("position", "String", '"center"', "位置"), propItem("closable", "Boolean", "true", "显示关闭按钮"), propItem("drag", "Boolean", "false", "可拖拽"), propItem("cache", "Boolean", "false", "关闭后保留DOM不销毁")]
));

// ===== Drawer =====
docSections.push(compSection("comp-drawer", "Drawer 抽屉", "屏幕边缘滑出的浮层面板。",
  Spark.Button("打开抽屉", {
    on: { click: function () {
      var d = Spark.Drawer({
        title: "抽屉标题",
        child: [Spark.Text("抽屉内容区域", { style: "color:#666;" })],
      });
      d.open();
    } },
  }),
  '<span class="kw">var</span> drawer = Spark.<span class="fn">Drawer</span>({\n  title: <span class="str">\'标题\'</span>,\n  child: [...]\n});\ndrawer.<span class="fn">open</span>();',
  [propItem("title", "String", '""', "抽屉标题"), propItem("placement", "String", '"right"', "弹出位置: right | left | top | bottom"), propItem("width", "Number", "378", "宽度(水平方向)"), propItem("closable", "Boolean", "true", "显示关闭按钮"), propItem("maskClosable", "Boolean", "true", "点击遮罩关闭"), propItem("cache", "Boolean", "false", "关闭后保留DOM不销毁")]
));

// ===== Message =====
docSections.push(compSection("comp-message", "Message 全局消息", "全局轻量级消息提示。",
  Spark.Box({ style: "display:flex;gap:12px;flex-wrap:wrap;", child: [
    Spark.Button("成功", { style: "background-color:#52c41a;", on: { click: function () { Spark.Message({ type: "success", content: "成功消息！" }); } } }),
    Spark.Button("警告", { style: "background-color:#faad14;", on: { click: function () { Spark.Message({ type: "warning", content: "警告消息！" }); } } }),
    Spark.Button("错误", { style: "background-color:#ff4d4f;", on: { click: function () { Spark.Message({ type: "error", content: "错误消息！" }); } } }),
    Spark.Button("信息", { on: { click: function () { Spark.Message({ type: "info", content: "提示消息！" }); } } }),
  ] }),
  'Spark.<span class="fn">Message</span>({ type: <span class="str">\'success\'</span>, content: <span class="str">\'操作成功！\'</span> });\nSpark.<span class="fn">Message</span>({ type: <span class="str">\'error\'</span>, content: <span class="str">\'操作失败！\'</span> });',
  [propItem("type", "String", '"info"', "类型: success | error | warning | info"), propItem("content", "String", '""', "消息内容"), propItem("duration", "Number", "3000", "显示时长(ms)")]
));

// ===== Notification =====
docSections.push(compSection("comp-notification", "Notification 通知", "全局通知提醒框。",
  Spark.Button("打开通知", {
    on: {
      click: function () {
        Spark.Notification({ title: "通知标题", content: "这是通知内容描述", type: "info" });
      },
    },
  }),
  'Spark.<span class="fn">Notification</span>({\n  title: <span class="str">\'标题\'</span>,\n  content: <span class="str">\'内容\'</span>,\n  type: <span class="str">\'success\'</span>\n});',
  [propItem("title", "String", '""', "通知标题"), propItem("content", "String", '""', "通知内容"), propItem("type", "String", '"info"', "类型")]
));

// ===== Alert =====
docSections.push(compSection("comp-alert", "Alert 警告提示", "警告提示信息组件。",
  Spark.Box({ style: "display:flex;flex-direction:column;gap:12px;", child: [
    Spark.Alert({ type: "info", message: "信息提示", showIcon: true }),
    Spark.Alert({ type: "success", message: "成功提示", showIcon: true }),
    Spark.Alert({ type: "warning", message: "警告提示", showIcon: true }),
    Spark.Alert({ type: "error", message: "错误提示", showIcon: true }),
  ] }),
  'Spark.<span class="fn">Alert</span>({ type: <span class="str">\'success\'</span>, message: <span class="str">\'操作成功\'</span>, showIcon: <span class="kw">true</span> });',
  [propItem("type", "String", '"info"', "类型"), propItem("message", "String", '""', "提示内容"), propItem("showIcon", "Boolean", "false", "显示图标")]
));

// ===== Popover =====
docSections.push(compSection("comp-popover", "Popover 气泡卡片", "弹出式信息卡片。",
  Spark.Popover({
    title: "气泡标题",
    content: "这是气泡内容",
    trigger: "hover",
    children: Spark.Button("悬停查看", {}),
  }),
  'Spark.<span class="fn">Popover</span>({\n  title: <span class="str">\'标题\'</span>,\n  content: <span class="str">\'内容\'</span>,\n  trigger: <span class="str">\'hover\'</span>,\n  children: Spark.<span class="fn">Button</span>(<span class="str">\'触发\'</span>)\n});',
  [propItem("title", "String", '""', "标题"), propItem("content", "String/Widget", '""', "内容"), propItem("trigger", "String", '"hover"', "触发方式: hover | click")]
));

// ===== Popconfirm =====
docSections.push(compSection("comp-popconfirm", "Popconfirm 气泡确认", "点击确认的气泡框。",
  Spark.Popconfirm({
    title: "确定删除这条记录吗？",
    children: Spark.Button("删除", { style: "background-color:#ff4d4f;" }),
    onConfirm: function () { Spark.Message({ type: "success", content: "已删除" }); },
  }),
  'Spark.<span class="fn">Popconfirm</span>({\n  title: <span class="str">\'确定删除？\'</span>,\n  <span class="fn">onConfirm</span>() { <span class="cm">/* ... */</span> },\n  children: Spark.<span class="fn">Button</span>(<span class="str">\'删除\'</span>)\n});',
  [propItem("title", "String", '"确定吗？"', "确认文字"), propItem("onConfirm", "Function", "null", "确认回调"), propItem("onCancel", "Function", "null", "取消回调")]
));

// ===== Tooltip =====
docSections.push(compSection("comp-tooltip", "Tooltip 文字提示", "鼠标悬停显示文字提示。",
  Spark.Tooltip({ title: "这是提示内容", child: Spark.Button("悬停查看", {}) }),
  'Spark.<span class="fn">Tooltip</span>({\n  title: <span class="str">\'提示内容\'</span>,\n  child: Spark.<span class="fn">Button</span>(<span class="str">\'悬停\'</span>)\n});',
  [propItem("title", "String", '""', "提示内容"), propItem("placement", "String", '"top"', "弹出位置")]
));

// ===== Result =====
docSections.push(compSection("comp-result", "Result 结果页", "结果反馈页面。",
  Spark.Result({
    status: "success",
    title: "操作成功",
    subTitle: "你的提交已经完成，请等待审核。",
    extra: [Spark.Button("返回首页", {})],
  }),
  'Spark.<span class="fn">Result</span>({\n  status: <span class="str">\'success\'</span>,\n  title: <span class="str">\'操作成功\'</span>,\n  subTitle: <span class="str">\'描述信息\'</span>\n});',
  [propItem("status", "String", '"info"', "状态: success | error | warning | info"), propItem("title", "String", '""', "标题"), propItem("subTitle", "String", '""', "副标题")]
));

// ===== Spin =====
docSections.push(compSection("comp-spin", "Spin 加载中", "加载中动画指示器。",
  Spark.Box({ style: "display:flex;gap:32px;align-items:flex-start;", child: [
    Spark.Spin({ size: "small" }),
    Spark.Spin({ size: "default" }),
    Spark.Spin({ size: "large", tip: "加载中..." }),
  ] }),
  'Spark.<span class="fn">Spin</span>({ size: <span class="str">\'large\'</span>, tip: <span class="str">\'加载中...\'</span> });',
  [propItem("size", "String", '"default"', "尺寸: small | default | large"), propItem("tip", "String", '""', "描述文案"), propItem("spinning", "Boolean", "true", "是否显示")]
));

// ===== Skeleton =====
docSections.push(compSection("comp-skeleton", "Skeleton 骨架屏", "数据加载前的占位图形。",
  Spark.Skeleton({}),
  'Spark.<span class="fn">Skeleton</span>({ rows: <span class="num">3</span>, avatar: <span class="kw">true</span> });',
  [propItem("rows", "Number", "3", "占位行数"), propItem("avatar", "Boolean", "false", "显示头像占位")]
));

// ===== Empty =====
docSections.push(compSection("comp-empty", "Empty 空状态", "空数据时的占位提示。",
  Spark.Empty({ description: "暂无数据" }),
  'Spark.<span class="fn">Empty</span>({ description: <span class="str">\'暂无数据\'</span> });',
  [propItem("description", "String", '"暂无数据"', "描述文字")]
));

// ===== Breadcrumb =====
docSections.push(compSection("comp-breadcrumb", "Breadcrumb 面包屑", "显示页面层级路径。",
  Spark.Breadcrumb({ items: [{ text: "首页" }, { text: "列表" }, { text: "详情" }] }),
  'Spark.<span class="fn">Breadcrumb</span>({\n  items: [\n    { text: <span class="str">\'首页\'</span>, href: <span class="str">\'/\'</span> },\n    { text: <span class="str">\'详情\'</span> }\n  ]\n});',
  [propItem("items", "Array", "[]", "面包屑项 [{text, href}]"), propItem("separator", "String", '"/"', "分隔符")]
));

// ===== Dropdown =====
docSections.push(compSection("comp-dropdown", "Dropdown 下拉菜单", "向下弹出的列表菜单。",
  Spark.Dropdown({
    items: [
      { label: "菜单项 1" },
      { label: "菜单项 2" },
      { label: "菜单项 3" },
    ],
    child: Spark.Button("下拉菜单", {}),
  }),
  'Spark.<span class="fn">Dropdown</span>({\n  items: [{ label: <span class="str">\'菜单项\'</span> }],\n  child: Spark.<span class="fn">Button</span>(<span class="str">\'点击\'</span>)\n});',
  [propItem("items", "Array", "[]", "菜单项列表 [{label, key, onClick}]"), propItem("trigger", "String", '"hover"', "触发方式: hover | click")]
));

// ===== Pagination =====
docSections.push(compSection("comp-pagination", "Pagination 分页", "数据分页导航。",
  Spark.Pagination({ total: 100, pageSize: 10, current: 1 }),
  'Spark.<span class="fn">Pagination</span>({\n  total: <span class="num">100</span>,\n  pageSize: <span class="num">10</span>,\n  current: <span class="num">1</span>,\n  <span class="fn">onChange</span>(page) { console.log(page); }\n});',
  [propItem("total", "Number", "0", "总数据条数"), propItem("pageSize", "Number", "10", "每页条数"), propItem("current", "Number", "1", "当前页码")]
));

// ===== BackTop =====
docSections.push(compSection("comp-backtop", "BackTop 回到顶部", "返回页面顶部的操作按钮，滚动页面即可在右下角看到。",
  Spark.Text("向下滚动页面，BackTop 按钮会出现在右下角。", { style: "color:#666;font-size:14px;" }),
  'Spark.<span class="fn">BackTop</span>({ visibilityHeight: <span class="num">200</span> });',
  [propItem("visibilityHeight", "Number", "400", "滚动距离触发显示"), propItem("duration", "Number", "450", "滚动动画时长(ms)"), propItem("right", "Number", "40", "距右侧距离(px)"), propItem("bottom", "Number", "40", "距底部距离(px)")]
));

// ===== FloatButton =====
docSections.push(compSection("comp-floatbutton", "FloatButton 悬浮按钮", "可自由拖拽的悬浮操作按钮。",
  Spark.Button("创建悬浮按钮", {
    on: { click: function () {
      Spark.FloatButton({
        icon: "☰",
        tooltip: "拖拽我试试",
        right: 80,
        bottom: 100,
        onClick: function () { Spark.Message({ type: "info", content: "悬浮按钮被点击了！" }); },
      });
    } },
  }),
  'Spark.<span class="fn">FloatButton</span>({\n  icon: <span class="str">\'☰\'</span>,\n  draggable: <span class="kw">true</span>,\n  <span class="fn">onClick</span>() { <span class="cm">/* ... */</span> }\n});',
  [propItem("icon", "String", '"⚙"', "图标文字"), propItem("tooltip", "String", '""', "提示文字"), propItem("draggable", "Boolean", "true", "是否可拖拽"), propItem("size", "Number", "48", "按钮大小(px)"), propItem("bgColor", "String", '"#4B95FF"', "背景颜色")]
));

// ===== Anchor =====
docSections.push(compSection("comp-anchor", "Anchor 锚点导航", "锚点目录导航。",
  Spark.Anchor({
    items: [
      { title: "基础组件", href: "#comp-text" },
      { title: "表单组件", href: "#comp-input" },
      { title: "数据展示", href: "#comp-card" },
    ],
  }),
  'Spark.<span class="fn">Anchor</span>({\n  items: [\n    { title: <span class="str">\'章节一\'</span>, href: <span class="str">\'#section1\'</span> }\n  ]\n});',
  [propItem("items", "Array", "[]", "锚点配置 [{title, href, children}]"), propItem("offsetTop", "Number", "0", "距顶偏移")]
));

// ===== Carousel =====
// 演示一：无限循环 + 自动播放 + 拖动
var carouselDemo = Spark.Box({
  style: "width:100%;",
  init: function() {
    var el = this.$el;
    var c = Spark.Carousel({
      style: "width:100%;height:200px;",
      items: [
        (function(){ var d = document.createElement("div"); d.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;font-size:24px;font-weight:700;border-radius:8px;"; d.textContent = "Slide 1 — 鼠标/触摸拖动可切换"; return d; })(),
        (function(){ var d = document.createElement("div"); d.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f093fb,#f5576c);color:#fff;font-size:24px;font-weight:700;border-radius:8px;"; d.textContent = "Slide 2 — 无限循环模式"; return d; })(),
        (function(){ var d = document.createElement("div"); d.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#4facfe,#00f2fe);color:#fff;font-size:24px;font-weight:700;border-radius:8px;"; d.textContent = "Slide 3 — 到最后会循环到开头"; return d; })(),
      ],
      autoPlay: 3000,
      loop: true,
      arrow: true,
      pagination: true,
    });
    el.appendChild(c.$el);
  }
});

// 演示二：非循环（到边界禁止继续）
var carouselNoLoopDemo = Spark.Box({
  style: "width:100%;",
  init: function() {
    var el = this.$el;
    var c = Spark.Carousel({
      style: "width:100%;height:160px;",
      items: [
        (function(){ var d = document.createElement("div"); d.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#43e97b,#38f9d7);color:#fff;font-size:20px;font-weight:700;border-radius:8px;"; d.textContent = "第一张（不可再往前）"; return d; })(),
        (function(){ var d = document.createElement("div"); d.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#fa709a,#fee140);color:#fff;font-size:20px;font-weight:700;border-radius:8px;"; d.textContent = "中间张"; return d; })(),
        (function(){ var d = document.createElement("div"); d.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#a18cd1,#fbc2eb);color:#fff;font-size:20px;font-weight:700;border-radius:8px;"; d.textContent = "最后一张（不可再往后）"; return d; })(),
      ],
      loop: false,
      arrow: true,
      pagination: true,
    });
    el.appendChild(c.$el);
  }
});

docSections.push(compSection("comp-carousel", "Carousel 轮播图", "支持无限循环与边界停止两种模式，鼠标和触屏均可拖动滑屏，配合自动播放、分页指示器、箭头导航使用。",
  Spark.Box({
    child: [
      Spark.Text("无限循环 + 自动播放（loop: true，默认）", { style: "font-size:13px;font-weight:700;color:#4B95FF;margin-bottom:8px;display:block;" }),
      carouselDemo,
      Spark.Box({ style: "height:20px;" }),
      Spark.Text("边界停止（loop: false）", { style: "font-size:13px;font-weight:700;color:#f5576c;margin-bottom:8px;display:block;" }),
      carouselNoLoopDemo,
    ],
  }),
  '<span class="cm">// 无限循环模式（默认）：到最后一张后自动回到第一张</span>\n' +
  '<span class="kw">var</span> c1 = Spark.<span class="fn">Carousel</span>({\n' +
  '  items: [elem1, elem2, elem3],  <span class="cm">// DOM元素 / 图片URL / Spark组件</span>\n' +
  '  loop: <span class="kw">true</span>,          <span class="cm">// 默认 true，无限循环</span>\n' +
  '  autoPlay: <span class="num">3000</span>,      <span class="cm">// 自动播放间隔ms，false则不自动</span>\n' +
  '  arrow: <span class="kw">true</span>,          <span class="cm">// 显示前进后退箭头</span>\n' +
  '  pagination: <span class="kw">true</span>,     <span class="cm">// 显示底部圆点指示器</span>\n' +
  '  speed: <span class="num">500</span>,          <span class="cm">// 切换动画时长(ms)</span>\n' +
  '  direction: <span class="str">\'horizontal\'</span>, <span class="cm">// \'horizontal\' | \'vertical\'</span>\n' +
  '  onChange: <span class="kw">function</span>(index) {},  <span class="cm">// 切换回调，返回当前逻辑索引</span>\n' +
  '});\n' +
  'document.body.<span class="fn">appendChild</span>(c1.$el);\n\n' +
  '<span class="cm">// 边界停止模式：到首/尾后禁止继续滑动</span>\n' +
  '<span class="kw">var</span> c2 = Spark.<span class="fn">Carousel</span>({\n' +
  '  items: [elem1, elem2, elem3],\n' +
  '  loop: <span class="kw">false</span>,\n' +
  '  arrow: <span class="kw">true</span>,\n' +
  '});\n\n' +
  '<span class="cm">// 编程式控制</span>\n' +
  'c1.<span class="fn">slideTo</span>(<span class="num">2</span>);    <span class="cm">// 跳到第 3 张（逻辑索引）</span>\n' +
  'c1.<span class="fn">slideNext</span>();   <span class="cm">// 下一张</span>\n' +
  'c1.<span class="fn">slidePrev</span>();   <span class="cm">// 上一张</span>\n' +
  'c1.<span class="fn">stopAutoPlay</span>(); <span class="cm">// 暂停自动播放</span>\n' +
  'c1.<span class="fn">startAutoPlay</span>(); <span class="cm">// 恢复自动播放</span>\n' +
  'c1.<span class="fn">destroy</span>();     <span class="cm">// 销毁，移除 DOM 和事件监听</span>',
  [
    propItem("items", "Array", "[]", "轮播项：DOM 元素 / 图片 URL 字符串 / Spark 组件对象"),
    propItem("loop", "Boolean", "true", "true=无限循环（克隆首尾实现）；false=到边界禁止继续操作"),
    propItem("autoPlay", "Boolean|Number", "false", "自动播放；传数字表示间隔毫秒，true 默认 3000ms"),
    propItem("speed", "Number", "500", "切换动画时长(ms)"),
    propItem("pagination", "Boolean", "true", "显示底部圆点指示器，点击可跳转"),
    propItem("arrow", "Boolean", "false", "显示左右（或上下）箭头按钮"),
    propItem("direction", "String", '"horizontal"', "方向：horizontal（横向）| vertical（纵向）"),
    propItem("initSlide", "Number", "0", "初始显示的幻灯片逻辑索引"),
    propItem("style", "String", '"width:100%;height:300px;"', "轮播容器的内联样式"),
    propItem("onChange", "Function", "null", "切换回调 (activeIndex: Number)"),
  ]
));

// ===== 自定义组件 =====
docSections.push(compSection("comp-custom", "自定义组件", "使用 Spark.component() 注册自定义组件，扩展 Spark 生态。",
  null,
  '<span class="cm">// 注册自定义组件</span>\nSpark.<span class="fn">component</span>(<span class="str">\'MyCard\'</span>, <span class="kw">function</span>(p) {\n  <span class="kw">return</span> Spark.<span class="fn">Box</span>({\n    style: <span class="str">\'padding:16px;border:1px solid #eee;border-radius:8px;\'</span>,\n    child: [\n      Spark.<span class="fn">Text</span>(p.title, { tag: <span class="str">\'h3\'</span> }),\n      Spark.<span class="fn">Text</span>(p.desc, { style: <span class="str">\'color:#666;\'</span> }),\n    ],\n  });\n});\n\n<span class="cm">// 使用自定义组件</span>\n<span class="kw">var</span> card = Spark.<span class="fn">MyCard</span>({ title: <span class="str">\'标题\'</span>, desc: <span class="str">\'描述\'</span> });\n\n<span class="cm">// 批量注册</span>\nSpark.<span class="fn">component</span>({\n  Alert: <span class="kw">function</span>(p) { ... },\n  Panel: <span class="kw">function</span>(p) { ... },\n});',
  [propItem("name", "String", "-", "组件名称"), propItem("factory", "Function", "-", "组件工厂函数，接收参数对象返回组件")]
));

// ===== HTTP 请求 =====
docSections.push(compSection("comp-http", "Spark.http 请求", "内置轻量 HTTP 请求工具，基于原生 fetch 封装，支持 GET / POST / PUT / DELETE，返回 Promise。",
  null,
  '<span class="cm">// GET 请求</span>\n' +
  'Spark.<span class="fn">http</span>.<span class="fn">get</span>(<span class="str">\'/api/users\'</span>).<span class="fn">then</span>(<span class="kw">function</span>(res) {\n' +
  '  <span class="cm">// res.status  — HTTP 状态码</span>\n' +
  '  <span class="cm">// res.ok      — 是否成功 (200-299)</span>\n' +
  '  <span class="cm">// res.data    — 响应数据 (JSON自动解析)</span>\n' +
  '  <span class="cm">// res.headers — 响应头</span>\n' +
  '});\n\n' +
  '<span class="cm">// POST 请求（自动 JSON 序列化）</span>\n' +
  'Spark.<span class="fn">http</span>.<span class="fn">post</span>(<span class="str">\'/api/users\'</span>, {\n' +
  '  name: <span class="str">\'Spark\'</span>,\n' +
  '  role: <span class="str">\'admin\'</span>\n' +
  '}).<span class="fn">then</span>(<span class="kw">function</span>(res) {\n' +
  '  Spark.<span class="fn">Message</span>({ type: <span class="str">\'success\'</span>, content: res.data.msg });\n' +
  '});\n\n' +
  '<span class="cm">// PUT 请求</span>\n' +
  'Spark.<span class="fn">http</span>.<span class="fn">put</span>(<span class="str">\'/api/users/1\'</span>, { name: <span class="str">\'New Name\'</span> });\n\n' +
  '<span class="cm">// DELETE 请求</span>\n' +
  'Spark.<span class="fn">http</span>.<span class="fn">del</span>(<span class="str">\'/api/users/1\'</span>);\n\n' +
  '<span class="cm">// 自定义 headers</span>\n' +
  'Spark.<span class="fn">http</span>.<span class="fn">get</span>(<span class="str">\'/api/data\'</span>, {\n' +
  '  headers: { Authorization: <span class="str">\'Bearer token123\'</span> }\n' +
  '});\n\n' +
  '<span class="cm">// 通用 request 方法</span>\n' +
  'Spark.<span class="fn">http</span>.<span class="fn">request</span>(<span class="str">\'/api/upload\'</span>, {\n' +
  '  method: <span class="str">\'POST\'</span>,\n' +
  '  headers: { <span class="str">\'Content-Type\'</span>: <span class="str">\'multipart/form-data\'</span> },\n' +
  '  data: formData\n' +
  '});',
  [
    propItem("http.get(url, opts)", "Function", "-", "发送 GET 请求，返回 Promise"),
    propItem("http.post(url, data, opts)", "Function", "-", "发送 POST 请求，data 自动 JSON 序列化"),
    propItem("http.put(url, data, opts)", "Function", "-", "发送 PUT 请求"),
    propItem("http.del(url, opts)", "Function", "-", "发送 DELETE 请求"),
    propItem("http.request(url, opts)", "Function", "-", "通用请求，opts: {method, headers, data}"),
    propItem("返回值 res.status", "Number", "-", "HTTP 状态码"),
    propItem("返回值 res.ok", "Boolean", "-", "请求是否成功 (status 200-299)"),
    propItem("返回值 res.data", "Any", "-", "响应数据，Content-Type 为 JSON 时自动解析"),
    propItem("返回值 res.headers", "Headers", "-", "响应头对象"),
  ]
));

// ===== scrollTop 滚动 =====
docSections.push(compSection("comp-scrolltop", "Spark.scrollTop 平滑滚动", "编程式控制页面平滑滚动到指定位置，支持自定义动画时长和回调。",
  null,
  '<span class="cm">// 滚动到顶部（默认 500ms）</span>\n' +
  'Spark.<span class="fn">scrollTop</span>();\n\n' +
  '<span class="cm">// 滚动到底部</span>\n' +
  'Spark.<span class="fn">scrollTop</span>(<span class="str">\'bottom\'</span>);\n\n' +
  '<span class="cm">// 滚动到顶部</span>\n' +
  'Spark.<span class="fn">scrollTop</span>(<span class="str">\'top\'</span>);\n\n' +
  '<span class="cm">// 滚动到指定像素位置，动画 300ms</span>\n' +
  'Spark.<span class="fn">scrollTop</span>(<span class="num">500</span>, <span class="num">300</span>);\n\n' +
  '<span class="cm">// 滚动完成后执行回调</span>\n' +
  'Spark.<span class="fn">scrollTop</span>(<span class="num">0</span>, <span class="num">500</span>).<span class="fn">then</span>(<span class="kw">function</span>() {\n' +
  '  Spark.<span class="fn">Message</span>({ type: <span class="str">\'success\'</span>, content: <span class="str">\'已回到顶部\'</span> });\n' +
  '});',
  [
    propItem("val", "Number|String", "0", "滚动目标：像素值 / 'top' / 'bottom'"),
    propItem("time", "Number", "500", "动画时长(ms)"),
    propItem("callback", "Function", "null", "滚动过程中回调"),
    propItem("返回值.then", "Function", "-", "滚动完成后的回调"),
  ]
));

// ===== Screen 屏幕信息 =====
docSections.push(compSection("util-screen", "Spark.screen 屏幕信息", "获取屏幕宽高、滚动距离以及监听窗口尺寸变化，通过 Spark.screen 访问。",
  null,
  '<span class="cm">// 获取屏幕宽度</span>\n' +
  '<span class="kw">var</span> w = Spark.<span class="fn">screen</span>.<span class="fn">width</span>();\n' +
  '<span class="cm">// => 1920</span>\n\n' +
  '<span class="cm">// 获取屏幕高度</span>\n' +
  '<span class="kw">var</span> h = Spark.<span class="fn">screen</span>.<span class="fn">height</span>();\n' +
  '<span class="cm">// => 1080</span>\n\n' +
  '<span class="cm">// 获取页面滚动距离</span>\n' +
  '<span class="kw">var</span> top = Spark.<span class="fn">screen</span>.<span class="fn">scrollTop</span>();\n' +
  '<span class="cm">// => 200</span>\n\n' +
  '<span class="cm">// 获取页面总滚动高度</span>\n' +
  '<span class="kw">var</span> total = Spark.<span class="fn">screen</span>.<span class="fn">scrollHeight</span>();\n\n' +
  '<span class="cm">// 监听窗口尺寸变化（立即回调一次当前值）</span>\n' +
  'Spark.<span class="fn">screen</span>.<span class="fn">resize</span>(<span class="kw">function</span>(size) {\n' +
  '  console.log(size.width, size.height);\n' +
  '  <span class="cm">// 响应式布局处理</span>\n' +
  '  <span class="kw">if</span> (size.width < <span class="num">768</span>) {\n' +
  '    sidebar.show = <span class="kw">false</span>;\n' +
  '  }\n' +
  '});',
  [
    propItem("screen.width()", "Function", "-", "返回视口宽度 (px)"),
    propItem("screen.height()", "Function", "-", "返回视口高度 (px)"),
    propItem("screen.scrollTop()", "Function", "-", "返回当前页面垂直滚动距离 (px)"),
    propItem("screen.scrollHeight()", "Function", "-", "返回页面总可滚动高度 (px)"),
    propItem("screen.resize(cb)", "Function", "-", "监听窗口尺寸变化，回调参数 {width, height}，注册时立即执行一次"),
  ]
));

// ===== Env 环境检测 =====
docSections.push(compSection("util-env", "Spark.env 环境检测", "检测当前运行环境和浏览器类型，通过 Spark.env 访问。所有属性均为布尔值或字符串。",
  null,
  '<span class="cm">// 判断是否为移动端</span>\n' +
  '<span class="kw">if</span> (Spark.<span class="fn">env</span>.isMobile) {\n' +
  '  <span class="cm">// 启用触屏交互</span>\n' +
  '}\n\n' +
  '<span class="cm">// 判断微信浏览器</span>\n' +
  '<span class="kw">if</span> (Spark.<span class="fn">env</span>.isWeixin) {\n' +
  '  <span class="cm">// 调用微信 JSSDK</span>\n' +
  '}\n\n' +
  '<span class="cm">// 判断 iOS 系统</span>\n' +
  '<span class="kw">if</span> (Spark.<span class="fn">env</span>.isIOS) {\n' +
  '  <span class="cm">// iOS 特殊处理</span>\n' +
  '}\n\n' +
  '<span class="cm">// 判断 IE 浏览器</span>\n' +
  '<span class="kw">if</span> (Spark.<span class="fn">env</span>.isIE) {\n' +
  '  Spark.<span class="fn">Message</span>({ type: <span class="str">\'warning\'</span>, content: <span class="str">\'请升级浏览器\'</span> });\n' +
  '}\n\n' +
  '<span class="cm">// 获取 UA 字符串</span>\n' +
  'console.log(Spark.<span class="fn">env</span>.UA);',
  [
    propItem("env.inBrowser", "Boolean", "-", "是否在浏览器环境中"),
    propItem("env.UA", "String", "-", "浏览器 User-Agent 字符串 (小写)"),
    propItem("env.isMobile", "Boolean", "-", "是否为移动设备 (Android/iPhone/iPod 等)"),
    propItem("env.isIE", "Boolean", "-", "是否为 IE 浏览器"),
    propItem("env.isIE9", "Boolean", "-", "是否为 IE9"),
    propItem("env.isEdge", "Boolean", "-", "是否为 Edge 浏览器"),
    propItem("env.isAndroid", "Boolean", "-", "是否为 Android 系统"),
    propItem("env.isIOS", "Boolean", "-", "是否为 iOS 系统 (iPhone/iPad/iPod)"),
    propItem("env.isChrome", "Boolean", "-", "是否为 Chrome 浏览器"),
    propItem("env.isFF", "Boolean", "-", "是否为 Firefox 浏览器"),
    propItem("env.isWeixin", "Boolean", "-", "是否为微信浏览器"),
    propItem("env.isQQ", "Boolean", "-", "是否为 QQ 浏览器"),
  ]
));

// ===== 防抖 / 节流 =====
docSections.push(compSection("util-debounce", "防抖 debounce / 节流 throttle", "Spark.Util 提供防抖和节流函数，用于高频事件（输入、滚动、窗口调整等）的性能优化。",
  null,
  '<span class="cm">// 防抖 - 输入停止 300ms 后才执行搜索</span>\n' +
  '<span class="kw">var</span> search = Spark.<span class="fn">Util</span>.<span class="fn">debounce</span>(<span class="kw">function</span>(e) {\n' +
  '  console.log(<span class="str">\'搜索:\'</span>, e.target.value);\n' +
  '  <span class="cm">// 发起搜索请求</span>\n' +
  '  Spark.<span class="fn">http</span>.<span class="fn">get</span>(<span class="str">\'/api/search?q=\'</span> + e.target.value);\n' +
  '}, <span class="num">300</span>);\n\n' +
  '<span class="kw">var</span> input = Spark.<span class="fn">Input</span>(<span class="str">\'搜索...\'</span>, {\n' +
  '  on: { input: search }\n' +
  '});\n\n' +
  '<span class="cm">// 节流 - 滚动时每 200ms 最多执行一次</span>\n' +
  '<span class="kw">var</span> onScroll = Spark.<span class="fn">Util</span>.<span class="fn">throttle</span>(<span class="kw">function</span>() {\n' +
  '  <span class="kw">var</span> top = Spark.<span class="fn">screen</span>.<span class="fn">scrollTop</span>();\n' +
  '  backTopBtn.show = top > <span class="num">300</span>;\n' +
  '}, <span class="num">200</span>);\n\n' +
  'window.addEventListener(<span class="str">\'scroll\'</span>, onScroll);',
  [
    propItem("Util.debounce(fn, delay)", "Function", "-", "防抖：连续触发后延迟 delay(ms) 执行，期间有新触发则重新计时"),
    propItem("Util.throttle(fn, delay)", "Function", "-", "节流：高频触发时每 delay(ms) 最多执行一次 fn"),
    propItem("fn", "Function", "-", "要执行的回调函数"),
    propItem("delay", "Number", "-", "时间间隔 (毫秒)"),
  ]
));

// ===== URL 参数处理 =====
docSections.push(compSection("util-url", "URL 参数处理", "提供 URL query 参数的序列化、解析和提取，通过 Spark.Util 访问。",
  null,
  '<span class="cm">// 对象转 query 字符串</span>\n' +
  '<span class="kw">var</span> qs = Spark.<span class="fn">Util</span>.<span class="fn">objectToQueryString</span>({\n' +
  '  page: <span class="num">1</span>,\n' +
  '  size: <span class="num">20</span>,\n' +
  '  keyword: <span class="str">\'Spark\'</span>\n' +
  '});\n' +
  '<span class="cm">// => "?page=1&size=20&keyword=Spark"</span>\n\n' +
  '<span class="cm">// 获取单个 URL 参数</span>\n' +
  '<span class="kw">var</span> page = Spark.<span class="fn">Util</span>.<span class="fn">getQueryParam</span>(<span class="str">\'page\'</span>);\n' +
  '<span class="cm">// => "1" (从当前 location.href 获取)</span>\n\n' +
  '<span class="cm">// 从指定 URL 获取参数</span>\n' +
  '<span class="kw">var</span> id = Spark.<span class="fn">Util</span>.<span class="fn">getQueryParam</span>(<span class="str">\'id\'</span>, <span class="str">\'https://example.com?id=42\'</span>);\n' +
  '<span class="cm">// => "42"</span>\n\n' +
  '<span class="cm">// 解析完整 URL query 为对象</span>\n' +
  '<span class="kw">var</span> params = Spark.<span class="fn">Util</span>.<span class="fn">urlQuery</span>();\n' +
  '<span class="cm">// => { page: "1", size: "20" }</span>\n\n' +
  '<span class="cm">// 解析指定 URL</span>\n' +
  '<span class="kw">var</span> params2 = Spark.<span class="fn">Util</span>.<span class="fn">urlQuery</span>(<span class="str">\'https://example.com?a=1&b=2\'</span>);\n' +
  '<span class="cm">// => { a: "1", b: "2" }</span>',
  [
    propItem("Util.objectToQueryString(obj)", "Function", "-", "将对象序列化为 URL query 字符串，自动 encodeURIComponent"),
    propItem("Util.getQueryParam(name, url?)", "Function", "-", "获取指定参数值，url 可选，默认当前页面地址"),
    propItem("Util.urlQuery(url?)", "Function", "-", "将 URL 所有 query 参数解析为对象，支持 hash 路由中的参数"),
  ]
));

// ===== 数据操作 =====
docSections.push(compSection("util-data", "数据操作工具", "常用的数据操作方法，包括深拷贝、数组去重、遍历、字符串处理等，通过 Spark.Util 访问。",
  null,
  '<span class="cm">// 深拷贝对象</span>\n' +
  '<span class="kw">var</span> original = { a: <span class="num">1</span>, b: { c: [<span class="num">2</span>, <span class="num">3</span>] } };\n' +
  '<span class="kw">var</span> copy = Spark.<span class="fn">Util</span>.<span class="fn">deepCopyObj</span>(original);\n' +
  'copy.b.c.push(<span class="num">4</span>);\n' +
  '<span class="cm">// original.b.c => [2, 3] (不受影响)</span>\n\n' +
  '<span class="cm">// 数组去重</span>\n' +
  '<span class="kw">var</span> arr = Spark.<span class="fn">Util</span>.<span class="fn">unique</span>([<span class="num">1</span>, <span class="num">2</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">3</span>, <span class="num">3</span>]);\n' +
  '<span class="cm">// => [1, 2, 3]</span>\n\n' +
  '<span class="cm">// 通用遍历（数组、对象、数字）</span>\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">traverse</span>([<span class="str">\'a\'</span>, <span class="str">\'b\'</span>, <span class="str">\'c\'</span>], <span class="kw">function</span>(item, i, isLast) {\n' +
  '  console.log(i, item, isLast);\n' +
  '});\n\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">traverse</span>({ name: <span class="str">\'Spark\'</span>, ver: <span class="str">\'1.0\'</span> }, <span class="kw">function</span>(key) {\n' +
  '  console.log(key); <span class="cm">// "name", "ver"</span>\n' +
  '});\n\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">traverse</span>(<span class="num">5</span>, <span class="kw">function</span>(i, isLast) {\n' +
  '  console.log(i); <span class="cm">// 0, 1, 2, 3, 4</span>\n' +
  '});\n\n' +
  '<span class="cm">// 字符串处理</span>\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">trim</span>(<span class="str">\'  hello  \'</span>);     <span class="cm">// => "hello"</span>\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">trimAll</span>(<span class="str">\'h e l l o\'</span>);  <span class="cm">// => "hello"</span>\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">includes</span>(<span class="str">\'Spark.js\'</span>, <span class="str">\'Spark\'</span>); <span class="cm">// => true</span>\n\n' +
  '<span class="cm">// 条件数组查找</span>\n' +
  '<span class="kw">var</span> users = [{ id: <span class="num">1</span>, name: <span class="str">\'A\'</span> }, { id: <span class="num">2</span>, name: <span class="str">\'B\'</span> }];\n' +
  '<span class="kw">var</span> idx = Spark.<span class="fn">Util</span>.<span class="fn">isInArray</span>(users, { a: <span class="str">\'id\'</span>, b: <span class="num">2</span> });\n' +
  '<span class="cm">// => 1 (索引位置)</span>\n\n' +
  '<span class="cm">// 条件数组删除</span>\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">compareRemove</span>(users, { a: <span class="str">\'id\'</span>, b: <span class="num">1</span> });\n' +
  '<span class="cm">// users => [{ id: 2, name: "B" }]</span>',
  [
    propItem("Util.deepCopyObj(obj)", "Function", "-", "深拷贝对象或数组，返回全新的复制体"),
    propItem("Util.unique(arr)", "Function", "-", "数组去重，返回新数组"),
    propItem("Util.traverse(data, cb)", "Function", "-", "通用遍历：支持数组 (item, i, isLast)、对象 (key)、数字 (i, isLast)"),
    propItem("Util.trim(str)", "Function", "-", "去除字符串首尾空白"),
    propItem("Util.trimAll(str)", "Function", "-", "去除字符串所有空白字符"),
    propItem("Util.includes(str, substr)", "Function", "-", "判断字符串是否包含子串"),
    propItem("Util.isInArray(arr, compare)", "Function", "-", "条件查找，compare: {a: key, b: value}，返回索引或 -1"),
    propItem("Util.isInArrayIncludes(arr, compare)", "Function", "-", "模糊查找，同 isInArray 但使用 includes 匹配"),
    propItem("Util.compareRemove(arr, compare)", "Function", "-", "条件删除数组元素，compare: {a: key, b: value}"),
    propItem("Util.getImgInfo(url, cb)", "Function", "-", "获取图片尺寸，回调 {width, height}"),
  ]
));

// ===== 动态加载 =====
docSections.push(compSection("util-script", "动态加载脚本 / 文件", "运行时动态加载外部 JS 文件或以 XHR 获取文本文件内容。",
  null,
  '<span class="cm">// 动态加载外部 JS 脚本</span>\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">loadScript</span>(<span class="str">\'https://cdn.example.com/chart.js\'</span>, <span class="kw">function</span>(el) {\n' +
  '  <span class="cm">// el 是创建的 script 元素</span>\n' +
  '  console.log(<span class="str">\'Chart.js 加载完成\'</span>);\n' +
  '  <span class="cm">// 现在可以使用 Chart 全局变量</span>\n' +
  '});\n\n' +
  '<span class="cm">// 获取文本文件内容</span>\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">getFile</span>(<span class="str">\'./template.html\'</span>,\n' +
  '  <span class="kw">function</span>(text) {\n' +
  '    console.log(<span class="str">\'内容:\'</span>, text);\n' +
  '  },\n' +
  '  <span class="kw">function</span>() {\n' +
  '    Spark.<span class="fn">Message</span>({ type: <span class="str">\'error\'</span>, content: <span class="str">\'文件加载失败\'</span> });\n' +
  '  }\n' +
  ');',
  [
    propItem("Util.loadScript(url, cb)", "Function", "-", "动态创建 script 标签并加载 JS 文件，加载完成后回调"),
    propItem("Util.getFile(filepath, resolve, reject)", "Function", "-", "通过 XHR GET 获取文本文件，成功返回 responseText"),
    propItem("url / filepath", "String", "-", "资源地址"),
    propItem("cb / resolve", "Function", "-", "加载成功回调"),
    propItem("reject", "Function", "null", "加载失败回调（仅 getFile）"),
  ]
));

// ===== DevTool 调试 =====
docSections.push(compSection("util-devtool", "DevTool 移动端调试", "快速加载 Eruda 移动端调试工具，在手机浏览器中查看 console、DOM、网络请求等。",
  null,
  '<span class="cm">// 加载默认 CDN 的 Eruda 调试工具</span>\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">devTool</span>();\n\n' +
  '<span class="cm">// 使用自定义 CDN 地址</span>\n' +
  'Spark.<span class="fn">Util</span>.<span class="fn">devTool</span>(<span class="str">\'https://cdn.jsdelivr.net/npm/eruda\'</span>);\n\n' +
  '<span class="cm">// 生产环境条件加载</span>\n' +
  '<span class="kw">if</span> (Spark.<span class="fn">Util</span>.<span class="fn">getQueryParam</span>(<span class="str">\'debug\'</span>) === <span class="str">\'1\'</span>) {\n' +
  '  Spark.<span class="fn">Util</span>.<span class="fn">devTool</span>();\n' +
  '}',
  [
    propItem("Util.devTool(url?)", "Function", "-", "加载 Eruda 移动端调试面板，url 可选自定义 CDN 地址"),
  ]
));

/* ==================== 主内容区 ==================== */
var mainContent = Spark.Box({
  style: "margin-left:220px;padding:80px 40px 60px;max-width:960px;",
  child: [
    Spark.Text("组件文档", { tag: "h1", style: "font-size:32px;font-weight:800;margin-bottom:8px;" }),
    Spark.Text("Spark.js 提供了 63 个内置组件和丰富的工具方法，以下是完整的用法和 API 参考。", {
      style: "font-size:15px;color:#64748b;margin-bottom:32px;",
    }),
    Spark.Divider(""),
  ].concat(docSections),
});

/* ==================== 页面 ==================== */
Spark.Page({
  link: { name: "components", path: "/" },
  style: "min-height:100vh;background:#fff;",
  child: [topNav, sidebar, mainContent],
});

// 滚动高亮侧边栏
window.addEventListener("scroll", function () {
  var scrollTop = window.scrollY + 100;
  for (var i = sidebarLinks.length - 1; i >= 0; i--) {
    var el = document.getElementById(sidebarLinks[i].id);
    if (el && el.offsetTop <= scrollTop) {
      sidebarLinks.forEach(function (sl) {
        sl.widget.style = "color:#555;border-left-color:transparent;background-color:transparent;";
      });
      sidebarLinks[i].widget.style = "color:#4B95FF;border-left-color:#4B95FF;background-color:#f0f4ff;";
      break;
    }
  }
});

// Handle hash navigation
if (window.location.hash) {
  setTimeout(function () {
    var el = document.getElementById(window.location.hash.substring(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 500);
}

// 页面右下角回到顶部按钮
Spark.BackTop({ visibilityHeight: 300 });
