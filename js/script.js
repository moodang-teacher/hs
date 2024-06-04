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

  // $window.on('resize', setWhiteBackground);
  $window.on('resize', () => {
    setWhiteBackground();
    setManagementHeight();
  });

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

  function setManagementHeight() {
    const titleHeight = $('.management .sec-title').outerHeight();
    const sliderHeight = $('.management-list-wrap').outerHeight();
    const managementHeight = titleHeight + sliderHeight;
    console.log(titleHeight, sliderHeight, managementHeight);

    $('.management').css('height', `calc(${managementHeight + 160}px + 15vw)`);
  }

  setManagementHeight();

  const progressCircle = document.querySelector('.autoplay-progress svg');
  const progressContent = document.querySelector('.autoplay-progress span');

  const progressBar = document.querySelector('.progress-bar');

  const managementList = new Swiper('.management-list', {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    centeredSlides: true,
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    on: {
      autoplayTimeLeft(s, time, progress) {
        // s: Swiper 인스턴스입니다.
        // time: 남은 시간(밀리초)입니다.
        // progress: 진행 상태(0에서 1 사이의 값)입니다.
        // console.log(time, progress);

        const progressValue = 1 - progress;
        progressCircle.style.setProperty('--progress', progressValue);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;

        progressBar.style.width = progressValue * 100 + '%';
      },
    },

    breakpoints: {
      1024: {
        slidesPerView: 4, // 가로 크기 675px을 위해 (2700 / 4)
      },
    },
  });

  const $btnPlay = $('.btn-play');
  const $btnPause = $('.btn-pause');
  $btnPlay.hide();

  $btnPause.on('click', function () {
    managementList.autoplay.stop();
    $(this).hide();
    $btnPlay.show();
  });

  $btnPlay.on('click', function () {
    managementList.autoplay.start();
    $(this).hide();
    $btnPause.show();
  });
});
