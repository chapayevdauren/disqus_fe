(function() {
  'use strict';
  var $this, module, total_count, urlBackend;

  module = typeof exports !== "undefined" && exports !== null ? exports : this;

  urlBackend = 'http://localhost:8000/api/v1/comment/';

  total_count = 0;

  $this = {
    getComments: function(url, callback, errback) {
      var comments, hr;
      comments = document.getElementById('comments');
      hr = new XMLHttpRequest;
      hr.open('GET', urlBackend, true);
      hr.setRequestHeader('Content-type', 'application/json', true);
      total_count = 0;
      hr.onreadystatechange = function() {
        var data, gravatar, i, tableComment, _i, _len, _ref;
        if (hr.readyState === 4 && hr.status === 200) {
          data = JSON.parse(hr.responseText);
          _ref = data.objects;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            if (i.url === url) {
              console.log(i.url + ' ' + url);
              total_count += 1;
              gravatar = '<img src = https://s.gravatar.com/avatar/' + hex_md5(i.email) + '?s=64 />';
              tableComment = '<table> <tr><td>' + gravatar + '</td> <td><h4  style="margin-top:0px;">' + i.name + '</h4><h5>' + i.comment + '</h5></td> <td style="vertical-align:top; padding-left:120px;"><h6>' + (i.pub_date.substring(0, 10)) + '</h6></td></tr></table></br>';
              console.log(tableComment);
              $('#comments').append(tableComment);
            }
          }
        }
      };
      return hr.send(null);
    },
    getCount: function(url, callback, errback) {
      return total_count;
    },
    newComment: function(url, name, email, comment, callback, errback) {
      var json, xhr;
      xhr = new XMLHttpRequest;
      json = JSON.stringify({
        url: url,
        name: name,
        email: email,
        comment: comment
      });
      xhr.open('POST', urlBackend, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) {
          return;
        }
        alert(this.responseText);
      };
      console.log(json);
      return xhr.send(json);
    }
  };

  module.Backend = $this;

}).call(this);
