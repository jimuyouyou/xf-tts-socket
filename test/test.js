const XunfeiTTS = require('../index');
const { promisify } = require('util');
const getXunfeiTTSAsync = promisify(XunfeiTTS);

const test = async () => {
  const auth = {
    app_id: 'xxxxxx',
    app_skey: 'xxxxxxxxxxx',
    app_akey: 'xxxxxxxxxxx',
  };
  const business = {};
  const text = '如果握手失败，则根据不同错误类型返回不同HTTP Code状态码';
  const file = 'test.mp3';

  try {
    const a = await getXunfeiTTSAsync(auth, business, text, file);
    console.log('ret', a);
  } catch (e) {
    console.log('test exception', e);
  }
};

test();

