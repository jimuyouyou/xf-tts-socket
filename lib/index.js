const fs = require("fs");
const path = require("path");
const uniqid = require('uniqid');
const { exec } = require('child_process');
const WebSocketClient = require('websocket').client;
const { getWssInfo, textToJson } = require('./util');

const XunfeiTTS = (auth, business, text, file, cb) => {
  let audioData = [];
  const ext = path.extname(file);
  const isPCM = ext.includes('.pcm');
  const fileName = isPCM ? file : `${uniqid()}-temp.pcm`;

  const client = new WebSocketClient();
  client.on('connect', (con) => {
    con.on('error', error => {
      throw (error);
    });

    con.on('close', () => {
      const buffer = Buffer.concat(audioData);
      fs.writeFile(fileName, buffer, () => {
        if (!isPCM) {
          const ffmpeg = path.join(__dirname, '../bin/ffmpeg');
          exec(`${ffmpeg} -hide_banner -loglevel panic -y -f s16le -ar 16000 -ac 1 -i ${fileName} ${file}`, (error, stdout, stderr) => {
            if (error || stderr) console.error(`exec error: ${error || stderr}`);
            fs.unlink(fileName, () => { });
            cb(null, 'OK');
          });
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

module.exports = XunfeiTTS;



