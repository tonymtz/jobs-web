//Read files
var fs = require('fs');
var readline = require('readline');

var env = require('../config/env');

// Google API
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = "../config/";
var TOKEN_PATH = TOKEN_DIR + 'token.json';
var credentials = env.CALENDAR_API;

function saveCode(code) {
  return new Promise((resolve, reject) => {
    if(code) {
      fs.writeFile(__dirname + "/../config/code.json", JSON.stringify({code:code}), (err) => {
        if(err) {
          reject(err);
        } else {
          resolve("CODE saved succesfully");
        }
      });
    }
  });
}

// Load client secrets from a local file.
function loadCalendar() {
  return new Promise((resolve, reject) => {
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    resolve(authorize(credentials, getEvents));
  });
}

function getNewToken(oauth2Client, callback) {

  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  console.log('Authorize this app by visiting this url: ', authUrl);
  return new Promise((resolve, reject) => {
    fs.readFile("./config/code.json", (err, code) => {
      if(err) {
        reject(err);
        return;
      } else {
        var code = JSON.parse(code).code;
        oauth2Client.getToken(code, (err, token) => {
          if (err) {
            reject(err);
            return;
          }
          oauth2Client.setCredentials({
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            expiry_date: false
          });

          storeToken(token).then(() => {
            resolve(callback(oauth2Client));
          }).catch((err) => {
            console.log(err);
            reject(err);
          });
        });
      }

    });
  });
}

function authorize(credentials, callback) {
  var clientSecret = credentials.CLIENT_SECRET;
  var clientId = credentials.CLIENT_ID;
  var redirectUrl = credentials.REDIRECT_URL;
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  return new Promise((resolve, reject) => {
    // Check if we have previously stored a token.
    fs.readFile("./config/token.json", (err, token) => {
      if (err) {
        resolve(getNewToken(oauth2Client, callback));
      } else {
        var jsonToken = JSON.parse(token);
        oauth2Client.setCredentials({
          access_token: jsonToken.access_token,
          refresh_token: jsonToken.refresh_token,
          expiry_date: false
        });
        resolve(callback(oauth2Client));
      }
    });
  });
}

function storeToken(token) {
  return new Promise((resolve, reject) => {
      fs.writeFile("./config/token.json", JSON.stringify(token), { flag: 'wx' }, (err) => {
        if(err) {
          reject(err);
        } else {
          resolve('Token stored to ' + TOKEN_PATH);
        }
      });
  });
}

function getEvents(auth) {
  return new Promise((resolve, reject) => {

    var calendar = google.calendar('v3');

    calendar.events.list({
      auth: auth,
      calendarId: credentials.CALENDARID,
      timeMin: (new Date()).toISOString(),
      maxResults: 1,
      singleEvents: true,
      orderBy: 'startTime'
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        reject(err);
        return;
      }
      var events = response.items;
      // console.log(events);
      resolve(events);
    });
  });

}

module.exports = {
  authorize:    authorize,
  getEvents:    getEvents,
  getNewToken:  getNewToken,
  loadCalendar: loadCalendar,
  CALENDARID:   credentials.CALENDARID,
  saveCode:     saveCode
};
