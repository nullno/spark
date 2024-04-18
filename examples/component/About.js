/*#include [Other->component/Other];
 */
var About = {
  render: function () {
    var Carousel2 = Spark.Carousel({
      style: "width:650px;height:300px;margin:0 auto;background-color:#000;",
      option: {
        //direction:'vertical',//vertical horizontal
        //speed:1000,
        autoPlay: true,
        // initSlide:0,
        pagination: true,
        // touchRatio:0.5,
      },
      child: [
        Spark.CarouselWrapper({
          child: [
            Spark.Box({
              style: "background:#FF8905;",
              child: [
                Spark.Image(
                  "http://p1.music.126.net/iMILqNtgdhnyJdTqUUly1Q==/109951165347186457.jpg?imageView&quality=89",
                  {
                    style: "width:100%;height:100%;display:block;",
                  }
                ),
              ],
            }),
            Spark.Box({
              style: "background:red;",
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
              style: "background:blue;",
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
              style: "background:#9300FF;",
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
              style: "background:#F7156A;",
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
        }),
      ],
    });

    var dd = Spark.Text("55555");
    var Page = Spark.Page({
      style:
        "width:100%;min-height:" +
        Spark.screen.height() +
        "px;background-color:red;overflow:auto;padding:20px 0; padding-bottom:50px;color:#fff;",
      //showAni:{ani:'fadeIn 500ms  both'},
      child: [Carousel2],
    });
    Spark.screen.resize(function (screen) {
      Page.style = "min-height:" + screen.height + "px;";
    });

    Spark.module.About = Page;
  },
};
