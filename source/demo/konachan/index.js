/* eslint-env es6 */
/* global Vue:readonly */
/* global Vuetify:readonly */
/* global VueMasonry:readonly */
/* Code From https://github.com/coderzhaoziwei/yande-re-chinese-patch */
(function() {
  class Post {
    constructor(data) {
      if (typeof data !== 'object') data = {};
      this.id = data.id || 0;
      this.score = data.score || 0;
      this.tags = data.tags || '';
      this.source = data.source || '';
      this.author = data.author || '';
      this.creatorId = data.creator_id || 0;
      this.createdAt = data.created_at || 0;
      this.updatedAt = data.updated_at || 0;
      this.rating = data.rating || 's';
      this.fileUrl = data.file_url || '';
      this.fileExt = data.file_ext || '';
      this.fileSize = data.file_size || 0;
      this.width = data.width || 0;
      this.height = data.height || 0;
      this.jpegUrl = data.jpeg_url || '';
      this.jpegSize = data.jpeg_file_size || 0;
      this.jpegWidth = data.jpeg_width || 0;
      this.jpegHeight = data.jpeg_height || 0;
      this.sampleUrl = data.sample_url;
      this.sampleSize = data.sample_file_size || 0;
      this.sampleWidth = data.sample_width || 0;
      this.sampleHeight = data.sample_height || 0;
      this.previewUrl = data.preview_url;
      this.previewWidth = data.actual_preview_width || 0;
      this.previewHeight = data.actual_preview_height || 0;
    }
    get isRatingS() {
      return this.rating === 's';
    }
    get isRatingQ() {
      return this.rating === 'q';
    }
    get isRatingE() {
      return this.rating === 'e';
    }
    get aspectRatio() {
      return this.width / this.height;
    }
    get tagsArr() {
      return this.tags.split(/\s+/);
    }
    getSizeText(size) {
      if (size > 1024 * 1024) {
        return (size / (1024 * 1024)).toFixed(2) + 'MB';
      }
      if (size > 1024) {
        return (size / 1024).toFixed(2) + 'KB';
      }
      return size.toFixed(2) + 'B';
    }
    get sampleSizeText() {
      return this.getSizeText(this.sampleSize);
    }
    get sampleDownloadText() {
      return `下载缩略图 ${this.sampleWidth}×${this.sampleHeight} [${this.sampleSizeText}]`;
    }
    get sampleDownloadSecondText() {
      return `${this.sampleWidth}×${this.sampleHeight} [${this.sampleSizeText}]`;
    }
    get sampleDownloadName() {
      return `${location.hostname}.${this.id}.${this.sampleWidth}x${this.sampleHeight}`.replace(/\./g, '_');
    }
    get jpegSizeText() {
      return this.getSizeText(this.jpegSize);
    }
    get jpegDownloadText() {
      return `下载高清图 ${this.jpegWidth}×${this.jpegHeight} [${this.jpegSizeText}]`;
    }
    get jpegDownloadSecondText() {
      return `${this.jpegWidth}×${this.jpegHeight} [${this.jpegSizeText}]`;
    }
    get jpegDownloadName() {
      return `${location.hostname}.${this.id}.${this.jpegWidth}x${this.jpegHeight}`.replace(/\./g, '_');
    }
    get fileSizeText() {
      return this.getSizeText(this.fileSize);
    }
    get fileDownloadText() {
      return `下载原文件 ${this.width}×${this.height} [${this.fileSizeText}] ${this.fileExt.toUpperCase()}`;
    }
    get fileDownloadSecondText() {
      return `${this.width}×${this.height} [${this.fileSizeText}] ${this.fileExt.toUpperCase()}`;
    }
    get fileDownloadName() {
      return `${location.hostname}.${this.id}.${this.width}x${this.height}`.replace(/\./g, '_');
    }
    get createdTime() {
      const date = new Date(this.createdAt * 1000);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-DE')}`;
    }
    get updatedTime() {
      const date = new Date(this.updatedAt * 1000);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-DE')}`;
    }
    get sourceUrl() {
      // eslint-disable-next-line no-useless-escape
      if (/^https:\/\/i\.pximg\.net\/img-original\/img\/[\d\/]{19}\/([\d]{1,})_p[\d]{1,}\.(jpg|png)$/.test(this.source)) {
        const pid = RegExp.$1;
        return `https://pixiv.net/artworks/${pid}`;
      }
      return this.source;
    }
  }

  Vue.use(VueMasonry);
  new Vue({
    vuetify: new Vuetify({
      // theme: { dark: true }
    }),
    data: {
      siteName: 'konachan',
      showDrawer: false,
      showFab: false,
      showImageSelected: false,
      showImageInfo: true,
      showRatingQ: JSON.parse(localStorage.getItem('showRatingQ') || 'true'),
      showRatingE: JSON.parse(localStorage.getItem('showRatingE') || 'false'),
      imageList: [],
      imageSelectedIndex: 0,
      params: new URLSearchParams('?page=1'),
      requestState: false,
      requestStop: false,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      columnCount: {
        300: 1,
        600: 2,
        900: 3,
        1200: 4,
        1600: 5,
        1920: 6,
        2400: 7,
        2700: 8,
        3000: 9,
        default: 6
      }
    },
    computed: {
      title() {
        return `${this.imageList.length} Posts`;
      },
      version() {
        return '2.0.106';
      },
      imageSelected() {
        return this.imageList[this.imageSelectedIndex] || new Post();
      },
      imageSelectedWidth() {
        const width = parseInt(Math.min(this.innerWidth * 0.9, this.imageSelected.sampleWidth), 10);
        const height = Math.min(this.innerHeight * 0.9, this.imageSelected.sampleHeight);
        const width2 = parseInt(height * this.imageSelected.aspectRatio, 10);
        return Math.min(width, width2);
      },
      imageSelectedHeight() {
        const width = Math.min(this.innerWidth * 0.9, this.imageSelected.sampleWidth);
        const height = parseInt(Math.min(this.innerHeight * 0.9, this.imageSelected.sampleHeight), 10);
        const height2 = parseInt(width / this.imageSelected.aspectRatio, 10);
        return Math.min(height, height2);
      }
    },
    watch: {
      showRatingQ(value) {
        localStorage.setItem('showRatingQ', JSON.stringify(value));
      },
      showRatingE(value) {
        localStorage.setItem('showRatingE', JSON.stringify(value));
      }
    },
    methods: {
      async request(url) {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Resp not ok.');
        const results = await resp.json();
        return results;
      },
      async fetchData(refresh) {
        const url = this.siteName === 'yandere'
          ? 'https://kw.kanata.ml/?u=' + encodeURIComponent('https://yande.re/post.json?tags=rating%3Asafe&' + this.params.toString())
          : 'https://konachan.kanata.ml/post.json?tags=rating%3Asafe&' + this.params.toString();
        this.requestState = true;
        try {
          const results = await this.request(url);
          if (Array.isArray(results) && results.length > 0) {
            const posts = results.map(e => new Post(e));
            this.imageList = refresh ? posts : this.imageList.concat(posts);
            const page = Number(this.params.get('page')) || 1;
            this.params.set('page', page + 1);
          } else {
            this.requestStop = true;
          }
        } catch (error) {
          console.log('fetch error: ' + error);
        } finally {
          this.requestState = false;
        }
      },
      async initData(refresh) {
        this.params.set('page', 1);
        await this.fetchData(refresh);
        const times = this.calcFetchTimes();
        for (let index = 0; index < times; index++) {
          await this.fetchData();
        }
      },
      refresh() {
        this.$vuetify.goTo(0);
        this.initData(true);
      },
      toggleSite() {
        this.siteName = this.siteName === 'yandere' ? 'konachan' : 'yandere';
        this.imageList = [];
        this.refresh();
      },
      openUrl(url) {
        window.open(url, '_blank', 'noreferrer');
      },
      proxysrc(url) {
        return 'https://kw.cocomi.cf/' + url;
      },
      siteUrl(path) {
        if (this.siteName === 'yandere') return 'https://yande.re' + path;
        return 'https://konachan.net' + path;
      },
      download(url, name) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.display = 'none';
        a.setAttribute('download', name);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      calcFetchTimes() {
        const cnth = this.$refs.vcont.clientHeight;
        const doch = document.documentElement.clientHeight;
        return ~~(doch / cnth);
      },
      changeThemeDark() {
        try {
          const mode = localStorage.getItem('darken-mode');
          this.$vuetify.theme.dark = mode === 'dark';
        } catch (error) {
          console.log('error: ', error);
        }
      }
    },
    async mounted() {
      const loadingEl = document.querySelector('#loading');
      if (loadingEl) loadingEl.style.display = 'none';
      this.changeThemeDark();
      window.addEventListener('storage', () => {
        this.changeThemeDark();
      });
      await this.initData();
      window.addEventListener('scroll', throttleScroll(scroll => {
        if (!this.showFab && scroll > 200) this.showFab = true;
        if (this.requestStop) return;
        if (this.requestState) return;
        isReachBottom() && this.fetchData();
      }, () => {
        if (this.showFab) this.showFab = false;
      }));
      window.addEventListener('resize', () => {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
      });
    }
  }).$mount('#konachan_app');

  function isReachBottom() {
    const doc = document.documentElement;
    const clientHeight = doc.clientHeight;
    const scrollTop = doc.scrollTop;
    const scrollHeight = doc.scrollHeight;
    return (clientHeight + scrollTop) >= scrollHeight;
  }

  function throttleScroll(downFn, upFn) {
    const doc = document.documentElement;
    let position = doc.scrollTop;
    let ticking = false;
    return function(arg) {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scroll = doc.scrollTop;
        scroll > position ? downFn(scroll, arg) : upFn(scroll, arg);
        position = scroll;
        ticking = false;
      });
    };
  }
}());
