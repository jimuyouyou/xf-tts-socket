const fs = require("fs");
const path = require("path");
const uniqid = require('uniqid');
const ffmpeg = require('ffmpeg-static');
const { exec } = require('child_process');
const WebSocketClient = require('websocket').client;
const { getWssInfo, textToJson } = require('./util');

const XunfeiTTS = (auth, business, text, file, cb) => {
  let audioData = [];
  const ext = path.extname(file);
  const filePath = path.dirname(file);
  const isPCM = ext.includes('.pcm');
  const tempPCMFile = path.resolve(filePath, `${uniqid()}-temp.pcm`);
  const fileName = isPCM ? file : tempPCMFile;

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
        } else {
          if (!isPCM) {
            exec(`${ffmpeg} -hide_banner -loglevel panic -y -f s16le -ar 16000 -ac 1 -i ${fileName} ${file}`, (error, stdout, stderr) => {
              if (error || stderr) console.error(`exec error: ${error || stderr}`);
              else fs.unlink(fileName, () => { });
              cb(null, 'OK');
            });
          } else {
            cb(null, 'OK');
          }
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



