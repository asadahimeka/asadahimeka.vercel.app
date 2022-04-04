/* eslint-disable strict */
(function(w, d, h) {
  h.insertAdjacentHTML('beforeend', '<meta name="referrer" content="no-referrer">');
  if (location.href.includes('/posts')) {
    h.insertAdjacentHTML('beforeend', `
      <link rel="stylesheet" href="https://pf.wuniutech.com/kari/files/-/lib/fancybox/fancybox.css">
      <style>.post-body img{cursor:zoom-in;}.fancybox__backdrop::after{content:"";position:absolute;width:10%;height:10%;filter:blur(2px);left:50%;top:50%;transform:scale(11);opacity:0.3;background-image:var(--bg-image);background-size:cover;background-repeat:no-repeat;background-position:center center;}.fancybox__container{--fancybox-bg:#000;--fancybox-thumbs-width:48px;--fancybox-thumbs-ratio:1;--carousel-button-bg:rgb(91 78 76 / 74%);--carousel-button-svg-width:24px;--carousel-button-svg-height:24px;--carousel-button-svg-stroke-width:2.5;}.fancybox__nav{--carousel-button-svg-width:24px;--carousel-button-svg-height:24px;}.fancybox__nav .carousel__button.is-prev{left:20px;}.fancybox__nav .carousel__button.is-next{right:20px;}.carousel__button.is-close{right:auto;top:20px;left:20px;}.fancybox__slide{padding:8px 88px;}.fancybox__thumbs .carousel__slide{padding:8px 8px 16px 8px;}.is-nav-selected::after{display:none;}.fancybox__thumb{border-radius:6px;opacity:0.4;}.fancybox__thumb:hover,.is-nav-selected .fancybox__thumb{border-radius:6px;opacity:1;}.is-nav-selected .fancybox__thumb::after{display:none;}.with-fancybox #live2d-widget{opacity:0!important}</style>
    `);
    const s = d.createElement('script');
    s.src = 'https://pf.wuniutech.com/kari/files/-/lib/fancybox/fancybox.umd.js';
    s.defer = true;
    h.appendChild(s);
  }
  const q = (sel, cb) => {
    const el = d.querySelector(sel);
    if (el) cb && cb(el);
  };
  w.addEventListener('load', () => {
    q('.sidebar-nav', ul => {
      ul.insertAdjacentHTML('afterbegin', `
        <li class="sidebar-nav-item sidebar-nav-overview hty-icon-button" title="HOME" onclick='location=CONFIG.root'>
          <svg class="icon" aria-hidden="true"><use xlink:href="#icon-home-4-line"></use></svg>
        </li>
      `);
    });
    if (['/albums', '/girls', '/bangumi'].some(e => location.href.includes(e))) {
      q('#live2d-widget', el => { el.style.display = 'none'; });
    }
    if (location.href.includes('/posts')) {
      q('.post-time time', el => {
        const nowdate = new Date();
        const postyear = new Date(el.getAttribute('datetime'));
        const diff = yearDiff(nowdate, postyear);
        if (diff > 2) {
          q('.post-body', el => {
            el.insertAdjacentHTML('afterbegin', `
              <div class="warning-outdate">
                <blockquote>This post was written ${diff} years ago, some information may be outdated.</blockquote>
              </div>
            `);
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
  });

  function yearDiff(dt1, dt2) {
    let diffYear = (dt2.getTime() - dt1.getTime()) / 1000;
    diffYear /= 60 * 60 * 24;
    return Math.abs(Math.round(diffYear / 365.25));
  }
}(window, document, document.head));
