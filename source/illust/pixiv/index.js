/* eslint-disable eqeqeq */
/* eslint-disable new-cap */
/* global ScrollReveal,Vue,Fancybox,imagesLoaded */
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    ScrollReveal().destroy();
    const app = new Vue({
      data: function() {
        return {
          list: [],
          rankDay: '',
          rankType: 'day',
          page: 0,
          noMore: false,
          loading: true,
          moreLoading: false,
          showRBtn: false
        };
      },
      created: function() {
        this.init();
      },
      methods: {
        init: function() {
          getDailyRank().then(res => {
            this.rankDay = res.date;
            this.list = res.images;
            this.$nextTick(() => {
              bindFancybox();
              imagesLoaded('#macy-container', instance => {
                instance.images.forEach(e => {
                  e.img.classList.add('show');
                });
                this.loading = false;
              });
            });
          }).catch(_ => {
            this.loading = false;
            this.showPixivic = true;
          });
        },
        fetchModeRank: function(mode) {
          this.rankType = mode;
          this.page = 1;
          this.noMore = false;
          this.rankDay = getDay(-1);
          this.getMoreData();
        },
        getMoreData: function() {
          if (this.page < 1) return;
          if (this.noMore) return;
          this.moreLoading = true;
          if (this.page == 1) {
            window.scroll(0, 0);
            this.list = [];
          }
          getDailyRankFromApi(this.page, this.rankType).then(res => {
            if (res.length === 0) {
              this.noMore = true;
              this.moreLoading = false;
              return;
            }
            this.list = this.list.concat(res);
            this.page++;
            this.$nextTick(() => {
              imagesLoaded('#macy-container', instance => {
                instance.images.forEach(e => {
                  e.img.classList.add('show');
                });
                this.moreLoading = false;
              });
            });
          }).catch(() => {
            this.moreLoading = false;
          });
        }
      }
    });
    app.$mount('#pixiv_rank');
  });

  function bindFancybox() {
    Fancybox.Plugins.Toolbar.defaults.items.toPixivPage = {
      type: 'button',
      class: 'fancybox__button--toPixivPage',
      label: 'Pixiv Page',
      html: '<svg viewBox="0 0 1024 1024"><path d="M938.080549 499.785143L791.94112 645.851429a51.712 51.712 0 1 1-73.142857-73.142858l146.139428-146.139428a189.44 189.44 0 0 0-267.849142-267.849143L450.94912 304.932571a51.638857 51.638857 0 0 1-72.996571-72.996571l146.066285-146.139429a292.790857 292.790857 0 0 1 413.988572 413.988572zM85.746834 938.203429a292.717714 292.717714 0 0 1 0-413.988572l146.212572-146.212571a51.638857 51.638857 0 0 1 72.996571 73.069714l-146.139428 146.285714a189.44 189.44 0 1 0 267.849142 267.849143L572.731977 718.994286a51.638857 51.638857 0 1 1 73.069714 72.996571l-146.139428 146.285714a292.717714 292.717714 0 0 1-413.988572 0v-0.073142z" fill="#0096fa" p-id="8549"></path><path d="M402.382263 694.637714l292.205714-292.278857a51.638857 51.638857 0 1 0-73.069714-72.996571L329.312549 621.494857a51.638857 51.638857 0 0 0 72.996571 73.142857h0.073143z" fill="#0096fa"></path></svg>',
      click: function(event) {
        event.preventDefault();
        const slide = this.fancybox.Carousel.slides[this.fancybox.Carousel.page];
        window.open(slide.pixivLink, '_blank', 'noreferrer');
      }
    };
    Fancybox.Plugins.Toolbar.defaults.items.toPixivMoePage = {
      type: 'button',
      class: 'fancybox__button--toPixivPage',
      label: 'Vilipix Page',
      html: '<svg viewBox="0 0 1024 1024"><path d="M593.94368 715.648a10.688 10.688 0 0 0-14.976 0L424.21568 870.4c-71.68 71.68-192.576 79.232-271.68 0-79.232-79.232-71.616-200 0-271.616l154.752-154.752a10.688 10.688 0 0 0 0-15.04l-52.992-52.992a10.688 10.688 0 0 0-15.04 0L84.50368 530.688a287.872 287.872 0 0 0 0 407.488 288 288 0 0 0 407.488 0l154.752-154.752a10.688 10.688 0 0 0 0-15.04l-52.736-52.736z m344.384-631.168a288.256 288.256 0 0 1 0 407.616l-154.752 154.752a10.688 10.688 0 0 1-15.04 0l-52.992-52.992a10.688 10.688 0 0 1 0-15.104l154.752-154.688c71.68-71.68 79.232-192.448 0-271.68-79.104-79.232-200-71.68-271.68 0L443.92768 307.2a10.688 10.688 0 0 1-15.04 0l-52.864-52.864a10.688 10.688 0 0 1 0-15.04l154.88-154.752a287.872 287.872 0 0 1 407.424 0z m-296.32 240.896l52.672 52.736a10.688 10.688 0 0 1 0 15.04l-301.504 301.44a10.688 10.688 0 0 1-15.04 0l-52.736-52.672a10.688 10.688 0 0 1 0-15.04l301.632-301.504a10.688 10.688 0 0 1 15.04 0z" fill="#fff"></path></svg>',
      click: function(event) {
        event.preventDefault();
        const slide = this.fancybox.Carousel.slides[this.fancybox.Carousel.page];
        const link = 'https://www.vilipix.com/illust/' + slide.pixivLink.split('/').pop();
        window.open(link, '_blank', 'noreferrer');
      }
    };
    Fancybox.bind('[data-fancybox]', {
      preload: 0,
      infinite: false,
      Toolbar: {
        display: [
          'counter',
          'toPixivPage',
          'toPixivMoePage',
          'zoom',
          'slideshow',
          'fullscreen',
          'download',
          'thumbs',
          'close'
        ]
      },
      on: {
        initCarousel: fancybox => {
          const slide = fancybox.Carousel.slides[fancybox.Carousel.page];
          fancybox.$container.style.setProperty('--bg-image', `url("${slide.thumb}")`);
        },
        'Carousel.change': (fancybox, carousel, to, from) => {
          const slide = carousel.slides[to];
          fancybox.$container.style.setProperty('--bg-image', `url("${slide.thumb}")`);
        }
      }
    });
  }

  async function fetchData(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Resp not ok.');
    return res.json();
  }

  function getDailyRankThumb(today) {
    return fetchData('https://mk-pixiv.kanata.ml/storage/app/pixiv.json?' + today);
  }
  function getDailyRankSource(today) {
    return fetchData('https://mk-pixiv.kanata.ml/storage/app/source.json?' + today);
  }

  async function getDailyRankFromApi(page, mode) {
    const _t = new Date().toLocaleString('ja-JP-u-ca-japanese').replace(/[\s/:]+/g, '').slice(0, -4);
    const res = await fetchData(`https://pixiv-api.kanata.ml/v2?type=rank&mode=${mode}&page=${page}&_t=${_t}&_vercel_no_cache=1`);
    return res.illusts.map(item => {
      const pixivLink = 'https://www.pixiv.net/artworks/' + item.id;
      const tagsStr = item.tags.map(e => {
        let tag = `<a href="https://www.pixiv.net/tags/${e.name}/artworks" target="_blank" rel="nofollow noreferrer" style="color:#0096fa">${e.name}</a>`;
        if (e.translated_name) {
          tag += `<small style="margin-left:5px;color:#adadad">[${e.translated_name}]</small>`;
        }
        return `<span style="margin-right:10px">${tag}</span>`;
      }).join('');
      const caption = `<div style="text-align:center">PID: ${item.id} ??????: ${item.title} ??????: ${item.user.name}<br/>??????: ${tagsStr}<div>`;
      if (item.meta_pages.length) {
        return item.meta_pages.map(m => {
          return {
            thumb: replaceProxyURL(m.image_urls.medium),
            large: m.image_urls.large.replace(/i\.pximg\.net\/c\/\d+x\d+.*\/img-/i, 'pximg.cocomi.cf/img-'),
            original: replaceProxyURL(m.image_urls.original),
            link: pixivLink,
            caption: caption,
            title: item.title,
            author: item.user.name
          };
        });
      }
      const mediumURL = item.image_urls.medium;
      const largeURL = item.image_urls.large;
      const originalURL = item.meta_single_page.original_image_url;
      return [{
        thumb: replaceProxyURL(mediumURL),
        large: largeURL.replace(/i\.pximg\.net\/c\/\d+x\d+.*\/img-/i, 'pximg.cocomi.cf/img-'),
        original: replaceProxyURL(originalURL),
        link: pixivLink,
        caption: caption,
        title: item.title,
        author: item.user.name
      }];
    });
  }

  function replaceProxyURL(url) {
    return url.replace('i.pximg.net', 'pximg.cocomi.cf');
  }

  async function getDailyRank() {
    const today = getDay(0);
    const cacheKey = '__pixivDailyRank';
    const cacheJson = localStorage.getItem(cacheKey);
    try {
      const cacheData = JSON.parse(cacheJson);
      if (cacheData && cacheData.today == today) return cacheData;
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.log(error);
    }
    const results = await Promise.all([
      getDailyRankThumb(today),
      getDailyRankSource(today)
    ]);
    if (results.some(e => !e.data || !e.data.length)) throw new Error('Empty.');
    const rankData0 = results[0];
    const toCacheData = {
      today: today,
      date: rankData0.date,
      images: []
    };
    rankData0.data.forEach((item, index) => {
      const art = rankData0.url[index];
      const purl = results[1].image[index];
      toCacheData.images.push([{
        thumb: item.url.includes('pic.rmb.bdstatic.com') ? item.url : purl.replace('i.pximg.net', 'ipximg.kanata.ml'),
        large: buildLargeSrc(purl),
        original: buildOriginSrc(art.split('/').pop()),
        link: 'https://www.pixiv.net/' + art,
        title: item.title,
        author: item.user_name
      }]);
    });
    localStorage.setItem(cacheKey, JSON.stringify(toCacheData));
    return toCacheData;
  }

  function buildLargeSrc(url) {
    url = url || '';
    // return url.replace(/i\.pximg\.net\/c\/\d+x\d+/i, 'proxy.pixivel.moe');
    // return url.replace(/i\.pximg\.net\/c\/\d+x\d+/i, 'i.pixiv.re');
    return url.replace(/i\.pximg\.net\/c\/\d+x\d+/i, 'pximg.cocomi.cf');
  }

  function buildOriginSrc(id) {
    return 'https://pid.kanata.ml/' + id;
  }

  function getDay(num) {
    const str = '-';
    const today = new Date();
    const nowTime = today.getTime();
    const ms = 24 * 3600 * 1000 * num;
    today.setTime(parseInt(nowTime + ms, 10));
    const oYear = today.getFullYear();
    let oMoth = (today.getMonth() + 1).toString();
    if (oMoth.length <= 1) oMoth = '0' + oMoth;
    let oDay = today.getDate().toString();
    if (oDay.length <= 1) oDay = '0' + oDay;
    return oYear + str + oMoth + str + oDay;
  }
}());
