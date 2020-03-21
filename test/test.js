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
  // const business = { vcn: 'aisbabyxu', speed: 20, pitch: 65 };
  // const business = { vcn: 'xiaoyan', speed: 70, pitch: 60 };
  const business = { vcn: 'aisjiuxu', speed: 80, pitch: 50 };
  const text = '两块钱不算多，去不了香港去不了新加坡，两块钱，不算贵，不用回去开家庭会。';
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

