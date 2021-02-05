const md5 = require('md5');

class Utils {
  static encodeUrlToObjKey(url) {
    if (!url && !url.length) {
      return;
    }
    return md5(url);
  }

  static decodeUrlToObjKey(key) {}
}

module.exports = { Utils };
