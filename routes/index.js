var express = require('express');
var router = express.Router();
var env = require('../config/env');
var YouTube = require('youtube-node');
var GoogleCalendar = require("../util/GoogleCalendar.js");
var sm = require('sitemap');

/* GET home page. */
router.get('/', function(req, res, next) {
  var event = {};
  res.render('pages/home', { title: 'Nearsoft Home', event: event });
  // if (req.query.code) {
  //   GoogleCalendar.saveCode(req.query.code).then((message) => {
  //     console.log(message);
  //     res.redirect("/");
  //   }).catch((err) => {
  //     console.log(err);
  //     res.render('pages/home', { title: 'Nearsoft Home' });
  //   });
  // } else {
  //   res.render('pages/home', { title: 'Nearsoft Home' });
  // }
});

router.get('/contact', function(req, res, next) {
  res.render('pages/contact', { title: 'Nearsoft Contact' });
});

router.get('/internship', function(req, res, next) {
  res.render('pages/internship', { title: 'Nearsoft Internship' });
});

router.get('/labs', function(req, res, next) {
  res.render('pages/labs', { title: 'Nearsoft Labs' });
});

router.get('/life', function(req, res, next) {
  res.render('pages/life', { title: 'Nearsoft Life' });
});

router.get('/community', function(req, res, next) {

  var images = [
    {
      title: "Applicate",
      img: "applicate.png"
    },
    {
      title: "Arduino",
      img: "arduino.png"
    },
    {
      title: "Chilango",
      img: "chilango.png"
    },
    {
      title: "Cloudio",
      img: "cloudio.png"
    },
    {
      title: "Code with us",
      img: "code_with_us.png"
    },
    {
      title: "Codeando",
      img: "codeando.png"
    },
    {
      title: "C#",
      img: "csharp.png"
    },
    {
      title: "DeKids",
      img: "dekids.png"
    },
    {
      title: "Dev Circles",
      img: "dev_circles.png"
    },
    {
      title: "Django Girls",
      img: "django.png"
    },
    {
      title: "elixir",
      img: "elixir.png"
    },
    {
      title: "Gophers",
      img: "gophers.png"
    },
    {
      title: "H/F",
      img: "H_F.png"
    },
    {
      title: "JVMMX",
      img: "jvmmx.png"
    },
    {
      title: "Nodeschool",
      img: "nodeschool.png"
    },
    {
      title: "NS Coders",
      img: "ns_coders.png"
    },
    {
      title: "The Data Pup",
      img: "the_data_pub.png"
    },
    {
      title: "upiicsa",
      img: "upiicsa.jpg"
    },
    {
      title: "Xamarin",
      img: "xamarin.png"
    },
  ];

  GoogleCalendar.loadCalendar().then((events) => {
    var event = {}
    if(events.length) {
      var date = new Date(Date.parse(events[0].start["dateTime"]));
      var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      event = {
        title: events[0].summary,
        month: months[date.getMonth()],
        day: date.getDate()
      };
    }
    res.render('pages/community', { title: 'Nearsoft Community', event: event, CALENDARID: GoogleCalendar.CALENDARID, images:images });
  }).catch((err) => {
    console.log("Authorize this app by visiting this url: " + url);
    res.render('pages/community', { title: 'Nearsoft Community', event: event, CALENDARID: GoogleCalendar.CALENDARID, images:images });
  }).finally(() => {
    res.render('pages/community', { title: 'Nearsoft Community', event: [], CALENDARID: GoogleCalendar.CALENDARID, images:images });
  });
});

router.get('/open-position', (req, res, next) => {
  res.render('pages/position', { title: 'Nearsoft Open Positions' });
});

router.get('/who-we-are', (req, res, next) => {

  var youTube = new YouTube();
  youTube.setKey(env.YOUTUBE_API_KEY);
  youTube.getPlayListsItemsById(env.YOUTUBE_LIST_ID, function(err, response) {
    console.log(err);
    if (err) {
      res.render("error", { error: err, title: 'Error' });
    } else {
      res.render('pages/who', { title: 'Nearsoft This is Who We Are', videos: response.items });
    }
  });

});

router.get('/sitemap.xml', (req, res, next) => {
  var routes = [];
  for (var layer of router.stack) {
    routes.push({url: layer.route.path, changefreq: 'monthly'});
  }
  sitemap = sm.createSitemap ({
    hostname: 'http://nearsoftjobs.com',
    cacheTime: 600000,        // 600 sec - cache purge period
    urls: routes
  });

  sitemap.toXML((err, xml) => {
    if(err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
     res.send( xml );
  })
});

module.exports = router;
