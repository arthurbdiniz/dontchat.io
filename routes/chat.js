var express = require('express');
var router = express.Router({
  mergeParams: true
});

// GET chat page
router.get('', function (req, res, next) {
  res.send(`Received request for ${req.params.chatCode}`);
});

module.exports = router;