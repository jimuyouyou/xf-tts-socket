# 科大讯飞Websocket版本的文本转语音API
- 支持回调函数
- 支持async-await

# Inspired by [easychen/xf-tts-sdk](https://github.com/easychen/xf-tts-sdk)

# Quick Start
- `npm install xf-tts-socket --save`
- async-await使用方式
```js
const XunfeiTTS = require('xf-tts-socket');
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

  const return = await getXunfeiTTSAsync(auth, business, text, file);
  console.log('ret', return);
};

test();
```
- callback使用方式
```js
const XunfeiTTS = require('xf-tts-socket');

const test = () => {
  const auth = {
    app_id: 'xxxxxx',
    app_skey: 'xxxxxxxxxxx',
    app_akey: 'xxxxxxxxxxx',
  };
  const business = {};
  const text = '如果握手失败，则根据不同错误类型返回不同HTTP Code状态码';
  const file = 'test.mp3';
  XunfeiTTS(auth, business, text, file, () => {
    console.log('ret', return);
  });
};

test();
```

# Features
- support pcm, mp3, wav audio format

# convert from pcm to mp3
- `ffmpeg -y -f s16le -ar 16000 -ac 1 -i append.pcm ff.mp3`