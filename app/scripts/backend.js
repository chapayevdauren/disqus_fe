(function() {
  'use strict';
  var $this, module, urlBackend;

  module = typeof exports !== "undefined" && exports !== null ? exports : this;

  urlBackend = 'http://localhost:8000/api/v1/comment/';

  $this = {
    getComments: function(url, callback, errback) {
      var comments, hr;
      comments = document.getElementById('comments');
      hr = new XMLHttpRequest;
      hr.open('GET', urlBackend, true);
      hr.setRequestHeader('Content-type', 'application/json', true);
      hr.onreadystatechange = function() {
        var data, gravatar, i, tableComment, _i, _len, _ref;
        if (hr.readyState === 4 && hr.status === 200) {
          data = JSON.parse(hr.responseText);
          _ref = data.objects;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            if (i.url === url) {
              gravatar = '<img src = https://s.gravatar.com/avatar/' + hex_md5(i.email) + '?s=64 />';
              tableComment = '<table> <tr><td>' + gravatar + '</td> <td><h4  style="margin-top:0px;">' + i.name + '</h4><h5>' + i.comment + '</h5></td> <td style="vertical-align:top; padding-left:120px;"><h6>' + (i.pub_date.substring(0, 10)) + '</h6></td></tr></table>';
              $('#comments').append(tableComment);
            }
          }
        }
      };
      return hr.send(null);
    },
    getCount: function(url, callback, errback) {
      var hr, total_count;
      hr = new XMLHttpRequest;
      hr.open('GET', urlBackend, true);
      hr.setRequestHeader('Content-type', 'application/json', true);
      total_count = 0;
      hr.onreadystatechange = function() {
        var data, i, _i, _len, _ref;
        if (hr.readyState === 4 && hr.status === 200) {
          data = JSON.parse(hr.responseText);
          _ref = data.objects;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            if (i.url === url) {
              total_count++;
              console.log(total_count);
            }
          }
        }
      };
      total_count;
      return hr.send(null);
    },
    newComment: function(url, name, email, comment, callback, errback) {}
  };

  module.Backend = $this;

}).call(this);
