$(document).ready(function() {

  $('.navbar-toggle').click(function() {
    event.preventDefault();
    $('.links').slideToggle(400);
  });

  $('a.selection').on('click', function(e) {
    slidingAnchor.call(this, e);
    if (window.innerWidth < 768) {
      $('.links').slideUp(400);
    }
  })

  $(document).scroll(function() {

    var scrollPosition = $(document).scrollTop();

    if (document.querySelector('#process').getBoundingClientRect().top -
      document.querySelector('#process').offsetHeight - $('.navbar-top').height() < 0) {
      $('#process .square').css({
        transform: 'translateX(0%)'
      });
    }
    if (document.querySelector('#servises').getBoundingClientRect().top -
      document.querySelector('#servises').offsetHeight - $('.navbar-top').height() < 0) {
      $('#servises').animate({
        opacity: 1
      }, 3000);
    }

    $('.links a').each(function() {
      var currentLink = $(this);
      var element = $(currentLink.attr('href'));
      if (element.position().top <= scrollPosition &&
        element.position().top + element.height() > scrollPosition) {
        $('.links a').removeClass('activeLink');
        currentLink.addClass('activeLink');
      } else {
        currentLink.removeClass('activeLink');
      }
    })

    if (scrollPosition <=
      $('nav.navbar-top').outerHeight()) {

      $('nav.navbar-top').addClass('nav_transparent');

    } else {
      $('nav.navbar-top').removeClass('nav_transparent');
    }
    if (window.innerWidth < 768) {
      $('nav.navbar-top').removeClass('nav_transparent');
    }
    if (window.innerWidth > 480) {

      if ($(document).height() - $(window).height() <= $(document).scrollTop()) {

        $('.scroll-up').slideDown();
      } else {
        $('.scroll-up').slideUp()
      }
    }

  })

  $('.scroll-down a').on('click', slidingAnchor);
  $('.scroll-up').on('click', slidingAnchor);

  $('#contactForm').on('submit', function(e) {
    e.preventDefault();

    var arr = [checkName(), checkEmail(), checkMessage(), checkCaptcha()];

    var result = 0;
    for (var i = 0; i < arr.length; i++) {
      result += arr[i]
    }
    if (result == arr.length) {
      sendAjax();
    }

  });

  function check(container, message, condition) {

    var div = document.createElement('div');
    div.innerHTML = message;
    div.className = 'form_message_alert';
    if (condition) {
      if (!container.nextElementSibling.classList.contains("form_message_alert")) {
        container.classList.add('error_border');
        container.insertAdjacentElement('afterEnd', div);
        $(div).offset({
          top: $(container).offset().top + $(container).height() + 17,
          left: $(container).offset().left
        });
      }
      return 0;
    } else if (!condition) {
      if (container.nextElementSibling.classList.contains("form_message_alert")) {
        container.nextElementSibling.remove();
        container.classList.remove('error_border');
      }
      return 1;
    }
  }

  function checkName() {

    var container = document.querySelector('.data_user.name');
    var message = "Your name should be between 1 and 20 symbols";
    var condition = container.value.length < 1 || container.value.length > 20;
    return check(container, message, condition);
  }

  function checkEmail() {

    var container = document.querySelector('.data_user.email');
    var message = "Your Email should be between 1 and 20 symbols";
    var condition = container.value.length < 1 || container.value.length > 20;
    return check(container, message, condition);
  }

  function checkMessage() {

    var container = document.querySelector('.user_message');
    var message = "Your message should be between 1 and 3000 symbols";
    var condition = container.value.length < 1 || container.value.length > 3000;
    return check(container, message, condition);
  }

  function checkCaptcha(data) {
    var container = document.querySelector('.captcha_check');
    var message = "Enter captcha from the image above";
    var condition = container.value.length !== 5;
    if (data) {
      condition = data == '0';
    }

    return check(container, message, condition);
  }



  $('#refresh').on('click', changeCaptcha);

  function changeCaptcha() {
    $('.capture_img img').attr('src', 'php/captcha.php?rnd=' + Math.random());
    $('.captcha_check').val('');
  };

  function sendAjax() {

    var msg = $('#contactForm').serialize();
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1/mysite/php/contact.php',
      data: msg
    }).done(function(data) {


      if (data == 1) {

        $('.success').fadeIn(500).fadeOut(3000);
        changeCaptcha();
        resetFields();
        checkCaptcha(data);
      } else {
        // $('.error').fadeIn(500).fadeOut(3000);
        checkCaptcha(data);
      }

    })
  }

  function resetFields() {
    $('.data_user.name').val('');
    $('.data_user.email').val('');
    $('.user_message').val('');
    $('.captcha_check').val('');
  }

  function slidingAnchor(e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1000);
  }

})
