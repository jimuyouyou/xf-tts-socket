# 科大讯飞文本转语音API - 基于最新的Websocket版本协议
- 支持回调函数
- 支持async-await
- 支持pcm, mp3, wav等常见音频格式
- 支持各发音人及其他详细参数的设置
- 支持windows, mac, linux
- 不需要关注websocket握手细节
- 不需要关心各种复杂的鉴权，格式转换问题

# Inspired by [easychen/xf-tts-sdk](https://github.com/easychen/xf-tts-sdk)

# 使用说明
- 使用前可以先去讯飞官网注册用户，[在线体验和注册用户](https://www.xfyun.cn/services/online_tts)
- 本项目为Nodejs版本的优化，Php/Java开发人员如需使用，可以搭建Nodejs微服务，作为Rest API调用
- 注意：**js文件必须是utf-8编码格式，其他格式文件会出现返回空语音的情况**

# 安装
- `npm install xf-tts-socket --save`

# 完整示例
- [async-await使用方式(默认发音人设置-mp3格式音频)](#async-await-mp3)
- [async-await使用方式(默认发音人设置-pcm格式音频)](#async-await-pcm)
- [async-await使用方式(自定义发音人设置)](#async-await-custom-speaker)
- [callback使用方式(默认发音人设置)](#callback-mp3)

## async-await-mp3
- async-await使用方式(默认发音人设置-mp3格式音频)
```js
// 执行成功后会在你的项目根目录下生成一个test.mp3的文件,使用播放器直接播放即可
// 注意：js文件必须是utf-8编码格式，其他格式文件会出现返回空语音的情况
const XunfeiTTS = require('xf-tts-socket');
const { promisify } = require('util');
const getXunfeiTTSAsync = promisify(XunfeiTTS);

const test = async () => {
  const auth = { app_id: 'xxxxxx', app_skey: 'xxxxxxxxxxx', app_akey: 'xxxxxxxxxxx' };
  const business = {};
  const text = '两块钱不算多，去不了香港去不了新加坡，两块钱，不算贵，不用回去开家庭会。';
  const file = 'test.mp3';

  const ret = await getXunfeiTTSAsync(auth, business, text, file);
  console.log('ret', ret);
};

test();
```

## async-await-pcm
- async-await使用方式(默认发音人设置-pcm格式音频)
```js
// 执行成功后会在你的项目根目录下生成一个test.pcm的文件
// 注意：js文件必须是utf-8编码格式，其他格式文件会出现返回空语音的情况
const XunfeiTTS = require('xf-tts-socket');
const { promisify } = require('util');
const getXunfeiTTSAsync = promisify(XunfeiTTS);

const test = async () => {
  const auth = { app_id: 'xxxxxx', app_skey: 'xxxxxxxxxxx', app_akey: 'xxxxxxxxxxx' };
  const business = {};
  const text = '两块钱不算多，去不了香港去不了新加坡，两块钱，不算贵，不用回去开家庭会。';
  const file = 'test.pcm';

  const ret = await getXunfeiTTSAsync(auth, business, text, file);
  console.log('ret', ret);
};

test();
```

## async-await-custom-speaker
- async-await使用方式(自定义发音人设置)
```js
// 执行成功后会在你的项目根目录下生成一个test.mp3的文件,使用播放器直接播放即可
// 注意：js文件必须是utf-8编码格式，其他格式文件会出现返回空语音的情况
const XunfeiTTS = require('xf-tts-socket');
const { promisify } = require('util');
const getXunfeiTTSAsync = promisify(XunfeiTTS);

const test = async () => {
  const auth = { app_id: 'xxxxxx', app_skey: 'xxxxxxxxxxx', app_akey: 'xxxxxxxxxxx' };
  const business = {
    aue: 'raw',
    auf: 'audio/L16;rate=16000',
    vcn: 'aisbabyxu',
    tte: 'UTF8',
    speed: 50
  };
  const text = '两块钱不算多，去不了香港去不了新加坡，两块钱，不算贵，不用回去开家庭会。';
  const file = 'test.mp3';

  const ret = await getXunfeiTTSAsync(auth, business, text, file);
  console.log('ret', ret);
};

test();
```

## callback-mp3
- callback使用方式(默认发音人设置)
```js
// 执行成功后会在你的项目根目录下生成一个test.mp3的文件,使用播放器直接播放即可
// 注意：js文件必须是utf-8编码格式，其他格式文件会出现返回空语音的情况
const XunfeiTTS = require('xf-tts-socket');

const test = () => {
  const auth = { app_id: 'xxxxxx', app_skey: 'xxxxxxxxxxx', app_akey: 'xxxxxxxxxxx' };
  const business = {};
  const text = '两块钱不算多，去不了香港去不了新加坡，两块钱，不算贵，不用回去开家庭会。';
  const file = 'test.mp3';
  XunfeiTTS(auth, business, text, file, (err, ret) => {
    console.log('ret', ret);
  });
};

test();
```

# 实现原理
- 鉴权，webscoket连接和数据转码细节都在库里边实现了，详情可查看[本库源码](https://github.com/jimuyouyou/xf-tts-socket)
- pcm是xunfei默认的格式返回，因此如果指定文件是这种类型的话，未作任何语音转码
- 其他形式的文件(mp3, wav等)是使用ffmpeg进行的音频转码
- ffmpeg使用的是[ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static)类库

# 支持所有讯飞指定参数的设置
- [讯飞官网API说明](https://www.xfyun.cn/doc/tts/online_tts/API.html#%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E6%B5%81%E7%A8%8B)

# 测试（需要提供讯飞账户上的验证key)
- `git clone https://github.com/jimuyouyou/xf-tts-socket.git`
- `npm install`
- `npm run test xxx1 xxx2 xxx3`
- xxx1是app_id
- xxx2是app_skey
- xxx3是app_akey

# 贡献与反馈
- 可以直接在github issue里边提问题
- 或者提交merge request
- 文档更新及其他
