import Spark from "../index.js";

var Carousel = Spark.Carousel({
  style: "width:650px;height:300px;margin:50px auto;background-color:#000;",
  option: {
    //direction:'vertical',//vertical horizontal
    // speed:1000,
    // autoPlay:5000,
    initSlide: 2,
    pagination: true,
    // touchRatio:0.5,
    // allowTouchMove:false
  },
  onInit: function () {
    console.log(this.activeIndex);
  },
  on: {
    slideStart: function () {
      console.log("slideStart", this.activeIndex);
    },
    slideEnd: function () {
      console.log("slideEnd", this.activeIndex);
    },
  },
  child: [
    Spark.Box({
      child: [
        Spark.Image(
          "http://p1.music.126.net/iMILqNtgdhnyJdTqUUly1Q==/109951165347186457.jpg?imageView&quality=89",
          {
            style: "width:100%;height:100%;",
          }
        ),
      ],
    }),
    Spark.Box({
      child: [
        Spark.Image(
          "http://p1.music.126.net/VPbE1x7XACrAEMACVAr6Sw==/109951165347585577.jpg?imageView&quality=89",
          {
            style: "width:100%;height:100%;",
          }
        ),
      ],
    }),
    Spark.Box({
      child: [
        Spark.Image(
          "http://p1.music.126.net/4TWDMkbgrNcjqOdQczE-Uw==/109951165348628815.jpg?imageView&quality=89",
          {
            style: "width:100%;height:100%;",
          }
        ),
      ],
    }),
    Spark.Box({
      child: [
        Spark.Image(
          "http://p1.music.126.net/L6_IG46iPayW5JgDcWIaGw==/109951165349039245.jpg?imageView&quality=89",
          {
            style: "width:100%;height:100%;",
          }
        ),
      ],
    }),
    Spark.Box({
      child: [
        Spark.Image(
          "http://p1.music.126.net/Q6NQhyIFFwtPEPQghDvHgA==/109951165346336516.jpg?imageView&quality=89",
          {
            style: "width:100%;height:100%;",
          }
        ),
      ],
    }),
  ],
});

var btncss = Spark.Css(
  "background:#9300FF;color:#fff;border-radius:5px;padding:20px 10px;margin:5px;"
);

var option1 = Spark.Text("上一个", {
  className: btncss,
  on: {
    click() {
      Carousel.slidePrev();
    },
  },
});
var option2 = Spark.Text("下一个", {
  className: btncss,
  on: {
    click() {
      Carousel.slideNext();
    },
  },
});

var option3 = Spark.Text("滑动到第三个", {
  className: btncss,
  on: {
    click() {
      Carousel.slideTo(2);
    },
  },
});

var option4 = Spark.Text("尾部添加", {
  className: btncss,
  on: {
    click() {
      Carousel.appendSlide(
        Spark.Box({
          child: [
            Spark.Image(
              "http://p1.music.126.net/Q6NQhyIFFwtPEPQghDvHgA==/109951165346336516.jpg?imageView&quality=89",
              {
                style: "width:100%;height:100%;",
              }
            ),
          ],
        })
      );
    },
  },
});
var option5 = Spark.Text("头部添加", {
  className: btncss,
  on: {
    click() {
      Carousel.prependSlide(
        Spark.Box({
          style: "background:#9300FF;",
          child: [Spark.Text("新增")],
        })
      );
    },
  },
});

var option6 = Spark.Text("关闭自动轮播", {
  className: btncss,
  on: {
    click() {
      if (!Carousel.option.autoPlay) {
        Carousel.startAutoPlay(); // Carousel.startAutoPlay(2000);
        this.text = "开始自动轮播";
      } else {
        Carousel.stopAutoPlay();
        this.text = "关闭自动轮播";
      }
    },
  },
});

var optionBox = Spark.Fixed({
  style:
    "width:100%;display:flex;justify-content:center;top:50%;margin-top:-25px;background:transparent;",
  child: [option1, option2, option3, option4, option5, option6],
});
Spark.Page({
  //定义路由信息
  link: {
    name: "page1",
    path: "/",
  },
  style:
    "width:100%;min-height:" +
    Spark.screen.height() +
    "px;background-color:#fff;color:#34495e;overflow:hidden;padding:0;",
  child: [Carousel, optionBox],
});
