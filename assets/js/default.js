$("window").load(function() {
  $("body").removeClass("preload");
});

var indexScript = function(){
  $showPhone = $(".show-phone");
  $hiddenPhones = $(".hidden-phone");
  $mailPlace = $("#mail-place");
  $hidenMailPlace = $("#mail-place>.hidden-mail");
  $showMail = $(".show-mail");

  var $submitFormBtn = $("#submit-form");

  var email1 = 'farmaciahumanitas.com.br';
  var email2 = 'contato' + '@';
  var emailFull = email2 + email1;

  $('.carousel').carousel({
    interval: 5000
  });

  $submitFormBtn.click(function(e){
    e.preventDefault();
    //goog_report_conversion("orcamento");
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var message = $("#message").val();
    var email = $("#email").val();

    if(message === '' || email === ''){
      $("#info-error").text("É necessario o preencimento dos campos e-mail e mensagem para enviar.");
      $("#info-error").fadeIn();
      setTimeout(function(){
        $("#info-error").fadeOut();
      }, 6000);
      return;
    }
    $("#info-send").fadeIn();
    var json_madrill = {
      "template_name": "contato",
      "template_content": [
      {
        "name":"title",
        "content":"E-mail de contato de " + $("#nome").val(),
      },
      {
        "name":"sub-title",
        "content":dd+"/"+mm+"/"+yyyy,
      },
      {
        "name":"content",
        "content":message,
      },
      {
        "name":"telefone",
        "content":$("#phone").val(),
      },
      {"name":"email",
      "content": email,
    }
    ],
    "message": {
      "text": "Example text content",
      "subject": "Orçamento pelo site | " + $("#nome").val(),
      "from_email": "contato@farmaciahumanitas.com.br",
      "from_name": "Farmácia Humanitas",
      "to": [
      {
        "email": emailFull,
        "name": "Humanitas",
      }
      ],
      "headers": {
        "Reply-To": emailFull
      },
    },
    "async": true};
    url = "https://mandrillapp.com/api/1.0/messages/send-template.json";
    $.ajax({url:url, data:json_madrill,type:"POST", success:function(msg){
      if(msg[0].status == "sent"){
        $("#info-send").fadeOut(300);
        setTimeout(function(){
          $("#info-sent").fadeIn(300);
        }, 300);
        setTimeout(function(){
          $("#info-sent").fadeOut(300);
        }, 30000);
        $("#nome").val("");
        $("#message").val("");
        $("#phone").val("");
        $("#email").val("");
      }else{
        $("#info-error").html("Erro no servidor, tentar novamente.");
        $("#info-error").fadeIn();
        setTimeout(function(){
          $("#info-error").fadeOut();
        }, 6000);
      }}});
  });
  $("#contactPoint").append($("<meta itemprop='email'>" + emailFull +"</meta>"));
  $mailPlace.prepend("<i class=\"fa fa-envelope\"></i> <span class=\"mailSlice\">"+email2+"</span>");

  $("#info-send").hide();
  $("#info-sent").hide();
  $("#info-error").hide();
  $hiddenPhones.each(hideElement);
  $hidenMailPlace.each(hideElement);

  $showPhone.each(addClickAction(showHiddenPhone));
  $showMail.each(addClickAction(showHiddenMail(emailFull)));
};

var contactScript = function(){
  $("#info-send").hide();
  $("#info-sent").hide();
  $("#info-error").hide();
  $submit_form_btn = $("#submit-form");
  $submit_form_btn.click(function(e){
    e.preventDefault();
    $("#info-send").fadeIn();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var message = $("#message").val();
    var email = $("#email").val();
    if(message === '' || email === ''){
      $("#info-error").html("É necessario o preencimento dos campos e-mail e mensagem para enviar.");
      $("#info-error").fadeIn();
      setTimeout(function(){
        $("#info-error").fadeOut();
      }, 3000);
      return;
    }
    var json_madrill = {
        "template_name": "contato",
        "template_content": [
            {
              "name":"title",
              "content":"E-mail de contato de " + $("#nome").val(),
            },
            {
              "name":"sub-title",
              "content":dd+"/"+mm+"/"+yyyy,
            },
            {
              "name":"content",
              "content":message,
            },
            {
              "name":"telefone",
              "content":$("#phone").val(),
            },
            {"name":"email",
             "content": email,
            }
        ],
        "message": {
            "text": "Example text content",
            "subject": "Contato pelo site | " + $("#nome").val(),
            "from_email": "contato@farmaciahumanitas.com.br",
            "from_name": "Farmácia Humanitas",
            "to": [
                {
                    "email": "contato@farmaciahumanitas.com.br",
                    "name": "Mateus",
                }
            ],
            "headers": {
                "Reply-To": "contato@farmaciahumanitas.com.br"
            },
        },
        "async": true,
    },
    url = "https://mandrillapp.com/api/1.0/messages/send-template.json";
    $.ajax({url:url, data:json_madrill,type:"POST", success:function(msg){
    if(msg[0].status == "sent"){
      $("#info-send").fadeOut(300);
      setTimeout(function(){
        $("#info-sent").fadeIn(300);
      }, 300);
      setTimeout(function(){
        $("#info-sent").fadeOut(300);
      }, 30000);
      $("#nome").val("");
      $("#message").val("");
      $("#phone").val("");
      $("#email").val("");
    }}});
  });
};

