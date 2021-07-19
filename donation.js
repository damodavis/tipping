var MOBILE_WIDTH = 600;
    var screenWidth = window.innerWidth
      ? window.innerWidth
      : screen.width
      ? screen.width
      : 0;
    var onlinePage = 'http://localhost:3000/tipping/';
    var styleDom = document.createElement('style');
    styleDom.innerHTML = `
      .ccwallet__button {
        color: #fff;
        padding-left: 14px;
        padding-right: 14px;
        height: 46px;
        border-radius: 23px;
        display: inline-block;
        width: auto;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        line-height: 44px;
        min-width: 132px;
        box-shadow: 2px 2px 2px 1px #e6e9f677;
        cursor: pointer;
      }
      .ccwallet__image {
        display: inline-block;
        font-size: 0;
        cursor: pointer;
      }
      .ccwallet__link {
        display: inline-block;
        cursor: pointer;
        text-decoration: underline;
      }
    `;
    document.body.appendChild(styleDom);
    var documentBtns = document.querySelectorAll('.ccwallet__donation__button');
    var telegramBtns = document.querySelectorAll('.ccwallet__telegram__button');
    var isMobile = screenWidth < MOBILE_WIDTH;
    var setButtonStyle = function (buttonItem) {
      var currClassname = buttonItem.className;
      var btntype = buttonItem.getAttribute('data-button-type');
      if (btntype === 'button') {
        var btnttext = buttonItem.getAttribute('data-button-text');
        var btnstyle = buttonItem.getAttribute('data-button-style');
        buttonItem.className = currClassname + ' ccwallet__button';
        buttonItem.innerHTML = btnttext;
        switch (btnstyle) {
          case 'black': {
            buttonItem.style.backgroundColor = '#000';
            break;
          }
          case 'blue': {
            buttonItem.style.backgroundColor = '#486beb';
            break;
          }
          case 'green': {
            buttonItem.style.backgroundColor = '#5fd971';
            break;
          }
          case 'white': {
            buttonItem.style.backgroundColor = '#fff';
            buttonItem.style.border = '1px solid #ededed';
            buttonItem.style.color = '#000';
            break;
          }
          default: {
            buttonItem.style.backgroundColor = '#000';
            break;
          }
        }
      } else if (btntype === 'image') {
        var imageurl = buttonItem.getAttribute('data-image-url');
        var imgDom = document.createElement('img');
        imgDom.src = imageurl;
        buttonItem.appendChild(imgDom);
        buttonItem.className = currClassname + ' ccwallet__image';
      } else if (btntype === 'link') {
        var btnttext = buttonItem.getAttribute('data-button-text');
        buttonItem.innerHTML = btnttext;
        buttonItem.className = currClassname + ' ccwallet__link';
      }
    };
    if (telegramBtns && telegramBtns.length > 0) {
      for (var i = 0; i < telegramBtns.length; i++) {
        (function (index) {
          // 给按钮设置style
          setButtonStyle(telegramBtns[index]);
          // telegram邀请入群
          var linkurl = telegramBtns[index].getAttribute('data-url');
          telegramBtns[index].onclick = function () {
            window.location.href = linkurl;
          };
        })(i);
      }
    }
    if (documentBtns && documentBtns.length > 0) {
      for (var i = 0; i < documentBtns.length; i++) {
        (function (index) {
          // 给按钮设置style
          setButtonStyle(documentBtns[index]);
          // cctip打赏
          var btncode = documentBtns[index].getAttribute('data-code');
          onlinePage = onlinePage + btncode;
          if (isMobile) {
            try {
              var openTimer,
                scheme = 'cwallet://tipping/' + btncode;
              // 添加点击事件处理函数
              documentBtns[index].onclick = function () {
                // 尝试打开 scheme
                window.location.href = scheme;
                // 设置3秒的定时任务，3秒之后打开网页线上打赏
                openTimer = setTimeout(function () {
                  // 走线上打赏逻辑
                  window.location.href = onlinePage;
                }, 3000);
                // 如果页面隐藏，推测打开scheme成功，清除任务
                document.addEventListener(
                  'visibilitychange webkitvisibilitychange',
                  function () {
                    if (document.hidden || document.webkitHidden) {
                      clearTimeout(openTimer);
                    }
                  },
                );
                window.addEventListener('pagehide', function () {
                  clearTimeout(openTimer);
                });
              };
            } catch (error) {}
          } else {
            // pc端新窗口打开一个手机页面
            documentBtns[index].onclick = function () {
              try {
                window.open(
                  onlinePage,
                  '_blank',
                  'toolbar=no,menubar=no,help=no,location=no,status=no,center=yes,scrollbars=yes,dependent,alwaysRaised,resizable=no,directories=no,width=420,height=730',
                );
              } catch (error) {}
            };
          }
        })(i);
      }
    }