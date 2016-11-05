// Main js file
(function(){
  $(document).ready(function(){
    
    $(document).foundation();
    var windowHeight = $(window).height();
    var height = windowHeight - $('.top-menu').height();
    $('.stretch-height').height(height);
    $('.stretch-height-with').height(windowHeight);

    $(window).scroll((e) => {
        var top = -100 + $(window).scrollTop() * 0.1;
        $('.nice-scroll-img').css('background-position-y', top+'px');
    });
  });
})();
