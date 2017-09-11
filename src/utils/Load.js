import Common from './Common.js';
import _ from 'lodash';

/**
 * トイの解答クラス
 * @extends {View}
 * @example
 * const load = new Load();
 */
class Load extends Common {

  /**
   * オプションのセット
   * @return {object} option オプション
   */
  initParams () {
    const params = this.params;
    const option = {};
    option.id = typeof (params['id']) !== 'undefined' ? Number(params['id']) : null;
    option.info = typeof (params['info']) !== 'undefined' ? JSON.parse(params['info']) : true;
    option.share = typeof (params['share']) !== 'undefined' ? JSON.parse(params['share']) : true;
    option.recommend = typeof (params['recommend']) !== 'undefined' ? JSON.parse(params['recommend']) : true;
    option.comment = typeof (params['comment']) !== 'undefined' ? JSON.parse(params['comment']) : true;
    option.pager = typeof (params['pager']) !== 'undefined' ? JSON.parse(params['pager']) : false;
    option.json = null;

    // プレビューの場合
    if (document.domain === document.referrer.split('/')[2] || document.domain === 'localhost') {
      const iframe = parent.document.getElementById('toidas-frame');
      if (iframe && typeof iframe.dataset.json !== 'undefined') {
        const json = iframe.dataset.json;
        option.json = JSON.parse(decodeURIComponent(json));
      }
    }

    this._option = option;
    return option;
  }

  /**
   * Google Analytics のセット
   * @param {object} option - オプション
   */
  initAnalytics (option) {
    window.ga = window.ga || function () { ( ga.q = ga.q || []).push(arguments); };
    ga.l =+ new Date;
    ga('create', 'UA-145095-36', 'auto');
    ga('set', 'dimension1', String(option.id));
    ga('set', 'dimension2', String(option.info));
    ga('set', 'dimension3', String(option.share));
    ga('set', 'dimension4', String(option.recommend));
    ga('set', 'dimension5', String(option.comment));
    ga('send', 'pageview', { 'page' : 'load.html?id=' + option.id });
  }

  /**
   * APIデータを整形
   * @param {object} data - トイデータ
   */
  initData (data, mode = 'load') {
    // console.log("initData");
    const toi = data.result;
    toi.media = this._image(toi.media, toi.id);
    toi.user.media = this._image(toi.user.media, 'users');
    toi.created_at = this._date(toi.created_at);
    toi.question_rand = parseInt(toi.question_rand);
    toi.answer_rand = parseInt(toi.answer_rand);
    // if (toi.status === 'temporary') { toi.status = 'draft'; }
    if (mode === 'load') {
      toi.description = this._html(toi.description);
      toi.footer = this._html(toi.footer);
      toi.selected = false;
    }
    let questions = [];
    for (const i in toi.questions) {
      const question = toi.questions[i];
      question.start_media = this._image(question.start_media, toi.id);
      question.end_media = this._image(question.end_media, toi.id);
      if (mode === 'load') {
        question.description = this._html(question.description);
        question.selected = false;
      }
      question.answerimages = 0;
      let answers = [];
      for (const i in question.answers) {
        const answer = question.answers[i];
        if (toi.type === 'personality') {
          answer.point = answer.point.split(',');
        }
        answer.media = this._image(answer.media, toi.id);
        answer.answerScoreActive = false;
        if (mode === 'load') {
          answer.selected = false;
        }
        if (answer.media.url) {
          question.answerimages++;
        }
        answers.push(answer);
      }
      if (mode === 'load' && toi.answer_rand === 1) {
        answers = _.shuffle(answers);
      }
      question.close = true;
      question.answers = answers;
      questions.push(question);
    }
    if (mode === 'load' && toi.question_rand === 1) {
      questions = _.shuffle(questions);
    }
    toi.questions = questions;
    const results = [];
    for (const i in toi.results) {
      const result = toi.results[i];
      if (mode === 'load') {
        result.description = this._html(result.description);
      }
      result.media = this._image(result.media, toi.id);
      result.close = true;
      results.push(result);
    }
    toi.results = results;
    toi.allpoint = 0;
    toi.simulationScore = [];

    if (!toi.report) {
      toi.report = {
        pageview: 0
      };
    }

    const tags = [];
    for (const key of Object.keys(toi.placements)) {
      const value = toi.placements[key].tag_id;
      tags.push(Number(value));
    }
    toi.tags = tags;

    // console.log(toi)
    return toi;
  }

