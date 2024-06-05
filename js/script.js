$(function () {
  // GNB
  const $window = $(window);
  const $header = $('#header');
  const $menu = $('.gnb > li');
  const $submenu = $('.submenu-wrap');
  const $banner = $('.banner-slide');
  const $btnMenu = $('.btn-menu');
  const duration = 300;

  // 모바일
  const $btnMmenu = $('.btn-m-menu');
  const $mSubmenu = $('.m-submenu-wrap');
  const $dim = $('.dim');
  const $btnClose = $('.btn-close');
  const $mGnbMenu = $('.m-gnb > li');
  const $mGnbSubmenu = $('.m-gnb-sub');

  // 모바일 용 메뉴를 클릭했을 때
  $mGnbMenu.on('click', function () {
    $(this).toggleClass('on');
    $(this).siblings().removeClass('on');
    $(this).find($mGnbSubmenu).stop().slideToggle(duration);
    $(this).siblings().find($mGnbSubmenu).stop().slideUp(duration);
  });

  $btnMmenu.on('click', function () {
    $mSubmenu.addClass('active');
    $dim.fadeIn(duration);
  });

  $btnClose.add($dim).on('click', function () {
    $mSubmenu.removeClass('active');
    $dim.fadeOut(duration);

    // 모바일 용 서브메뉴 초기화
    $mGnbMenu.removeClass('on');
    $mGnbSubmenu.stop().slideUp(duration);
  });

  // 마우스가 메뉴에 들어오면(mouseenter)
  $menu.on('mouseenter', function () {
    const menuIdx = $(this).index();
    $menu.removeClass('on').eq(menuIdx).addClass('on');
    $submenu.find('li').removeClass('on').eq(menuIdx).addClass('on');

    openMenu();
  });

  // 마우스가 메뉴에 나가면(mouseleave)
  $header.on('mouseleave', function () {
    $menu.removeClass('on');
    $submenu.find('li').removeClass('on');
    closeMenu();
  });

  // 메뉴 버튼을 클릭했을 때
  $btnMenu.on('click', openMenu);

  // 메뉴의 동작을 함수로 정의
  function openMenu() {
    $header.addClass('active');
    $submenu.stop().fadeIn(duration);
    $banner.stop().fadeIn(duration);
  }

  function closeMenu() {
    $header.removeClass('active');
    $submenu.stop().fadeOut(duration);
    $banner.stop().fadeOut(duration);
  }

  let scrollTop = $window.scrollTop();
  setWhiteBackground();

  function setWhiteBackground() {
    const visualHeight = $('.visual').outerHeight();
    if (scrollTop >= visualHeight) {
      $header.addClass('w-bg');
    } else {
      $header.removeClass('w-bg');
    }
  }

  $window.on('resize', setWhiteBackground);

  // 스크롤 이벤트
  $window.on('scroll', function () {
    // 얼마나 스크롤 되었는지 값을 구해서 저장
    scrollTop = $(this).scrollTop();
    setWhiteBackground();
  });

  // 언어 선택
  $('.btn-lang').on('click', function () {
    $('.lang-select').stop().slideToggle(duration);
  });

  // family site
  $('.family-site select').on('change', function () {
    const linkValue = $(this).val();
    window.open(linkValue);
  });

  // AOS.js
  AOS.init({
    duration: 600,
    offset: 200,
  });

  // 지속가능경영 슬라이더
  const managementList = new Swiper('.management-list', {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    centeredSlides: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },

    breakpoints: {
      1024: {
        slidesPerView: 4, // 가로 크기 675px을 위해 (2700 / 4)
      },
    },

    on: {
      autoplayTimeLeft(swiper, timeLeft, percentage) {
        console.log(timeLeft, percentage);
        // timeLeft: 남은 시간(ms)
        // percentage: 진행상태를 1~0사이의 값으로 -->
        const percentageValue = (1 - percentage) * 100 + '%';
        document.querySelector('.progress-bar').style.width = percentageValue;
      },
    },
  });

  const $btnPause = $('.btn-pause');
  const $btnPlay = $('.btn-play');
  $btnPlay.hide();

  $btnPause.on('click', function () {
    managementList.autoplay.stop();
    $btnPause.hide();
    $btnPlay.show();
  });

  $btnPlay.on('click', function () {
    managementList.autoplay.start();
    $btnPlay.hide();
    $btnPause.show();
  });
});
