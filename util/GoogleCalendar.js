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
var CALENDARID = process.env.CALENDARID;

// Load client secrets from a local file.
function loadCalendar() {
  return new Promise((resolve, reject) => {
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    var credentials = env.CALENDAR_API;
    resolve(authorize(credentials, getEvents));
  });
}

function getNewToken(oauth2Client, callback) {

  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  console.log('Authorize this app by visiting this url: ', authUrl);

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question('Enter the CODE from that page here: ', (code) => {
      rl.close();
      oauth2Client.getToken(code, (err, token) => {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
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
    });
  });
}

function authorize(credentials, callback) {
  var clientSecret = credentials.CLIENT_SECRET;
  var clientId = credentials.CLIENT_ID;
  var redirectUrl = credentials.REDIRECT_URL;
  console.log(clientSecret);
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  return new Promise((resolve, reject) => {
    // Check if we have previously stored a token.
    fs.readFile("./config/token.json", (err, token) => {
      if (err) {
        resolve(getNewToken(oauth2Client, callback));
      } else {
        var jsonToken = JSON.parse(token);
        console.log(jsonToken);
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
    try {
      fs.writeFile("./config/token.json", JSON.stringify(token));
      resolve('Token stored to ' + TOKEN_PATH);
    } catch (e) {
      reject(e);
    }
  });
}

function getEvents(auth) {
  return new Promise((resolve, reject) => {

    var calendar = google.calendar('v3');

    calendar.events.list({
      auth: auth,
      calendarId: CALENDARID,
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
  CALENDARID: CALENDARID
};