  decodeData (toi) {
    toi.question_rand = Number(toi.question_rand);
    toi.answer_rand = Number(toi.answer_rand);

    const questions = [];
    for (const question of toi.questions) {
      const answers = [];
      // console.log('q' + question.id);
      for (const answer of question.answers) {
        if (toi.type === 'personality') {
          answer.point = answer.point.join(',');
        }
        // console.log('a' + answer.id);
        answers.push(answer);
      }
      question.answers = answers;
      questions.push(question);
    }

    // const ids = this.arrayColumn(toi.results, 'id');
    // console.log('前の配列', ids);

    toi.questions = questions;
    return toi;
  }

  arrayColumn (array, key) {
    const ids = [];
    for (const value of array) {
      const id = parseInt(value[key]);
      ids.push(isNaN(id) ? '' : id);
    }
    return ids;
  }

  arrayRemap (array, key, keys) {
    for (const i in array) {
      array[i][key] = (typeof keys[i] !== 'undefined') ? keys[i] : '';
    }
  }

  initMedia (data, id = 1147) {
    const media = data.result;
    return this._image(media, id);
  }

  /**
   * 日付データをフォーマット
   * @param {date} date 日付データ
   * @return {string} 日付データ
   */
  _date (date) {
    var d = new Date(date * 1000);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    return `${year}/${month}/${day}`;
  }

  /**
   * 画像データをフォーマット
   * @param {object} data 画像ノード
   * @param {number} id 記事ID
   * @return {object} 画像ノード
   */
  _image (data, id) {
    if (!data || data.url === null) {
      data = {
        type: 'image',
        url: null,
      };

      if (id === 'users') {
        data.url = `${this._config.url[this.env].cdn}/images/thumbnails/users/profile_icon_no_image.png`;
      }
    } else {
      if (data.type === 'movie') {
        // 動画の場合
      } else {
        // 画像の場合
        data.url = `${this._config.url[this.env].cdn}/images/thumbnails/${id}/${data.thumbnail}`;
        data.original = `${this._config.url[this.env].cdn}/images/originals/${id}/${data.original}`;
        // data.media.url = data.media.url.replace(/(\.(jpeg|jpg|png|gif))/, "_150x100$1");
      }

      /* 著作権の表記ドメイン指定するか
         if (typeof data.copyright !== 'string') { return data; }
         var match = data.copyright.match('https?://(.*?)(/.*?)?$');
         if (match) {
         data.copyright = match[1];
         }
       */
    }
    return data;
  }

  /**
   * HTMLデータをフォーマット
   * @param {string} text HTMLテキスト
   * @return {string} HTMLテキスト
   */
  _html (text) {
    // console.log(text)
    if (typeof text !== 'string') {
      return '';
    }
    text = text.replace(/\n/g, '<br />');
    text = text.replace(/(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g, '<a href="$1" target="_blank">$1</a>');
    return text;
  }

  csrfToken () {
    if (document.cookie.length > 0) {
      var cName = 'csrf_token';
      var cStart = document.cookie.indexOf(cName + '=');
      if (cStart !== -1) {
        cStart = cStart + cName.length + 1;
        var cEnd = document.cookie.indexOf(';', cStart);
        if (cEnd === -1) {
          cEnd = document.cookie.length;
        }
        return unescape(document.cookie.substring(cStart, cEnd));
      }
    }
    return '';
  }


  /**
   * ソーシャルボタン等の読み込み
   */
  social () {
    // twitter
    window.twttr = (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
      t._e = [];
      t.ready = function (f) {
        t._e.push(f);
      };
      return t;
    }(document, 'script', 'twitter-wjs'));

    // facebook
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.5&appId=193119714360408';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}

export default Load;
