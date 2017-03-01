//Position
(function() {

  $(window).scroll((e) => {

    var windowTop = $(window).scrollTop();
    var top = windowTop * 0.6;
    var top2 = windowTop * 0.9;

    $(".in-wrap-square .up").css("transform", "translateY(-"+top+"px)");
    $(".in-wrap-square .down").css("transform", "translateY(-"+top2+"px)");

  });

})();
