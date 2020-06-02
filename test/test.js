const path = require('path');
const { promisify } = require('util');
const xunfeiTTS = require('../index');
const tts = promisify(xunfeiTTS);

const test_async_await_mp3 = async (app_id, app_skey, app_akey) => {
  const auth = { app_id, app_skey, app_akey };
  // business 支持所有语音参数，详见： 
  // https://www.xfyun.cn/doc/tts/online_tts/API.html#%E4%B8%9A%E5%8A%A1%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E-business
  const business = { aue: 'lame', sfl: 1, vcn: 'aisjiuxu', speed: 80, pitch: 50 };
  const text = '两块钱不算多，去不了香港去不了新加坡';
  const file = path.resolve('./test/test_async_await_mp3.mp3');

  try {
    await tts(auth, business, text, file);
  } catch (e) {
    console.log('test exception', e);
  }
};

const test_callback_mp3 = (app_id, app_skey, app_akey) => {
  const auth = { app_id, app_skey, app_akey };
  const business = { aue: 'lame', sfl: 1 };
  // business 支持所有语音参数，详见： 
  // https://www.xfyun.cn/doc/tts/online_tts/API.html#%E4%B8%9A%E5%8A%A1%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E-business
  const text = '两块钱，不算贵，不用回去开家庭会。';
  const file = path.resolve('./test/test_callback_mp3.mp3');
  xunfeiTTS(auth, business, text, file, (err, ret) => {
    console.log('test_callback_mp3 end', err);
  });
};

const test_async_await_pcm = async (app_id, app_skey, app_akey) => {
  const auth = { app_id, app_skey, app_akey };
  // business 支持所有语音参数，
  // 详见： https://www.xfyun.cn/doc/tts/online_tts/API.html#%E4%B8%9A%E5%8A%A1%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E-business
  const business = { aue: 'raw', vcn: 'aisjiuxu', speed: 80, pitch: 50 };
  const text = '去不了香港去不了新加坡，两块钱';
  const file = path.resolve('./test/test_async_await_pcm.pcm');
  try {
    // 如有需要ffmpeg软件可以将pcm转换成其他任意格式的语音文件: 
    // ffmpeg -hide_banner -loglevel panic -y -f s16le -ar 16000 -ac 1 -i test_async_await_pcm.pcm test_async_await_pcm.mp3
    await tts(auth, business, text, file);
  } catch (e) {
    console.log('test exception', e);
  }
};

const test_callback_pcm = (app_id, app_skey, app_akey) => {
  const auth = { app_id, app_skey, app_akey };
  // business 支持所有语音参数，详见：
  // https://www.xfyun.cn/doc/tts/online_tts/API.html#%E4%B8%9A%E5%8A%A1%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E-business
  const business = { aue: 'raw' };
  const text = '香港去不了新加坡，两块钱';
  const file = path.resolve('./test/test_callback_pcm.pcm');
  xunfeiTTS(auth, business, text, file, (err, ret) => {
    // 如有需要ffmpeg软件可以将pcm转换成其他任意格式的语音文件: 
    // ffmpeg -hide_banner -loglevel panic -y -f s16le -ar 16000 -ac 1 -i test_callback_pcm.pcm test_callback_pcm.mp3
    console.log('test_callback_pcm end', err);
  });
};

const test_all = async () => {
  await test_async_await_mp3(process.argv[2], process.argv[3], process.argv[4]);
  await test_callback_mp3(process.argv[2], process.argv[3], process.argv[4]);
  await test_async_await_pcm(process.argv[2], process.argv[3], process.argv[4]);
  await test_callback_pcm(process.argv[2], process.argv[3], process.argv[4]);
};

console.log(process.argv);
test_all();

