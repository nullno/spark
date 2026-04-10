/**
 * Carousel 轮播图
 */
import { D } from "../common.js";

export default function(p) {
  !p && (p = {});
  var items = p.items || p.child || [];
  var autoPlay = p.autoPlay || false;
  var interval = (typeof autoPlay === "number" ? autoPlay : 3000);
  var speed = p.speed || 500;
  var loop = p.loop !== false;
  var pagination = p.pagination !== false;
  var arrow = p.arrow || false;
  var direction = p.direction || "horizontal";
  var initSlide = p.initSlide || 0;
  var onChange = p.onChange || null;
  var containerStyle = p.style || "width:100%;height:300px;";

  var isVertical = direction === "vertical";
  var total = items.length;
  var timer = null;
  var animating = false;

  // loop 模式：track 布局为 [clone-last | 0 | 1 | ... | N-1 | clone-first]
  // slidePos = track 内的位置索引；activeIndex = 逻辑索引 0..N-1
  var useLoop = loop && total > 1;
  var cloneOffset = useLoop ? 1 : 0;         // loop 模式偏移量
  var activeIndex = initSlide;
  var slidePos = initSlide + cloneOffset;     // 初始 track 位置

  // Container
  var wrapEl = D.createElement("div");
  wrapEl.className = "spark-carousel";
  wrapEl.style.cssText = "position:relative;overflow:hidden;" + containerStyle;

  // Track
  var trackEl = D.createElement("div");
  trackEl.className = "spark-carousel-track";
  trackEl.style.cssText =
    "display:flex;height:100%;transition:transform " + speed + "ms ease;" +
    (isVertical ? "flex-direction:column;" : "");
  wrapEl.appendChild(trackEl);

  // 构造单个 slide DOM
  function buildSlide(item) {
    var slide = D.createElement("div");
    slide.className = "spark-carousel-slide";
    slide.style.cssText = "flex-shrink:0;width:100%;height:100%;";
    if (typeof item === "string") {
      if (/\.(jpg|jpeg|png|gif|svg|webp)/i.test(item)) {
        var img = D.createElement("img");
        img.src = item;
        img.style.cssText = "width:100%;height:100%;object-fit:cover;";
        slide.appendChild(img);
      } else {
        slide.innerHTML = item;
      }
    } else if (item && item.nodeType) {
      slide.appendChild(item);
    } else if (item && typeof item === "object") {
      if (item.$el) {
        slide.appendChild(item.$el);
      } else if (item.tag || item.type) {
        var el = D.createElement(item.tag || "div");
        if (item.style) el.style.cssText = item.style;
        if (item.text) el.textContent = item.text;
        if (item.imgurl) el.src = item.imgurl;
        slide.appendChild(el);
      }
    }
    return slide;
  }

  // 渲染 slides，loop 模式前后各插一个克隆
  function renderSlides() {
    var slideEls = [];
    for (var i = 0; i < total; i++) {
      slideEls.push(buildSlide(items[i]));
    }
    if (useLoop) {
      // 在最前插入最后一张的克隆（slidePos=0 时显示）
      trackEl.appendChild(slideEls[total - 1].cloneNode(true));
    }
    for (var j = 0; j < slideEls.length; j++) {
      trackEl.appendChild(slideEls[j]);
    }
    if (useLoop) {
      // 在最后插入第一张的克隆（slidePos=N+1 时显示）
      trackEl.appendChild(slideEls[0].cloneNode(true));
    }
  }

  // Pagination dots
  var dotItems = [];
  if (pagination && total > 1) {
    var dotsEl = D.createElement("div");
    dotsEl.className = "spark-carousel-pagination";
    dotsEl.style.cssText =
      "position:absolute;bottom:12px;left:50%;transform:translateX(-50%);" +
      "display:flex;gap:6px;z-index:2;";
    for (var i = 0; i < total; i++) {
      (function(idx) {
        var dot = D.createElement("span");
        dot.className = "spark-carousel-dot";
        dot.style.cssText =
          "width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.5);" +
          "cursor:pointer;transition:all 0.3s;";
        dot.onclick = function() { carousel.slideTo(idx); };
        dotItems.push(dot);
        dotsEl.appendChild(dot);
      })(i);
    }
    wrapEl.appendChild(dotsEl);
  }

  // Arrow buttons
  if (arrow && total > 1) {
    var arrowStyle =
      "position:absolute;top:50%;transform:translateY(-50%);z-index:2;width:36px;height:36px;" +
      "background:rgba(0,0,0,0.3);color:#fff;border:none;border-radius:50%;cursor:pointer;" +
      "display:flex;align-items:center;justify-content:center;font-size:18px;" +
      "transition:background 0.3s;";
    var prevBtn = D.createElement("button");
    prevBtn.className = "spark-carousel-arrow spark-carousel-arrow-prev";
    prevBtn.style.cssText = arrowStyle + "left:12px;";
    prevBtn.innerHTML = "&#10094;";
    prevBtn.onmouseover = function() { prevBtn.style.background = "rgba(0,0,0,0.6)"; };
    prevBtn.onmouseout = function() { prevBtn.style.background = "rgba(0,0,0,0.3)"; };
    prevBtn.onclick = function() { carousel.slidePrev(); };

    var nextBtn = D.createElement("button");
    nextBtn.className = "spark-carousel-arrow spark-carousel-arrow-next";
    nextBtn.style.cssText = arrowStyle + "right:12px;";
    nextBtn.innerHTML = "&#10095;";
    nextBtn.onmouseover = function() { nextBtn.style.background = "rgba(0,0,0,0.6)"; };
    nextBtn.onmouseout = function() { nextBtn.style.background = "rgba(0,0,0,0.3)"; };
    nextBtn.onclick = function() { carousel.slideNext(); };

    wrapEl.appendChild(prevBtn);
    wrapEl.appendChild(nextBtn);
  }

  // 根据 slidePos 推算逻辑 activeIndex（处理克隆位置）
  function syncActiveIndex() {
    if (useLoop) {
      activeIndex = slidePos - 1;
      if (activeIndex < 0) activeIndex = total - 1;
      if (activeIndex >= total) activeIndex = 0;
    } else {
      activeIndex = slidePos;
    }
  }

  // 执行 transform 并刷新 dots
  function applyTransform(animate) {
    var pct = slidePos * 100;
    trackEl.style.transition = animate ? "transform " + speed + "ms ease" : "none";
    trackEl.style.transform = isVertical
      ? "translateY(-" + pct + "%)"
      : "translateX(-" + pct + "%)";
    for (var i = 0; i < dotItems.length; i++) {
      dotItems[i].style.background = i === activeIndex ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)";
      dotItems[i].style.transform = i === activeIndex ? "scale(1.3)" : "scale(1)";
    }
  }

  // 动画结束后：loop 模式静默跳转至真实 slide（从克隆位置弹回）
  function afterSlide() {
    animating = false;
    if (!useLoop) return;
    // 滑到 clone-last（pos=0）-> 静默跳到真实 last（pos=total）
    if (slidePos === 0) {
      slidePos = total;
      syncActiveIndex();
      applyTransform(false);
    }
    // 滑到 clone-first（pos=total+1）-> 静默跳到真实 first（pos=1）
    if (slidePos === total + 1) {
      slidePos = 1;
      syncActiveIndex();
      applyTransform(false);
    }
  }

  // 核心滑动驱动
  function doSlide(targetPos, withAnim) {
    animating = true;
    slidePos = targetPos;
    syncActiveIndex();
    applyTransform(withAnim !== false);
    if (onChange) onChange(activeIndex);
    setTimeout(afterSlide, (withAnim !== false ? speed : 0) + 16);
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (!autoPlay || total <= 1) return;
    timer = setInterval(function() { carousel.slideNext(); }, interval);
  }

  function stopAutoPlay() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // ---- 统一拖动支持（鼠标 + 触屏） ----
  var dragStartX = 0, dragStartY = 0, dragDelta = 0, isDragging = false;

  wrapEl.style.cursor = total > 1 ? "grab" : "";
  wrapEl.style.userSelect = "none";
  wrapEl.style.webkitUserSelect = "none";

  function onDragStart(clientX, clientY) {
    if (total <= 1 || animating) return;
    stopAutoPlay();
    dragStartX = clientX;
    dragStartY = clientY;
    dragDelta = 0;
    isDragging = true;
    trackEl.style.transition = "none";
    wrapEl.style.cursor = "grabbing";
  }

  function onDragMove(clientX, clientY) {
    if (!isDragging) return;
    var dx = clientX - dragStartX;
    var dy = clientY - dragStartY;
    dragDelta = isVertical ? dy : dx;
    var containerSize = isVertical ? wrapEl.offsetHeight : wrapEl.offsetWidth;
    var percentDelta = containerSize > 0 ? (dragDelta / containerSize) * 100 : 0;
    var rawOffset = slidePos * 100 - percentDelta;

    if (!useLoop) {
      // 非 loop 模式：硬边界，超出部分给 20% 阻尼提示
      var minPct = 0;
      var maxPct = (total - 1) * 100;
      if (rawOffset < minPct) rawOffset = minPct + (rawOffset - minPct) * 0.2;
      if (rawOffset > maxPct) rawOffset = maxPct + (rawOffset - maxPct) * 0.2;
    }
    // loop 模式无边界限制，可以无限自由拖动

    trackEl.style.transform = isVertical
      ? "translateY(-" + rawOffset + "%)"
      : "translateX(-" + rawOffset + "%)";
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    wrapEl.style.cursor = total > 1 ? "grab" : "";

    var containerSize = isVertical ? wrapEl.offsetHeight : wrapEl.offsetWidth;
    var threshold = Math.min(containerSize * 0.25, 80); // 容器 25% 或最大 80px
    var prevPos = slidePos;

    if (Math.abs(dragDelta) > threshold) {
      if (dragDelta < 0) carousel.slideNext();
      else carousel.slidePrev();
    }

    // 若没有真正切换（边界阻断或未过阈值），弹回当前位置
    if (slidePos === prevPos) {
      animating = true;
      applyTransform(true);
      setTimeout(function() { animating = false; }, speed + 16);
    }

    if (autoPlay) startAutoPlay();
  }

  // 触屏事件
  wrapEl.addEventListener("touchstart", function(e) {
    onDragStart(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  wrapEl.addEventListener("touchmove", function(e) {
    onDragMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  wrapEl.addEventListener("touchend", function() { onDragEnd(); });
  wrapEl.addEventListener("touchcancel", function() { onDragEnd(); });

  // 鼠标事件（mousemove/mouseup 监听 document，避免拖出容器后丢失 mouseup）
  wrapEl.addEventListener("mousedown", function(e) {
    e.preventDefault();
    onDragStart(e.clientX, e.clientY);
  });
  function _onDocMouseMove(e) { onDragMove(e.clientX, e.clientY); }
  function _onDocMouseUp() { if (isDragging) onDragEnd(); }
  D.addEventListener("mousemove", _onDocMouseMove);
  D.addEventListener("mouseup", _onDocMouseUp);

  // 鼠标悬停暂停（非拖动状态才恢复）
  wrapEl.addEventListener("mouseenter", function() { if (!isDragging) stopAutoPlay(); });
  wrapEl.addEventListener("mouseleave", function() { if (!isDragging && autoPlay) startAutoPlay(); });

  renderSlides();
  applyTransform(false);

  var carousel = {
    $el: wrapEl,
    get activeIndex() { return activeIndex; },
    // slideTo 接受逻辑索引 0..N-1
    slideTo: function(index) {
      if (animating) return;
      if (index < 0) index = 0;
      if (index >= total) index = total - 1;
      var targetPos = index + cloneOffset;
      if (targetPos === slidePos) return;
      doSlide(targetPos, true);
    },
    slideNext: function() {
      if (animating) return;
      var nextPos = slidePos + 1;
      if (!useLoop && nextPos >= total) return; // 非 loop 到最后禁止继续
      doSlide(nextPos, true);
    },
    slidePrev: function() {
      if (animating) return;
      var prevPos = slidePos - 1;
      if (!useLoop && prevPos < 0) return; // 非 loop 到最前禁止继续
      doSlide(prevPos, true);
    },
    startAutoPlay: startAutoPlay,
    stopAutoPlay: stopAutoPlay,
    destroy: function() {
      stopAutoPlay();
      D.removeEventListener("mousemove", _onDocMouseMove);
      D.removeEventListener("mouseup", _onDocMouseUp);
      if (wrapEl.parentNode) wrapEl.parentNode.removeChild(wrapEl);
    },
  };

  if (autoPlay) startAutoPlay();

  return carousel;
}
