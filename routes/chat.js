var express = require('express');
var router = express.Router({
  mergeParams: true
});

// GET chat page
router.get('/', function (req, res, next) {
  res.render('chat', {
    chatPath: req.params.chatPath
  });
});

module.exports = router;