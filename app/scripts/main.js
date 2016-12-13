$(document).ready(function () {
  $('#gallery .pictures').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  });
})

$(function() {

  var $nav = $('nav.main-nav');
  var $btn = $('nav.main-nav button');
  var $vlinks = $('nav.main-nav .links');
  var $hlinks = $('nav.main-nav .hidden-links');

  var numOfItems = 0;
  var totalSpace = 0;
  var breakWidths = [];

  // Get initial state
  $vlinks.children().outerWidth(function(i, w) {
    totalSpace += w;
    numOfItems += 1;
    breakWidths.push(totalSpace);
  });

  var availableSpace, numOfVisibleItems, requiredSpace;

  function check() {

    // Get instant state
    availableSpace = $vlinks.width() - 10;
    numOfVisibleItems = $vlinks.children().length;
    requiredSpace = breakWidths[numOfVisibleItems - 1];

    // There is not enought space
    if (requiredSpace > availableSpace) {
      $vlinks.children().last().prependTo($hlinks);
      numOfVisibleItems -= 1;
      check();
      // There is more than enough space
    } else if (availableSpace > breakWidths[numOfVisibleItems]) {
      $hlinks.children().first().appendTo($vlinks);
      numOfVisibleItems += 1;
    }
    // Update the button accordingly
    $btn.attr('count', numOfItems - numOfVisibleItems);
    if (numOfVisibleItems === numOfItems) {
      $btn.addClass('hidden');
    } else $btn.removeClass('hidden');
  }

  // Window listeners
  $(window).resize(function() {
    check();
  });

  $btn.on('click', function() {
    $hlinks.toggleClass('hidden');
  });

  check();

});


function init() {
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop;
        var shrinkOn = 300;
        var nav = document.querySelector('.main-nav');
        if (distanceY > shrinkOn) {
            nav.classList.add('smaller');
        } else {
            if (nav.classList.contains('smaller')) {
                nav.classList.remove('smaller');
            }
        }
    });
}
window.onload = init();




$(document).ready(function () {
    $(document).on('scroll', onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off('scroll');
        
        $('a').each(function () {
            $(this).removeClass('--active');
        })
        $(this).addClass('--active');
      
        var target = this.hash;
        var menu = target;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on('scroll', onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.main-nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
            $('.main-nav  ul li a').removeClass('--active');
            currLink.addClass('--active');
        }
        else{
            currLink.removeClass('--active');
        }
    });
}