var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/home', { title: 'Nearsoft Home' });
});

router.get('/contact', function(req, res, next) {
  res.render('pages/contact', { title: 'Nearsoft Contact' });
});

router.get('/intership', function(req, res, next) {
  res.render('pages/intership', { title: 'Nearsoft Intership' });
});

router.get('/labs', function(req, res, next) {
  res.render('pages/labs', { title: 'Nearsoft Labs' });
});

router.get('/life', function(req, res, next) {
  res.render('pages/life', { title: 'Nearsoft Life' });
});

router.get('/comunity', function(req, res, next) {
  res.render('pages/comunity', { title: 'Nearsoft Comunity' });
});

router.get('/open-position', function(req, res, next) {
  res.render('pages/position', { title: 'Nearsoft Open Positions' });
});

router.get('/who-we-are', function(req, res, next) {
  res.render('pages/who', { title: 'Nearsoft This is Who We Are' });
});

module.exports = router;
