$(document).ready(function () {
  $('#gallery .pictures').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  });
})
