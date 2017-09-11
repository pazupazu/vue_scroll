import Util from './Load.js';
import Config from './config.json';
import $ from 'jquery';
import 'jquery.dfp';
const util = new Util(Config);

/**
 * 広告
 *
 * @class Ad
 */
class Ad {

  // 広告の読み込み
  init (userId = 0) {
    const refs = document.referrer.split('/');
    // カスタムターゲティング
    var target = {};
    target['app'] = util.point ? 'point' : 'default'; // 配信先
    target['jcast'] = (refs.length < 2) ? null : refs[2]; // リファラー
    target['env'] = util.honban ? 'production' : 'development'; // 配信環境
    target['account'] = userId; // ユーザーアカウント

    // ポイントサイト
    if (location.hostname.match(/point.*?\.toidas\.net/)) {
      const match = location.hostname.match(/(point.*?)\.toidas\.net/);
      target['app'] = match[1];
    }

    // デバッグ
    console.log(target);

    // 広告の読み込みの開始
    $.dfp({
      dfpID: '144172620',
      enableSingleRequest: true,
      setCentering: true,
      setTargeting: target
    });
  }

  // 広告のリロード
  reload () {
    window.googletag.cmd.push(function () {
      googletag.pubads().refresh();
    });
  }
}

export default Ad;
