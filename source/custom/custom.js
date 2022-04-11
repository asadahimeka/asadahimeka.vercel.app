/* eslint-disable strict */
(function(w, d, h) {
  appendHead();
  loadFancyBox();
  w.addEventListener('load', () => {
    setFancyBox();
    setFooterIcon();
    setBangumiBtn();
    loadLive2d();
  });

  function q(sel, cb) {
    const el = document.querySelector(sel);
    el && cb && cb(el);
  }

  function appendHead() {
    if (['/albums', '/girls', '/bangumi'].some(e => location.href.includes(e))) {
      h.insertAdjacentHTML('beforeend', '<style>#live2d-widget{opacity:0!important}</style>');
    }
    if (location.href.includes('/bangumi')) {
      h.insertAdjacentHTML('beforeend', '<style>.post-count{display:none}article#page{padding-top:0}</style>');
    }
  }

  function setFooterIcon() {
    q('.powered a[href^="https://hexo.io"]', el => {
      el.insertAdjacentHTML('afterbegin', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve" style="vertical-align: middle;margin-right: 4px"><path fill="#0E83CD" d="M256.4,25.8l-200,115.5L56,371.5l199.6,114.7l200-115.5l0.4-230.2L256.4,25.8z M349,354.6l-18.4,10.7l-18.6-11V275H200v79.6l-18.4,10.7l-18.6-11v-197l18.5-10.6l18.5,10.8V237h112v-79.6l18.5-10.6l18.5,10.8V354.6z"></path></svg>');
    });
    q('.powered a[href^="https://github.com/YunYouJun/hexo-theme-yun"]', el => {
      el.insertAdjacentHTML('afterbegin', '<img src="/yun.svg" alt="" style="height: 18px;vertical-align: middle;margin-right: 4px" loading="lazy">');
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
    if (['/albums', '/girls', '/bangumi', '/pixivic'].some(e => location.href.includes(e))) return;
    document.body.insertAdjacentHTML('beforeend', '<style>.live2d {position: fixed;right: -96px;bottom: 40px;width: 500px!important;height: 437.5px!important;z-index: 998;pointer-events: none!important;transition: 0.2s;}</style><div id="live2d" class="live2d"><canvas id="live2dm" class="live2d" style="z-index: 999 !important; width: 800px; height: 700px; touch-action: none; cursor: inherit;" width="800" height="700"></canvas></div>');
    loadScript('https://npm.elemecdn.com/chenyfan-os@0.0.0-r3/load.js', true, () => {
      window.baseModelPath = 'https://npm.elemecdn.com/chenyfan-oss@2.0.3';
      window.loadModel();
    });
  }

  function loadFancyBox() {
    if (location.href.includes('/posts')) {
      h.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="https://npm.elemecdn.com/@fancyapps/ui@4.0/dist/fancybox.css"><style>.post-body img{cursor:zoom-in;}</style>');
      loadScript('https://npm.elemecdn.com/@fancyapps/ui@4.0/dist/fancybox.umd.js', true);
    }
  }

  function setFancyBox() {
    if (location.href.includes('/posts')) {
      q('.sidebar-nav', ul => {
        ul.insertAdjacentHTML('afterbegin', '<li class="sidebar-nav-item sidebar-nav-overview hty-icon-button" title="HOME" onclick="location=CONFIG.root"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-home-4-line"></use></svg></li>');
      });
      q('.post-time time', el => {
        const nowdate = new Date();
        const postyear = new Date(el.getAttribute('datetime'));
        const diff = yearDiff(nowdate, postyear);
        if (diff > 2) {
          q('.post-body', el => {
            el.insertAdjacentHTML('afterbegin', '<div class="warning-outdate"><blockquote>This post was written ${diff} years ago, some information may be outdated.</blockquote></div>');
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
