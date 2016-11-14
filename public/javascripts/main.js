// Main js file
(function(){
  $(document).ready(() => {

    $('.toggle-menu').click((e) => {
      e.preventDefault();
      $('body').toggleClass('active-menu');
    });

    $(document).foundation();
    var windowHeight = $(window).height();
    var height = windowHeight - $('.top-menu').height();
    $('.stretch-height').height(height);
    $('.stretch-height-with').height(windowHeight);    

    $(window).scroll((e) => {
      var windowTop = $(window).scrollTop();
      var top = -100 + windowTop * 0.1;
      $('.nice-scroll-img').css('background-position-y', top+'px');
      // moveEvents(windowTop);
    });

    var moveEvents = (windowTop) => {
      var blocks = $('.scroll-paralax');
      $.each(blocks, (i, e) => {
        var vel = $(e).data('vel');
        var finalTopPosition = vel * windowTop;
        console.log(finalTopPosition);
        $(e).css({'top': -finalTopPosition+"px"});
      });
    }


  });
})();
