/* eslint-disable strict */
(function(w, d, h) {
  appendHead();
  loadFancyBox();
  w.addEventListener('load', () => {
    setFancyBox();
    setFooterIcon();
    setBangumiBtn();
    // loadLive2d();
  });

  function q(sel, cb) {
    const el = document.querySelector(sel);
    el && cb && cb(el);
  }

  function appendHead() {
    if (location.href.includes('/bangumi')) {
      h.insertAdjacentHTML('beforeend', '<style>.post-count{display:none}article#page{padding-top:0}</style>');
    }
  }

  function setFooterIcon() {
    q('.powered a[href^="https://hexo.io"]', el => {
      el.insertAdjacentHTML('afterbegin', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve" style="vertical-align: middle;margin-right: 4px"><path fill="#0E83CD" d="M256.4,25.8l-200,115.5L56,371.5l199.6,114.7l200-115.5l0.4-230.2L256.4,25.8z M349,354.6l-18.4,10.7l-18.6-11V275H200v79.6l-18.4,10.7l-18.6-11v-197l18.5-10.6l18.5,10.8V237h112v-79.6l18.5-10.6l18.5,10.8V354.6z"></path></svg>');
    });
    q('.powered a[href^="https://github.com/YunYouJun/hexo-theme-yun"]', el => {
      el.insertAdjacentHTML('afterbegin', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="yun-logo" stroke="#000" width="18px" height="18px" viewBox="40 40 320 320" stroke-width="16" style="vertical-align: middle;margin-right: 4px"> <defs> <line id="eye" x1="0" y1="-35" x2="0" y2="35" stroke-linecap="round"> <animateTransform attributeName="transform" additive="sum" attributeType="XML" type="scale" from="1 1" to="1 0" dur="0.15s" repeatCount="2"/> </line> </defs> <polygon stroke-linejoin="round" fill="none" points="50,250 50,150 100,150 100,100 300,100 300,150 350,150 350,250 300,250 300,300 100,300 100,250 50,250"/> <use xlink:href="#eye" transform="translate(150,200)"/> <use xlink:href="#eye" transform="translate(250,200)"/></svg>');
    });
  }

  function setBangumiBtn() {
    if (location.href.includes('/bangumi')) {
      if (location.href.includes('/cinema')) {
        q('.bangumi-tabs', el => {
          el.insertAdjacentHTML('beforeend', '<a class="bangumi-tab" id="bangumi-tab4" href="./">追番</a>');
        });
      } else {
        q('.bangumi-tabs', el => {
          el.insertAdjacentHTML('beforeend', '<a class="bangumi-tab" id="bangumi-tab4" href="./cinema.html">追剧</a>');
        });
      }
    }
  }

  function loadScript(src, isDefer, callback) {
    const script = document.createElement('script');
    script.src = src;
    isDefer && (script.defer = true);
    script.addEventListener('load', () => { callback && callback(); }, false);
    document.head.appendChild(script);
  }

  function loadLive2d() {
    if (document.body.clientWidth < 600) return;
    if (!(CONFIG.page.isPost || Yun.utils.isHome())) return;
    document.body.insertAdjacentHTML('beforeend', '<style>.live2d {position: fixed;right: -96px;bottom: 40px;width: 500px!important;height: 437.5px!important;z-index: 8;pointer-events: none!important;transition: 0.2s;}</style><div id="live2d" class="live2d"><canvas id="live2dm" class="live2d" style="z-index: 999 !important; width: 800px; height: 700px; touch-action: none; cursor: inherit;" width="800" height="700"></canvas></div>');
    loadScript('https://cdn.jsdelivr.net/npm/chenyfan-os@0.0.0-r3/load.js', true, () => {
      window.baseModelPath = 'https://cdn.jsdelivr.net/npm/chenyfan-oss@2.0.3';
      window.loadModel();
    });
  }

  function loadFancyBox() {
    if (CONFIG.page.isPost) {
      h.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="https://lib.baomitu.com/fancyapps-ui/4.0.27/fancybox.min.css"><style>.post-body img{cursor:zoom-in;}</style>');
      loadScript('https://lib.baomitu.com/fancyapps-ui/4.0.27/fancybox.umd.min.js', true);
    }
  }

  function setFancyBox() {
    q('.copyright>span', el => {
      el.innerHTML = el.innerHTML.trim();
    });
    q('.site-author-name a', el => { el.title = '关于'; });
    q('.site-name', el => { el.title = '关于站点'; });
    q('#back-to-top', el => {
      el.href = 'javascript:void(0);';
      el.addEventListener('click', () => {
        window.scrollTo(0, 0);
      });
    });
    if (CONFIG.page.isPost) {
      q('.sidebar-nav', ul => {
        ul.insertAdjacentHTML('afterbegin', '<li class="sidebar-nav-item sidebar-nav-overview hty-icon-button" title="HOME" onclick="location=CONFIG.root"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-home-4-line"></use></svg></li>');
      });
      q('.post-time time', el => {
        const nowdate = new Date();
        const postyear = new Date(el.getAttribute('datetime'));
        const diff = yearDiff(nowdate, postyear);
        if (diff > 2) {
          q('.post-body', el => {
            el.insertAdjacentHTML('afterbegin', `<div class="warning-outdate"><blockquote>This post was written ${diff} years ago, some information may be outdated.</blockquote></div>`);
          });
        }
      });
      d.querySelectorAll('.post-body img').forEach(el => {
        el.setAttribute('data-fancybox', 'gallery');
      });
      w.Fancybox.bind('.post-body img', {
        on: {
          initCarousel: fancybox => {
            const slide = fancybox.Carousel.slides[fancybox.Carousel.page];
            fancybox.$container.style.setProperty('--bg-image', `url("${slide.$thumb.src}")`);
          },
          'Carousel.change': (fancybox, carousel, to, from) => {
            const slide = carousel.slides[to];
            fancybox.$container.style.setProperty('--bg-image', `url("${slide.$thumb.src}")`);
          }
        }
      });
    }
  }

  function yearDiff(dt1, dt2) {
    let diffYear = (dt2.getTime() - dt1.getTime()) / 1000;
    diffYear /= 60 * 60 * 24;
    return Math.abs(Math.round(diffYear / 365.25));
  }
}(window, document, document.head));
