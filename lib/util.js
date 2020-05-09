function btoa(text) {
  return Buffer.from(text, 'utf8').toString('base64');
}

function getWssInfo(auth, path = '/v2/tts', host = 'tts-api.xfyun.cn') {
  const { app_skey, app_akey } = auth;
  const date = new Date(Date.now()).toUTCString();
  const request_line = `GET ${path} HTTP/1.1`;

  const signature_origin = `host: ${host}\ndate: ${date}\n${request_line}`;

  let crypto = require('crypto');


  const signature = crypto.createHmac('SHA256', app_skey).update(signature_origin).digest('base64');

  const authorization_origin = `api_key="${app_akey}",algorithm="hmac-sha256",headers="host date request-line",signature="${signature}"`;
  const authorization = btoa(authorization_origin);

  const thepath = `${path}?authorization=${encodeURIComponent(authorization)}&host=${encodeURIComponent(host)}&date=${encodeURIComponent(date)}`;

  const final_url = `wss://${host}${thepath}`;

  return { 'url': final_url, 'host': host, 'path': thepath };
}

function textToJson(auth, businessInfo, text) {
  const common = { "app_id": auth.app_id };

  const business = {};
  business.aue = "raw";
  business.sfl = 1;
  business.auf = "audio/L16;rate=16000";
  business.vcn = "xiaoyan";
  business.tte = "UTF8";
  business.speed = 50;
  Object.assign(business, businessInfo);

  const data = { "text": btoa(text), "status": 2 };

  return JSON.stringify({ common, business, data });
}

module.exports = {
  btoa,
  getWssInfo,
  textToJson
}