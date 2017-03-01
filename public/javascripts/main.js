// Main js file
(function(){
  $(document).ready(() => {

    $('.toggle-menu').click((e) => {
      e.preventDefault();
      $('body').toggleClass('active-menu');
    });

    $("#toggleCalendar").click((e) => {
      e.preventDefault();
      $(this).toggleClass("active");
      $(".toggleCalendar").slideToggle();
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
        $(e).css({'top': -finalTopPosition+"px"});
      });
    }

  });
})();
