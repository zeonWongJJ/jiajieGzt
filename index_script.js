function wxAuthorizationLoginSuccess(result) {
      result = JSON.parse(JSON.stringify(result))

      $('#wechat_nickname').val(result.nickname)
      $('#wechat_openid').val(result.openid)
    }

    $(function () {
      $('body').on('focus', 'input', function () {
        var __this = this;
        setTimeout(function () {
          __this.scrollIntoViewIfNeeded()
        }, 200);
      }).on('focus', 'textarea', function () {
        var __this = this;
        setTimeout(function () {
          __this.scrollIntoViewIfNeeded()
        }, 200);
      })
    })
