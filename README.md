# 科大讯飞文本转语音API - 基于最新的Websocket版本协议
- 支持回调函数
- 支持async-await
- 支持pcm, mp3, wav等常见音频格式
- 支持音频保存成本地文件
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

# 示例代码
- [async-await使用方式(自定义发音人设置-mp3格式音频)](#async-await-mp3)
- [callback使用方式(默认发音人设置-mp3格式音频)](#callback-mp3)
- [async-await使用方式(自定义发音人设置-pcm格式音频)](#async-await-pcm)
- [callback使用方式(默认发音人设置-pcm格式音频)](#callback-pcm)

## async-await-mp3
- async-await使用方式(自定义发音人设置-mp3格式音频)
```js
// 执行成功后会在你的项目指定目录下生成一个mp3文件,使用播放器直接播放即可
// 注意：js文件必须是utf-8编码格式，其他格式文件会出现返回空语音的情况
const xunfeiTTS = require('xf-tts-socket');
const { promisify } = require('util');
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

test_async_await_mp3('xxxxxx', 'xxxxxx', 'xxxxxx');
```

## callback-mp3
- callback使用方式(默认发音人设置-mp3格式音频)
```js
// 执行成功后会在你的项目指定目录下生成一个mp3文件,使用播放器直接播放即可
// 注意：js文件必须是utf-8编码格式，其他格式文件会出现返回空语音的情况
const xunfeiTTS = require('xf-tts-socket');

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

test_callback_mp3('xxxxxx', 'xxxxxx', 'xxxxxx');
```

## async-await-pcm
- async-await使用方式(自定义发音人设置-pcm格式音频)
```js
// 执行成功后会在你的项目指定目录下生成一个pcm文件,使用播放器直接播放即可
// 注意：js文件必须是utf-8编码格式，其他格式文件会出现返回空语音的情况
const xunfeiTTS = require('xf-tts-socket');
const { promisify } = require('util');
const tts = promisify(xunfeiTTS);

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

test_async_await_pcm('xxxxxx', 'xxxxxx', 'xxxxxx');
```

## callback-pcm
- callback使用方式(默认发音人设置-pcm格式音频)
```js
// 执行成功后会在你的项目指定目录下生成一个pcm文件,使用播放器直接播放即可
// 注意：js文件必须是utf-8编码格式，其他格式文件会出现返回空语音的情况
const xunfeiTTS = require('xf-tts-socket');

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

test_callback_pcm('xxxxxx', 'xxxxxx', 'xxxxxx');
```

# 实现原理
- 鉴权，webscoket连接和数据转码细节都在库里边实现了，详情可查看[本库源码](https://github.com/jimuyouyou/xf-tts-socket)

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

# 改进清单
- 提升代码可读性