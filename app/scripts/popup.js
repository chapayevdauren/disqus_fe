(function() {
  'use strict';
  var getHostName, validateEmail;

  validateEmail = function(email) {
    var re;
    re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };

  if ($('#inputEmail').val() === '' || $('#inputEmail').val() === null && $('#inputName').val() === '' || $('#inputName').val() === null) {
    $("#inputComment").attr("disabled", "");
  }

  $('#inputEmail').on('focusout', function(e) {
    if ($('#inputEmail').val() !== '' && $('#inputName').val() !== '' && validateEmail($('#inputEmail').val())) {
      return $("#inputComment").removeAttr("disabled");
    } else {
      return $("#inputComment").attr("disabled", "");
    }
  });

  $('#inputName').on('focusout', function(e) {
    if ($('#inputEmail').val() !== '' && $('#inputName').val() !== '' && validateEmail($('#inputEmail').val())) {
      return $("#inputComment").removeAttr("disabled");
    } else {
      return $("#inputComment").attr("disabled", "");
    }
  });

  $('#inputComment').on('keyup', function(e) {
    if (e.keyCode === 13) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tab) {
        console.log('popup 12');
        Backend.newComment(getHostName(tab[0].url).host, $('#inputName').val(), $('#inputEmail').val(), $('#inputComment').val());
      });
    }
  });

  getHostName = function(href) {
    var l;
    l = document.createElement('a');
    l.href = href;
    return l;
  };

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tab) {
    Backend.getComments(getHostName(tab[0].url).host);
  });

}).call(this);
