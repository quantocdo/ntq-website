const openNav = document.getElementById('open-nav');
const contentNav = document.getElementById('content-nav');

openNav.onclick = function () {
  contentNav.classList.add('is-active');
  document.querySelector('html').classList.add('disable-scroll');
}

window.addEventListener('touchstart', function (event) {
  if (event.target == contentNav) {
    contentNav.classList.remove('is-active');
    document.querySelector('html').classList.remove('disable-scroll');
  }
});

$(document).ready(function () {
  //slider
  $('.js-reason-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false
  });

	alert('abc');
	console.log('fwfewf');

  $('.js-rnd-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    mobileFirst: true,
    responsive: [{
      breakpoint: 991,
      settings: "unslick"
    }]
  });

  $('.js-team-detail').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    fade: true,
    asNavFor: '.js-team-thumnail'
  });

  $('.js-team-thumnail').slick({
    slidesToShow: 2,
    infinite: true,
    slidesToScroll: 1,
    asNavFor: '.js-team-detail',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    arrows: true
  });

  //r&d background
  $('.js-rnd-item').on('click', function () {
    var bg = $(this).data('background');
    $('.js-rnd-background').css('background-image', 'url(' + bg + ')');
  });

  //change navbar when scrolling
  $('.js-home').parent('main').siblings('.header').addClass('alter-navbar');
  $('.alter-navbar').addClass('bg-transparent');
  $('.alter-navbar').find('.js-logo').attr('src', '../images/logo-white.png');

  if ( $('.header').hasClass('alter-navbar') ) {
    $(document).on('scroll', function () {
      var navbarPosition = $('.alter-navbar').offset().top;
      var bannerContentPosition = $('.js-banner-content').offset().top;

      if (navbarPosition > (bannerContentPosition - 130)) {
        $('.alter-navbar').find('.js-logo').attr('src', '../images/logo.png');
        $('.alter-navbar').removeClass('bg-transparent');
      } else {
        $('.alter-navbar').find('.js-logo').attr('src', '../images/logo-white.png');
        $('.alter-navbar').addClass('bg-transparent');
      }
    });
  }

  //show toggle policies
  var breakpoint = 1262;
  var introContent = $('.js-introduce-content');

  var fullContent = introContent.html();
  var shortContent = introContent.html().slice(0, breakpoint);

  introContent.html(shortContent);

  $('.js-see-more').on('click', function() {
    introContent.toggleClass('open');
    $('.js-text-see-more').toggleClass('rotate');

    if (introContent.hasClass('open')) {
      introContent.html(fullContent);
    } else {
      introContent.html(shortContent);
    }
  });
});
