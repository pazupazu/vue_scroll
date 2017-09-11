/**
 * 埋め込みタグの親子間での操作
 * @class iFrame
 */
class iFrame {

  constructor () {
    this.isScroll = false;
    this.windowTop = 0;
    this.iframeY = 0;
  }

  /**
   * iFrame の初期設定
   * 親との送受信設定
   */
  init () {
    window.addEventListener('message', (e) => {
      this.receive(e);
    }, false);

    var target = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);
    if (typeof target !== 'undefined') {
      target.postMessage('hello', '*');
    }
  }

  /**
   * iFrame のリサイズ設定
   */
  interval () {
    setInterval(() => {
      this.resize();
    }, 1000);
  }

  /**
   * iFrame のリサイズ設定
   */
  resize () {
    let frameHeight = document.documentElement.scrollHeight;
    const diffHeight = document.documentElement.scrollHeight - document.body.clientHeight;
    if (diffHeight <= 10) {
      frameHeight = document.body.clientHeight;
    }
    const postData = {
      'iframe-height': frameHeight
    };
    this.post(postData);
  }

  /**
   * iFrame 親のスクロール
   * @param {Number} y
   * @param {Boolean} isAnimate
   */
  scroll (y, isAnimate = true) {
    const postData = {
      'scroll-top': this.iframeY + y,
      'scroll-amimate': isAnimate
    };
      console.log(this.iframeY, y)
    this.post(postData);
  }

  /**
   * iFrame 親のリダイレクト
   * @param {String} url
   * @memberOf iFrame
   */
  redirect (url) {
    const postData = {
      'redirect-url': url
    };
    this.post(postData);
  }

  /**
   * iFrame 親との送信設定
   * @param {Object} data
   * @memberOf iFrame
   */
  post (data) {
    var target = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);
    if (typeof target !== 'undefined') {
      target.postMessage(JSON.stringify(data), '*');
    }
  }

  /**
   * iFrame 親との受信設定
   * @param {Object} e
   * @returns
   * @memberOf iFrame
   */
  receive (e) {
    if (this._origin == null) {
      // ハッシュ値が同じなら認証
      if (e.data === 'toidas') {
        this._origin = e.origin;
      }
    } else {
      // 認証後は同ドメインのみやりとり
      if (this._origin === e.origin) {
        try {
          const json = JSON.parse(e.data);
          if (typeof json['window-top'] === 'undefined' || typeof json['iframe-y'] === 'undefined') {
            return;
          }
          /*
          // ページ遷移の場合は使わない
          if (this._option.pager) {
            return;
          }
          */

          const windowTop = json['window-top'];
          const iframeY = json['iframe-y'];
          this.windowTop = windowTop;
          this.iframeY = iframeY;
          // jQuery
          this.scrollProgressbar(windowTop, iframeY);
        } catch (e) {

        }
      }
    }
  }

  /**
   * iFrame 親との受信設定 jQuery高依存 本来ならProgress内に記述
   * @param {Number} windowTop
   * @param {Number} iframeYpos
   * @memberOf iFrame
   */
  scrollProgressbar (windowTop, iframeYpos) {
    // iframeの高さ、付随するプログレスバーの位置固定の再取得
    const $container = $('.toidas-question-container');
    const $progress = $('.toidas-progressbar-wrapp');

    const containerYpos = $container.offset().top; // コンテナのY位置
    const progressHeight = $progress.height(); // プログレスバーの高さ
    const fixedYpos = iframeYpos + containerYpos; // プログレスバー表示固定位置 :: iframeのY位置+プログレスバーのY位置
    const visibility = (this.isScroll) ? 'hidden' : 'visible';
    if (windowTop > fixedYpos) {
      $progress.css({
        'visibility': visibility, // スクロール中 プログレスバーの非表示
        'position': 'fixed',
        'margin-top': windowTop - fixedYpos + 'px'
      });
      $progress.next().css({
        'padding-top': progressHeight + 'px'
      });
    } else {
      $progress.css({
        'visibility': 'visible',
        'position': 'static',
        'margin-top': '0'
      });
      $progress.next().css({
        'padding-top': '0'
      });
    }
    // スクロール開始時
    this.isScroll = true;

    // スクロール停止時
    if (this.showProgress) {
      clearTimeout(this.showProgress);
    }
    this.showProgress = setTimeout(() => {
      this.showProgress = null;
      this.isScroll = false;
      this.scrollProgressbar(windowTop, iframeYpos);
    }, 300);
  }



}

export default iFrame;
