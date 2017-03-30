//Position
(function() {

  $(window).scroll((e) => {

    var windowTop = $(window).scrollTop();
    var top = windowTop * 0.6;
    var top2 = windowTop * 0.9;

    $(".in-wrap-square .up").css("transform", "translateY(-"+top+"px)");
    $(".in-wrap-square .down").css("transform", "translateY(-"+top2+"px)");

  });

  $(".slider-slick").slick({
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "centerMode": true,
    "arrows": false,
    "responsive": [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });

})();
