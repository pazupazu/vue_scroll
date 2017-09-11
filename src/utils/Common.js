/**
* 共通のユーティリティクラス
* ここにはどこからでも呼びそうな関数を登録する
* @extends {Common}
* @example
*/
class Common {

  /**
  * 初期設定
  * @param {object} conf 設定情報
  */
  constructor (config) {
    this._config = config;
  }

  get honban () {
    if (window.location.hostname.match(/^(dev.*?.toidas.net|localhost)$/)) {
      return false;
    } else {
      return true;
    }
  }

  get env () {
    if (window.location.hostname.match(/^dev.*?.toidas.net|localhost$/)) {
      return 'develop';
    } else {
      return 'honban';
    }
  }

  get point () {
    if (window.location.hostname.match(/^.*?point.*?.toidas.net$/)) {
      return true;
    } else {
      return false;
    }
  }

  // URLパラメータ
  get params () {
    var arg = new Object();
    var pair = location.search.substring(1).split('&');
    for (var i = 0; pair[i]; i++) {
      var kv = pair[i].split('=');
      arg[kv[0]] = kv[1];
    }
    return arg;
  }

  // URLパラメータ
  getParams (url) {
    var arg = new Object();
    var pair = url.substring(1).split('&');
    for (var i = 0; pair[i]; i++) {
      var kv = pair[i].split('=');
      arg[kv[0]] = kv[1];
    }
    return arg;
  }

  /**
   * cookie の取得
   * @param {string} key キー
   */
  cookie (key) {
    var cookies = document.cookie.split('; ');
    for (var i = 0; i < cookies.length; i++) {
      var str = cookies[i].split('=');
      if (str[0] === key) {
        return str[1];
      }
    }
  }

  get support () {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const appVersion = window.navigator.appVersion.toLowerCase();
    if (userAgent.indexOf('msie') != -1) {
      if (appVersion.indexOf('msie 6.') !== -1) {
        return false;
      } else if (appVersion.indexOf('msie 7.') !== -1) {
        return false;
        // IE7
      } else if (appVersion.indexOf('msie 8.') !== -1) {
        return false;
        // IE8
      } else if (appVersion.indexOf('msie 9.') !== -1) {
        return false;
      }
    }
    return true;
  }

  get type () {
    if (window.location.href.match('trivia')) {
      return 'trivia';
    }
    if (window.location.href.match('personality')) {
      return 'personality';
    }
    return 'trivia';
  }

}

export default Common;
