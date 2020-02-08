const path = require('path');
const { promisify } = require('util');
const XunfeiTTS = require('../index');
const getXunfeiTTSAsync = promisify(XunfeiTTS);

const test = async (app_id, app_skey, app_akey) => {
  const auth = {
    app_id,
    app_skey,
    app_akey
  };
  const business = {};
  const text = '如果握手失败，则根据不同错误类型返回不同HTTP Code状态码';
  const file = path.resolve('./test/test.mp3');

  try {
    const a = await getXunfeiTTSAsync(auth, business, text, file);
    console.log('ret', a);
  } catch (e) {
    console.log('test exception', e);
  }
};

console.log(process.argv);
test(process.argv[2], process.argv[3], process.argv[4]);

