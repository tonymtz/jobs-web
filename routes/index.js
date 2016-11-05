var express = require('express');
var router = express.Router();
var env = require('../config/env');
var YouTube = require('youtube-node');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/home', { title: 'Nearsoft Home' });
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
  res.render('pages/comunity', { title: 'Nearsoft Comunity' });
});

router.get('/open-position', function(req, res, next) {
  res.render('pages/position', { title: 'Nearsoft Open Positions' });
});

router.get('/who-we-are', function(req, res, next) {

  var youTube = new YouTube();
  console.log(env.YOUTUBE_API_KEY);
  youTube.setKey(env.YOUTUBE_API_KEY);
  youTube.getPlayListsItemsById(env.YOUTUBE_LIST_ID, function(err, response) {
    console.log(err);
    if(err){
      res.render("error", {error: err});
    }else {
      res.render('pages/who', { title: 'Nearsoft This is Who We Are', videos: response.items });
    }
  });
});

module.exports = router;
