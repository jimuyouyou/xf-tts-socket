const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');
const WebSocketClient = require('websocket').client;
const { getWssInfo, textToJson } = require('./util');

const xunfeiTTS = (auth, business, text, fileName, cb) => {
  let audioData = [];

  const client = new WebSocketClient();
  client.on('connect', (con) => {
    con.on('error', error => {
      throw (error);
    });

    con.on('close', () => {
      const buffer = Buffer.concat(audioData);
      fs.writeFile(fileName, buffer, (err) => {
        if (err) {
          throw (err);
          cb(err);
        } else {
          cb(null, 'OK');
        }
      });
    })

    con.on('message', (message) => {
      if (message.type == 'utf8') {
        const ret = JSON.parse(message.utf8Data);
        audioData.push(Buffer.from(ret.data.audio, 'base64'));
        if (ret.data.status == 2) {
          con.close();
        }
      }
    });

    if (con.connected) {
      const thejson = textToJson(auth, business, text);
      con.sendUTF(thejson);
    }
  });

  client.on('connectFailed', error => {
    throw (error);
  });

  const info = getWssInfo(auth);
  client.connect(info.url);
}

module.exports = xunfeiTTS;



