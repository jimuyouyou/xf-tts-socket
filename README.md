# 科大讯飞Websocket版本的文本转语音API
- 支持回调函数
- 支持async-await
- 不需要关心各种复杂的鉴权，格式转换问题
- 支持各发音人及其他详细参数的设置

# 项目解决的问题
- xunfei最新版本tss API只支持websocket,鉴权与各种转码非常复杂
- xunfei tts暂时只支持pcm格式返回，而很多情况我们可能需要使用mp3,wav等其他通用格式
- websocket的回调与异步处理非常复杂，对传统的短文本tts来说，优势较少

# Inspired by [easychen/xf-tts-sdk](https://github.com/easychen/xf-tts-sdk)

# Quick Start
- `npm install xf-tts-socket --save`
- async-await使用方式(默认发音人设置)
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

  const ret = await getXunfeiTTSAsync(auth, business, text, file);
  console.log('ret', ret);
};

test();
```
- async-await使用方式(自定义发音人设置)
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
  const business = {
    aue: 'raw',
    auf: 'audio/L16;rate=16000',
    vcn: 'aisbabyxu',
    tte: 'UTF8',
    speed: 50
  };
  const text = '如果握手失败，则根据不同错误类型返回不同HTTP Code状态码';
  const file = 'test.mp3';

  const ret = await getXunfeiTTSAsync(auth, business, text, file);
  console.log('ret', ret);
};

test();
```
- callback使用方式(默认发音人设置)
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
  XunfeiTTS(auth, business, text, file, (ret) => {
    console.log('ret', ret);
  });
};

test();
```

# 实现原理
- pcm是xunfei默认的格式返回，因此如果指定文件是这种类型的话，未作任何语音转码
- 其他形式的文件(mp3, wav等)是使用ffmpeg进行的音频转码

# 支持所有讯飞指定参数的设置
- [讯飞官网API说明](https://www.xfyun.cn/doc/tts/online_tts/API.html#%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E6%B5%81%E7%A8%8B)