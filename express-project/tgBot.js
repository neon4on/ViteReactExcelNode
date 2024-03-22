const request = require('request');
const urlencode = require('urlencode');

// var appDir = path.dirname(import.meta.url);
// appDir = appDir.split('///');
// appDir = appDir[1];
// let test = true;
// if (!test) appDir = '//' + appDir;

// console.log(appDir);

function curdate(minute) {
  minute = minute < 10 ? '0' + minute : minute;
  return minute;
}