$(document).ready(function (){
  var $indexNavBtn = $("#index_nav_btn");
  var $orcamentosNavBtn = $("#orcamentos_nav_btn");
  var $contactNavBtn = $("#contact_nav_btn");
  var $aboutNavBtn = $("#about_nav_btn");
  var $mainContainer = $("#main_container");
  var $navbar = $(".navbar");
  var $footer = $("footer");
  var $adressLink = $("#adressLink");
  var $menu = $("#menu");
  var $blog = $("#blog");

  var actualPage = "ajax/index.html";
  var stickyNavTop = $navbar.offset().top;
  var navHeight = $menu.outerHeight(true);
  var stickyNavOn = false;

  var stickyNav = function(){
    var scrollTop = $(window).scrollTop();
    stickyNavOn = scrollTop > stickyNavTop;
    if (stickyNavOn) {
        $navbar.addClass('sticky');
    } else {
        $navbar.removeClass('sticky');
    }
  };

  showElement = function(){
    $(this).fadeIn();
  };

  hideElement = function(){
    $(this).hide();
  };

  cleanMailText = function(){
    $(this).find(".mailSlice").text("");
  };

  showHiddenPhone = function(){
    goog_report_conversion("telefone");
    $showPhone.each(hideElement);
    $hiddenPhones.each(showElement);
  };

  showHiddenMail = function(email){
    return function(){
      goog_report_conversion("email");
      $mailPlace.each(cleanMailText);
      $showMail.each(hideElement);
      $hidenMailPlace.each(showElement);
      $hidenMailPlace.append("<a href=\"mailto:"+email+"\">"+email+"</a>");
    };
  };

  addClickAction = function(action){
    return function(){
      $(this).click(action);
    };
  };

  getAjaxCall = function(page){
    var params = {url:page, type:"GET"};
    return $.ajax(params);
  };

  slideToFocus = function(element){
    var $element = $(element);
    var offset;
    if(stickyNavOn){
      offset = navHeight;
    }else{
      offset = navHeight * 2;
    }
    $('html, body').animate({
      scrollTop: $element.offset().top  - offset
    }, 700);
  };

  changePageAjaxOrScroll = function(page, focus, whenLoad){
    if(actualPage == page && focus){
      slideToFocus(focus);
      return;
    }
    var call = getAjaxCall(page);
    actualPage = page;
    $mainContainer.fadeOut(300);
    setTimeout(function(){
      call.done(function(data){
        $mainContainer.html(data);
        if(whenLoad)
          whenLoad();
        $mainContainer.fadeIn(300);
        if(focus){
          slideToFocus(focus);
        }
      });
    }, 300);
  };

  initIndex = function(){
    changePageAjaxOrScroll("ajax/index.html","", indexScript);
    setTimeout(function(){
      $footer.fadeIn();
    }, 300);
  };

  initBlog = function(){
    changePageAjaxOrScroll("blog/index.html", "#blog");
    setTimeout(function(){
      $footer.fadeIn();
    }, 300);
  };

  $footer.hide();
  if(document.location.pathname === '/'){
    if(document.location.hash === '#blog'){
      initBlog();
    }else{
      initIndex();
    }
  }else{
    $footer.fadeIn();
  }


  $indexNavBtn.click(function(e){
    e.preventDefault();
    document.location.pathname = '/';
    changePageAjaxOrScroll("ajax/index.html", "#main_container", indexScript);
  });

  $contactNavBtn.click(function(e){
    e.preventDefault();
    document.location.pathname = '/';
    changePageAjaxOrScroll("ajax/contact.html", "#main_container", contactScript);
  });

  $aboutNavBtn.click(function(e){
    e.preventDefault();
    document.location.pathname = '/';
    changePageAjaxOrScroll("ajax/about.html", "#main_container");
  });

  $orcamentosNavBtn.click(function (e){
    e.preventDefault();
    document.location.pathname = '/';
    changePageAjaxOrScroll("ajax/index.html", "#orcamentos", indexScript);
  });

  $adressLink.click(function(e){
    e.preventDefault();
    document.location.pathname = '/';
    changePageAjaxOrScroll("ajax/contact.html", "#contactsInfoBox", contactScript);
  });

  $blog.click(function(e){
    e.preventDefault();
    changePageAjaxOrScroll("blog/index.html", "#blog");
  });
  stickyNav();
  $(window).scroll(function() {
    stickyNav();
  });
});
