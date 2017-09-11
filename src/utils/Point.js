class Point {

  constructor () {
    this.iframeY = 0;
  }

  key () {
    const matchs = location.hostname.match(/point(.*?).toidas.net/);
    if (matchs && typeof matchs[1] !== 'undefined') {
      return matchs[1];
    }
    return 'toidas';
  }

  finished (key) {
    const date = new Date();
    const expires = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const value = `${key}=true; expires=${expires.toGMTString()}`;
    document.cookie = value;
  }


}

export default Point;
